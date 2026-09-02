/* Add custom JS styles below */ 
window.LUNEL_REPO_VERSION = 'v8.4.1';

function createCloseButton(className, callback) {
    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = className;
    closeBtn.innerHTML = '<i class="sicon-cancel"></i>';
    closeBtn.setAttribute('aria-label', 'إغلاق');
    closeBtn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      callback(e);
    };
    return closeBtn;
  }
  
  function createButton(className, text, onclick) {
    const button = document.createElement('button');
    button.className = className;
    button.textContent = text;
    button.onclick = onclick;
    return button;
  }
  
  function showMiniPopup() {
    if (document.querySelector('.mini-popup')) return;
  
    const mini = document.createElement('div');
    mini.className =
      'mini-popup fixed left-4 bottom-[27px] opacity-0 transition-all duration-400 ease-in-out   bg-[#000000d9] text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 cursor-pointer w-fit max-w-[90%] !z-20';
    mini.style.transition = 'all 0.4s ease';
    mini.style.position = 'fixed';
    mini.style.left = '16px';
    mini.style.bottom = '27px';
    mini.style.display = 'inline-flex';
    mini.style.alignItems = 'center';
    mini.style.gap = '8px';
    mini.style.paddingRight = '40px';
    mini.style.zIndex = 22;
  
    const label = document.createElement('span');
    // label.textContent = 'احصل على خصم 10% على أول طلب';
    label.textContent = 'عرض اليوم الوطني لمدة 24 ساعة';
  
    const closeMini = createCloseButton('mini-close', () => hideMiniPopup(mini));
    closeMini.style.position = 'absolute';
    closeMini.style.right = '10px';
    closeMini.style.top = '50%';
    closeMini.style.transform = 'translateY(-45%)';
    closeMini.style.color = '#75757a';
    closeMini.style.opacity = '0.95';
    closeMini.style.background = 'transparent';
    closeMini.style.border = 'none';
    closeMini.style.padding = '5px';
    closeMini.style.fontSize = '20px';
    closeMini.style.lineHeight = '1';
    closeMini.style.cursor = 'pointer';
    closeMini.style.pointerEvents = 'auto';
    
  
    // ✅ عند الضغط على الميني يفتح البوب-أب
    mini.addEventListener('click', (e) => {
      if (e.target.closest('.mini-close')) return; // لا تفتح البوب-أب عند الضغط على زر الإغلاق
      hideMiniPopup(mini);
      createPopup();
    });
  
    mini.appendChild(label);
    mini.appendChild(closeMini);
    document.body.appendChild(mini);
  
    requestAnimationFrame(() => {
      mini.style.opacity = '1';
      updateMiniPopupPosition();
    });
  }
  
  function hideMiniPopup(mini) {
    mini.style.opacity = '0';
    setTimeout(() => {
      if (mini && mini.parentNode) mini.parentNode.removeChild(mini);
    }, 400);
  }
  
  function createPopup() {
    if (document.querySelector('.popup-overlay')) return;
  
    const overlay = document.createElement('div');
    overlay.className =
      'popup-overlay fixed inset-0 bg-black/50 flex justify-center items-center opacity-0 transition-opacity duration-300 z-[10000]';
  
    const popup = document.createElement('div');
    popup.className =
      'popup-box bg-white p-6 rounded-xl shadow-xl max-w-sm w-[90%] text-center transform scale-95 transition-transform duration-300 relative';
  
    const closeBtn = createCloseButton('popup-close absolute top-3 right-4 text-2xl', () => {
      hidePopup(overlay);
      showMiniPopup();
    });
  
    const text = document.createElement('div');
    text.className = 'popup-text';
    text.innerHTML = `
     
    `;
  
    // const getCodeBtn = createButton(
    //   'get-code bg-[#d07779] text-white px-4 py-2 rounded-md',
    //   'عطني الكود',
    //   () => {
    //     window.open('https://api.whatsapp.com/send?phone=966557174342&text=%D8%B3%D9%85%D8%B9%D8%AA%20%D8%B9%D9%86%D8%AF%D9%83%D9%85%20%D8%A3%D9%82%D9%88%D9%89%20%D9%85%D9%86%D8%AA%D8%AC%D8%A7%D8%AA%20%D9%84%D9%84%D8%AA%D9%81%D8%AA%D9%8A%D8%AD%20%D9%88%D8%A7%D9%84%D9%86%D8%B6%D8%A7%D8%B1%D8%A9%D8%8C%20%D9%88%D9%81%D9%8A%D9%87%20%D9%83%D9%88%D8%AF%20%D8%AE%D8%B5%D9%85%20%D8%B9%D9%84%D9%89%20%D8%A3%D9%88%D9%84%20%D8%B7%D9%84%D8%A8%D8%9F%20%F0%9F%91%80', '_blank');
    //   }
    // );
  
  
    const getCodeBtn = createButton(
    'get-code bg-[#d07779] text-white px-4 py-2 rounded-md',
    'انسخ كود "وطني"',
    () => {
      const code = 'وطني';
  
      navigator.clipboard.writeText(code).then(() => {
        // اختياري: تغيير النص مؤقتًا للتأكيد
        getCodeBtn.textContent = 'تم نسخ الكود';
        setTimeout(() => {
          getCodeBtn.textContent = 'انسخ كود "وطني"';
        }, 2000);
      }).catch(() => {
        alert('حدث خطأ أثناء نسخ الكود');
      });
    }
  );
  
  
    const cancelBtn = createButton(
      'cancel text-gray-500 underline rounded-md',
      'لا، شكرًا',
      () => {
        hidePopup(overlay);
        showMiniPopup();
      }
    );
  
    const buttonsWrapper = document.createElement('div');
    buttonsWrapper.className = 'popup-buttons flex justify-center items-center gap-2 mt-6';
    buttonsWrapper.appendChild(getCodeBtn);
    buttonsWrapper.appendChild(cancelBtn);
  
    overlay.onclick = (e) => {
      if (e.target === overlay) {
        hidePopup(overlay);
        showMiniPopup();
      }
    };
  
    popup.appendChild(closeBtn);
    popup.appendChild(text);
    popup.appendChild(buttonsWrapper);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
  
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
      popup.style.transform = 'scale(1)';
    });
  }
  
  function hidePopup(overlay) {
    overlay.style.opacity = '0';
    const popup = overlay.querySelector('.popup-box');
    popup.style.transform = 'scale(0.95)';
    setTimeout(() => {
      if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 300);
  }
  
  function updateMiniPopupPosition() {
    const mini = document.querySelector('.mini-popup');
    if (!mini) return;
  
    const isProductPage = document.body.classList.contains('product-single');
    const stickyBar = document.querySelector('#sticky-bar');
  
    if (isProductPage && stickyBar) {
      const scrollY = window.scrollY || window.pageYOffset;
      if (scrollY > 50) {
        const rect = stickyBar.getBoundingClientRect();
        const bottom = window.innerHeight - rect.top + 10;
        mini.style.bottom = `${bottom}px`;
        return;
      }
    }
  
    mini.style.bottom = '27px';
  }
  
  window.addEventListener('load', () => {
    const popupShown = sessionStorage.getItem('popupShown');
  
    if (!popupShown) {
      setTimeout(() => {
        createPopup();
        sessionStorage.setItem('popupShown', 'true');
      }, 8000);
    } else {
      showMiniPopup();
    }
  });
  
  window.addEventListener('scroll', updateMiniPopupPosition);
  window.addEventListener('resize', updateMiniPopupPosition);
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  document.addEventListener('DOMContentLoaded', () => {
    const html = document.documentElement;
    const isRTL = html.getAttribute('dir') === 'rtl';
  
    // ===== زر الاشتراك (نص الزر) =====
    (function updateSubscribeBtn() {
      const form = document.getElementById('mc-embedded-subscribe-form');
      const btnText = form?.querySelector('.btn__text');
      if (btnText) btnText.textContent = isRTL ? 'يلا' : "Let's Go";
    })();
  
    // ===== تعديل رقم في الفوتر =====
    (function updateFooterNumber() {
      const el = document.querySelector('.store-footer .grid.grid-cols-1.md\\:grid-cols-2.gap-3.saji-anime-item a.flex.flex-col.justify-center.items-center.gap-2 strong');
      if (el) el.textContent = '0000183410';
    })();
  
    // ===== أيقونة واتساب للـ RTL =====
    (function replaceWhatsappIcon() {
      if (!isRTL) return;
      const icon = document.querySelector('.store-footer .links-icon.sicon-whatsapp2');
      if (!icon) return;
  
      icon.classList.add('hidden');
      const text = icon.parentElement?.querySelector('.links-text');
      if (text) text.textContent = 'واتساب';
      icon.insertAdjacentHTML('afterend', `
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
  <path d="M13 7C13 10.3137 10.3137 13 7 13C5.7361 13 4.56345 12.6092 3.59633 11.9418L1.54545 12.4545L2.08288 10.4392C1.40046 9.46535 1 8.27945 1 7C1 3.68629 3.68629 1 7 1C10.3137 1 13 3.68629 13 7Z" fill="url(#paint0_linear_24_1144)"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 8.25545 0.3305 9.4337 0.909235 10.4525L0 14L3.65743 13.1519C4.6507 13.6927 5.78945 14 7 14ZM7 12.9231C10.2712 12.9231 12.9231 10.2712 12.9231 7C12.9231 3.72878 10.2712 1.07693 7 1.07693C3.72878 1.07693 1.07693 3.72878 1.07693 7C1.07693 8.26305 1.47225 9.43375 2.14592 10.3951L1.61539 12.3846L3.63997 11.8785C4.5947 12.5373 5.7523 12.9231 7 12.9231Z" fill="white"/>
  <path d="M5.2522 3.75019C5.0858 3.4159 4.83045 3.44549 4.57255 3.44549C4.1116 3.44549 3.39282 3.99763 3.39282 5.02523C3.39282 5.86738 3.76392 6.78928 5.0144 8.16828C6.2212 9.49918 7.8069 10.1876 9.1233 10.1642C10.4397 10.1408 10.7105 9.00798 10.7105 8.62538C10.7105 8.45583 10.6053 8.37123 10.5328 8.34823C10.0842 8.13298 9.25685 7.73183 9.0686 7.65643C8.88035 7.58108 8.78205 7.68303 8.72095 7.73848C8.55025 7.90118 8.21185 8.38063 8.09595 8.48848C7.9801 8.59633 7.80735 8.54173 7.73545 8.50098C7.4709 8.39483 6.75365 8.07578 6.18195 7.52153C5.47485 6.83613 5.43335 6.60033 5.30015 6.39038C5.1936 6.22248 5.2718 6.11943 5.3108 6.07438C5.46315 5.89863 5.6735 5.62723 5.76785 5.49238C5.86215 5.35753 5.7873 5.15273 5.74235 5.02523C5.5491 4.47673 5.38535 4.01763 5.2522 3.75019Z" fill="white"/>
  <defs>
  <linearGradient id="paint0_linear_24_1144" x1="12.25" y1="2.5" x2="1" y2="13" gradientUnits="userSpaceOnUse">
  <stop stop-color="#5BD066"/>
  <stop offset="1" stop-color="#27B43E"/>
  </linearGradient>
  </defs>
  </svg>
      `);
    })();
  
    // ===== إضافة عنوان قبل مقالات المدونة =====
    (function insertBlogPrefix() {
      const selector = '.blog_post_title, #blog_post_title';
      document.querySelectorAll(selector).forEach((target) => {
        const before = target.previousElementSibling;
        if (before && before.classList && before.classList.contains('learn-with-lonel')) return;
        const strong = document.createElement('strong');
        strong.className = 'learn-with-lonel';
        strong.textContent = isRTL ? 'تعلمي مع لونيل' : 'Learn with Lonel';
        target.parentElement.insertBefore(strong, target);
      });
    })();
  
    // ===== دالة السهم بعد السلايدر =====
    const addArrowAfterSlider = () => {
      const section = document.querySelector('section#home-slider-0');
      if (section && !document.querySelector('.arrow-container')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'arrow-container';
        wrapper.innerHTML = `
          <div class="down-arrow" style="display:flex;justify-content:center;margin-top:10px;cursor:pointer;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="9" viewBox="0 0 16 9" fill="none">
              <path d="M15 1L8 8L1 1" stroke="#25252C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        `;
        section.insertAdjacentElement('afterend', wrapper);
  
        const arrow = wrapper.querySelector('.down-arrow');
        arrow.addEventListener('click', () => {
          wrapper.scrollIntoView({ behavior: 'smooth' });
        });
      }
    };
  
    // ===== دالة لحساب عدد المشتريات الديناميكي =====
    const getDynamicPurchaseCount = (baseCount, incrementPerDay, startDate) => {
      const today = new Date();
      const diffDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
      return baseCount + diffDays * incrementPerDay;
    };
  
    // ===== اضافة شارة الخصم + شارة عدد المشتريات (النسخة الكاملة والمضبوطة) =====
    // - للمنتجات داخل .featured_product_larg: اجمع الخصم + عداد المشتريات في نفس الحاوية (داخل .product-entry__price)
    // - لباقي المنتجات: فقط شارة الخصم داخل .product-entry__image
    const applyBadges = () => {
      // نأخذ كل .product-entry للحماية من الاختلافات (لو صفحة تستخدم بنية مختلفة)
      document.querySelectorAll('.product-entry').forEach(entry => {
        // اجلب عناصر السعر والصورة
        const priceEl = entry.querySelector('.product-entry__price');
        const imageEl = entry.querySelector('.product-entry__image');
  
        if (!priceEl || !imageEl) return;
  
        // نبحث عن sale & regular داخل الـ price
        const salePriceEl = priceEl.querySelector('.sale-price');
        const regularPriceEl = priceEl.querySelector('.regular-price');
  
        // إذا لم توجد قيم الأسعار، نحاول جلبها من data attributes أو نصوص بديلة
        if (!salePriceEl || !regularPriceEl) {
          // محاولة fallback: عناصر قد تكون بصيغة أخرى
          const sp = priceEl.querySelector('[data-sale-price]') || priceEl.querySelector('.price--sale');
          const rp = priceEl.querySelector('[data-regular-price]') || priceEl.querySelector('.price--regular');
          if (sp && rp) {
            // تعيين مؤقت للمتغيرات لكي يُعامل برمجياً
            // لكن نستعمل النص لاحقًا كما في الأسفل
          } else {
            return; // لا توجد معلومات كافية للأسعار → تجاهل
          }
        }
  
        // استخراج الأرقام بشكل آمن
        const parsePrice = (el) => {
          if (!el) return NaN;
          const txt = el.dataset?.price || el.textContent || '';
          const num = parseFloat(txt.replace(/[^\d.,\-]/g, '').replace(',', '.'));
          return Number.isFinite(num) ? num : NaN;
        };
  
        const salePrice = parsePrice(salePriceEl);
        const regularPrice = parsePrice(regularPriceEl);
  
        if (!Number.isFinite(salePrice) || !Number.isFinite(regularPrice)) return;
        if (regularPrice <= salePrice) {
          // لا يوجد خصم
          // لكن نتأكد من إزالة شارة خصم قديمة إن وُجدت لتجنب التكرار
          if (imageEl.querySelector('.discount-badge') && !entry.closest('.featured_product_larg')) {
            // نتركها — عادة لن يحدث
          }
          return;
        }
  
        const discountPercent = Math.round(((regularPrice - salePrice) / regularPrice) * 100);
  
        // ===== إنشاء شارة الخصم كعنصر قابل لإعادة الاستخدام =====
        const createDiscountBadge = () => {
          const badge = document.createElement('span');
          badge.className = 'discount-badge';
          badge.textContent = `وفّري ${discountPercent}%`;
          badge.style.cssText = `
            background: #ffff3b;
            color: #f24822;
            padding: 4px 8px;
            font-size: 13px;
            font-weight: 600;
            display:inline-block;
          `;
          return badge;
        };
  
        const isFeatured = !!entry.closest('.featured_product_larg') || !!entry.closest('.Special-offer-product');
  
        if (isFeatured) {
          // ===== داخل featured_product_larg: نجمع الشارتين داخل .price-extra في priceEl =====
          let extra = priceEl.querySelector('.price-extra');
          if (!extra) {
            extra = document.createElement('div');
            extra.className = 'price-extra';
            extra.style.cssText = `
              display:flex;
              flex-direction:row;
              gap:8px;
              text-align:center;
              justify-content:center;
              margin: 0px 0 7px;
              align-items:center;
              flex-wrap:wrap;
            `;
            priceEl.appendChild(extra);
          }
  
          // شارة الخصم — أضف إذا لم توجد
          if (!extra.querySelector('.discount-badge')) {
            extra.insertAdjacentElement('afterbegin', createDiscountBadge());
          } else {
            // حدّث النص لو تغيرت النسبة
            const existing = extra.querySelector('.discount-badge');
            if (existing && existing.textContent && existing.textContent.indexOf('%') === -1) {
              existing.textContent = `وفّري ${discountPercent}%`;
            } else if (existing) {
              existing.textContent = `وفّري ${discountPercent}%`;
            }
          }
  
          // عداد المشتريات — أضف إذا لم يوجد
          if (!extra.querySelector('.purchase-count')) {
            const baseCount = 30800;
            const incrementPerDay = 48;
            const startDate = new Date('2026-01-01');
            const currentCount = getDynamicPurchaseCount(baseCount, incrementPerDay, startDate);
  
            const purchaseCount = document.createElement('span');
            purchaseCount.className = 'purchase-count';
            purchaseCount.textContent = `تم شراءه ${currentCount.toLocaleString()} مرة`;
            purchaseCount.style.cssText = `
              display: none;
              background: #f9f9f9;
              border: 1px solid #e1ded9;
              padding: 3px 10px;
              border-radius: 8px;
              color: #2fb43e;
              font-size: 14px;
              white-space:nowrap;
            `;
            extra.appendChild(purchaseCount);
          } else {
            // لو موجود حدّث العدد (مفيد لو السكريبت يعاد تشغيله)
            const pc = extra.querySelector('.purchase-count');
            if (pc) {
              pc.style.display = 'none';
              const baseCount = 30800;
              const incrementPerDay = 48;
              const startDate = new Date('2026-01-01');
              const currentCount = getDynamicPurchaseCount(baseCount, incrementPerDay, startDate);
              pc.textContent = `تم شراءه ${currentCount.toLocaleString()} مرة`;
            }
          }
        } else {
          // ===== لباقي المنتجات: شارة الخصم فقط داخل الصورة (.product-entry__image) =====
          // نضعها في ركن الصورة، مع حماية من التكرار
          if (!imageEl.querySelector('.discount-badge')) {
            const badge = createDiscountBadge();
            // نعطيها موقع كـ absolute داخل الصورة
            imageEl.style.position = imageEl.style.position || 'relative';
            badge.style.cssText += `
              position:absolute;
              bottom: 5px;
              padding: 4px 8px;
      font-size: 10px;
      line-height: initial;
              ${isRTL ? 'right:8px;' : 'left:8px;'}
              border-radius:6px;
              z-index:20;
            `;
            imageEl.appendChild(badge);
          } else {
            // لو موجود حدّث النص فقط
            const existing = imageEl.querySelector('.discount-badge');
            if (existing) existing.textContent = `وفّري ${discountPercent}%`;
          }
        }
      });
    };
  
    // ===== إضافة صورة الفوتر (مثل الأول) مع fade-in =====
    const addFooterImage = () => {
      const footerContainer = document.querySelector('.footer-bottom');
      if (!footerContainer) return;
  
      // لو الصورة مضافة مسبقاً، لا نكررها
      if (footerContainer.nextElementSibling?.classList.contains('footer-img')) return;
  
      const img = document.createElement('img');
      img.src = 'https://cdn.imgchest.com/files/dc2e7d3a0b32.webp';
      img.alt = 'store footer image';
      img.className = 'footer-img';
      img.style.cssText = `display: block;margin: 20px auto 0;opacity: 0;transition: opacity 0.7s ease;max-width:100%;height:auto;`;
  
      // إدراج الصورة بعد الفوتر مباشرة
      footerContainer.insertAdjacentElement('afterend', img);
  
      // تأثير الظهور بعد التحميل
      img.addEventListener('load', () => {
        img.style.opacity = '1';
      });
    };
  
    // ===== شارة الأكثر مبيعًا و"ينفد خلال أيام" =====
    // product-badges.js (window.__lunelApplyProductBadges) is the single
    // source of truth for all product ribbons/badges. This function only
    // delegates to it and never renders its own generic badges, so the two
    // systems can never race or stack on top of each other on the same card.
    const addBadgeToProducts = () => {
      if (typeof window.__lunelApplyProductBadges === 'function') {
        window.__lunelApplyProductBadges();
      }
    };
  
    // ===== مشتري موثق =====
    (function addVerifiedBuyer() {
      document.querySelectorAll('.testimonials-content').forEach((el) => {
        const text = isRTL ? 'مشتري موثق' : 'Verified Buyer';
        if (!el.querySelector('.verified-buyer')) {
          el.insertAdjacentHTML('beforeend', `<div class="verified-buyer flex items-center gap-1 mt-2 text-sm text-green-600"><i class="relative text-primary text-sm stock-icone sicon-check-circle2 after:bg-primary"></i><span>${text}</span></div>`);
        }
      });
    })();
  
    // ===== استبدال الصورة بأيقونة المستخدم =====
    const replaceAvatarWithIcon = (el) => {
      const img = el.querySelector('img');
      if (img && !el.querySelector('.sicon-user')) {
        img.remove();
        const icon = document.createElement('i');
        icon.className = 'sicon-user text-xl';
        el.appendChild(icon);
      }
    };
    document.querySelectorAll('.s-user-menu-avatar-wrap').forEach(replaceAvatarWithIcon);
  
    // ===== زر "اشتري الآن" ديناميكي =====
    const updateBuyButtons = () => {
      const text = isRTL ? 'اشتري الآن' : 'Buy Now';
      document.querySelectorAll('.s-block--influencer-videos .btn--add-to-cart button').forEach((btn) => {
        if (btn.textContent.trim() !== text) btn.textContent = text;
      });
    };

    // ===== نسخ العناوين الفرعية لبطاقات العرض الخاص =====
    const enhanceSpecialOfferCards = () => {
      const section = document.querySelector('.Special-offer-product');
      if (!section) return;

      // جمع العناوين الفرعية من البطاقات التي تحتوي عليها
      const subtitleMap = {};
      section.querySelectorAll('custom-salla-product-card').forEach(card => {
        const pid = card.getAttribute('data-product-id') || card.id;
        const sub = card.querySelector('.product-entry__subtitle');
        if (sub && pid) subtitleMap[pid] = sub.textContent.trim();
      });

      // إضافة العنوان الفرعي للبطاقات التي لا تحتوي عليه
      section.querySelectorAll('custom-salla-product-card').forEach(card => {
        const pid = card.getAttribute('data-product-id') || card.id;
        const textInfo = card.querySelector('.text-info');
        if (!textInfo || card.querySelector('.product-entry__subtitle')) return;
        if (!subtitleMap[pid]) return;

        const p = document.createElement('p');
        p.className = 'product-entry__subtitle text-xs';
        p.style.color = 'var(--product-subtitle-color)';
        p.textContent = subtitleMap[pid];
        const title = textInfo.querySelector('.product-entry__title');
        if (title) title.insertAdjacentElement('afterend', p);
      });

      // تحويل زر الأيقونة إلى زر نصي (مطابقة للبطاقة المميزة)
      const addText = isRTL ? 'إضافة' : 'Add';
      section.querySelectorAll('.product-entry--horizontal .product_addCart_mini').forEach(mini => {
        if (mini.dataset.textified) return;

        const btn = mini.querySelector('button');
        if (!btn) return;

        const textEl = btn.querySelector('.s-button-text');
        if (textEl) {
          textEl.innerHTML = addText;
        }

        mini.dataset.textified = 'true';
      });
    };

    // ===== مراقب التغييرات (MutationObserver) =====
    const observer = new MutationObserver((mutations) => {
      // استخدم debounce بسيط داخل المراقب لتقليل تكرار التنفيذ عند تغيرات كثيرة
      if (observer._pending) clearTimeout(observer._pending);
      observer._pending = setTimeout(() => {
        addArrowAfterSlider();
        applyBadges();
        addBadgeToProducts();
        addFooterImage();
        document.querySelectorAll('.s-user-menu-avatar-wrap').forEach(replaceAvatarWithIcon);
        updateBuyButtons();
        enhanceSpecialOfferCards();
        observer._pending = null;
      }, 80);
    });
  
    observer.observe(document.body, { childList: true, subtree: true });
  
    // ===== استدعاءات أولية =====
    addArrowAfterSlider();
    applyBadges();
    addBadgeToProducts();
    addFooterImage();
    updateBuyButtons();
    enhanceSpecialOfferCards();
  });
  
  
  document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".s-block--common_questions .tab-accordion");
    if (!sections.length) return;
  
    sections.forEach(section => {
      const button = document.createElement("a");
      button.href = "https://lunel.sa/LUNEL-faq-questions-skincare-shipping-refund/page-698550837";
      button.target = "_blank";
      button.className =
        "inline-flex items-center justify-between gap-2 border-b outline-none p-3 text-base  font-medium text-gray-900 hover:text-[var(--store-primary)] transition-all duration-300 w-full ";
      button.innerHTML = `
       <span>للمزيد من الأسئلة الشائعة</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
  <path d="M8.5 0.5H12.5M12.5 0.5V4.5M12.5 0.5L5.16667 7.83333M10.5 7.16667V11.1667C10.5 11.5203 10.3595 11.8594 10.1095 12.1095C9.85943 12.3595 9.52029 12.5 9.16667 12.5H1.83333C1.47971 12.5 1.14057 12.3595 0.890524 12.1095C0.640476 11.8594 0.5 11.5203 0.5 11.1667V3.83333C0.5 3.47971 0.640476 3.14057 0.890524 2.89052C1.14057 2.64048 1.47971 2.5 1.83333 2.5H5.83333" stroke="#5F5B64" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
       
      `;
     // ✅ إضافة الزر داخل القسم بعد الداتا (في نهاية المحتوى)
      section.insertAdjacentElement("beforeend", button);
    });
  });
  
  
  function addDiscountBadgeToProductPage() {
    // نتحقق من أننا داخل صفحة المنتج
    const productPage = document.querySelector('.product_page');
    if (!productPage) return;
  
    const beforePriceEl = productPage.querySelector('.before-price-single');
    const totalPriceEl = productPage.querySelector('.total-price-single');
  
    if (!beforePriceEl || !totalPriceEl) return;
  
    // استخراج الأرقام بشكل آمن من النص
    const parsePrice = (el) => {
      if (!el) return NaN;
      const text = el.textContent || '';
      return parseFloat(text.replace(/[^\d.,]/g, '').replace(',', '.'));
    };
  
    const beforePrice = parsePrice(beforePriceEl);
    const totalPrice = parsePrice(totalPriceEl);
  
    if (!beforePrice || !totalPrice || beforePrice <= totalPrice) return;
  
    // حساب نسبة الخصم
    const discountPercent = Math.round(((beforePrice - totalPrice) / beforePrice) * 100);
  
    // إنشاء شارة الخصم
    const badge = document.createElement('span');
    badge.className = 'discount-badge-single';
    badge.textContent = `وفّري ${discountPercent}%`;
    badge.style.cssText = `
      background: #ffff3b;
      color: #f24822;
      padding: 5px 10px;
      font-size: 14px;
      font-weight: 600;
      border-radius: 6px;
      display: inline-block;
      margin-inline-start: 8px;
      line-height: initial;
    `;
  
    // إضافتها بعد before-price-single إن لم تكن موجودة
    if (!beforePriceEl.parentElement.querySelector('.discount-badge-single')) {
      beforePriceEl.insertAdjacentElement('afterend', badge);
    }
  }
  
  // تشغيلها عند تحميل الصفحة
  document.addEventListener('DOMContentLoaded', addDiscountBadgeToProductPage);
  
  
  
  
  
  
  
  function addPurchaseCounterToProductPage() {
    const productPage = document.querySelector('.product_page');
    if (!productPage) return;
  
    const titleEl = productPage.querySelector('.product-title');
    const subtitleEl = productPage.querySelector('.product-entry__sub-title');
    if (!titleEl || !subtitleEl) return;
  
    // 🔸 أضف كلاس مميز للأب
    const parent = titleEl.parentElement;
    parent.classList.add('product-title-container-enhanced');
  
    // 🔸 الدالة التي تحسب العدد الديناميكي
    const getDynamicPurchaseCount = (baseCount, incrementPerDay, startDate) => {
      const today = new Date();
      const diffDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
      return baseCount + diffDays * incrementPerDay;
    };
  
    // حساب العدد الحالي
    const baseCount = 30800; // البداية
    const incrementPerDay = 48; // كم يزيد يومياً
    const startDate = new Date('2026-01-01'); // تاريخ البداية
    const currentCount = getDynamicPurchaseCount(baseCount, incrementPerDay, startDate);
  
    // 🔸 إنشاء الدف الجديد الذي يحتوي على العنوان الفرعي + العداد
    const infoWrapper = document.createElement('div');
   infoWrapper.classList.add('product-subinfo', 'flex-row', 'flex', 'gap-3', 'items-center', 'justify-between','mb-2');
    
    // نقل العنوان الفرعي إلى الداخل (وليس نسخه)
    infoWrapper.appendChild(subtitleEl);
  
    // إنشاء عداد المشتريات
    const purchaseCounter = document.createElement('span');
    purchaseCounter.className = 'purchase-count';
    purchaseCounter.textContent = `تم شراءه ${currentCount.toLocaleString()} مرة`;
    purchaseCounter.style.cssText = `
      display: inline-block;
      background: #f9f9f9;
      border: 1px solid #e1ded9;
      padding: 4px 10px;
      border-radius: 8px;
      color: #2fb43e;
      font-size: 14px;
      width: fit-content;
    `;
  
    infoWrapper.appendChild(purchaseCounter);
  
    // 🔸 إدراج الدف الجديد بعد .product-title
    titleEl.insertAdjacentElement('afterend', infoWrapper);
  }
  
  // تشغيل الدالة عند تحميل الصفحة
  document.addEventListener('DOMContentLoaded', addPurchaseCounterToProductPage);
  
  
  
  
  
  
  
  
  
  
  
  
  
  function addProductDetailsHeading() {
    // نتحقق من وجود العنصر #salla-metadata
    const metadata = document.querySelector('#salla-metadata');
    if (!metadata) return;
  
    // نتحقق من اتجاه الصفحة (rtl أو ltr)
    const isLTR = document.documentElement.getAttribute('dir') === 'ltr';
  
    // إنشاء العنوان
    const heading = document.createElement('h2');
    heading.className = 'product-details-heading';
    heading.textContent = isLTR ? 'Product Details' : 'تفاصيل المنتج';
  
    // بعض التنسيقات البسيطة
    heading.style.cssText = `
      margin: 1.5rem 0;
      font-size: 1.3rem !important;
      line-height: 2.25rem !important;
      font-weight: 900 !important;
      letter-spacing: normal !important;
    `;
  
    // إدراج العنوان قبل محتوى #salla-metadata
    metadata.insertAdjacentElement('beforebegin', heading);
  }
  
  // تشغيلها بعد تحميل الصفحة
  document.addEventListener('DOMContentLoaded', addProductDetailsHeading);
  
  
  
  
  
  
  document.addEventListener("DOMContentLoaded", () => {
    try {
      const detailsWrapper = document.querySelector(".details-slider-wrapper");
      if (!detailsWrapper) return;
  
      const sallaSlider = detailsWrapper.querySelector("salla-slider");
      if (!sallaSlider) return;
  
      let attempts = 0;
      const maxAttempts = 15;
      const attemptDelay = 300;
  
      function findAndInit() {
        attempts++;
        const swiperContainer = sallaSlider.querySelector(".swiper");
        const slides = swiperContainer?.querySelectorAll?.(".swiper-slide") || [];
  
        if (!swiperContainer || !slides.length) {
          if (attempts < maxAttempts) {
            setTimeout(findAndInit, attemptDelay);
          }
          return;
        }
  
        if (swiperContainer._customScrollbarInitialized) return;
        swiperContainer._customScrollbarInitialized = true;
  
        // إزالة أي scrollbar سابق
        const prev = detailsWrapper.querySelector(".custom-slider-scrollbar");
        if (prev) prev.remove();
  
        // إنشاء الشريط
        const scrollbar = document.createElement("div");
        scrollbar.className = "custom-slider-scrollbar";
        scrollbar.style.cssText = `
          margin-top: 8px;
          height: 4px;
          background: rgba(0,0,0,0.08);
          border-radius: 4px;
          position: absolute;
          overflow: hidden;
          bottom: 0;
          z-index: 20;
          width: 100%;
        `;
  
        const thumb = document.createElement("div");
        thumb.className = "custom-slider-thumb";
        thumb.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: ${100 / slides.length}%;
          background: var(--color-primary, #d07779);
          border-radius: 4px;
          transition: left 0.3s ease, transform 0.3s ease;
        `;
  
        scrollbar.appendChild(thumb);
  
        // وضعه بعد pagination أو بعد السلايدر
        const pagination = detailsWrapper.querySelector(".swiper-pagination");
        if (pagination) {
          pagination.insertAdjacentElement("afterend", scrollbar);
        } else {
          swiperContainer.insertAdjacentElement("beforeend", scrollbar); // ✅ FIXED
        }
  
        // تحديث المؤشر ليتحرك حسب السلايد النشط
        let rafId = null;
        function scheduleUpdate() {
          if (rafId) return;
          rafId = requestAnimationFrame(() => {
            rafId = null;
            updateThumb();
          });
        }
  
        function updateThumb() {
          try {
            const slidesArr = Array.from(swiperContainer.querySelectorAll(".swiper-slide"));
            const total = slidesArr.length;
            if (!total) return;
  
            const activeIndex = slidesArr.findIndex(s => s.classList.contains("swiper-slide-active"));
            const idx = activeIndex >= 0 ? activeIndex : 0;
  
            const thumbWidth = 100 / total; // عرض كل خطوة
            const leftPercent = idx * thumbWidth;
            thumb.style.width = `${thumbWidth}%`;
            thumb.style.left = `${leftPercent}%`;
          } catch (e) {
            console.warn("updateThumb error", e);
          }
        }
  
        // مراقبة تغيّر الكلاسات داخل السلايدر
        const activeObserver = new MutationObserver(muts => {
          for (const m of muts) {
            if (m.type === "attributes" && m.attributeName === "class") {
              scheduleUpdate();
              break;
            }
          }
        });
  
        activeObserver.observe(swiperContainer, {
          subtree: true,
          attributes: true,
          attributeFilter: ["class"],
        });
  
        scheduleUpdate();
  
        // تنظيف
        swiperContainer._customScrollbarCleanup = () => {
          try {
            activeObserver.disconnect();
            if (rafId) cancelAnimationFrame(rafId);
            const el = detailsWrapper.querySelector(".custom-slider-scrollbar");
            if (el) el.remove();
          } catch {}
        };
      }
  
      findAndInit();
    } catch (e) {
      console.error("خطأ في init custom slider scrollbar:", e);
    }
  });
  


  const observer = new MutationObserver(() => {
    const accItems = document.querySelectorAll("#metadata-name .accordion");
    const accContentItems = document.querySelectorAll("#metadata-name .accordion-content");
  
    // نتأكد أن العناصر موجودة
    if (accItems.length > 0 && accContentItems.length > 0) {
      const lastAcc = accItems[accItems.length - 1];
      const lastAccContent = accContentItems[accContentItems.length - 1];
  
      lastAcc.classList.add("active");
      lastAccContent.classList.add("active");
  
      observer.disconnect(); // إيقاف المراقبة بعد التنفيذ
    }
  });
  
  observer.observe(document.body, { childList: true, subtree: true });

document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("square-photos-4");
    if (!container) return;

    const newUrl = "https://cdn.imgchest.com/files/791d24140f26.png";

    const img = container.querySelector("img");
    const source = container.querySelector("source");

    if (img) {
        img.src = newUrl;
        img.setAttribute("data-src", newUrl);
        img.setAttribute("srcset", newUrl);
        img.classList.remove("lazy");
    }

    if (source) {
        source.srcset = newUrl;
        source.setAttribute("data-srcset", newUrl);
    }
});

// Start: LUNEL_BUNDLES -------------------
(function () {
  'use strict';

  window.OUT_OF_STOCK_PRODUCTS = [];

  const LUNEL_REPO_VERSION = window.LUNEL_REPO_VERSION || 'main';

  const LUNEL_JSDELIVR_LINK = `https://cdn.jsdelivr.net/gh/lunel-store/lunel-bundles@${LUNEL_REPO_VERSION}/init.js`;

  if (window.__lunelInitBootstrapExecuted) return;
  window.__lunelInitBootstrapExecuted = true;

  const script = document.createElement('script');
  script.src = LUNEL_JSDELIVR_LINK;
  script.defer = true;
  script.onload = function () {
    console.log(
      '✅ Lunel Bundles: Successfully loaded ' +
        LUNEL_JSDELIVR_LINK +
        ' from jsDelivr.',
    );
  };
  script.onerror = function () {
    console.error(
      '❌ Lunel Bundles: Failed to load ' +
        LUNEL_JSDELIVR_LINK +
        ' from jsDelivr. Check GitHub / jsDelivr URL.',
    );
  };
  document.head.appendChild(script);
})();
// End: LUNEL_BUNDLES -------------------

document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("square-photos-5");
    if (!container) return;

    const newUrl = "https://cdn.imgchest.com/files/c92ffa0a75de.png";

    const img = container.querySelector("img");
    const source = container.querySelector("source");

    if (img) {
        img.src = newUrl;
        img.setAttribute("data-src", newUrl);
        img.setAttribute("srcset", newUrl);
        img.classList.remove("lazy");
    }

    if (source) {
        source.srcset = newUrl;
        source.setAttribute("data-srcset", newUrl);
    }
});

// 2026-06-26
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