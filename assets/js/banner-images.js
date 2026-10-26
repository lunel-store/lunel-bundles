(function () {
  'use strict';

  if (window.__lunelBannerImagesLoaded) return;
  window.__lunelBannerImagesLoaded = true;

  // Salla image id (from its CDN file name) -> high-resolution replacement.
  // Values may be absolute URLs or repo paths resolved through jsDelivr.
  var BANNER_IMAGES = {
    '752e6549-1f0a-451d-81ec-f75856d618d2':
      'https://cdn.imgchest.com/files/c92ffa0a75de.png',
  };

  var ATTRS = ['src', 'data-src', 'srcset', 'data-srcset'];
  var keys = Object.keys(BANNER_IMAGES);
  if (!keys.length) return;

  function resolve(path) {
    if (/^https?:\/\//.test(path)) return path;
    if (typeof window.LunelUrlBuilder === 'function') {
      return window.LunelUrlBuilder(path) || path;
    }
    return path;
  }

  var selector = keys
    .map(function (key) {
      return ATTRS.map(function (attr) {
        return 'img[' + attr + '*="' + key + '"],source[' + attr + '*="' + key + '"]';
      }).join(',');
    })
    .join(',');

  function keyFor(el) {
    for (var i = 0; i < ATTRS.length; i++) {
      var value = el.getAttribute(ATTRS[i]);
      if (!value) continue;
      for (var j = 0; j < keys.length; j++) {
        if (value.indexOf(keys[j]) !== -1) return keys[j];
      }
    }
    return null;
  }

  function upgrade(el) {
    var key = keyFor(el);
    if (!key) return;
    var url = resolve(BANNER_IMAGES[key]);

    if (el.tagName === 'SOURCE') {
      el.setAttribute('srcset', url);
      if (el.hasAttribute('data-srcset')) el.setAttribute('data-srcset', url);
      return;
    }

    el.setAttribute('data-src', url);
    el.setAttribute('src', url);
    if (el.hasAttribute('srcset')) el.setAttribute('srcset', url);
    if (el.hasAttribute('data-srcset')) el.setAttribute('data-srcset', url);
    el.classList.remove('lazy');
  }

  function scan(root) {
    if (!root || root.nodeType !== 1) return;
    if (root.matches(selector)) upgrade(root);
    root.querySelectorAll(selector).forEach(upgrade);
  }

  scan(document.documentElement);

  new MutationObserver(function (mutations) {
    mutations.forEach(function (m) {
      if (m.type === 'attributes') {
        upgrade(m.target);
      } else {
        m.addedNodes.forEach(scan);
      }
    });
  }).observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ATTRS,
  });
})();
