import { expect, test } from '@playwright/test';
const SDK_URL='https://bzrcdn.openai.com/sdk/oaiq.min.js';
const CLICK='native_12345678901234567890_original';
const KEY='exquisite_openai_click_v1';
let sdk:string;
test.beforeAll(async ({request}) => { const response=await request.get(SDK_URL); expect(response.ok()).toBe(true); sdk=await response.text(); });
test('a separate tab sends the original consented click with an accepted lead and its form metadata',async ({context,page}) => {
  const payloads:Array<{oppref?:string;user?:unknown;events?:Array<{type:string;id:string}>}>=[];
  let body='';
  await context.addInitScript(() => { if(window!==window.top)return; window.__EXQUISITE_ANALYTICS_TEST_HOST__='exquisitedentistryla.com'; localStorage.setItem('exquisite_analytics_consent_v2','denied'); });
  await context.route('**/*',async route => {
    const url=new URL(route.request().url());
    if(url.href===SDK_URL)return route.fulfill({contentType:'application/javascript',body:sdk});
    if(url.hostname==='bzrcdn.openai.com')return route.fulfill({contentType:'application/json',headers:{'Access-Control-Allow-Origin':'*'},body:'{"automatic_advanced_matching_enabled":true}'});
    if(url.hostname==='bzr.openai.com'){if(route.request().postData())payloads.push(JSON.parse(route.request().postData()!));return route.fulfill({status:200,body:''});}
    if(url.hostname==='formspree.io'){body=route.request().postData()??'';return route.fulfill({contentType:'application/json',body:'{"ok":true}'});}
    if(url.hostname==='127.0.0.1')return route.continue();
    return route.abort();
  });
  await page.goto(`/lp/chatgpt/?utm_source=chatgpt&oppref=${CLICK}`);
  await page.getByRole('button',{name:'Allow measurement'}).click();
  await expect(page.locator('#openai-ads-measurement-frame')).toHaveAttribute('src',new RegExp(CLICK));
  const capturedAt=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)!).capturedAt,KEY);
  const second=await context.newPage();await second.goto('/lp/chatgpt/');
  expect(await second.evaluate(()=>sessionStorage.getItem('exquisite_session_attribution_v2'))).toBeNull();
  await expect(second.locator('#openai-ads-measurement-frame')).toHaveAttribute('src',new RegExp(CLICK));
  await second.getByLabel('Name',{exact:true}).fill('Measurement validation');
  await second.getByLabel('Email',{exact:true}).fill('sentinel@prism.invalid');
  await second.getByLabel('Phone',{exact:true}).fill('3235550119');
  await second.getByLabel('Consultation interest').click();await second.getByRole('option',{name:'Porcelain veneers'}).click();
  await second.getByRole('button',{name:'Request my consultation'}).click();
  await expect(second.getByRole('status')).toContainText('Our team will contact you soon');
  await expect.poll(()=>payloads.flatMap(p=>p.events??[]).filter(e=>e.type==='lead_created').length).toBe(1);
  const lead=payloads.find(p=>p.events?.some(e=>e.type==='lead_created'))!;
  expect(lead.oppref).toBe(CLICK);expect(lead.user).toBeUndefined();
  expect(body).toContain(CLICK);expect(body).toContain(lead.events!.find(e=>e.type==='lead_created')!.id);
  expect(JSON.stringify(payloads)).not.toContain('sentinel');expect(JSON.stringify(payloads)).not.toContain('3235550119');
  expect(await second.evaluate(key=>JSON.parse(localStorage.getItem(key)!).capturedAt,KEY)).toBe(capturedAt);
  // Crossing the lifetime in the same open document must remove the SDK reference.
  await page.clock.setFixedTime(capturedAt + 30*24*60*60*1000 + 1);
  await page.getByLabel('Name',{exact:true}).fill('Second validation');
  await page.getByLabel('Email',{exact:true}).fill('sentinel@prism.invalid');
  await page.getByLabel('Phone',{exact:true}).fill('3235550119');
  await page.getByLabel('Consultation interest').click();await page.getByRole('option',{name:'Porcelain veneers'}).click();
  await page.getByRole('button',{name:'Request my consultation'}).click();
  await expect.poll(()=>payloads.flatMap(p=>p.events??[]).filter(e=>e.type==='lead_created').length).toBe(2);
  const finalPayload=payloads.filter(p=>p.events?.some(e=>e.type==='lead_created')).at(-1)!;
  expect(finalPayload.oppref).toBeUndefined(); expect(body).not.toContain(CLICK);
  // Withdrawal propagates to the first tab and removes URL/session copies.
  await second.getByRole('button',{name:'Privacy choices'}).click();await second.getByRole('button',{name:'Decline'}).click();
  await expect(page.locator('#openai-ads-measurement-frame')).toHaveCount(0);
  expect(await page.evaluate(key=>localStorage.getItem(key),KEY)).toBeNull();
  expect(new URL(page.url()).searchParams.has('oppref')).toBe(false);
  await second.getByRole('button',{name:'Privacy choices'}).click();await second.getByRole('button',{name:'Allow measurement'}).click();
  await expect(second.locator('#openai-ads-measurement-frame')).toHaveAttribute('src',/pixel_id=/);
  expect(await second.locator('#openai-ads-measurement-frame').getAttribute('src')).not.toContain('oppref');
});

test('queued accepted snapshots survive a new click and expiry before the real SDK loads',async ({page}) => {
  const payloads:Array<{oppref?:string;events?:Array<{type:string;id:string}>}>=[];
  let release!:()=>void;const gate=new Promise<void>(resolve=>{release=resolve;});
  await page.addInitScript(()=>{if(window!==window.top)return;window.__EXQUISITE_ANALYTICS_TEST_HOST__='exquisitedentistryla.com';localStorage.setItem('exquisite_analytics_consent_v2','denied');localStorage.setItem('exquisite_chatgpt_ads_measurement_consent_v2','granted');});
  await page.route('**/*',async route=>{
    const url=new URL(route.request().url());
    if(url.href===SDK_URL){await gate;return route.fulfill({contentType:'application/javascript',body:sdk});}
    if(url.hostname==='bzrcdn.openai.com')return route.fulfill({contentType:'application/json',headers:{'Access-Control-Allow-Origin':'*'},body:'{"automatic_advanced_matching_enabled":true}'});
    if(url.hostname==='bzr.openai.com'){if(route.request().postData())payloads.push(JSON.parse(route.request().postData()!));return route.fulfill({status:200,body:''});}
    if(url.hostname==='127.0.0.1')return route.continue();return route.abort();
  });
  const first='2adf0fb4-35eb-4714-923c-2622329ba7d6',next='2adf0fb4-35eb-4714-923c-2622329ba7d7',expired='2adf0fb4-35eb-4714-923c-2622329ba7d8';
  await page.goto(`/lp/chatgpt/?oppref=${CLICK}`,{waitUntil:'domcontentloaded'});
  await expect(page.locator('#openai-ads-measurement-frame')).toHaveAttribute('src',new RegExp(CLICK));
  await page.evaluate(({id,ref})=>window.dispatchEvent(new CustomEvent('exquisite:chatgpt-ads-lead-confirmed',{detail:{eventId:id,openaiClickReference:ref,consentUpdatedAt:null}})),{id:first,ref:CLICK});
  const capturedAt=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)!).capturedAt,KEY);
  await page.clock.setFixedTime(capturedAt+1000);
  await page.evaluate(({id})=>{history.replaceState(history.state,'','?oppref=second_native');window.dispatchEvent(new CustomEvent('exquisite:chatgpt-ads-lead-confirmed',{detail:{eventId:id,openaiClickReference:'second_native',consentUpdatedAt:null}}));},{id:next});
  await page.evaluate(async()=>{const module=await import(String('/src/utils/openaiClickReference.ts'));module.getOpenAIClickReference('granted');});
  await page.clock.setFixedTime(capturedAt+1000+30*24*60*60*1000+1);
  await page.evaluate(async({id})=>{history.replaceState(history.state,'','/lp/chatgpt/');const module=await import(String('/src/utils/openaiClickReference.ts'));const reference=module.getOpenAIClickReference('granted');window.dispatchEvent(new CustomEvent('exquisite:chatgpt-ads-lead-confirmed',{detail:{eventId:id,openaiClickReference:reference,consentUpdatedAt:null}}));},{id:expired});
  release();
  await expect.poll(()=>payloads.flatMap(p=>p.events??[]).filter(e=>e.type==='lead_created').length).toBe(3);
  const referenceFor=(id:string)=>payloads.find(p=>p.events?.some(e=>e.id===id))?.oppref;
  expect(referenceFor(first)).toBe(CLICK);expect(referenceFor(next)).toBe('second_native');expect(referenceFor(expired)).toBeUndefined();
});

test('a legacy null consent snapshot cannot be replayed after withdrawal and regrant',async ({page})=>{
  const payloads:Array<{events?:Array<{type:string;id:string}>}>=[];
  await page.addInitScript(()=>{if(window!==window.top)return;window.__EXQUISITE_ANALYTICS_TEST_HOST__='exquisitedentistryla.com';localStorage.setItem('exquisite_analytics_consent_v2','denied');localStorage.setItem('exquisite_chatgpt_ads_measurement_consent_v2','granted');});
  await page.route('**/*',async route=>{
    const url=new URL(route.request().url());
    if(url.href===SDK_URL)return route.fulfill({contentType:'application/javascript',body:sdk});
    if(url.hostname==='bzrcdn.openai.com')return route.fulfill({contentType:'application/json',headers:{'Access-Control-Allow-Origin':'*'},body:'{"automatic_advanced_matching_enabled":true}'});
    if(url.hostname==='bzr.openai.com'){if(route.request().postData())payloads.push(JSON.parse(route.request().postData()!));return route.fulfill({status:200,body:''});}
    if(url.hostname==='127.0.0.1')return route.continue();return route.abort();
  });
  await page.goto(`/lp/chatgpt/?oppref=${CLICK}`,{waitUntil:'domcontentloaded'});
  await page.evaluate(async()=>{const module=await import(String('/src/utils/chatgptAdsTracking.ts'));module.updateChatGptAdsMeasurementConsent('denied');module.updateChatGptAdsMeasurementConsent('granted');
    module.signalChatGptAdsLeadConfirmed('2adf0fb4-35eb-4714-923c-2622329ba7d6','revoked',null);
    module.signalChatGptAdsLeadConfirmed('2adf0fb4-35eb-4714-923c-2622329ba7d7',undefined,module.getChatGptAdsConsentSnapshot().updatedAt);
  });
  await expect.poll(()=>payloads.flatMap(p=>p.events??[]).filter(e=>e.type==='lead_created').length).toBe(1);
  expect(payloads.flatMap(p=>p.events??[]).find(e=>e.type==='lead_created')!.id).toBe('2adf0fb4-35eb-4714-923c-2622329ba7d7');
});

test('a delayed cross-tab withdrawal cancels an old SDK queue after storage already regranted', async ({page}) => {
  const payloads:Array<{events?:Array<{type:string;id:string}>}>=[];
  let release!:()=>void; const gate=new Promise<void>(resolve=>{release=resolve;});
  await page.addInitScript(()=>{if(window!==window.top)return;window.__EXQUISITE_ANALYTICS_TEST_HOST__='exquisitedentistryla.com';localStorage.setItem('exquisite_analytics_consent_v2','denied');localStorage.setItem('exquisite_chatgpt_ads_measurement_consent_v2','granted');});
  await page.route('**/*',async route=>{
    const url=new URL(route.request().url());
    if(url.href===SDK_URL){await gate;return route.fulfill({contentType:'application/javascript',body:sdk});}
    if(url.hostname==='bzrcdn.openai.com')return route.fulfill({contentType:'application/json',headers:{'Access-Control-Allow-Origin':'*'},body:'{"automatic_advanced_matching_enabled":true}'});
    if(url.hostname==='bzr.openai.com'){if(route.request().postData())payloads.push(JSON.parse(route.request().postData()!));return route.fulfill({status:200,body:''});}
    if(url.hostname==='127.0.0.1')return route.continue();return route.abort();
  });
  const oldId='2adf0fb4-35eb-4714-923c-2622329ba7d6',newId='2adf0fb4-35eb-4714-923c-2622329ba7d7';
  await page.goto(`/lp/chatgpt/?oppref=${CLICK}`,{waitUntil:'domcontentloaded'});
  await expect(page.locator('#openai-ads-measurement-frame')).toHaveCount(1);
  await page.evaluate(({oldId,newId,ref})=>{
    window.dispatchEvent(new CustomEvent('exquisite:chatgpt-ads-lead-confirmed',{detail:{eventId:oldId,openaiClickReference:ref,consentUpdatedAt:null}}));
    // Both remote writes have completed before the first storage event is delivered.
    const epoch=new Date().toISOString();
    localStorage.setItem('exquisite_chatgpt_ads_measurement_consent_record_v2',JSON.stringify({choice:'granted',updatedAt:epoch}));
    localStorage.removeItem('exquisite_openai_click_v1');
    window.dispatchEvent(new StorageEvent('storage',{key:'exquisite_chatgpt_ads_measurement_consent_v2',oldValue:'granted',newValue:'denied',storageArea:localStorage}));
    window.dispatchEvent(new StorageEvent('storage',{key:'exquisite_openai_click_v1',oldValue:'{}',newValue:null,storageArea:localStorage}));
    window.dispatchEvent(new StorageEvent('storage',{key:'exquisite_chatgpt_ads_measurement_consent_v2',oldValue:'denied',newValue:'granted',storageArea:localStorage}));
    window.dispatchEvent(new CustomEvent('exquisite:chatgpt-ads-lead-confirmed',{detail:{eventId:newId,consentUpdatedAt:epoch}}));
  },{oldId,newId,ref:CLICK});
  release();
  await expect.poll(()=>payloads.flatMap(p=>p.events??[]).filter(e=>e.type==='lead_created').length).toBe(1);
  expect(payloads.flatMap(p=>p.events??[]).find(e=>e.type==='lead_created')!.id).toBe(newId);
});

test('a retired frame error and queued retry cannot recreate old click identity after regrant', async ({page}) => {
  await page.addInitScript(()=>{
    if(window!==window.top)return;
    window.__EXQUISITE_ANALYTICS_TEST_HOST__='exquisitedentistryla.com';
    localStorage.setItem('exquisite_analytics_consent_v2','denied');
    localStorage.setItem('exquisite_chatgpt_ads_measurement_consent_v2','granted');
  });
  await page.route('**/*',async route=>{
    const url=new URL(route.request().url());
    if(url.href===SDK_URL)return route.fulfill({contentType:'application/javascript',body:sdk});
    if(url.hostname==='bzrcdn.openai.com')return route.fulfill({contentType:'application/json',headers:{'Access-Control-Allow-Origin':'*'},body:'{"automatic_advanced_matching_enabled":true}'});
    if(url.hostname==='bzr.openai.com')return route.fulfill({status:200,body:''});
    if(url.hostname==='127.0.0.1')return route.continue();return route.abort();
  });
  await page.goto(`/lp/chatgpt/?oppref=${CLICK}`);
  await expect(page.locator('#openai-ads-measurement-frame')).toHaveCount(1);
  await page.evaluate(async()=>{
    const frame=document.querySelector<HTMLIFrameElement>('#openai-ads-measurement-frame')!;
    const retiredError=frame.onerror!;
    const realTimeout=window.setTimeout;
    let queuedRetry:(()=>void)|undefined;
    window.setTimeout=((handler:TimerHandler,delay?:number,...args:unknown[])=>{
      if(delay===1000 && typeof handler==='function'){
        queuedRetry=handler as ()=>void;
        return realTimeout(()=>{},60000);
      }
      return realTimeout(handler,delay,...args);
    }) as typeof window.setTimeout;
    frame.dispatchEvent(new Event('error')); // Retires the frame and schedules a retry.
    window.setTimeout=realTimeout;
    if(!queuedRetry)throw new Error('Expected a pending retry');
    const module=await import(String('/src/utils/chatgptAdsTracking.ts'));
    module.updateChatGptAdsMeasurementConsent('denied');
    module.updateChatGptAdsMeasurementConsent('granted');
    // Simulate a callback already queued before cancellation, plus a late frame error.
    queuedRetry();
    retiredError.call(frame,new Event('error'));
  });
  await page.waitForTimeout(1200);
  const frames=page.locator('iframe[src*="/measurement/openai.html"]');
  await expect(frames).toHaveCount(1);
  expect(await frames.first().getAttribute('src')).not.toContain('oppref');
});
