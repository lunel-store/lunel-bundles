(function () {
  'use strict';

  if (window.__lunelProductBadgesLoaded) return;
  window.__lunelProductBadgesLoaded = true;

  const BADGE_TARGET_LAYOUT_CLASSES =
    'absolute right-1 top-1 z-20 flex items-center p-1 px-2 gap-1 fast-animate-pulse';

  function applyBadgeLayoutClasses(el) {
    BADGE_TARGET_LAYOUT_CLASSES.split(/\s+/).forEach(function (cls) {
      if (cls) el.classList.add(cls);
    });
  }

  function removeProductBadgeTarget(container) {
    if (container) container.style.display = 'none';
    return;
  }

  function safeAppendSvg(container, svgString) {
    if (!container || !svgString || typeof svgString !== 'string') return;
    if (!/^\s*<svg[\s>]/i.test(svgString)) return;

    const tpl = document.createElement('template');
    tpl.innerHTML = svgString.trim();
    const svg = tpl.content.firstElementChild;
    if (!svg || svg.tagName.toLowerCase() !== 'svg') return;

    const forbidden = svg.querySelectorAll('script, foreignObject');
    forbidden.forEach((n) => n.remove());

    const all = svg.querySelectorAll('*');
    all.forEach((el) => {
      Array.from(el.attributes).forEach((attr) => {
        const name = attr.name.toLowerCase();
        const value = String(attr.value || '');
        if (name.startsWith('on')) el.removeAttribute(attr.name);
        if (
          (name === 'href' || name === 'xlink:href') &&
          /^\s*javascript:/i.test(value)
        ) {
          el.removeAttribute(attr.name);
        }
      });
    });

    container.appendChild(svg);
  }

  function updateProductBadge({ card, target, ribbon }) {
    if (!card || !target) return;

    // Get container
    let container = card.querySelector(`.${CSS.escape(target)}`);

    // If no ribbon data, remove badge (if exists) and exit
    if (!ribbon) return removeProductBadgeTarget(container);

    // Create if not exists
    if (!container) {
      container = document.createElement('div');
      container.className = target;
      applyBadgeLayoutClasses(container);
      const imageHost = card.querySelector('.product-entry__image');
      if (imageHost) {
        imageHost.appendChild(container);
      } else {
        card.appendChild(container);
      }
    }

    // If it was hidden previously, re-show it
    container.style.display = 'flex';

    // Normalize animation classes even for pre-existing containers
    container.classList.remove('animate-pulse');
    container.classList.add('fast-animate-pulse');

    var svg = '';

    // Update background (optional)
    container.style.background = ribbon.color || '#27b43e';

    if (typeof window.getLunelBundleBadgeIconHtml === 'function') {
      svg = window.getLunelBundleBadgeIconHtml(ribbon.type);
    } else if (window.LUNEL_BUNDLE_BADGE_ICONS && ribbon.type) {
      const fragment = window.LUNEL_BUNDLE_BADGE_ICONS[ribbon.type];
      svg = typeof fragment === 'string' ? fragment : '';
    }

    // Replace content
    container.replaceChildren();
    safeAppendSvg(container, svg);

    const textEl = document.createElement('small');
    textEl.className =
      '!text-xxs md:!text-xs !leading-[initial] text-white';
    textEl.style.fontWeight = '900';
    textEl.style.whiteSpace = 'nowrap';
    textEl.textContent = ribbon.text == null ? '' : String(ribbon.text);
    container.appendChild(textEl);
  }

  function applyRibbons({ card, ribbon1, ribbon2 }) {
    if (!card) return;

    updateProductBadge({
      card: card,
      target: 'product-bestSellers',
      ribbon: ribbon1,
    });

    updateProductBadge({
      card: card,
      target: 'product-outWithin',
      ribbon: ribbon2,
    });
  }

  // home page
  function featuredProdCards({ id, ribbon1, ribbon2 }) {
    const card = document.querySelector(
      `.featured-prod-cards salla-products-list custom-salla-product-card[data-product-id="${id}"]`,
    );

    applyRibbons({ card, ribbon1, ribbon2 });
  }

  // Product List
  function stationaryProducts({ id, ribbon1, ribbon2 }) {
    const card = document.querySelector(
      `section .stationary-products salla-products-list custom-salla-product-card[data-product-id="${id}"]`,
    );

    applyRibbons({ card, ribbon1, ribbon2 });
  }

  // Product Page
  function productPage({ id, ribbon1, ribbon2 }) {
    const card = document.querySelector(`salla-slider#details-slider-${id}`);

    applyRibbons({ card, ribbon1, ribbon2 });
  }

  function updateProductBadges({ id, ribbon1, ribbon2 }) {
    featuredProdCards({ id, ribbon1, ribbon2 });
    stationaryProducts({ id, ribbon1, ribbon2 });
    productPage({ id, ribbon1, ribbon2 });
  }

  function applyAllProductBadges() {
    var products = window.LUNEL_PRODUCTS;
    if (!products) return false;

    Object.values(products).forEach((product) => {
      if (!product || !product.productId) return;
      updateProductBadges({
        id: product.productId,
        ribbon1: product.ribbon1,
        ribbon2: product.ribbon2,
      });
    });
    return true;
  }

  // Expose a tiny public hook so other scripts can trigger a refresh
  window.__lunelApplyProductBadges = applyAllProductBadges;

  // Apply ASAP (in case data+DOM are already ready)
  applyAllProductBadges();

  // If products/cards arrive later (AJAX/slider), keep attempting and re-apply on DOM changes.
  var retryCount = 0;
  var maxRetries = 40; // ~10s max (40 * 250ms)
  var retryTimer = null;
  function scheduleRetry() {
    if (retryTimer) return;
    retryTimer = setTimeout(function () {
      retryTimer = null;
      retryCount++;
      var ok = applyAllProductBadges();
      if (!ok && retryCount < maxRetries) scheduleRetry();
    }, 250);
  }

  if (!window.LUNEL_PRODUCTS) scheduleRetry();

  var moPending = null;
  var lastMoApplyAt = 0;
  var observer = new MutationObserver(function () {
    if (moPending) clearTimeout(moPending);
    moPending = setTimeout(function () {
      moPending = null;
      const now = Date.now();
      if (now - lastMoApplyAt < 150) return;
      lastMoApplyAt = now;
      applyAllProductBadges();
    }, 80);
  });

  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      observer.observe(document.body, { childList: true, subtree: true });
      applyAllProductBadges();
    });
  }
})();
