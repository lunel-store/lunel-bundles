(function () {
  'use strict';

  const LUNEL_BUNDLES_CONFIG_VERSION = '7.3.0';

  const JSDELIVR_PREFIX =
    'https://cdn.jsdelivr.net/gh/lunel-store/lunel-bundles@v' +
    LUNEL_BUNDLES_CONFIG_VERSION;
  const JSDELIVR_CONFIG_URL =
    JSDELIVR_PREFIX +
    '/config.js?v=' +
    encodeURIComponent(LUNEL_BUNDLES_CONFIG_VERSION);
  const JSDELIVR_STYLE_URL =
    JSDELIVR_PREFIX +
    '/style.css?v=' +
    encodeURIComponent(LUNEL_BUNDLES_CONFIG_VERSION);

  // Only this bootstrap; must NOT set __lunelBundlesJsLoaderExecuted (config.js Part 2 owns that and loads bundles.js).
  if (window.__lunelConfigBootstrapExecuted) return;
  window.__lunelConfigBootstrapExecuted = true;

  function loadLunelConfig() {
    const script = document.createElement('script');
    script.src = JSDELIVR_CONFIG_URL;
    script.defer = true;
    script.onload = function () {
      console.log(
        '✅ Lunel Bundles: Successfully loaded config.js from jsDelivr.',
        JSDELIVR_CONFIG_URL,
      );
    };
    script.onerror = function () {
      console.error(
        '❌ Lunel Bundles: Failed to load config.js from jsDelivr. Check GitHub / jsDelivr URL.',
        JSDELIVR_CONFIG_URL,
      );
    };
    document.head.appendChild(script);
  }

  function loadStyle() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = JSDELIVR_STYLE_URL;
    document.head.appendChild(link);
  }

  loadLunelConfig();
  loadStyle();
})();
