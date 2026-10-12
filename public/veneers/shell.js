/* Native disclosure navigation: links also work when JavaScript is unavailable. */
(() => {
  const menu = document.getElementById('veneers-shell-menu');
  if (!menu) return;
  const toggle = document.getElementById('veneers-shell-menu-toggle');
  const desktop = window.matchMedia('(min-width: 1100px)');
  document.querySelector('.veneers-shell-skip').addEventListener('click', () => {
    requestAnimationFrame(() => document.getElementById('main').focus({ preventScroll: true }));
  });
  let lastFocused = document.activeElement;
  document.addEventListener('focusin', event => { lastFocused = event.target; });
  document.addEventListener('pointerdown', event => {
    if (!document.getElementById('veneers-shell-header').contains(event.target)) lastFocused = null;
  });

  function close(restoreFocus = false) {
    menu.open = false;
    toggle.setAttribute('aria-expanded', 'false');
    if (restoreFocus && !desktop.matches) toggle.focus();
  }

  toggle.setAttribute('aria-expanded', String(menu.open));
  menu.addEventListener('toggle', () => toggle.setAttribute('aria-expanded', String(menu.open)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.open) {
      event.preventDefault();
      close(true);
    }
  });
  document.addEventListener('click', event => {
    if (menu.open && !menu.contains(event.target)) close();
  });
  menu.addEventListener('click', event => {
    if (event.target.closest('a')) close();
  });
  desktop.addEventListener('change', () => {
    // Browsers may blur a newly hidden control before the media change event.
    const focused = document.activeElement === document.body && lastFocused ? lastFocused : document.activeElement;
    const insideMenu = menu.contains(focused);
    const href = focused instanceof HTMLAnchorElement ? focused.getAttribute('href') : null;
    close();
    if (desktop.matches && insideMenu) {
      const visibleLink = [...document.querySelectorAll('.veneers-shell-desktop-nav a')]
        .find(link => link.getAttribute('href') === href);
      (visibleLink || document.querySelector('.veneers-shell-logo')).focus();
    } else if (!desktop.matches && focused.closest('.veneers-shell-desktop-nav, .veneers-shell-header-actions')) {
      toggle.focus();
    }
  });
})();
