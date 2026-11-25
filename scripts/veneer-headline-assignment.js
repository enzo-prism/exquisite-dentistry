// Inlined into the head of a test build so the first paint and the form use
// the same assignment, even if React loads on the following Pacific day.
(() => {
  if (!['/lp/chatgpt', '/lp/chatgpt/'].includes(location.pathname)) return;
  const { campaign, start } = document.currentScript.dataset;
  const tags = new URLSearchParams(location.search);
  if (tags.get('utm_source') !== 'chatgpt' || tags.get('utm_medium') !== 'paid'
    || tags.get('utm_campaign') !== campaign) return;

  const startMs = Date.parse(start + 'T00:00:00Z');
  if (!Number.isFinite(startMs) || new Date(startMs).toISOString().slice(0, 10) !== start) return;
  const day = new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'America/Los_Angeles', year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(new Date());
  const offset = (Date.parse(day + 'T00:00:00Z') - startMs) / 86_400_000;
  if (offset < 0 || offset >= 14) return;
  document.documentElement.dataset.headlineDay = day;
  document.documentElement.dataset.headlineArm = offset % 2 === 0 ? 'control' : 'veneers';
})();
