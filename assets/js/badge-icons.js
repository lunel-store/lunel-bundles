/**
 * Lunel Bundles — badge icons.
 * Icons are served as standalone SVG files under assets/svg/ and injected as
 * <img> tags (browser-cached, only fetched when the bundle widget renders).
 * Load after init.js so window.LunelUrlBuilder is available; falls back to a
 * relative path for local/demo pages that load this file directly.
 * Initializes once (see __lunelBadgeIconsLoaded).
 */
(function () {
  'use strict';

  if (window.__lunelBadgeIconsLoaded && window.LUNEL_BUNDLE_BADGE_ICONS) return;
  window.__lunelBadgeIconsLoaded = true;

  // Badge type -> SVG file (relative to the repo root / jsDelivr base).
  var ICON_FILES = {
    best_value: 'assets/svg/best_value.svg',
    new_release: 'assets/svg/new_release.svg',
    number_1: 'assets/svg/number_1.svg',
    free_delivery: 'assets/svg/free_delivery.svg',
    gifts: 'assets/svg/gifts.svg',
  };

  function resolve(path) {
    if (typeof window.LunelUrlBuilder === 'function') {
      var url = window.LunelUrlBuilder(path);
      if (url) return url;
    }
    return path; // fallback for local/demo pages without init.js
  }

  function buildImg(type) {
    var file = ICON_FILES[type];
    if (!file) return '';
    var src = resolve(file);
    if (!src) return '';
    return (
      '<img class="lunel-bundles__badge-icon" src="' +
      src +
      '" width="18" height="18" alt="" aria-hidden="true"' +
      ' decoding="async" loading="eager">'
    );
  }

  // Back-compat: expose a map of type -> ready-to-inject <img> HTML.
  window.LUNEL_BUNDLE_BADGE_ICONS = Object.keys(ICON_FILES).reduce(function (
    acc,
    type,
  ) {
    acc[type] = buildImg(type);
    return acc;
  },
  {});

  window.getLunelBundleBadgeIconHtml = function (type) {
    return buildImg(type);
  };
})();
