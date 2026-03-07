(function () {
  const hamburger = document.querySelector(".kord-hamburger");
  const menu = document.getElementById("mobile-menu");
  if (!hamburger || !menu) return;

  const barsIcon = hamburger.querySelector(".bars-icon");
  const crossIcon = hamburger.querySelector(".cross-icon");
  let isOpen = false;

  function openMenu() {
    isOpen = true;
    menu.style.maxHeight = menu.scrollHeight + "px";
    menu.setAttribute("aria-hidden", "false");
    hamburger.setAttribute("aria-expanded", "true");
    if (barsIcon) barsIcon.classList.add("hidden");
    if (crossIcon) crossIcon.classList.remove("hidden");
  }

  function closeMenu() {
    isOpen = false;
    menu.style.maxHeight = "0";
    menu.setAttribute("aria-hidden", "true");
    hamburger.setAttribute("aria-expanded", "false");
    if (barsIcon) barsIcon.classList.remove("hidden");
    if (crossIcon) crossIcon.classList.add("hidden");
  }

  hamburger.addEventListener("click", function () {
    isOpen ? closeMenu() : openMenu();
  });

  menu.querySelectorAll(".mobile-menu-link").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth >= 1024 && isOpen) closeMenu();
  });
})();

const modalOverlay = document.getElementById("modal-overlay");
const modalContainer = document.getElementById("modal-container");
const modalFormView = document.getElementById("modal-form");
const modalSuccess = document.getElementById("modal-success");

function openModal() {
  document.body.classList.add("modal-open");
  modalOverlay.classList.remove("hidden");
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      modalOverlay.classList.add("is-open");
    });
  });
  showModalForm();
}

function closeModal() {
  modalOverlay.classList.remove("is-open");
  document.body.classList.remove("modal-open");
  setTimeout(() => {
    modalOverlay.classList.add("hidden");
  }, 280);
}

function showModalForm() {
  modalFormView.classList.remove("hidden");
  modalSuccess.classList.add("hidden");
}

function showModalSuccess() {
  modalFormView.classList.add("hidden");
  modalSuccess.classList.remove("hidden");
}

if (modalOverlay) {
  modalOverlay.addEventListener("click", function (e) {
    if (e.target === modalOverlay) closeModal();
  });
}

document.addEventListener("keydown", function (e) {
  if (
    e.key === "Escape" &&
    modalOverlay &&
    !modalOverlay.classList.contains("hidden")
  ) {
    closeModal();
  }
});

const submitBtn = document.getElementById("modal-submit");
const phoneInput = document.getElementById("phone-input");
const agreeCheck = document.getElementById("agree-check");

if (submitBtn) {
  submitBtn.addEventListener("click", function () {
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

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const headerEl = document.querySelector("header");
const heroEl = document.querySelector('[aria-label="Главный экран"]');
if (headerEl) {
  window.addEventListener(
    "scroll",
    function () {
      const threshold = heroEl
        ? heroEl.offsetHeight + heroEl.offsetTop
        : window.innerHeight;
      headerEl.classList.toggle("header-scrolled", window.scrollY > threshold);
    },
    { passive: true },
  );
}

function getDigits(value) {
  var raw = value.replace(/\D/g, "");
  if (raw.charAt(0) === "7" || raw.charAt(0) === "8") raw = raw.slice(1);
  return raw.slice(0, 10);
}

function format(digits) {
  var r = "+7";
  if (digits.length > 0) r += " (" + digits.slice(0, 3);
  if (digits.length >= 3) r += ") " + digits.slice(3, 6);
  if (digits.length >= 6) r += "-" + digits.slice(6, 8);
  if (digits.length >= 8) r += "-" + digits.slice(8, 10);
  return r;
}

function onInput() {
  var digits = getDigits(this.value);
  this.value = digits.length ? format(digits) : "";
}

function onFocus() {
  if (!this.value) this.value = "+7 (";
}

function onBlur() {
  var bad = ["+7", "+7 ", "+7 ("];
  if (bad.indexOf(this.value) !== -1) this.value = "";
}

function onKeydown(e) {
  var bad = ["+7", "+7 ", "+7 ("];
  if (e.key === "Backspace" && bad.indexOf(this.value) !== -1) {
    this.value = "";
    e.preventDefault();
  }
}

document.querySelectorAll('input[type="tel"]').forEach(function (input) {
  input.addEventListener("input", onInput);
  input.addEventListener("focus", onFocus);
  input.addEventListener("blur", onBlur);
  input.addEventListener("keydown", onKeydown);
});

if (document.querySelector(".objects-swiper")) {
  new Swiper(".objects-swiper", {
    slidesPerView: 4,
    spaceBetween: 16,
    navigation: {
      prevEl: ".objects-prev",
      nextEl: ".objects-next",
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 12,
        slidesPerGroup: 1,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 16,
        slidesPerGroup: 2,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 16,
        slidesPerGroup: 4,
      },
    },
  });
}

if (document.querySelector(".cases-swiper")) {
  new Swiper(".cases-swiper", {
    loop: true,
    loopAdditionalSlides: 3,
    slidesPerView: 1,
    spaceBetween: 16,
    navigation: {
      prevEl: ".cases-prev",
      nextEl: ".cases-next",
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 12,
      },
      769: {
        slidesPerView: 2,
        spaceBetween: 16,
      },
      1025: {
        slidesPerView: 3,
        spaceBetween: 16,
      },
    },
  });
}

if (document.querySelector(".team-swiper")) {
  new Swiper(".team-swiper", {
    loop: true,
    slidesPerView: 4,
    spaceBetween: 16,
    navigation: {
      prevEl: ".team-prev",
      nextEl: ".team-next",
    },
    breakpoints: {
      0: {
        slidesPerView: 1.15,
        spaceBetween: 12,
        slidesPerGroup: 1,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 16,
        slidesPerGroup: 1,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 16,
        slidesPerGroup: 1,
      },
    },
  });
}

const animTargets = document.querySelectorAll(".js-animate");

if (animTargets.length) {
  const animObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          animObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  animTargets.forEach((el) => animObserver.observe(el));
}
