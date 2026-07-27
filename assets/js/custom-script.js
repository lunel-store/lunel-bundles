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

  whatsappButton.style.right = '1.5rem';
  whatsappButton.style.left = 'unset';
  whatsappButton.style.bottom = '70px';
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
})();
