document.addEventListener('DOMContentLoaded', () => {
  // SCROLL REVEAL & WIPES
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

  // CTA background scroll change
  window.addEventListener('scroll', () => {
    if (!scrollBg) return;
    if (window.scrollY > 200) {
      scrollBg.classList.add('scrolled');
    } else {
      scrollBg.classList.remove('scrolled');
    }
  });

  // 360 PRODUCT ROTATION
  const viewer = document.querySelector('.viewer360');
  if (viewer) {
    const img = viewer.querySelector('.viewer360-img');
    const totalFrames = parseInt(viewer.dataset.frames, 10) || 24;
    const prefix = viewer.dataset.prefix || 'product-360-';
    const ext = viewer.dataset.ext || 'png';

    let dragging = false;
    let currentFrame = 1;

    const updateFrame = (frame) => {
      const padded = String(frame).padStart(2, '0'); // 01, 02, ...
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

  // FLAVOUR CARD DYNAMIC ACCENT COLOR
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

  // SACHET CARD DYNAMIC ACCENT COLOR (swiper slides)
  const sachetCards = document.querySelectorAll('.sachet-card');
  sachetCards.forEach(card => {
    const color = card.dataset.color;
    if (color) {
      card.style.borderColor = color + '33';
      const tag = card.querySelector('.tag');
      const pill = card.querySelector('.meta-pill');
      if (tag) tag.style.background = color + '22';
      if (pill) pill.style.background = color + '18';
    }
  });

  // SWIPER INIT (Sachets)
  if (typeof Swiper !== 'undefined') {
    const sachetSwiperEl = document.querySelector('.sachet-swiper');
    if (sachetSwiperEl) {
      // eslint-disable-next-line no-unused-vars
      const sachetSwiper = new Swiper('.sachet-swiper', {
        loop: true,
        spaceBetween: 18,
        slidesPerView: 1.1,
        centeredSlides: true,
        pagination: {
          el: '.sachet-swiper .swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.sachet-swiper .swiper-button-next',
          prevEl: '.sachet-swiper .swiper-button-prev',
        },
        breakpoints: {
          640: {
            slidesPerView: 1.5,
            centeredSlides: true,
          },
          900: {
            slidesPerView: 2.2,
            centeredSlides: false,
          },
          1200: {
            slidesPerView: 3,
            centeredSlides: false,
            spaceBetween: 24,
          },
        },
      });
    }
  }

  // EMAIL POPUP
  const popupOverlay = document.getElementById('email-popup');
  const closeBtn = document.querySelector('.popup-close');
  const form = document.getElementById('popup-form');

  let popupShown = false;

  const showPopup = () => {
    if (popupShown || !popupOverlay) return;
    popupShown = true;
    popupOverlay.classList.add('open');
  };

  // Show after 7 seconds OR when user scrolls past 50% of page height
  setTimeout(showPopup, 7000);

  window.addEventListener('scroll', () => {
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

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('popup-email');
      const email = emailInput ? emailInput.value : '';
      if (!email) return;
      // Here you would normally send the email to your backend or a service like Mailchimp/Klaviyo
      alert(`Thanks, rebel. We will notify: ${email}`);
      if (popupOverlay) popupOverlay.classList.remove('open');
    });
  }
});
