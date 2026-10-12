"""Replace only the legacy navigation and footer, preserving source body bytes.

HTMLParser supplies element boundaries. Edits use original source offsets so all
retained Elementor content, image attributes and inline settings remain exact.
"""
import html
import re
from datetime import date
from html.parser import HTMLParser
from urllib.parse import unquote

VOID_TAGS = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'}
LOGOS = '/veneers/assets/exquisiteveneersla.com/wp-content/uploads/2023/10/'
LINKS = [('Home', '/veneers/'), ('Process', '/veneers/process/'), ('Results', '/veneers/results/'), ('About', '/veneers/about/'), ('Resources', '/veneers/resources/'), ('Contact', '/veneers/contact/')]


class Element:
    def __init__(self, tag, attrs, start, start_end, parent):
        self.tag, self.attrs, self.start, self.start_end, self.parent = tag, dict(attrs), start, start_end, parent
        self.end = start_end

    @property
    def classes(self):
        return set(self.attrs.get('class', '').split())

    def closest(self, predicate):
        element = self
        while element:
            if predicate(element):
                return element
            element = element.parent
        return None


class Boundaries(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=False)
        self.source, self.elements, self.stack = source, [], []
        self.lines = [0]
        self.lines.extend(i + 1 for i, character in enumerate(source) if character == '\n')
        self.feed(source)
        self.close()

    def source_offset(self):
        line, column = self.getpos()
        return self.lines[line - 1] + column

    def handle_starttag(self, tag, attrs):
        start = self.source_offset()
        node = Element(tag, attrs, start, start + len(self.get_starttag_text()), self.stack[-1] if self.stack else None)
        self.elements.append(node)
        if tag not in VOID_TAGS:
            self.stack.append(node)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if self.stack and self.stack[-1].tag == tag:
            self.stack.pop()

    def handle_endtag(self, tag):
        end = self.source.find('>', self.source_offset()) + 1
        for index in range(len(self.stack) - 1, -1, -1):
            if self.stack[index].tag == tag:
                self.stack[index].end = end
                self.stack = self.stack[:index]
                break


def text_of(source, node):
    return ' '.join(html.unescape(re.sub('<[^>]+>', '', source[node.start_end:node.end].rsplit('</', 1)[0])).split())


def remove_legacy_shell(source):
    tree = Boundaries(source)
    removed = set()
    for node in tree.elements:
        if 'nav-links-con' in node.classes:
            parent = node.closest(lambda item: 'e-parent' in item.classes)
            # A hero may contain a phone row, but its photograph and brand art stay.
            removed.add(parent if parent and not parent.classes.intersection({'pos-header', 'neg-header'}) else node)
        if node.tag == 'a' and 'popup:open' in unquote(node.attrs.get('href', '')):
            row = node.closest(lambda item: 'phone-row' in item.classes)
            parent = node.closest(lambda item: 'e-parent' in item.classes)
            if parent and not parent.classes.intersection({'pos-header', 'neg-header'}):
                removed.add(parent)
            elif row:
                removed.add(row)
            else:
                removed.add(node)
        if node.attrs.get('id') in {'site-header', 'top-bar-wrap'}:
            removed.add(node)
        if node.tag == 'a' and 'skip-link' in node.classes:
            removed.add(node)
        if node.attrs.get('data-elementor-type') == 'footer' and node.attrs.get('data-elementor-id') == '322':
            removed.add(node)
    ranges = sorted((node.start, node.end) for node in removed)
    merged = []
    for start, end in ranges:
        if end <= start:
            raise ValueError('Legacy shell element has no closing boundary')
        if merged and start <= merged[-1][1]:
            merged[-1] = (merged[-1][0], max(end, merged[-1][1]))
        else:
            merged.append((start, end))
    for start, end in reversed(merged):
        source = source[:start] + source[end:]
    # Popup84 is no longer needed after every open trigger has been removed.
    tree = Boundaries(source)
    if any('popup:open' in unquote(node.attrs.get('href', '')) for node in tree.elements):
        raise ValueError('Unmigrated legacy popup trigger')
    for node in reversed(tree.elements):
        if node.attrs.get('data-elementor-type') == 'popup' and node.attrs.get('data-elementor-id') == '84':
            source = source[:node.start] + source[node.end:]
    return source


def nav_links(current, path=None, footer=False):
    links = []
    for label, href in LINKS:
        active = href == current
        attr = f' aria-current="{"page" if href == path else "location"}"' if active and not footer else ''
        links.append(f'<a href="{href}"{attr}>{label}</a>')
    return '\n'.join(links)


def current_section(path, kind):
    if kind in {'post', 'archive'} or path.startswith('/veneers/blog/'):
        return '/veneers/resources/'
    return path


def render_shell(source, route):
    source = remove_legacy_shell(source)
    # Native fragment navigation clears the sticky header on every document.
    edits = []
    for node in Boundaries(source).elements:
        if node.tag != 'html' and node.attrs.get('id') != 'main':
            continue
        opening = source[node.start:node.start_end]
        if node.tag == 'html':
            classes = node.attrs.get('class', '').split()
            classes.append('veneers-shell-document')
            if 'class' in node.attrs:
                opening = re.sub(r'\bclass\s*=\s*(["\']).*?\1', 'class="' + ' '.join(classes) + '"', opening, count=1)
            else:
                opening = opening[:-1] + ' class="veneers-shell-document">'
        elif 'tabindex' not in node.attrs:
            opening = opening[:-1] + ' tabindex="-1">'
        edits.append((node.start, node.start_end, opening))
    for start, end, opening in reversed(edits):
        source = source[:start] + opening + source[end:]
    # Audit the retained content before adding headings or images in the new shell.
    retained = Boundaries(source)
    headings = [text_of(source, node) for node in retained.elements if node.tag in {'h1', 'h2', 'h3', 'h4', 'h5', 'h6'}]
    hero_ids = [node.attrs.get('data-id') for node in retained.elements if node.classes.intersection({'pos-header', 'neg-header'})]
    current = current_section(route['path'], route['kind'])
    nav = nav_links(current, route['path'])
    header = f'''
<a class="skip-link screen-reader-text veneers-shell-skip" href="#main">Skip to content</a>
<header id="veneers-shell-header" class="veneers-shell-header" data-veneers-shell="header">
  <div class="veneers-shell-header-inner">
    <div class="veneers-shell-brand">
      <a class="veneers-shell-logo" href="/veneers/" aria-label="Exquisite Veneers home"><img src="{LOGOS}positive-positive.svg" alt="Exquisite Veneers" width="660" height="134" /></a>
      <a class="veneers-shell-context" href="/">by Exquisite Dentistry</a>
    </div>
    <nav class="veneers-shell-desktop-nav" aria-label="Veneers navigation">{nav}</nav>
    <div class="veneers-shell-header-actions"><a class="veneers-shell-practice" href="/">Main website</a><a class="veneers-shell-cta" href="/veneers/contact/">Request consultation</a></div>
    <details id="veneers-shell-menu" class="veneers-shell-menu">
      <summary id="veneers-shell-menu-toggle" aria-controls="veneers-shell-menu-panel"><span class="veneers-shell-menu-icon" aria-hidden="true"></span><span>Menu</span></summary>
      <div id="veneers-shell-menu-panel" class="veneers-shell-menu-panel">
        <nav aria-label="Mobile veneers navigation">{nav}</nav>
        <a class="veneers-shell-cta" href="/veneers/contact/">Request consultation</a>
        <a class="veneers-shell-mobile-practice" href="/">Visit Exquisite Dentistry <span aria-hidden="true">↗</span></a>
      </div>
    </details>
  </div>
</header>
'''
    footer = f'''
<footer id="veneers-shell-footer" class="veneers-shell-footer" data-veneers-shell="footer">
  <div class="veneers-shell-footer-inner">
    <div class="veneers-shell-footer-invitation"><h2>Your exquisite smile starts here.</h2><a class="veneers-shell-cta" href="/veneers/contact/">Request consultation <span aria-hidden="true">↗</span></a></div>
    <div class="veneers-shell-footer-grid">
      <div class="veneers-shell-footer-brand"><a class="veneers-shell-footer-logo" href="/veneers/"><img src="{LOGOS}negative-negative-white.svg" alt="Exquisite Veneers" width="660" height="134" loading="lazy" /></a><p>Custom porcelain veneers.<br />The artistry of Exquisite Dentistry.</p><a class="veneers-shell-footer-return" href="/">Visit the main website <span aria-hidden="true">↗</span></a></div>
      <nav class="veneers-shell-footer-links" aria-label="Footer veneers navigation"><h3>Explore veneers</h3>{nav_links(current, footer=True)}</nav>
      <nav class="veneers-shell-footer-links" aria-label="Practice navigation"><h3>Our practice</h3><a href="/services/">All dental services</a><a href="/payment-plans/">Payment plans</a><a href="/schedule-consultation/">Schedule with the practice</a></nav>
      <div class="veneers-shell-footer-contact"><h3>Find us</h3><address>6227 Wilshire Blvd<br />Los Angeles, CA 90048</address><a href="tel:+13232722388">(323) 272-2388</a><a href="mailto:info@exquisitedentistryla.com">info@exquisitedentistryla.com</a></div>
    </div>
    <div class="veneers-shell-footer-bottom"><p>© {date.today().year} Exquisite Dentistry. All rights reserved.</p><nav aria-label="Legal navigation"><a href="/privacy-policy/">Privacy</a><a href="/terms-of-service/">Terms</a><a href="/hipaa-compliance/">HIPAA</a></nav></div>
  </div>
</footer>
'''
    tree = Boundaries(source)
    bodies = [node for node in tree.elements if node.tag == 'body']
    heads = [node for node in tree.elements if node.tag == 'head']
    if len(bodies) != 1 or len(heads) != 1:
        raise ValueError('Expected one document head/body')
    body, head = bodies[0], heads[0]
    body_end = source.rfind('</body', body.start_end, body.end)
    head_end = source.rfind('</head', head.start_end, head.end)
    if body_end < 0 or head_end < 0:
        raise ValueError('Expected explicit head/body closing tags')
    for offset, content in sorted([(body.start_end, header), (body_end, footer), (head_end, '<link rel="stylesheet" href="/veneers/shell.css" />\n<script src="/veneers/shell.js" defer></script>\n')], reverse=True):
        source = source[:offset] + content + source[offset:]
    return source, {'path': route['path'], 'headings': headings, 'heroIds': hero_ids}
