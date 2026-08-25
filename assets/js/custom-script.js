(function () {
  'use strict';

  if (window.__lunelCustomScriptLoaded) return;
  window.__lunelCustomScriptLoaded = true;

  // Start: Move gallery after metadata ------------------------
  const moveGallery = () => {
    const gallerySection = document.getElementById(
      'saji-photo-gallery-undefined',
    );
    const metadataDiv = document.getElementById('salla-metadata');

    if (gallerySection && metadataDiv) {
      metadataDiv.parentNode.insertBefore(
        gallerySection,
        metadataDiv.nextSibling,
      );
    }
  };

  // Retry until elements exist
  const interval = setInterval(() => {
    moveGallery();
    if (
      document.getElementById('saji-photo-gallery-undefined') &&
      document.getElementById('salla-metadata')
    ) {
      clearInterval(interval);
    }
  }, 300);
  // End: Move gallery after metadata ------------------------

  // Start: Hide purchase count ------------------------
  document.querySelectorAll('.purchase-count').forEach((el) => {
    el.style.display = 'none';
  });
  // End: Hide purchase count ------------------------

  // Start: move tabby and tamara under the prices ------------------------
  document.addEventListener("DOMContentLoaded", () => {
    const installmentWrap = document.querySelector(".installment-wrap");
    if (!installmentWrap) return;
    
    const target =
      document.querySelector(".saji-custom-div") ||
      document.querySelector("#more-content");

      if (target) {
        target.parentNode.insertBefore(installmentWrap, target);
      }
  });
  // End: move tabby and tamara under the prices ------------------------

// Add a "Product Details" heading as the first element inside #metadata-name (if it exists).
const metadataName = document.querySelector('#metadata-name');

if (metadataName) {
  const p = document.createElement('p');
  p.textContent = 'تفاصيل المنتج';

  Object.assign(p.style, {
    fontWeight: '900',
    marginBottom: '1rem',
    fontSize: '1.5rem',
  });

  metadataName.prepend(p);
}

// Start: Unified floating elements positioner ------------------------
// Coordinates the discount mini-popup (left) and the WhatsApp button
// (right) so they always sit at a consistent, un-cut-off height and rise
// above the product sticky bar whenever it is visible.
(function unifiedFloatingPositioner() {
  const SAFE_BOTTOM = 24; // px gap from the viewport bottom edge
  const GAP = 12; // px gap kept above the sticky bar when it is visible

  const isProductPage = () =>
    !!document.body && document.body.classList.contains('product-single');

  // Returns the sticky bar's bounding rect only when it is actually shown.
  const getVisibleStickyBar = () => {
    const bar = document.getElementById('sticky-bar');
    if (!bar) return null;

    const style = window.getComputedStyle(bar);
    const rect = bar.getBoundingClientRect();
    const isShown =
      style.opacity !== '0' &&
      style.pointerEvents !== 'none' &&
      style.visibility !== 'hidden' &&
      rect.height > 0 &&
      rect.top < window.innerHeight;

    return isShown ? rect : null;
  };

  // The base bottom offset (px) for the round floating buttons row
  // (WhatsApp on the right, theme scroll-to-top arrow on the left).
  const computeBase = () => {
    if (isProductPage()) {
      const rect = getVisibleStickyBar();
      if (rect) {
        return Math.round(window.innerHeight - rect.top + GAP);
      }
    }
    return SAFE_BOTTOM;
  };

  const positionAll = () => {
    const base = computeBase();

    // Discount mini-popup (left side) sits on the BOTTOM row, just above
    // the sticky bar (or the safe bottom offset).
    const mini = document.querySelector('.mini-popup');
    if (mini) {
      mini.style.setProperty('bottom', base + 'px', 'important');
    }

    // WhatsApp button (right side) goes a full row ABOVE the mini-popup, so
    // it is never overlapped by the wide pill. Skip while the theme is
    // hiding it, so we don't fight its slide-in/out animation.
    const whatsapp = document.getElementById('whatsapp-up');
    const whatsappShown =
      whatsapp && window.getComputedStyle(whatsapp).opacity !== '0';
    if (whatsappShown) {
      let whatsappBottom = base;
      if (mini) {
        const miniHeight = Math.round(mini.getBoundingClientRect().height) || 40;
        whatsappBottom = base + miniHeight + GAP;
      }
      whatsapp.style.setProperty('bottom', whatsappBottom + 'px', 'important');
    }
  };

  let ticking = false;
  const schedule = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      positionAll();
    });
  };

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('load', positionAll);
  document.addEventListener('DOMContentLoaded', positionAll);

  // Keep in sync while elements animate in/out or hydrate late.
  setInterval(positionAll, 400);
  positionAll();
})();
// End: Unified floating elements positioner ------------------------

// Start: Home slider video background ------------------------
// if (!window.__lunelHomeSliderVideoLoaded) {
//   window.__lunelHomeSliderVideoLoaded = true;

//   const VIDEO_URL = 'https://cdn.imgchest.com/files/c922e568aed6.mp4';

//   function applyVideoBackground() {
//     const slider = document.querySelector('#home-slider-0');
//     if (!slider) return;

//     // Check if video is already injected to avoid duplicates
//     if (slider.querySelector('.custom-bg-video')) return;

//     // Ensure container styling allows background positioning
//     slider.style.position = 'relative';
//     slider.style.overflow = 'hidden';
//     slider.style.background = 'transparent';

//     // Create video element
//     const video = document.createElement('video');
//     video.className = 'custom-bg-video';
//     video.src = VIDEO_URL;
//     video.autoplay = true;
//     video.loop = true;
//     video.muted = true;
//     video.playsInline = true;
//     video.setAttribute('muted', '');
//     video.setAttribute('playsinline', '');
//     video.setAttribute('autoplay', '');

//     // Force strict inline styles
//     Object.assign(video.style, {
//       position: 'absolute',
//       top: '0',
//       left: '0',
//       width: '100%',
//       height: '100%',
//       objectFit: 'cover',
//       zIndex: '0',
//       pointerEvents: 'none',
//     });

//     // Make sure existing content stays on top of the video
//     Array.from(slider.children).forEach((child) => {
//       if (child !== video) {
//         child.style.position = 'relative';
//         child.style.zIndex = '1';
//         child.style.background = 'transparent';
//       }
//     });

//     // Insert video as the first child of the slider
//     slider.insertBefore(video, slider.firstChild);

//     // Attempt play in case autoplay policy stalls it
//     video.play().catch((err) => console.log('Autoplay prevented:', err));
//   }

//   // Run on load
//   if (document.readyState === 'loading') {
//     document.addEventListener('DOMContentLoaded', applyVideoBackground);
//   } else {
//     applyVideoBackground();
//   }

//   // Fallback observer in case #home-slider-0 is loaded dynamically
//   const observer = new MutationObserver(() => {
//     if (document.querySelector('#home-slider-0')) {
//       applyVideoBackground();
//     }
//   });

//   if (document.body) {
//     observer.observe(document.body, { childList: true, subtree: true });
//   }
// }
// // End: Home slider video background ------------------------
})();
