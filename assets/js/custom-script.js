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
})();
