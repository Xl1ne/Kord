/* MODAL */
const modalOverlay   = document.getElementById('modal-overlay');
const modalContainer = document.getElementById('modal-container');
const modalFormView  = document.getElementById('modal-form');
const modalSuccess   = document.getElementById('modal-success');

function openModal() {
  document.body.classList.add('modal-open');
  modalOverlay.classList.remove('hidden');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      modalOverlay.classList.add('is-open');
    });
  });
  showModalForm();
}

function closeModal() {
  modalOverlay.classList.remove('is-open');
  document.body.classList.remove('modal-open');
  setTimeout(() => {
    modalOverlay.classList.add('hidden');
  }, 280);
}

function showModalForm() {
  modalFormView.classList.remove('hidden');
  modalSuccess.classList.add('hidden');
}

function showModalSuccess() {
  modalFormView.classList.add('hidden');
  modalSuccess.classList.remove('hidden');
}

if (modalOverlay) {
  modalOverlay.addEventListener('click', function (e) {
    if (e.target === modalOverlay) closeModal();
  });
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && modalOverlay && !modalOverlay.classList.contains('hidden')) {
    closeModal();
  }
});

/* FORM SUBMIT */
const submitBtn  = document.getElementById('modal-submit');
const phoneInput = document.getElementById('phone-input');
const agreeCheck = document.getElementById('agree-check');

if (submitBtn) {
  submitBtn.addEventListener('click', function () {
    if (!phoneInput || !phoneInput.value.trim()) {
      phoneInput && phoneInput.focus();
      return;
    }
    if (agreeCheck && !agreeCheck.checked) {
      agreeCheck.focus();
      return;
    }
    showModalSuccess();
  });
}

/* SMOOTH SCROLL */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ШАПКА */
const headerEl = document.querySelector('header');
if (headerEl) {
  window.addEventListener('scroll', function () {
    headerEl.classList.toggle('header-scrolled', window.scrollY > 80);
  }, { passive: true });
}

/* ОБЪЕКТЫ */
if (document.querySelector('.objects-swiper')) {
  new Swiper('.objects-swiper', {
    slidesPerView: 4,
    spaceBetween: 16,
    navigation: {
      prevEl: '.objects-prev',
      nextEl: '.objects-next',
    },
  });
}

/* КОМАНДА */
if (document.querySelector('.team-swiper')) {
  new Swiper('.team-swiper', {
    loop: true,
    slidesPerView: 4,
    spaceBetween: 16,
    navigation: {
      prevEl: '.team-prev',
      nextEl: '.team-next',
    },
  });
}

/* SCROLL ENTRY ANIMATIONS */
const animTargets = document.querySelectorAll('.js-animate');

if (animTargets.length) {
  const animObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          animObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  animTargets.forEach(el => animObserver.observe(el));
}
