(function () {
  'use strict';

  if (window.__lunelOutOfStockLoaded) return;
  window.__lunelOutOfStockLoaded = true;

  window.OUT_OF_STOCK_PRODUCTS = Array.isArray(window.OUT_OF_STOCK_PRODUCTS)
    ? window.OUT_OF_STOCK_PRODUCTS
    : [];

  // Off by default: set window.OOS_HIDE_IN_FEATURED = true to enable.
  if (window.OOS_HIDE_IN_FEATURED !== true) return;

  var oos = window.OUT_OF_STOCK_PRODUCTS;
  if (!oos.length) return;

  // Hide out-of-stock product cards inside featured-prod-cards-* sections.
  // A stylesheet rule (rather than removing nodes) also covers cards that
  // Salla renders after this script runs. Sections stay even when emptied.
  var selectors = oos.map(function (id) {
    var safeId = String(id).replace(/["\\]/g, '');
    return (
      '[id^="featured-prod-cards-"] custom-salla-product-card[data-product-id="' +
      safeId +
      '"]'
    );
  });

  var style = document.createElement('style');
  style.id = 'lunel-out-of-stock-style';
  style.textContent = selectors.join(',\n') + ' { display: none !important; }';
  (document.head || document.documentElement).appendChild(style);
})();
