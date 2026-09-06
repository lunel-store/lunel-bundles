(function () {
  'use strict';

  if (window.__lunelProductsLoaded && window.LUNEL_PRODUCTS) return;
  window.__lunelProductsLoaded = true;

  function productHrefFromPath(path) {
    var p = String(path || '')
      .trim()
      .replace(/^\/+/, '');
    if (!p) return '#';
    var host = window.location.hostname;
    var prefix = '';
    if (host === 'salla.sa' || host.slice(-9) === '.salla.sa') {
      var parts = window.location.pathname.split('/').filter(Boolean);
      if (parts.length > 0) prefix = '/' + parts[0];
      else {
        prefix = '/lunel';
      }
    }
    return window.location.origin + prefix + '/' + p;
  }

  // Resolve an asset path through the CDN url-builder when present, otherwise
  // fall back to the relative path so the config still loads (mirrors the
  // fallback in badge-icons.js). Without this, a missing LunelUrlBuilder would
  // throw mid-object and leave LUNEL_PRODUCTS undefined.
  function assetUrl(path) {
    if (typeof window.LunelUrlBuilder === 'function') {
      var url = window.LunelUrlBuilder(path);
      if (url) return url;
    }
    return path;
  }

  // Product-page ids used by the show_on allow-lists below.
  var P1_TATHEER = 1904366049; // مجموعة التفتيح والنضارة
  var P2_HASSASA = 1521371906; // مجموعة البشرة الحساسة
  var P3_MOTAKAMILA = 2094249977; // مجموعة لونيل المتكاملة
  var P4_ASASIYA = 36309229; // مجموعة العناية الأساسية
  var P5_HALAT = 1644875761; // مجموعة الهالات والترطيب

  // Layout is three slots per product page:
  //   slot 1 (order 1): bundle 1 by default, replaced by bundle 4 on its own
  //                     page and bundle 5 on its own page (these never co-occur)
  //   slot 2 (order 2): bundle 2 (always shown)
  //   slot 3 (order 3): bundle 3 (always shown)
  // `show_on` lists the product pages a bundle appears on; omit/null = every page.
  window.LUNEL_PRODUCTS = {
    1904366049: {
      id: 'bundle-1',
      productId: P1_TATHEER,
      title: 'مجموعة التفتيح والنضارة',
      subtitle: 'مقشر + سيروم + وسائد قطنية',
      url: productHrefFromPath('lunel-refund-return-guarantee-3x3/p1904366049'),
      imageUrl: assetUrl('assets/images/p1904366049.webp'),
      price: '350',
      salePrice: '196',
      discountText: 'وفر %45',
      order: 1,
      show_on: [P1_TATHEER, P2_HASSASA, P3_MOTAKAMILA],
      ribbons: [
        {
          text: 'أفضل قيمة',
          tone: 'green',
          type: 'best_value',
          color: '#27b43e',
        },
      ],
    },
    1521371906: {
      id: 'bundle-2',
      productId: P2_HASSASA,
      title: 'مجموعة البشرة الحساسة',
      subtitle: 'غسول + سيروم + كريم الهالات + مرطب + واقي شمس',
      url: productHrefFromPath('lunel-refund-return-guarantee-3x3/p1521371906'),
      imageUrl: assetUrl('assets/images/p1521371906.webp'),
      price: '600',
      salePrice: '296',
      discountText: 'وفر %50',
      order: 2,
      show_on: null,
      ribbons: [
        {
          text: 'وصل حديثًا',
          tone: 'blue',
          type: 'new_release',
          color: '#0095f6',
        },
      ],
    },
    2094249977: {
      id: 'bundle-3',
      productId: P3_MOTAKAMILA,
      title: 'مجموعة لونيل المتكاملة',
      subtitle: 'الروتين المتكامل للتفتيح والنضارة',
      url: productHrefFromPath('lunel-refund-return-guarantee-3x3/p2094249977'),
      imageUrl: assetUrl('assets/images/p2094249977.webp'),
      price: '900',
      salePrice: '396',
      discountText: 'وفر %55',
      order: 3,
      show_on: null,
      ribbons: [
        {
          text: 'هدايا إضافية',
          tone: 'gold',
          type: 'gifts',
          color: '#a98924',
        },
        {
          text: 'توصيل مجاني',
          tone: 'orange',
          type: 'free_delivery',
          color: '#f24822',
        },
        {
          text: 'الأكثر مبيعًا',
          tone: 'blue',
          type: 'number_1',
          color: '#0095f6',
        },
      ],
    },
    36309229: {
      id: 'bundle-4',
      productId: P4_ASASIYA,
      title: 'مجموعة العناية الأساسية',
      subtitle: 'غسول + مرطب + واقي شمس',
      url: productHrefFromPath('lunel-refund-return-guarantee-3x3/p36309229'),
      imageUrl: assetUrl('assets/images/p36309229.webp'),
      price: '350',
      salePrice: '196',
      discountText: 'وفر %45',
      order: 1,
      show_on: [P4_ASASIYA],
      ribbons: [
        {
          text: 'وصل حديثًا',
          tone: 'blue',
          type: 'new_release',
          color: '#0095f6',
        },
      ],
    },
    1644875761: {
      id: 'bundle-5',
      productId: P5_HALAT,
      title: 'مجموعة الهالات والترطيب',
      subtitle: 'كريم الهالات + مرطب',
      url: productHrefFromPath('lunel-refund-return-guarantee-3x3/p1644875761'),
      imageUrl: assetUrl('assets/images/p1644875761.webp'),
      price: '210',
      salePrice: '96',
      discountText: 'وفر %40',
      order: 1,
      show_on: [P5_HALAT],
      ribbons: [
        {
          text: 'أفضل قيمة',
          tone: 'green',
          type: 'best_value',
          color: '#27b43e',
        },
      ],
    },
  };
})();
