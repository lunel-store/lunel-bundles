(function () {
  'use strict';

  if (window.__lunelProductBadgesLoaded) return;
  window.__lunelProductBadgesLoaded = true;

  const BADGE_TARGET_LAYOUT_CLASSES =
    'lunel-product-badge absolute right-1 z-20 flex items-center p-1 px-2 gap-1 fast-animate-pulse';

  // Vertical offset (px) between stacked badges, and the top offset of the first one.
  const BADGE_STACK_START = 4;
  const BADGE_STACK_GAP = 34;

  function applyBadgeLayoutClasses(el) {
    BADGE_TARGET_LAYOUT_CLASSES.split(/\s+/).forEach(function (cls) {
      if (cls) el.classList.add(cls);
    });
  }

  function removeProductBadgeTarget(container) {
    if (container) container.style.display = 'none';
    return;
  }

  function safeAppendIcon(container, iconHtml) {
    if (!container || !iconHtml || typeof iconHtml !== 'string') return;
    if (!/^\s*<(svg|img)[\s>]/i.test(iconHtml)) return;

    const tpl = document.createElement('template');
    tpl.innerHTML = iconHtml.trim();
    const icon = tpl.content.firstElementChild;
    if (!icon) return;
    const tag = icon.tagName.toLowerCase();
    if (tag !== 'svg' && tag !== 'img') return;

    const forbidden = icon.querySelectorAll('script, foreignObject');
    forbidden.forEach((n) => n.remove());

    const all = [icon, ...icon.querySelectorAll('*')];
    all.forEach((el) => {
      Array.from(el.attributes).forEach((attr) => {
        const name = attr.name.toLowerCase();
        const value = String(attr.value || '');
        if (name.startsWith('on')) el.removeAttribute(attr.name);
        if (
          (name === 'href' || name === 'xlink:href' || name === 'src') &&
          /^\s*javascript:/i.test(value)
        ) {
          el.removeAttribute(attr.name);
        }
      });
    });

    container.appendChild(icon);
  }

  function updateProductBadge({ card, index, ribbon }) {
    if (!card || index == null) return;

    // Get container for this stack slot
    let container = card.querySelector(
      `[data-lunel-badge-index="${index}"]`,
    );

    // If no ribbon data, remove badge (if exists) and exit
    if (!ribbon) return removeProductBadgeTarget(container);

    // Create if not exists
    if (!container) {
      container = document.createElement('div');
      container.setAttribute('data-lunel-badge-index', String(index));
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
    container.style.top = BADGE_STACK_START + index * BADGE_STACK_GAP + 'px';

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
    safeAppendIcon(container, svg);

    const textEl = document.createElement('small');
    textEl.className =
      '!text-xxs md:!text-xs !leading-[initial] text-white';
    textEl.style.fontWeight = '900';
    textEl.style.whiteSpace = 'nowrap';
    textEl.textContent = ribbon.text == null ? '' : String(ribbon.text);
    container.appendChild(textEl);
  }

  function applyRibbons({ card, ribbons }) {
    if (!card) return;

    var list = Array.isArray(ribbons) ? ribbons : [];

    // Update/create a slot for every ribbon...
    list.forEach(function (ribbon, index) {
      updateProductBadge({ card: card, index: index, ribbon: ribbon });
    });

    // ...and hide any leftover slots from a previous render with more ribbons.
    var existing = card.querySelectorAll('[data-lunel-badge-index]');
    existing.forEach(function (el) {
      var idx = Number(el.getAttribute('data-lunel-badge-index'));
      if (idx >= list.length) removeProductBadgeTarget(el);
    });
  }

  // home page
  function featuredProdCards({ id, ribbons }) {
    const card = document.querySelector(
      `.featured-prod-cards salla-products-list custom-salla-product-card[data-product-id="${id}"]`,
    );

    applyRibbons({ card, ribbons });
  }

  // Product List
  function stationaryProducts({ id, ribbons }) {
    const card = document.querySelector(
      `section .stationary-products salla-products-list custom-salla-product-card[data-product-id="${id}"]`,
    );

    applyRibbons({ card, ribbons });
  }

  // Product Page
  function productPage({ id, ribbons }) {
    const card = document.querySelector(`salla-slider#details-slider-${id}`);

    applyRibbons({ card, ribbons });
  }

  function updateProductBadges({ id, ribbons }) {
    featuredProdCards({ id, ribbons });
    stationaryProducts({ id, ribbons });
    productPage({ id, ribbons });
  }

  function applyAllProductBadges() {
    var products = window.LUNEL_PRODUCTS;
    if (!products) return false;

    Object.values(products).forEach((product) => {
      if (!product || !product.productId) return;
      var ribbons = Array.isArray(product.ribbons)
        ? product.ribbons
        : [product.ribbon1, product.ribbon2].filter(Boolean);
      updateProductBadges({
        id: product.productId,
        ribbons: ribbons,
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
