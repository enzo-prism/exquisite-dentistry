#!/usr/bin/env python3
"""Preserve public legacy veneers HTML and dependency closure as a static mini site.
The immutable in-repository source bundle supports regeneration after retirement.
Only read-only GET requests are made when online refresh is explicitly selected.
"""
import argparse,concurrent.futures,hashlib,html,json,os,re,runpy,subprocess,sys,tarfile,time,urllib.parse
from pathlib import Path,PurePosixPath
from html.parser import HTMLParser
REPO=Path(__file__).resolve().parent.parent
SOURCE=REPO/'work/veneers-source'
ARCHIVE=REPO/'archive-source/veneers'
OUT=REPO/'public/veneers'
HOST='exquisiteveneersla.com'; BASE='https://'+HOST; MAIN='https://exquisitedentistryla.com'
ASSET_HOSTS={HOST,'fonts.googleapis.com','fonts.gstatic.com'}
OFFLINE=False
TRACKERS=('googletagmanager','google_gtag','googlesitekit','google-site-kit','facebook.net','facebook.com/tr?', 'fbq(', 'hotjar','crazyegg','wp-emoji')
EXT_RE=re.compile(r'\.(?:css|js|png|jpe?g|gif|webp|avif|svg|ico|woff2?|ttf|otf|eot|mp4|webm|json)(?:[?#]|$)',re.I)

def checked_path(directory,name):
 p=PurePosixPath(name)
 if not name or p.is_absolute() or '..' in p.parts or '\\' in name:raise RuntimeError('Unsafe archive path: '+name)
 destination=directory.joinpath(*p.parts)
 if destination.is_symlink() or directory.resolve() not in destination.resolve().parents:raise RuntimeError('Archive path escapes cache: '+name)
 return destination

def verify_bytes(body,expected,label):
 if len(body)!=expected['bytes'] or hashlib.sha256(body).hexdigest()!=expected['sha256']:raise RuntimeError('Archive source hash mismatch: '+label)

def prepare_source(explicit=False):
 """Unpack verified original sources, reusing only proven-original public bytes."""
 state=SOURCE/'bundle-state.json'
 # An explicit existing capture directory may hold a newer read-only capture.
 if explicit and (SOURCE/'manifest.json').is_file() and not state.exists():return
 provenance=json.loads((ARCHIVE/'provenance.json').read_text())
 bundle=ARCHIVE/provenance['bundle']['path'];body=bundle.read_bytes()
 verify_bytes(body,provenance['bundle'],bundle.name)
 expected={entry['path']:entry for entry in provenance['entries']}
 cached=json.loads(state.read_text()) if state.exists() else {}
 if cached.get('bundleSha256')!=provenance['bundle']['sha256']:
  SOURCE.mkdir(parents=True,exist_ok=True)
  seen=set()
  with tarfile.open(bundle,'r:gz') as archive:
   for member in archive:
    if not member.isfile() or member.issym() or member.islnk():raise RuntimeError('Only regular archive files are permitted: '+member.name)
    if member.name not in expected or member.name in seen:raise RuntimeError('Unexpected or duplicate archive member: '+member.name)
    seen.add(member.name);destination=checked_path(SOURCE,member.name)
    file=archive.extractfile(member)
    if file is None:raise RuntimeError('Archive member has no content: '+member.name)
    content=file.read();verify_bytes(content,expected[member.name],member.name)
    destination.parent.mkdir(parents=True,exist_ok=True);destination.write_bytes(content)
  if seen!=set(expected):raise RuntimeError('Immutable source bundle is incomplete')
  state.write_text(json.dumps({'bundleSha256':provenance['bundle']['sha256']},indent=2)+'\n')
 # Verify extracted inputs again even when the previous extraction is cached.
 for name,entry in expected.items():verify_bytes(checked_path(SOURCE,name).read_bytes(),entry,name)
 for meta_file in sorted((SOURCE/'assets').glob('*.json')):
  metadata=json.loads(meta_file.read_text());cache=meta_file.with_suffix('')
  if not cache.exists():
   original=checked_path(REPO/'public',metadata['publicPath'].lstrip('/')).read_bytes()
   verify_bytes(original,{'sha256':metadata['sourceSha256'],'bytes':metadata['bytes']},metadata['publicPath'])
   cache.write_bytes(original)
  if cache.is_symlink():raise RuntimeError('Source asset cache cannot be a symlink: '+cache.name)
  verify_bytes(cache.read_bytes(),{'sha256':metadata['sourceSha256'],'bytes':metadata['bytes']},cache.name)
 print('Verified immutable sources:',len(expected),'bundled files;',len(provenance['assets']),'original asset bodies available',flush=True)

class Scan(HTMLParser):
 def __init__(self):super().__init__();self.assets=[];self.links=[];self.metadata={};self.title='';self.in_title=False
 def handle_starttag(self,t,a):
  d=dict(a)
  if t=='title':self.in_title=True
  if t=='meta' and (d.get('name') or d.get('property')):self.metadata[(d.get('name') or d.get('property')).lower()]=d.get('content','')
  if t=='a' and d.get('href'):self.links.append(d['href'])
  if t in ('link','script','img','source','video','audio'):
   for k in ('src','href','poster','data-src'):
    if d.get(k):self.assets.append(d[k])
   for item in d.get('srcset','').split(','):
    if item.strip():self.assets.append(item.strip().split()[0])
 def handle_endtag(self,t):
  if t=='title':self.in_title=False
 def handle_data(self,d):
  if self.in_title:self.title+=d

def fetch(url):
 r=subprocess.run(['curl','--location','--silent','--show-error','--include','--retry','2','--retry-delay','1','--max-time','60',url],capture_output=True)
 raw=r.stdout;headers={};status=None
 while raw.startswith(b'HTTP/'):
  try:head,raw=raw.split(b'\r\n\r\n',1)
  except ValueError:break
  lines=head.decode('utf-8',errors='replace').split('\r\n');status=int(lines[0].split()[1]);headers={k.lower().strip():v.strip() for k,v in (line.split(':',1) for line in lines[1:] if ':' in line)}
 return {'url':url,'status':status,'headers':headers,'body':raw,'error':r.stderr.decode() if r.returncode else None}

def clean_url(value,origin=BASE):
 value=html.unescape(value).replace('\\/','/')
 if value.startswith(('data:','blob:','#','mailto:','tel:','javascript:')):return None
 value=urllib.parse.urljoin(origin,value)
 parts=urllib.parse.urlsplit(value)
 if parts.hostname not in ASSET_HOSTS:return None
 return urllib.parse.urlunsplit((parts.scheme or 'https',parts.netloc,parts.path,parts.query,''))

def local_asset(url):
 p=urllib.parse.urlsplit(url);path=urllib.parse.unquote(p.path)
 # Query selects the actual stylesheet only for the Google CSS endpoints.
 if p.hostname=='fonts.googleapis.com':path='/'+(path.strip('/') or 'fonts')+'-'+hashlib.sha256(p.query.encode()).hexdigest()[:12]+'.css'
 return '/veneers/assets/'+p.hostname+path

def file_for_url(url):return REPO/'public'/local_asset(url).lstrip('/')

def strip_tracking(s):
 def script(m):return '' if any(x in m.group(0).lower() for x in TRACKERS) else m.group(0)
 s=re.sub(r'<script\b[^>]*>.*?</script\s*>',script,s,flags=re.I|re.S)
 s=re.sub(r'<link\b[^>]*>',lambda m:'' if any(x in m.group(0).lower() for x in TRACKERS) or ('preconnect' in m.group(0) or 'dns-prefetch' in m.group(0)) and ('fonts.googleapis.com' in m.group(0) or 'fonts.gstatic.com' in m.group(0)) else m.group(0),s,flags=re.I)
 s=re.sub(r'<noscript\b[^>]*>.*?</noscript\s*>',lambda m:'' if any(x in m.group(0).lower() for x in TRACKERS) else m.group(0),s,flags=re.I|re.S)
 s=re.sub(r'<meta\b[^>]*(?:facebook-domain-verification|Site Kit by Google)[^>]*>','',s,flags=re.I)
 # WordPress discovery/feed links are not dependencies of the archived experience.
 s=re.sub(r'<link\b[^>]*(?:api\.w\.org|wp-json|xmlrpc\.php|application/rss\+xml|application/atom\+xml|text/xml\+oembed|application/json\+oembed)[^>]*>','',s,flags=re.I)
 return s

def references(s,origin,is_css=False):
 refs=set();sc=Scan()
 if not is_css:
  sc.feed(s)
  for v in sc.assets:
   u=clean_url(v,origin)
   if u and (EXT_RE.search(u) or (urllib.parse.urlsplit(u).hostname=='fonts.googleapis.com' and urllib.parse.urlsplit(u).path.startswith('/css'))) and not any(x in u for x in TRACKERS):refs.add(u)
 for value in re.findall(r'https?:[^\s<>"\'\\]+',s.replace('\\/','/')):
  u=clean_url(value,origin)
  if u and (EXT_RE.search(u) or (urllib.parse.urlsplit(u).hostname=='fonts.googleapis.com' and urllib.parse.urlsplit(u).path.startswith('/css'))) and not any(x in u for x in TRACKERS):refs.add(u)
 if is_css:
  for value in re.findall(r'url\(\s*["\']?([^"\')]+)',s,re.I):
   u=clean_url(value,origin)
   if u and not any(x in u for x in TRACKERS):refs.add(u)
 if is_css:
  for value in re.findall(r'@import\s+["\']([^"\']+)',s,re.I):
   u=clean_url(value,origin)
   if u:refs.add(u)
 return refs,sc

def route_path(path):return '/veneers'+(path if path.startswith('/') else '/'+path)

def rewrite_urls(s,assets,origin=BASE,is_css=False,is_html=True):
 # Apply exact URLs first to preserve references with escaped JSON or HTML entities.
 for old in sorted(assets,key=len,reverse=True):
  new=local_asset(old)
  for variant in {old,html.escape(old,quote=False),old.replace('/','\\/')}:
   s=s.replace(variant,new.replace('/','\\/') if '\\/' in variant else new)
 # Runtime public paths and original WordPress content paths must stay locally resolvable.
 s=s.replace('https:\\/\\/'+HOST+'\\/wp-content\\/','\\/veneers\\/assets\\/'+HOST+'\\/wp-content\\/')
 s=s.replace('https:\\/\\/'+HOST+'\\/wp-includes\\/','\\/veneers\\/assets\\/'+HOST+'\\/wp-includes\\/')
 for scheme in ('https://','http://','//'):
  s=s.replace(scheme+HOST+'/wp-content/','/veneers/assets/'+HOST+'/wp-content/').replace(scheme+HOST+'/wp-includes/','/veneers/assets/'+HOST+'/wp-includes/')
 s=s.replace('https:\\/\\/'+HOST,'https:\\/\\/exquisitedentistryla.com\\/veneers')
 s=s.replace('https://'+HOST,MAIN+'/veneers').replace('http://'+HOST,MAIN+'/veneers')
 if is_css:
  def css_url(m):
   value=m.group(2)
   if value.startswith('/veneers/assets/'):return m.group(0)
   u=clean_url(value,origin)
   return 'url('+m.group(1)+local_asset(u)+m.group(1)+')' if u else m.group(0)
  s=re.sub(r'url\(\s*(["\']?)([^"\')]+)\1\s*\)',css_url,s,flags=re.I)
 elif is_html:
  # The archive uses full page navigation and preserves original intra-page/popup hashes.
  def attr(m):
   key,q,val=m.group(1),m.group(2),html.unescape(m.group(3))
   asset_url=clean_url(val,origin)
   if asset_url in assets:val=local_asset(asset_url)
   p=urllib.parse.urlsplit(val)
   if val.startswith(MAIN+'/veneers'):
    val=val[len(MAIN):]
   elif p.hostname=='exquisitedentistryla.com' and key in ('href','action'):
    main_path=p.path or '/'
    if main_path.rstrip('/')=='/services/invisalign':main_path='/invisalign/'
    redirects=json.loads((REPO/'vercel.json').read_text()).get('redirects',[])
    # Old-host redirects must not rewrite links that already target the main site.
    main_path=next((x['destination'] for x in redirects if x['source']==main_path and not x.get('has') and not x.get('missing')),main_path)
    val=urllib.parse.urlunsplit(('', '',main_path,p.query,p.fragment))
   elif val.startswith('/') and not val.startswith(('/veneers/','//')) and key in ('href','action'):
    val='/veneers'+val
   return key+'='+q+html.escape(val,quote=True)+q
  sections=re.split(r'(<script\b[^>]*>.*?</script\s*>)',s,flags=re.I|re.S)
  s=''.join(section if section.lower().startswith('<script') else re.sub(r'\b(href|src|action)=("|\')(.*?)\2',attr,section,flags=re.I|re.S) for section in sections)
 return s

def repair_metadata(s):
 def meta_image(m):
  tag=m.group(0)
  if re.search(r'(?:property|name)=["\'](?:og:image(?::secure_url)?|twitter:image(?::src)?)["\']',tag,re.I):
   tag=re.sub(r'(content=["\'])(/veneers/assets/[^"\']+)',lambda x:x.group(1)+MAIN+x.group(2),tag,flags=re.I)
  return tag
 s=re.sub(r'<meta\b[^>]*>',meta_image,s,flags=re.I)
 def schema(m):
  def walk(value):
   if isinstance(value,dict):
    value={key:walk(item) for key,item in value.items()}
    types=value.get('@type',[]);types=[types] if isinstance(types,str) else types
    if 'Dentist' in types:
     value['name']='Exquisite Dentistry'
     value['alternateName']='Exquisite Veneers LA'
     value['url']=MAIN+'/'
     value['openingHours']=['Mo-Th 08:00-18:00']
    return value
   if isinstance(value,list):return [walk(item) for item in value]
   if isinstance(value,str):
    if value.startswith('/veneers/assets/'):return MAIN+value
    return value.replace(MAIN+'/veneers/?s=',MAIN+'/veneers/blog/?s=')
   return value
  try:return m.group(1)+json.dumps(walk(json.loads(m.group(2))),ensure_ascii=False,separators=(',',':'))+m.group(3)
  except json.JSONDecodeError:return m.group(0)
 return re.sub(r'(<script\b[^>]*type=["\']application/ld\+json["\'][^>]*>)(.*?)(</script\s*>)',schema,s,flags=re.I|re.S)

PAGE_SEO = {
 '/veneers/': ('Porcelain Veneers in Los Angeles | Exquisite Dentistry', 'Explore porcelain veneers in Los Angeles with Dr. Alexie Aguil. See the process, real smile results, and how to request a consultation at Exquisite Dentistry.'),
 '/veneers/about/': ('About Dr. Alexie Aguil | Veneers in Los Angeles', 'Meet Dr. Alexie Aguil at Exquisite Dentistry in Los Angeles. Explore his approach to porcelain veneers, smile design, and personalized consultation planning.'),
 '/veneers/process/': ('Porcelain Veneers Process | Exquisite Dentistry Los Angeles', 'Explore the porcelain veneer process at Exquisite Dentistry in Los Angeles, from consultation and smile planning to preparation, placement, and follow-up.'),
 '/veneers/results/': ('Veneers Before and After | Exquisite Dentistry Los Angeles', 'See real before-and-after veneer results from Exquisite Dentistry in Los Angeles. Explore smile transformations and discuss your goals with Dr. Aguil.'),
 '/veneers/contact/': ('Veneers Consultation in Los Angeles | Exquisite Dentistry', 'Request a porcelain veneers consultation with Exquisite Dentistry at 6227 Wilshire Boulevard in Los Angeles. Contact the team to discuss your next step.'),
 '/veneers/resources/': ('Porcelain Veneers Questions and Guides | Exquisite Dentistry', 'Explore porcelain veneer questions and guides from Exquisite Dentistry in Los Angeles, including treatment planning, smile design, care, and consultation options.'),
 '/veneers/blog/': ('Veneers Articles and Care Guides | Exquisite Dentistry', 'Read porcelain veneer articles and care guides from Exquisite Dentistry in Los Angeles. Explore treatment questions and learn what to discuss at your consultation.'),
}

def update_page_seo(s,entry):
 """Update head metadata while retaining body content and genuine post attribution."""
 seo=PAGE_SEO.get(entry['path'])
 if not seo:return s
 title,description=seo
 entry['title']=title;entry['description']=description
 s=re.sub(r'<title>.*?</title>','<title>'+html.escape(title)+'</title>',s,count=1,flags=re.I|re.S)
 for attribute,key,value in [('name','description',description),('property','og:title',title),('name','twitter:title',title),('property','og:description',description),('name','twitter:description',description)]:
  pattern=r'<meta\b[^>]*(?:name|property)=["\']'+re.escape(key)+r'["\'][^>]*>'
  tag='<meta '+attribute+'="'+key+'" content="'+html.escape(value,quote=True)+'" />'
  if re.search(pattern,s,re.I):s=re.sub(pattern,lambda _:tag,s,flags=re.I)
  else:s=s.replace('</head>',tag+'\n</head>')
 def patch_schema(match):
  data=json.loads(match.group(2))
  graph=data.get('@graph') if isinstance(data,dict) else None
  if graph is not None:
   # Navigation and service pages are not authored articles. Never invent a
   # clinical review credit; the original authors remain on actual posts.
   graph[:]=[node for node in graph if node.get('@type')!='Article' and not (node.get('@type')=='Person' and '/author/' in node.get('@id',''))]
   for node in graph:
    if node.get('@type')=='WebPage':node.update(name=title,description=description)
  return match.group(1)+json.dumps(data,ensure_ascii=False,separators=(',',':'))+match.group(3)
 return re.sub(r'(<script\b[^>]*type=["\']application/ld\+json["\'][^>]*>)(.*?)(</script\s*>)',patch_schema,s,flags=re.I|re.S)

def fill_indexable_metadata(s,entry,shell):
 """Fill source SEO omissions without changing body copy or existing schema."""
 if not entry['indexable']:return s
 scan=Scan();scan.feed(s);metadata=scan.metadata
 def set_meta(attribute,key,value,replace=False):
  nonlocal s
  existing=metadata.get(key,'').strip()
  if existing and not replace:return
  tag='<meta '+attribute+'="'+key+'" content="'+html.escape(value,quote=True)+'" />'
  found=False
  def patch(match):
   nonlocal found
   parsed=Scan();parsed.feed(match.group(0))
   if key in parsed.metadata:found=True;return tag
   return match.group(0)
  s=re.sub(r'<meta\b[^>]*>',patch,s,flags=re.I)
  if not found:s=s.replace('</head>',tag+'\n</head>')
  metadata[key]=value
 description=metadata.get('description','').strip()
 if not description:
  explicit={
   '/veneers/':'Explore custom porcelain veneers at Exquisite Dentistry in Los Angeles, including Dr. Aguil’s process, smile results, and consultation options.',
   '/veneers/blog/':'Read porcelain veneer articles, smile makeover stories, and care guidance from Exquisite Veneers LA and Exquisite Dentistry in Los Angeles.',
   '/veneers/contact/':'Contact Exquisite Dentistry about porcelain veneers and consultation options at 6227 Wilshire Boulevard in Los Angeles.',
  }
  description=explicit.get(entry['path'],'')
  if not description:
   tree=shell['Boundaries'](s)
   paragraphs=[shell['text_of'](s,node) for node in tree.elements if node.tag=='p' and node.closest(lambda parent:parent.attrs.get('id')=='main')]
   description=next((text for text in paragraphs if len(text)>=50),entry.get('h1') or scan.title)
   if len(description)>160:
    sentences=re.split(r'(?<!Dr\.)(?<=[.!?])\s+',description);complete=''
    for sentence in sentences:
     candidate=(complete+' '+sentence).strip()
     if len(candidate)>160:break
     complete=candidate
    description=complete if len(complete)>=50 else description[:157].rsplit(' ',1)[0].rstrip(' ,;:')+'…'
  set_meta('name','description',description)
  # Original auto-generated social snippets include the now-removed navigation.
  set_meta('property','og:description',description,replace=True)
  set_meta('name','twitter:description',description,replace=True)
 entry['description']=description
 set_meta('property','og:url',MAIN+entry['path'])
 set_meta('property','og:title',scan.title)
 set_meta('name','twitter:title',scan.title)
 set_meta('name','twitter:card','summary_large_image')
 set_meta('property','og:description',description)
 set_meta('name','twitter:description',description)
 hero='/veneers/assets/'+HOST+'/wp-content/uploads/2023/10/ev-la-home-hero-img-bg-N-scaled.jpg'
 image=metadata.get('og:image') or metadata.get('twitter:image') or MAIN+hero
 if image.startswith('/'):image=MAIN+image
 if image==MAIN+hero and not (REPO/'public'/hero.lstrip('/')).is_file():raise RuntimeError('Original homepage social image is missing')
 set_meta('property','og:image',image)
 set_meta('name','twitter:image',image)
 def has_type(value,name):
  if isinstance(value,list):return any(has_type(item,name) for item in value)
  if not isinstance(value,dict):return False
  types=value.get('@type',[]);types=[types] if isinstance(types,str) else types
  return name in types or any(has_type(item,name) for item in value.values())
 schemas=[json.loads(match) for match in re.findall(r'<script\b[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script\s*>',s,re.I|re.S)]
 if not any(has_type(schema,'BreadcrumbList') for schema in schemas):
  crumbs=[{'@type':'ListItem','position':1,'name':'Exquisite Dentistry','item':MAIN+'/'},{'@type':'ListItem','position':2,'name':'Porcelain Veneers','item':MAIN+'/veneers/'}]
  if entry['path']!='/veneers/':crumbs.append({'@type':'ListItem','position':3,'name':entry.get('h1') or scan.title,'item':MAIN+entry['path']})
  breadcrumb={'@context':'https://schema.org','@type':'BreadcrumbList','@id':MAIN+entry['path']+'#breadcrumb','itemListElement':crumbs}
  s=s.replace('</head>','<script type="application/ld+json" id="veneers-breadcrumb-schema">'+json.dumps(breadcrumb,ensure_ascii=False,separators=(',',':'))+'</script>\n</head>')
 return s

def main():
 global SOURCE,OFFLINE
 parser=argparse.ArgumentParser(description=__doc__)
 parser.add_argument('--offline',action='store_true',help='Regenerate entirely from verified local originals; make no network requests')
 parser.add_argument('--source-dir',type=Path,help='Use this capture/cache directory (an empty directory is seeded from the immutable bundle)')
 args=parser.parse_args();OFFLINE=args.offline
 if args.source_dir:SOURCE=args.source_dir.expanduser().resolve()
 prepare_source(explicit=args.source_dir is not None)
 OUT.mkdir(parents=True,exist_ok=True); (SOURCE/'assets').mkdir(exist_ok=True)
 original=json.loads((SOURCE/'manifest.json').read_text());api={x['id']:x for x in original['api_pages']+original['api_posts']}
 pages=[];seen=set();queue=[]
 for p in original['pages']:
  p=dict(p);p['raw']=(SOURCE/p['html_file']).read_text();pages.append(p);seen.add(p['path'])
 def add_links(p):
  sc=Scan();sc.feed(p['raw'])
  for val in sc.links:
   parts=urllib.parse.urlsplit(urllib.parse.urljoin(BASE+p['path'],val))
   if parts.hostname!=HOST or parts.query:continue
   path=parts.path if parts.path.endswith('/') else parts.path+'/'
   if path in seen or not (path.startswith(('/blog/page/','/category/','/author/'))):continue
   seen.add(path);queue.append(BASE+path)
 for p in pages:add_links(p)
 while queue:
  urls=queue[:];queue=[]
  def fetch_page(url):
   cached=SOURCE/'html'/(urllib.parse.urlsplit(url).path.strip('/').replace('/','__')+'.html')
   if OFFLINE:
    if not cached.exists():raise RuntimeError('Offline page capture missing: '+url)
    return {'url':url,'status':200,'body':cached.read_bytes()}
   return fetch(url)
  with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
   for r in pool.map(fetch_page,urls):
    if r['status']!=200:raise RuntimeError('Archive page fetch failed '+r['url']+' '+str(r['status']))
    path=urllib.parse.urlsplit(r['url']).path;fn='html/'+path.strip('/').replace('/','__')+'.html';(SOURCE/fn).write_bytes(r['body']);raw=r['body'].decode('utf-8');sc=Scan();sc.feed(raw)
    p={'url':r['url'],'path':path,'kind':'archive','html_file':fn,'title':sc.title,'raw':raw,'api_id':None};pages.append(p);add_links(p)
 print('Pages:',len(pages),flush=True)
 routes=[]
 for p in pages:
  entry={'path':route_path(p['path']),'sourcePath':p['path'],'title':p['title'],'indexable':p['kind']!='archive' and p['path']!='/nav-test-page-2/','sourceSha256':hashlib.sha256(p['raw'].encode()).hexdigest(),'kind':p['kind']}
  if p.get('api_id') in api:
   entry['lastModified']=api[p['api_id']]['modified_gmt']+'Z';entry['lastmod']=entry['lastModified']
  h1=re.search(r'<h1\b[^>]*>(.*?)</h1>',p['raw'],re.S|re.I)
  if h1:entry['h1']=html.unescape(re.sub('<[^>]+>','',h1.group(1))).strip()
  scanned=Scan();scanned.feed(p['raw']);desc=scanned.metadata.get('description')
  if desc:entry['description']=desc
  routes.append(entry)
 (OUT/'manifest.json').write_text(json.dumps({'source':BASE,'pages':routes},indent=2))
 assets=set()
 for p in pages:assets.update(references(strip_tracking(p['raw']),p['url'])[0])
 # Dependencies are loaded on demand by Elementor's dynamic loader rather than in page HTML.
 extras=['/wp-content/plugins/elementor/assets/css/conditionals/dialog.min.css?ver=4.3.4','/wp-content/plugins/elementor/assets/lib/dialog/dialog.min.js','/wp-content/plugins/elementor/assets/lib/swiper/v8/swiper.min.js','/wp-content/plugins/elementor/assets/lib/swiper/v8/css/swiper.min.css']
 assets.update(BASE+u for u in extras)
 results={};pending=assets.copy()
 for round in range(8):
  if not pending:break
  print('Dependency round',round,'download',len(pending),flush=True)
  def download(url):
   cache=SOURCE/'assets'/hashlib.sha256(url.encode()).hexdigest()
   meta=cache.with_suffix('.json')
   if cache.exists() and meta.exists():
    r=json.loads(meta.read_text());r['body']=cache.read_bytes()
    if 'sourceSha256' in r:verify_bytes(r['body'],{'sha256':r['sourceSha256'],'bytes':r['bytes']},cache.name)
    return r
   if OFFLINE:raise RuntimeError('Offline asset capture missing: '+url)
   r=fetch(url)
   if r['status']==200 and r['body']:
    cache.write_bytes(r['body']);meta.write_text(json.dumps({k:v for k,v in r.items() if k!='body'}))
   return r
  newly=set()
  with concurrent.futures.ThreadPoolExecutor(max_workers=12) as pool:
   for r in pool.map(download,sorted(pending)):
    results[r['url']]=r
    if r['status']!=200:continue
    content_type=r['headers'].get('content-type','');is_css='text/css' in content_type or urllib.parse.urlsplit(r['url']).path.endswith('.css')
    is_js='javascript' in content_type or urllib.parse.urlsplit(r['url']).path.endswith('.js')
    if is_css or is_js:
     s=r['body'].decode('utf-8',errors='replace');newly.update(references(s,r['url'],is_css)[0])
     for name in re.findall(r'__elementorLoadChunk\([`\"\']([^`\"\']+)[`\"\']',s):
      newly.add(BASE+'/wp-content/plugins/elementor/assets/js/chunks/'+name+'.min.js')
     # Webpack chunk maps list the names for dynamically requested module files.
     if 'webpack' in r['url'] and 'runtime' in r['url']:
      for name in re.findall(r'(?:\d+):"([a-zA-Z][a-zA-Z0-9_.-]+)"',s):
       if name not in ('undefined','assets','exports'):
        base=r['url'].rsplit('/',1)[0]+'/';newly.add(base+name+'.min.js')
  pending=newly-set(results);assets.update(newly)
 failures=[{'url':u,'status':r['status'],'error':r.get('error')} for u,r in results.items() if r['status']!=200]
 (SOURCE/'asset-fetch-failures.json').write_text(json.dumps(failures,indent=2))
 print('Assets:',len(results),'failures:',len(failures),flush=True)
 asset_manifest=[]
 for url,r in sorted(results.items()):
  if r['status']!=200:continue
  raw=r['body'];body=raw
  ctype=r['headers'].get('content-type','');is_css='text/css' in ctype or urllib.parse.urlsplit(url).path.endswith('.css');is_js='javascript' in ctype or urllib.parse.urlsplit(url).path.endswith('.js')
  if is_css or is_js:body=rewrite_urls(raw.decode('utf-8',errors='replace'),assets,url,is_css,False).encode()
  file=file_for_url(url);file.parent.mkdir(parents=True,exist_ok=True);file.write_bytes(body)
  asset_manifest.append({'sourceUrl':url,'path':local_asset(url),'sourceSha256':hashlib.sha256(raw).hexdigest(),'sha256':hashlib.sha256(body).hexdigest(),'bytes':len(body),'contentType':ctype})
 shell=runpy.run_path(str(REPO/'scripts/veneers-shell.py'));render_shell=shell['render_shell']
 content_audit=[]
 for p,entry in zip(pages,routes):
  s=strip_tracking(p['raw']);s=rewrite_urls(s,assets,p['url'])
  # Preserve accurate canonical and OpenGraph URLs while links navigate within the mini site.
  canon=MAIN+entry['path']
  s=re.sub(r'(<link\b[^>]*rel=["\']canonical["\'][^>]*href=["\'])[^"\']+',lambda m:m.group(1)+canon,s,flags=re.I)
  if not re.search(r'<link\b[^>]*rel=["\']canonical["\']',s,re.I):s=s.replace('</head>','<link rel="canonical" href="'+canon+'" />\n</head>')
  s=re.sub(r'(<meta\b[^>]*property=["\']og:url["\'][^>]*content=["\'])[^"\']+',lambda m:m.group(1)+canon,s,flags=re.I)
  if not entry['indexable'] and not re.search(r'<meta\b[^>]*name=["\']robots["\']',s,re.I):s=s.replace('</head>','<meta name="robots" content="noindex, follow" />\n</head>')
  if not entry['indexable']:s=re.sub(r'(<meta\b[^>]*name=["\']robots["\'][^>]*content=["\'])[^"\']+',lambda m:m.group(1)+'noindex, follow',s,flags=re.I)
  # The retired site's public key is invalid; Formspree protects the migrated form.
  s=re.sub(r'<div class="elementor-field" id="form-field-field_6a65e3f">.*?</div></div>','',s,flags=re.S)
  s=re.sub(r'<script\b[^>]*src=["\'][^"\']*(?:recaptcha|google\.com/recaptcha)[^"\']*["\'][^>]*>.*?</script>','',s,flags=re.I|re.S)
  s=re.sub(r'(src=["\'])https://www\.google\.com/maps/embed/v1/place\?[^"\']+',lambda m:m.group(1)+'https://maps.google.com/maps?q=6227%20Wilshire%20Boulevard%2C%20Los%20Angeles%2C%20CA%2090048&amp;z=12&amp;output=embed',s)
  s=repair_metadata(s)
  s,audit=render_shell(s,entry);content_audit.append(audit)
  s=update_page_seo(s,entry)
  s=fill_indexable_metadata(s,entry,shell)
  # Archive-only form handling runs before Elementor registers its submit listener.
  s=s.replace('</head>','<script src="/veneers/archive-runtime.js"></script>\n<script type="module" src="/veneers/measurement.js"></script>\n</head>')
  f=REPO/'public'/entry['path'].lstrip('/')/'index.html';f.parent.mkdir(parents=True,exist_ok=True);f.write_text(s)
  entry['sha256']=hashlib.sha256(s.encode()).hexdigest();entry['bytes']=len(s.encode())
 # Retain original article cards so search uses the archived WordPress presentation.
 cards={}
 for source_path in ('/blog/','/blog/page/2/'):
  blog_file=REPO/'public'/route_path(source_path).lstrip('/')/'index.html'
  for card in re.findall(r'<article\b[^>]*class=["\'][^"\']*blog-entry[^"\']*["\'][^>]*>.*?</article>',blog_file.read_text(),re.S):
   post=re.search(r'id=["\']post-(\d+)["\']',card)
   if post:cards[int(post.group(1))]=card
 search_pages=[]
 for p,entry in zip(pages,routes):
  if not entry['indexable'] or p.get('api_id') not in api:continue
  data=api[p['api_id']]
  content=re.sub(r'<(?:script|style)\b[^>]*>.*?</(?:script|style)>',' ',data['content']['rendered'],flags=re.I|re.S)
  text=html.unescape(re.sub('<[^>]+>',' ',content))
  item={'path':entry['path'],'title':entry['title'] if entry['path'] in PAGE_SEO else html.unescape(data['title']['rendered']),'text':' '.join(text.split()),'kind':entry['kind']}
  if p['api_id'] in cards:item['cardHtml']=cards[p['api_id']]
  search_pages.append(item)
 search_json=json.dumps({'pages':search_pages},ensure_ascii=False,separators=(',',':'))
 (OUT/'search-index.json').write_text(search_json)
 integration_files=[]
 for name in ('shell.css','shell.js','archive-runtime.js','measurement.js','search-index.json'):
  body=(OUT/name).read_bytes();integration_files.append({'path':'/veneers/'+name,'sha256':hashlib.sha256(body).hexdigest(),'bytes':len(body)})
 manifest_json=json.dumps({'source':BASE,'pages':routes,'assets':asset_manifest,'assetFailures':failures,'integrationFiles':integration_files,'contentAudit':content_audit,'searchIndex':{'path':'/veneers/search-index.json','sha256':hashlib.sha256(search_json.encode()).hexdigest()}},indent=2)
 (OUT/'manifest.json').write_text(manifest_json)
 (REPO/'src/constants/legacyVeneersManifest.json').write_text(json.dumps({'pages':routes},indent=2))
 print('Archive complete',flush=True)
if __name__=='__main__':main()
