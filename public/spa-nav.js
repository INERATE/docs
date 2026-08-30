// Ultra-Fast Zero-Refresh SPA Router with Instant Skeleton Shimmer Loading for Inerate Docs
(() => {
  if (typeof window === 'undefined') return;

  const cache = new Map();

  const SKELETON_HTML = `
    <div class="doc-skeleton-container" aria-hidden="true">
      <div class="doc-skeleton doc-skeleton-title"></div>
      <div class="doc-skeleton doc-skeleton-badge"></div>
      <div class="doc-skeleton-paragraphs">
        <div class="doc-skeleton doc-skeleton-line" style="width: 95%;"></div>
        <div class="doc-skeleton doc-skeleton-line" style="width: 88%;"></div>
        <div class="doc-skeleton doc-skeleton-line" style="width: 72%;"></div>
      </div>
      <div class="doc-skeleton doc-skeleton-codeblock"></div>
      <div class="doc-skeleton-paragraphs">
        <div class="doc-skeleton doc-skeleton-line" style="width: 92%;"></div>
        <div class="doc-skeleton doc-skeleton-line" style="width: 80%;"></div>
        <div class="doc-skeleton doc-skeleton-line" style="width: 60%;"></div>
      </div>
    </div>
  `;

  // Preload & cache on hover / idle
  async function preload(url) {
    if (cache.has(url)) return cache.get(url);
    try {
      const res = await fetch(url);
      if (res.ok) {
        const text = await res.text();
        cache.set(url, text);
        return text;
      }
    } catch (_) {}
    return null;
  }

  async function navigate(url, push = true) {
    const currentMain = document.querySelector('main');
    
    // 1. Immediately update active sidebar link
    document.querySelectorAll('nav a').forEach(a => {
      const href = a.getAttribute('href');
      const isCurrent = href === url || href === new URL(url, window.location.origin).pathname;
      if (isCurrent) {
        a.setAttribute('aria-current', 'page');
      } else {
        a.removeAttribute('aria-current');
      }
    });

    // 2. If not already in cache, instantly mount skeleton loading shimmer
    let htmlPromise = cache.get(url);
    let showedSkeleton = false;

    if (!htmlPromise) {
      if (currentMain) {
        currentMain.innerHTML = SKELETON_HTML;
        showedSkeleton = true;
      }
      htmlPromise = fetch(url).then(res => {
        if (!res.ok) throw new Error('Fetch failed');
        return res.text();
      });
    } else if (typeof htmlPromise === 'string') {
      htmlPromise = Promise.resolve(htmlPromise);
    }

    try {
      const html = await htmlPromise;
      cache.set(url, html);

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const updateDOM = () => {
        // Update Title
        document.title = doc.title;

        // Update Main Content
        const newMain = doc.querySelector('main');
        const activeMain = document.querySelector('main');
        if (activeMain && newMain) {
          activeMain.replaceWith(newMain);
        }

        // Update Right TOC
        const currentToc = document.querySelector('starlight-toc');
        const newToc = doc.querySelector('starlight-toc');
        if (currentToc && newToc) {
          currentToc.replaceWith(newToc);
        }

        // Scroll
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

  // Intercept Clicks
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

  // Preload on mouseover / touchstart for instant sub-millisecond response
  document.addEventListener('mouseover', e => {
    const link = e.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href');
    if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !link.target) {
      const url = new URL(href, window.location.origin);
      if (url.origin === window.location.origin) {
        preload(url.href);
      }
    }
  });

  // Browser Navigation History
  window.addEventListener('popstate', () => {
    navigate(window.location.href, false);
  });
})();
