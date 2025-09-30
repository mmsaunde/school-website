// Wait for includes to finish loading before initializing anything
document.addEventListener("includes-loaded", function () {
    // Smooth Scroll To Top
    let calcScrollValue = () => {
      let scrollProgress = document.getElementById("progress");
      let progressValue = document.getElementById("progress-value");
      let pos = document.documentElement.scrollTop || document.body.scrollTop;
      let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      let scrollValue = Math.round((pos * 100) / calcHeight);
  
      if (pos > 100) {
        scrollProgress.style.display = "grid";
      } else {
        scrollProgress.style.display = "none";
      }
  
      scrollProgress.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
  
      scrollProgress.style.background = `conic-gradient(#47633f ${scrollValue}%, #808080 ${scrollValue}%)`;
    };
    window.onscroll = calcScrollValue;
    window.onload = calcScrollValue;
  

    // Highlight Active Page
    const navLinkEls = document.querySelectorAll('.nav__link');
    let windowPathName = window.location.pathname;

    // Normalize root "/" and "/index.html" to the same
    if (windowPathName === '/' || windowPathName === '/index.html') {
      windowPathName = '/index.html';
    }

    navLinkEls.forEach(navLinkEl => {
      let navLinkPathName = new URL(navLinkEl.href).pathname;

      // Normalize for comparison
      if (navLinkPathName === '/' || navLinkPathName === '/index.html') {
        navLinkPathName = '/index.html';
      }

      if (windowPathName === navLinkPathName) {
        navLinkEl.classList.add('active');
      }
    });

  
    // Open & Close Hamburger
    const navEl = document.querySelector('.nav');
    const hamburgerEl = document.querySelector('.hamburger');
    const navItemEls = document.querySelectorAll('.nav__item');
  
    if (hamburgerEl) {
      hamburgerEl.addEventListener('click', () => {
        navEl.classList.toggle('nav--open');
        hamburgerEl.classList.toggle('hamburger--open');
      });
  
      navItemEls.forEach(navItemEl => {
        navItemEl.addEventListener('click', () => {
          navEl.classList.remove('nav--open');
          hamburgerEl.classList.remove('hamburger--open');
        });
      });
    }

  // ---------- Validation ----------
  const validatedForms = document.querySelectorAll('.needs-validation');
  validatedForms.forEach(form => {
    form.addEventListener('submit', (evt) => {
      if (!form.checkValidity()) {
        evt.preventDefault();
        evt.stopPropagation();
        form.classList.add('was-validated');
      }
    }, false);
  });

  // ---------- Submit handling with lock + disable + "Sending..." ----------
  const ENDPOINT = "https://script.google.com/macros/s/AKfycbx5yBZAcCTnm_Wi9PxKFI2DExjUzFMTlIi_BolH3IVNyFW0dl6C3WwHJHYSxTNBE4O4/exec";
  const SUCCESS_URL = "/success.html";
  const formIds = ["feedbackForm", "partnershipForm"];

  formIds.forEach((formId) => {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', async (event) => {
      if (!form.checkValidity()) return; // validation handler above will block
      event.preventDefault();

      // Prevent double-submits
      if (form.dataset.submitting === "true") return;
      form.dataset.submitting = "true";

      const submitBtn = form.querySelector('[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.textContent : null;

      const setDisabled = (on) => {
        Array.from(form.elements).forEach(el => { try { el.disabled = on; } catch(e){} });
        if (submitBtn) {
          submitBtn.textContent = on ? 'Sending...' : (originalBtnText || 'Submit Form');
          submitBtn.setAttribute('aria-busy', on ? 'true' : 'false');
        }
      };

      try {
        // IMPORTANT: build FormData BEFORE disabling controls
        const formData = new FormData(form);
        const body = new URLSearchParams(formData);

        // Now lock the UI
        setDisabled(true);

        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body
        });

        if (res.ok) {
          // Hard redirect to success page (no alerts), same as your previous behavior
          window.location.assign(SUCCESS_URL);
          return;
        } else {
          console.error("Submission failed with status:", res.status);
          setDisabled(false);
          delete form.dataset.submitting;
        }
      } catch (err) {
        console.error("Submission error:", err);
        setDisabled(false);
        delete form.dataset.submitting;
      }
    });
  });

  // ---------- Dialog open/close wiring ----------
  const triggers = [
    { trigger: "feedbackTrigger", dialog: "feedbackDialog" },
    { trigger: "partnershipTrigger", dialog: "partnershipDialog" }
  ];

  triggers.forEach(({ trigger, dialog }) => {
    const triggerEl = document.getElementById(trigger);
    const dialogEl = document.getElementById(dialog);
    if (!triggerEl || !dialogEl) return;

    triggerEl.addEventListener('click', (e) => {
      e.preventDefault();
      dialogEl.showModal();
    });

    dialogEl.addEventListener('click', (e) => {
      if (e.target === dialogEl) dialogEl.close();
    });

    dialogEl.addEventListener('close', () => {
      const form = dialogEl.querySelector('form');
      if (!form) return;
      form.classList.remove('was-validated');
      Array.from(form.elements).forEach(el => { try { el.disabled = false; } catch(e){} });
      delete form.dataset.submitting;
      const submitBtn = form.querySelector('[type="submit"]');
      if (submitBtn) {
        submitBtn.removeAttribute('aria-busy');
        // (optional) reset text if dialog was closed mid-send
        // submitBtn.textContent = 'Submit Form';
      }
    });
  });
});

// Lightbox
     (function() {
        const overlay = document.getElementById('lightbox');
        const imgEl   = document.getElementById('lbImage');
        const counter = document.getElementById('lbCounter');
        const btnPrev = overlay.querySelector('.lb-prev');
        const btnNext = overlay.querySelector('.lb-next');
        const btnClose= overlay.querySelector('.lb-close');

        let gallery = [];   // array of URLs
        let index = 0;      // current index (0-based)
        let lastFocus = null;

        // Build gallery from a trigger's data attributes
        function buildGallery(trigger) {
          const prefix = trigger.getAttribute('data-prefix');
          const ext    = trigger.getAttribute('data-ext') || '.jpeg';
          const count  = parseInt(trigger.getAttribute('data-count') || '0', 10);

          const list = [];
          for (let i = 1; i <= count; i++) {
            list.push(`${prefix}${i}${ext}`);
          }
          return list;
        }

        // Open lightbox with specific gallery and starting index
        function openLightbox(list, startIndex = 0) {
          if (!list || !list.length) return;
          gallery = list.slice();
          index = Math.max(0, Math.min(startIndex, gallery.length - 1));
          lastFocus = document.activeElement;
          document.body.style.overflow = 'hidden';
          overlay.classList.add('lb-open');
          overlay.setAttribute('aria-hidden', 'false');
          render();
          // focus close for accessibility
          btnClose.focus();
          // hide arrows if single image
          const one = gallery.length === 1;
          btnPrev.classList.toggle('lb-hidden', one);
          btnNext.classList.toggle('lb-hidden', one);
        }

        function closeLightbox() {
          overlay.classList.remove('lb-open');
          overlay.setAttribute('aria-hidden', 'true');
          document.body.style.overflow = '';
          // clear image to free memory
          imgEl.src = '';
          if (lastFocus && lastFocus.focus) lastFocus.focus();
        }

        function render() {
          const src = gallery[index];
          imgEl.src = src;
          imgEl.alt = `Image ${index + 1} of ${gallery.length}`;
          counter.textContent = `${index + 1} / ${gallery.length}`;
          // Preload neighbors for speed
          preload(index + 1);
          preload(index - 1);
        }

        function preload(i) {
          if (i < 0 || i >= gallery.length) return;
          const pre = new Image();
          pre.src = gallery[i];
        }

        function next() {
          index = (index + 1) % gallery.length;
          render();
        }
        function prev() {
          index = (index - 1 + gallery.length) % gallery.length;
          render();
        }

        // Click bindings on tiles
        document.querySelectorAll('.lb-trigger').forEach(el => {
          el.addEventListener('click', (e) => {
            e.preventDefault();
            const list = buildGallery(el);
            openLightbox(list, 0);
          });
        });

        // Controls
        btnNext.addEventListener('click', next);
        btnPrev.addEventListener('click', prev);
        btnClose.addEventListener('click', closeLightbox);

        // Click on backdrop closes (but ignore clicks on stage or controls)
        overlay.addEventListener('click', (e) => {
          const stage = e.target.closest('.lb-stage');
          const closeBtn = e.target.closest('.lb-close');
          const arrow = e.target.closest('.lb-arrow');
          if (!stage && !closeBtn && !arrow) closeLightbox();
        });

        // Keyboard
        document.addEventListener('keydown', (e) => {
          if (!overlay.classList.contains('lb-open')) return;
          switch (e.key) {
            case 'Escape': closeLightbox(); break;
            case 'ArrowRight': next(); break;
            case 'ArrowLeft': prev(); break;
          }
        });

        // Touch swipe
        let touchStartX = null;
        overlay.addEventListener('touchstart', (e) => {
          if (e.touches && e.touches.length === 1) {
            touchStartX = e.touches[0].clientX;
          }
        }, {passive: true});
        overlay.addEventListener('touchend', (e) => {
          if (touchStartX === null) return;
          const endX = (e.changedTouches && e.changedTouches[0]?.clientX) || touchStartX;
          const dx = endX - touchStartX;
          const SWIPE_MIN = 40; // px
          if (dx > SWIPE_MIN) { prev(); }
          else if (dx < -SWIPE_MIN) { next(); }
          touchStartX = null;
        });
      })();
