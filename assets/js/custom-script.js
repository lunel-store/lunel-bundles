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

// Start: Homepage-only WhatsApp floating button position ------------------------
const isMainPage = () => {
  const path = (window.location && window.location.pathname) || '/';
  const normalizedPath = path.replace(/\/+$/, '') || '/';

  if (normalizedPath === '/') return true;

  const body = document.body;
  if (!body) return false;

  return (
    body.classList.contains('home') ||
    body.classList.contains('homepage') ||
    body.classList.contains('index')
  );
};

const updateWhatsappButtonForMainPage = () => {
  if (!isMainPage()) return;

  const whatsappButton = document.getElementById('whatsapp-up');
  if (!whatsappButton) return;

  whatsappButton.style.setProperty('bottom', '70px', 'important');
};

document.addEventListener('DOMContentLoaded', updateWhatsappButtonForMainPage);
updateWhatsappButtonForMainPage();

let whatsappRetryCount = 0;
const whatsappRetryInterval = setInterval(() => {
  updateWhatsappButtonForMainPage();
  whatsappRetryCount += 1;

  if (
    document.getElementById('whatsapp-up') ||
    whatsappRetryCount >= 20 ||
    !isMainPage()
  ) {
    clearInterval(whatsappRetryInterval);
  }
}, 250);
// End: Homepage-only WhatsApp floating button position ------------------------

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
