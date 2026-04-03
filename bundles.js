(function () {
    'use strict';

    // Prevent duplicate execution
    if (window.__lunelBundlesLoaded) return;
    window.__lunelBundlesLoaded = true;

    const LUNEL_BUNDLES_ROOT_ID = 'lunel-bundles-root';
    const WAIT_MAX_MS = 12000;

    // Get configuration from window object (set by store owner in dashboard)
    const BUNDLES_BY_PRODUCT_ID = window.LUNEL_BUNDLES_CONFIG || {};

    // Early exit if no config exists
    if (Object.keys(BUNDLES_BY_PRODUCT_ID).length === 0) {
        console.warn(
            'Lunel Bundles: No configuration found. Please set window.LUNEL_BUNDLES_CONFIG',
        );
        return;
    }

    // Extract product ID from Salla URL
    function getProductIdFromURL() {
        const match = window.location.pathname.match(/\/p(\d+)/);
        return match ? match[1] : null;
    }

    // Ensure at least one bundle is selected
    function normalizeBundleSelection(list) {
        if (!list || !list.length) return [];
        if (list.some((b) => b.selected)) return list;
        if (list[0]) list[0] = { ...list[0], selected: true };
        return list;
    }

    // Find where to insert bundles in Salla's DOM
    function getInsertionPoint() {
        const form = document.querySelector(
            '#single-product-form, form.product-form',
        );
        if (!form) return null;

        // Priority 1: Insert after fire icon (sold items counter)
        const fireIcon = form.querySelector('.sicon-fire');
        if (fireIcon) {
            const row = fireIcon.closest('.my-6');
            if (row) return row;
        }

        // Priority 2: Insert after price element
        const priceEl = form.querySelector('.total-price-single');
        return priceEl?.closest('.flex.flex-wrap') || null;
    }

    // Build HTML for bundles cards
    function buildBundlesHTML(bundlesData) {
        const cardsHTML = bundlesData
            .map(
                (bundle) => `
            <a class="lunel-bundles__card${bundle.selected ? ' lunel-bundles__card--selected' : ''}"
               href="${bundle.href || '#'}"
               role="button"
               aria-pressed="${bundle.selected}"
               data-bundle-id="${bundle.id}">
                <div class="lunel-bundles__badge">${escapeHtml(bundle.discountText)}</div>
                <div class="lunel-bundles__media">
                    <img class="lunel-bundles__img"
                         src="${escapeHtml(bundle.imageUrl)}"
                         alt="${escapeHtml(bundle.title)}"
                         width="112"
                         height="72"
                         decoding="async"
                         loading="eager"
                         onerror="this.src='https://placehold.co/112x72?text=No+Image'">
                </div>
                <div class="lunel-bundles__label">${escapeHtml(bundle.title)}</div>
            </a>
        `,
            )
            .join('');

        return `
            <section id="${LUNEL_BUNDLES_ROOT_ID}" class="lunel-bundles" dir="rtl">
                <h3 class="lunel-bundles__heading">المجموعات</h3>
                <div class="lunel-bundles__grid">${cardsHTML}</div>
            </section>
        `;
    }

    // Simple XSS protection
    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/[&<>]/g, function (m) {
            if (m === '&') return '&amp;';
            if (m === '<') return '&lt;';
            if (m === '>') return '&gt;';
            return m;
        });
    }

    // Handle card selection clicks
    function attachClickHandler() {
        const grid = document.querySelector(
            `#${LUNEL_BUNDLES_ROOT_ID} .lunel-bundles__grid`,
        );
        if (!grid) return;

        grid.addEventListener('click', (e) => {
            const card = e.target.closest('.lunel-bundles__card');
            if (!card) return;

            e.preventDefault();
            const bundleId = card.dataset.bundleId;

            grid.querySelectorAll('.lunel-bundles__card').forEach((el) => {
                const isSelected = el.dataset.bundleId === bundleId;
                el.classList.toggle(
                    'lunel-bundles__card--selected',
                    isSelected,
                );
                el.setAttribute('aria-pressed', isSelected);
            });

            // Optional: Trigger custom event for store owner to hook into
            window.dispatchEvent(
                new CustomEvent('lunelBundleSelected', {
                    detail: { bundleId: bundleId },
                }),
            );
        });
    }

    // Insert bundles into the page
    function insertBundles(bundlesData) {
        if (document.getElementById(LUNEL_BUNDLES_ROOT_ID)) return true;

        const anchor = getInsertionPoint();
        if (!anchor) return false;

        anchor.insertAdjacentHTML('afterend', buildBundlesHTML(bundlesData));
        attachClickHandler();
        return true;
    }

    // Main initialization
    function init() {
        const productId = getProductIdFromURL();
        if (!productId || !BUNDLES_BY_PRODUCT_ID[productId]) return;

        const bundlesData = normalizeBundleSelection(
            BUNDLES_BY_PRODUCT_ID[productId].bundles,
        );
        if (!bundlesData.length) return;

        // Try immediate insertion
        if (insertBundles(bundlesData)) return;

        // Fallback: Watch for DOM changes (handles Salla's dynamic loading)
        const startTime = Date.now();
        let pending = false;

        const observer = new MutationObserver(() => {
            if (pending) return;
            pending = true;

            requestAnimationFrame(() => {
                pending = false;
                if (Date.now() - startTime > WAIT_MAX_MS) {
                    observer.disconnect();
                    return;
                }
                if (insertBundles(bundlesData)) {
                    observer.disconnect();
                }
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        (window.requestIdleCallback || ((fn) => setTimeout(fn, 1)))(init);
    }
})();
