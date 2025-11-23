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



  // ----------------------------------------------------
  // LIQUID DEATH STYLE HERO SLIDER (Swiper Coverflow 3D)
  // ----------------------------------------------------
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



  // ----------------------------------------------------
  // CTA background scroll change
  // ----------------------------------------------------
  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      scrollBg.classList.add('scrolled');
    } else {
      scrollBg.classList.remove('scrolled');
    }
  });



  // ----------------------------------------------------
  // PARALLAX SACHETS
  // ----------------------------------------------------
  const layers = document.querySelectorAll('.sachet-layer');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    layers.forEach((layer, index) => {
      const speed = (index + 1) * 0.15;
      layer.style.transform = `translateY(${scrollY * speed * -0.3}px)`;
    });
  });



  // ----------------------------------------------------
  // 360 PRODUCT ROTATOR
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
      img.src = `/${prefix}${padded}.${ext}`;   // absolute root path (correct for custom domain)
    };

    const onDrag = (clientX) => {
      const rect = viewer.getBoundingClientRect();
      const relativeX = clientX - rect.left;
      const percent = Math.min(Math.max(relativeX / rect.width, 0), 1);
      let frame = Math.floor(percent * totalFrames) + 1;
      frame = Math.max(1, Math.min(frame, totalFrames));
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

    const endDrag = () => dragging = false;

    viewer.addEventListener('mousedown', startDrag);
    viewer.addEventListener('mousemove', moveDrag);
    window.addEventListener('mouseup', endDrag);

    viewer.addEventListener('touchstart', startDrag, { passive: true });
    viewer.addEventListener('touchmove', moveDrag, { passive: true });
    window.addEventListener('touchend', endDrag);
  }



  // ----------------------------------------------------
  // FLAVOUR CARDS ACCENT COLOR
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
  const closeBtn = document.querySelector('.popup-close');

  let popupShown = false;

  const showPopup = () => {
    if (popupShown) return;
    popupShown = true;
    popupOverlay.classList.add('open');
  };

  setTimeout(showPopup, 7000);

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + window.innerHeight;
    const pageHeight = document.body.scrollHeight;
    if (scrollPos / pageHeight > 0.5) showPopup();
  });

  closeBtn.addEventListener('click', () => popupOverlay.classList.remove('open'));
  popupOverlay.addEventListener('click', (e) => {
    if (e.target === popupOverlay) popupOverlay.classList.remove('open');
  });

});
