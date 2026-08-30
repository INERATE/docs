// Production-grade Instant SPA Router with Memory Pre-caching & Top Loading Bar for Inerate Docs
(() => {
  if (typeof window === 'undefined') return;

  const htmlCache = new Map();
  let loadingBar = null;

  function getLoadingBar() {
    if (!loadingBar) {
      loadingBar = document.createElement('div');
      loadingBar.className = 'spa-loading-bar';
      document.body.appendChild(loadingBar);
    }
    return loadingBar;
  }

  function startLoading() {
    const bar = getLoadingBar();
    bar.style.opacity = '1';
    bar.style.width = '30%';
    setTimeout(() => {
      if (bar.style.opacity === '1') bar.style.width = '75%';
    }, 150);
  }

  function stopLoading() {
    const bar = getLoadingBar();
    bar.style.width = '100%';
    setTimeout(() => {
      bar.style.opacity = '0';
      setTimeout(() => {
        bar.style.width = '0%';
      }, 200);
    }, 100);
  }

  // Preload a URL into memory
  async function preload(url) {
    const cleanUrl = new URL(url, window.location.origin).pathname;
    if (htmlCache.has(cleanUrl)) return;
    try {
      const res = await fetch(cleanUrl, { credentials: 'same-origin' });
      if (res.ok) {
        const text = await res.text();
        htmlCache.set(cleanUrl, text);
      }
    } catch (_) {}
  }

  // Preload all sidebar links immediately on page load
  function preloadAllLinks() {
    document.querySelectorAll('nav a, a[href^="/"]').forEach(a => {
      const href = a.getAttribute('href');
      if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !a.target) {
        preload(href);
      }
    });
  }

  if (document.readyState === 'complete') {
    preloadAllLinks();
  } else {
    window.addEventListener('load', preloadAllLinks);
  }

  async function navigate(targetUrl, push = true) {
    const parsed = new URL(targetUrl, window.location.origin);
    const cleanPath = parsed.pathname;

    // 1. Immediately highlight sidebar link for instant feedback
    document.querySelectorAll('nav a').forEach(a => {
      const href = a.getAttribute('href');
      if (!href) return;
      const aPath = new URL(href, window.location.origin).pathname;
      if (aPath === cleanPath || (cleanPath.endsWith('/') && aPath === cleanPath.slice(0, -1))) {
        a.setAttribute('aria-current', 'page');
      } else {
        a.removeAttribute('aria-current');
      }
    });

    startLoading();

    let html = htmlCache.get(cleanPath);
    if (!html) {
      try {
        const res = await fetch(cleanPath);
        if (!res.ok) {
          window.location.href = targetUrl;
          return;
        }
        html = await res.text();
        htmlCache.set(cleanPath, html);
      } catch (e) {
        window.location.href = targetUrl;
        return;
      }
    }

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const applyChanges = () => {
        // 1. Update Title
        document.title = doc.title;

        // 2. Update Main Content
        const currentMain = document.querySelector('main');
        const newMain = doc.querySelector('main');
        if (currentMain && newMain) {
          currentMain.innerHTML = newMain.innerHTML;
        }

        // 3. Update Table of Contents
        const currentToc = document.querySelector('starlight-toc');
        const newToc = doc.querySelector('starlight-toc');
        if (currentToc && newToc) {
          currentToc.innerHTML = newToc.innerHTML;
        }

        // 4. Update Prev / Next Pagination links
        const currentPagination = document.querySelector('.pagination-links');
        const newPagination = doc.querySelector('.pagination-links');
        if (currentPagination && newPagination) {
          currentPagination.innerHTML = newPagination.innerHTML;
        }

        // 5. Scroll
        if (parsed.hash) {
          const el = document.querySelector(parsed.hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      };

      if (document.startViewTransition) {
        document.startViewTransition(applyChanges);
      } else {
        applyChanges();
      }

      if (push) {
        window.history.pushState({}, '', targetUrl);
      }
      stopLoading();

      // Re-trigger preloading for any newly revealed links
      setTimeout(preloadAllLinks, 50);
    } catch (err) {
      stopLoading();
      window.location.href = targetUrl;
    }
  }

  // Intercept all internal doc clicks
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

  // Preload on mouseover for zero-latency clicks
  document.addEventListener('mouseover', e => {
    const link = e.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href');
    if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !link.target) {
      preload(href);
    }
  });

  // Popstate for browser back/forward
  window.addEventListener('popstate', () => {
    navigate(window.location.href, false);
  });
})();
