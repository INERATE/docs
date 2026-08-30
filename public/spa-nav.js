// Zero-dependency Client-Side SPA Navigation & Smooth View Transitions for Inerate Docs
(() => {
  if (typeof window === 'undefined') return;

  async function navigate(url, push = true) {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        window.location.href = url;
        return;
      }
      const html = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const updateDOM = () => {
        // 1. Update document title
        document.title = doc.title;

        // 2. Update main content
        const currentMain = document.querySelector('main');
        const newMain = doc.querySelector('main');
        if (currentMain && newMain) {
          currentMain.replaceWith(newMain);
        }

        // 3. Update right-side table of contents (if present)
        const currentToc = document.querySelector('starlight-toc');
        const newToc = doc.querySelector('starlight-toc');
        if (currentToc && newToc) {
          currentToc.replaceWith(newToc);
        }

        // 4. Update sidebar active links
        document.querySelectorAll('nav a').forEach(a => {
          const href = a.getAttribute('href');
          const isCurrent = href === url || href === new URL(url, window.location.origin).pathname;
          if (isCurrent) {
            a.setAttribute('aria-current', 'page');
          } else {
            a.removeAttribute('aria-current');
          }
        });

        // 5. Scroll to top or target hash
        const hash = new URL(url, window.location.origin).hash;
        if (hash) {
          const el = document.querySelector(hash);
          if (el) el.scrollIntoView();
        } else {
          window.scrollTo(0, 0);
        }
      };

      if (document.startViewTransition) {
        document.startViewTransition(updateDOM);
      } else {
        updateDOM();
      }

      if (push) {
        window.history.pushState({}, '', url);
      }
    } catch (err) {
      window.location.href = url;
    }
  }

  // Intercept internal link clicks
  document.addEventListener('click', e => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
    if (link.target === '_blank' || link.getAttribute('rel')?.includes('external')) return;

    const url = new URL(href, window.location.origin);
    if (url.origin !== window.location.origin) return;

    e.preventDefault();
    navigate(url.href, true);
  });

  // Handle browser back/forward buttons
  window.addEventListener('popstate', () => {
    navigate(window.location.href, false);
  });
})();
