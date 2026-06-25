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

  // Start: Testimonials card — match Figma design ------------------------
  // Reshape each review card into the Figma layout: name + stars stacked and
  // centered, and the quote glyph anchored to the bottom-left of the card.
  // Borders / spacing / quote styling are handled in assets/css/style.css.
  const decorateTestimonial = (card) => {
    if (card.dataset.lunelTestimonial) return;
    card.dataset.lunelTestimonial = '1';
    card.classList.add('lunel-tst');

    // The meta row holds the avatar (hidden via CSS) and the reviewer name.
    const meta = card.querySelector('.flex.justify-between.items-center');
    if (meta) meta.classList.add('lunel-tst-meta');

    // Move the rating stars from the top row to just under the reviewer name.
    const stars = card.querySelector('salla-rating-stars');
    if (stars && meta) meta.appendChild(stars);

    // Hoist the quote glyph to a direct child so CSS can pin it bottom-left.
    const quote = card.querySelector('.sicon-quote');
    if (quote) {
      const topRow = quote.parentElement;
      quote.classList.add('lunel-tst-quote');
      card.appendChild(quote);
      // Drop the now-empty top row so it leaves no gap.
      if (topRow && !topRow.children.length) topRow.remove();
    }
  };

  const decorateTestimonials = () => {
    document
      .querySelectorAll('.testimonials-content')
      .forEach(decorateTestimonial);
  };

  decorateTestimonials();

  // Cards are rendered/re-rendered by the slider after load — keep applying.
  const tstObserver = new MutationObserver(decorateTestimonials);
  tstObserver.observe(document.body, { childList: true, subtree: true });
  // End: Testimonials card — match Figma design ------------------------
})();
