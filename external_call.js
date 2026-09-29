(function () {
  'use strict';

  window.OUT_OF_STOCK_PRODUCTS = [];
  window.OOS_HIDE_IN_BUNDLES = true; // hide out-of-stock bundles from the bundle cards
  window.OOS_HIDE_IN_FEATURED = false; // hide out-of-stock products from featured-prod-cards-*
  window.OOS_SHOW_ALL_BUNDLES_IF_ALL_OOS = true; // show every bundle when all on the page are out of stock

  const LUNEL_REPO_VERSION = window.LUNEL_REPO_VERSION || 'main';

  const LUNEL_JSDELIVR_LINK = `https://cdn.jsdelivr.net/gh/lunel-store/lunel-bundles@${LUNEL_REPO_VERSION}/init.js`;

  if (window.__lunelInitBootstrapExecuted) return;
  window.__lunelInitBootstrapExecuted = true;

  const script = document.createElement('script');
  script.src = LUNEL_JSDELIVR_LINK;
  script.defer = true;
  script.onload = function () {
    console.log(
      '✅ Lunel Bundles: Successfully loaded ' +
        LUNEL_JSDELIVR_LINK +
        ' from jsDelivr.',
    );
  };
  script.onerror = function () {
    console.error(
      '❌ Lunel Bundles: Failed to load ' +
        LUNEL_JSDELIVR_LINK +
        ' from jsDelivr. Check GitHub / jsDelivr URL.',
    );
  };
  document.head.appendChild(script);
})();
