/* The legacy presentation runs unchanged; submission uses the main site's lead endpoint. */
(() => {
  const endpoint = 'https://formspree.io/f/xkgknpkl';
  const previewHost = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
  const previewResult = new URLSearchParams(location.search).get('formPreview');
  const measurementReady = new Promise(resolve => {
    if (window.exquisiteVeneersMeasurement) return resolve(window.exquisiteVeneersMeasurement);
    window.addEventListener('exquisite:veneers-measurement-ready', () => resolve(window.exquisiteVeneersMeasurement), {once: true});
  });

  function showMessage(form, text, success) {
    form.querySelectorAll('.elementor-message').forEach(message => message.remove());
    const message = document.createElement('div');
    message.className = `elementor-message elementor-message-${success ? 'success' : 'danger'}`;
    message.setAttribute('role', 'status');
    message.setAttribute('aria-live', 'polite');
    message.textContent = text;
    form.append(message);
  }

  document.addEventListener('submit', async event => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement) || !form.matches('.elementor-form')) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    if (!form.reportValidity() || form.dataset.submitting === 'true') return;
    form.dataset.submitting = 'true';
    const button = form.querySelector('button[type="submit"]');
    if (button) button.disabled = true;
    form.setAttribute('aria-busy', 'true');
    let timeout;
    try {
      const payload = new FormData();
      const original = new FormData(form);
      // A filled spam trap is never a real inquiry, even if a provider would
      // acknowledge a suppressed request with HTTP 200.
      if (String(original.get('_gotcha') || '').trim()) return;
      for (const [key, value] of original) {
        if (key.startsWith('form_fields[')) payload.append(key.slice(12, -1), value);
      }
      const first = original.get('form_fields[first_name]');
      const last = original.get('form_fields[last_name]');
      if (first || last) payload.set('name', `${first || ''} ${last || ''}`.trim());
      const subscription = form.getAttribute('name') === 'Pop-Up-Menu-Subscribe';
      payload.set('_subject', subscription ? 'Veneers newsletter subscription request' : 'Veneers website consultation inquiry');
      payload.set('site', 'exquisite');
      payload.set('form_key', subscription ? 'veneers_subscription' : 'veneers_contact');
      payload.set('environment', previewHost ? 'development' : 'production');
      payload.set('page_path', location.pathname);
      if (document.referrer) {
        const referrer = new URL(document.referrer);
        payload.set('referrer', `${referrer.origin}${referrer.pathname}`.slice(0, 240));
      }
      payload.set('source', location.origin + location.pathname);
      payload.set('form', subscription ? 'veneers_subscription' : 'veneers_contact');
      payload.set('_gotcha', String(original.get('_gotcha') || ''));
      // A slow or blocked optional module must not prevent the actual inquiry.
      const bridge = window.exquisiteVeneersMeasurement || await Promise.race([
        measurementReady,
        new Promise(resolve => { timeout = setTimeout(() => resolve(undefined), 2500); }),
      ]);
      clearTimeout(timeout);
      if (previewHost) payload.set('_codex_test', 'true');
      let measurement;
      try { measurement = bridge?.annotate(payload, !subscription); } catch { /* Optional measurement cannot prevent an inquiry. */ }
      let accepted;
      if (previewHost) {
        // Local review never sends patient details. Both response states can be inspected.
        await new Promise(resolve => setTimeout(resolve, 250));
        accepted = previewResult !== 'error';
        form.dataset.previewSubmission = accepted ? 'success' : 'error';
      } else {
        const controller = new AbortController();
        timeout = setTimeout(() => controller.abort(), 12000);
        const response = await fetch(endpoint, {method: 'POST', body: payload, headers: {Accept: 'application/json'}, signal: controller.signal});
        accepted = response.ok;
      }
      if (!accepted) throw new Error('Submission rejected');
      if (!previewHost && measurement) {
        try { bridge.confirmed(measurement); } catch { /* Provider acceptance remains successful if optional tracking fails. */ }
      }
      const successMessage = previewHost
        ? 'Local preview successful. No data was sent.'
        : subscription ? 'Your subscription request has been sent.' : 'Your submission was successful.';
      showMessage(form, successMessage, true);
      form.reset();
    } catch {
      showMessage(form, 'Your submission failed because of an error. Please try again or call (323) 790-3637.', false);
    } finally {
      clearTimeout(timeout);
      form.dataset.submitting = 'false';
      form.removeAttribute('aria-busy');
      if (button) button.disabled = false;
    }
  }, true);

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.elementor-form').forEach(form => {
      form.setAttribute('action', endpoint);
      // No WordPress nonce or retired captcha is required by Formspree.
      form.querySelectorAll('input[type="hidden"]').forEach(input => input.remove());
      form.querySelectorAll('.elementor-g-recaptcha').forEach(captcha => captcha.closest('.elementor-field-group')?.remove());
      const honeypot = document.createElement('input');
      honeypot.name = '_gotcha';
      honeypot.type = 'text';
      honeypot.tabIndex = -1;
      honeypot.autocomplete = 'off';
      honeypot.setAttribute('aria-hidden', 'true');
      honeypot.hidden = true;
      honeypot.style.setProperty('display', 'none', 'important');
      form.append(honeypot);
    });
    // Theme search remains useful without a retired WordPress query endpoint.
    document.querySelectorAll('form[method="get"] input[name="s"]').forEach(input => {
      input.form.addEventListener('submit', event => {
        event.preventDefault();
        location.href = `/veneers/blog/?s=${encodeURIComponent(input.value)}`;
      });
    });
    const query = new URLSearchParams(location.search).get('s');
    if (query && location.pathname.replace(/\/$/, '') === '/veneers/blog') {
      fetch('/veneers/search-index.json').then(response => response.json()).then(manifest => {
        const matches = manifest.pages.filter(page => `${page.title} ${page.text || ''}`.toLowerCase().includes(query.toLowerCase()));
        const container = document.querySelector('#blog-entries');
        if (!container) return;
        container.replaceChildren();
        const heading = document.createElement('h2');
        heading.textContent = `Search results for: ${query}`;
        container.append(heading);
        if (!matches.length) {
          const text = document.createElement('p');
          text.textContent = 'No results found. Please try a different search.';
          container.append(text);
        }
        matches.forEach(page => {
          if (page.cardHtml) {
            container.insertAdjacentHTML('beforeend', page.cardHtml);
            return;
          }
          const article = document.createElement('article');
          article.className = 'blog-entry clr';
          const title = document.createElement('h2');
          const link = document.createElement('a');
          link.href = page.path;
          link.textContent = page.title.replace(' - Exquisite Veneers LA', '');
          title.append(link);
          article.append(title);
          container.append(article);
        });
      });
    }
  });
})();
