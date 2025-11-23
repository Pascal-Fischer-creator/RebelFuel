document.addEventListener('DOMContentLoaded', () => {

  // ----------------------------------------------------
  // SCROLL REVEAL & WIPES
  // ----------------------------------------------------
  const revealEls = document.querySelectorAll('.fade-in, .fade-slide-up, .scroll-reveal, .wipe-section');
  const scrollBg = document.querySelector('.scroll-bg-change');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  revealEls.forEach(el => revealObserver.observe(el));

  // CTA BACKGROUND SCROLL CHANGE
  if (scrollBg) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
        scrollBg.classList.add('scrolled');
      } else {
        scrollBg.classList.remove('scrolled');
      }
    });
  }

  // ----------------------------------------------------
  // PARALLAX SACHETS
  // ----------------------------------------------------
  const layers = document.querySelectorAll('.sachet-layer');
  if (layers.length > 0) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      layers.forEach((layer, index) => {
        const speed = (index + 1) * 0.15;
        layer.style.transform = `translateY(${scrollY * speed * -0.3}px)`;
      });
    });
  }

  // ----------------------------------------------------
  // 360 PRODUCT ROTATION
  // ----------------------------------------------------
  const viewer = document.querySelector('.viewer360');
  if (viewer) {
    const img = viewer.querySelector('.viewer360-img');
    const totalFrames = parseInt(viewer.dataset.frames, 10) || 24;
    const prefix = viewer.dataset.prefix || 'product-360-';
    const ext = viewer.dataset.ext || 'png';

    let dragging = false;
    let currentFrame = 1;

    const updateFrame = (frame) => {
      const padded = String(frame).padStart(2, '0');
      img.src = `${prefix}${padded}.${ext}`;
    };

    const onDrag = (clientX) => {
      const rect = viewer.getBoundingClientRect();
      const relativeX = clientX - rect.left;
      const percent = Math.min(Math.max(relativeX / rect.width, 0), 1);
      let frame = Math.floor(percent * totalFrames) + 1;
      if (frame < 1) frame = 1;
      if (frame > totalFrames) frame = totalFrames;
      if (frame !== currentFrame) {
        currentFrame = frame;
        updateFrame(frame);
      }
    };

    const startDrag = (e) => {
      dragging = true;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      onDrag(clientX);
    };

    const moveDrag = (e) => {
      if (!dragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      onDrag(clientX);
    };

    const endDrag = () => {
      dragging = false;
    };

    viewer.addEventListener('mousedown', startDrag);
    viewer.addEventListener('mousemove', moveDrag);
    window.addEventListener('mouseup', endDrag);

    viewer.addEventListener('touchstart', startDrag, { passive: true });
    viewer.addEventListener('touchmove', moveDrag, { passive: true });
    window.addEventListener('touchend', endDrag);
  }

  // ----------------------------------------------------
  // FLAVOUR CARD DYNAMIC ACCENT COLOR
  // ----------------------------------------------------
  const flavorCards = document.querySelectorAll('.flavor-card');
  flavorCards.forEach(card => {
    const color = card.dataset.color;
    if (color) {
      card.style.borderColor = color + '33';
      const tag = card.querySelector('.tag');
      const pill = card.querySelector('.meta-pill');
      if (tag) tag.style.background = color + '22';
      if (pill) pill.style.background = color + '18';
    }
  });

  // ----------------------------------------------------
  // EMAIL POPUP
  // ----------------------------------------------------
  const popupOverlay = document.getElementById('email-popup');
  const closeBtn = popupOverlay ? popupOverlay.querySelector('.popup-close') : null;
  const popupForm = document.getElementById('popup-form');

  let popupShown = false;

  const showPopup = () => {
    if (!popupOverlay || popupShown) return;
    popupShown = true;
    popupOverlay.classList.add('open');
  };

  // Show after 7 seconds
  setTimeout(showPopup, 7000);

  // Or when user scrolls past 50% page height
  window.addEventListener('scroll', () => {
    if (!popupOverlay || popupShown) return;
    const scrollPos = window.scrollY + window.innerHeight;
    const pageHeight = document.body.scrollHeight;
    if (scrollPos / pageHeight > 0.5) {
      showPopup();
    }
  });

  if (closeBtn && popupOverlay) {
    closeBtn.addEventListener('click', () => popupOverlay.classList.remove('open'));
    popupOverlay.addEventListener('click', (e) => {
      if (e.target === popupOverlay) {
        popupOverlay.classList.remove('open');
      }
    });
  }

  // Let FormSubmit handle submission – no preventDefault
  if (popupForm) {
    popupForm.addEventListener('submit', () => {
      popupShown = true;
      // optional: popupOverlay.classList.remove('open');
      // but page will redirect anyway due to FormSubmit
    });
  }

  // ----------------------------------------------------
  // LIQUID DEATH STYLE HERO SLIDER (Swiper Coverflow 3D)
  // ----------------------------------------------------
  if (typeof Swiper !== 'undefined') {
    const heroSwiper = new Swiper('.hero-swiper', {
      loop: true,
      centeredSlides: true,
      slidesPerView: 1.3,
      spaceBetween: 40,
      speed: 600,
      grabCursor: true,

      effect: 'coverflow',
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 140,
        modifier: 1.4,
        scale: 0.9,
        slideShadows: false
      },

      autoplay: {
        delay: 3500,
        disableOnInteraction: false
      },

      breakpoints: {
        768: {
          slidesPerView: 2.3,
          spaceBetween: 50
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 60
        }
      }
    });
  }

}); // END DOMContentLoaded

