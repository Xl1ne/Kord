(function () {
  const hamburger = document.querySelector(".kord-hamburger");
  const menu = document.getElementById("mobile-menu");
  if (!hamburger || !menu) return;

  const barsIcon = hamburger.querySelector(".bars-icon");
  const crossIcon = hamburger.querySelector(".cross-icon");
  const menuOverlay = document.getElementById("menu-overlay");
  let isOpen = false;

  const headerEl2 = hamburger.closest("header");

  function openMenu() {
    isOpen = true;
    const maxH = Math.min(menu.scrollHeight, Math.floor(window.innerHeight * 0.85));
    menu.style.maxHeight = maxH + "px";
    menu.style.overflowY = "auto";
    menu.setAttribute("aria-hidden", "false");
    hamburger.setAttribute("aria-expanded", "true");
    if (headerEl2) headerEl2.classList.add("menu-open");
    if (barsIcon) barsIcon.classList.add("hidden");
    if (crossIcon) crossIcon.classList.remove("hidden");
    if (menuOverlay) {
      menuOverlay.classList.remove("hidden");
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          menuOverlay.classList.add("is-open");
        });
      });
    }
  }

  function closeMenu() {
    isOpen = false;
    menu.style.maxHeight = "0";
    menu.style.overflowY = "hidden";
    menu.setAttribute("aria-hidden", "true");
    hamburger.setAttribute("aria-expanded", "false");
    if (headerEl2) headerEl2.classList.remove("menu-open");
    if (barsIcon) barsIcon.classList.remove("hidden");
    if (crossIcon) crossIcon.classList.add("hidden");
    if (menuOverlay) {
      menuOverlay.classList.remove("is-open");
      setTimeout(function () {
        menuOverlay.classList.add("hidden");
      }, 300);
    }
  }

  hamburger.addEventListener("click", function () {
    isOpen ? closeMenu() : openMenu();
  });

  if (menuOverlay) {
    menuOverlay.addEventListener("click", closeMenu);
  }

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

let successAutoCloseTimer = null;

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
  if (successAutoCloseTimer) {
    clearTimeout(successAutoCloseTimer);
    successAutoCloseTimer = null;
  }
  modalOverlay.classList.remove("is-open");
  document.body.classList.remove("modal-open");
  setTimeout(() => {
    modalOverlay.classList.add("hidden");
  }, 280);
}

function showModalForm() {
  modalFormView.classList.remove("hidden");
  modalSuccess.classList.remove("flex");
  modalSuccess.classList.add("hidden");
}

function showModalSuccess() {
  modalFormView.classList.add("hidden");
  modalSuccess.classList.remove("hidden");
  modalSuccess.classList.add("flex");
  successAutoCloseTimer = setTimeout(closeModal, 4000);
}

if (modalOverlay) {
  modalOverlay.addEventListener("click", closeModal);
}

if (modalContainer) {
  modalContainer.addEventListener("click", (e) => {
    e.stopPropagation();
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
const nameInput = document.getElementById("name-input");
const agreeCheck = document.getElementById("agree-check");

function isPhoneValid() {
  if (!phoneInput) return false;
  var digits = getDigits(phoneInput.value);
  return digits.length === 10;
}

function showPhoneError(msg) {
  var wrap = phoneInput && phoneInput.closest(".kord-input-wrap");
  if (!wrap) return;
  wrap.classList.add("phone-error");
  var errEl = wrap.querySelector(".phone-error-msg");
  if (errEl) errEl.textContent = msg;
}

function clearPhoneError() {
  var wrap = phoneInput && phoneInput.closest(".kord-input-wrap");
  if (!wrap) return;
  wrap.classList.remove("phone-error");
}

function updateSubmitState() {
  if (!submitBtn) return;
  var phoneOk = isPhoneValid();
  var agreeOk = !agreeCheck || agreeCheck.checked;
  if (phoneOk && agreeOk) {
    submitBtn.classList.remove("btn-submit-disabled");
  } else {
    submitBtn.classList.add("btn-submit-disabled");
  }
}

if (phoneInput) {
  phoneInput.addEventListener("input", function () {
    if (isPhoneValid()) {
      clearPhoneError();
    }
    updateSubmitState();
  });
}

if (agreeCheck) {
  agreeCheck.addEventListener("change", updateSubmitState);
}

var formEl = document.querySelector('#modal-form form');

if (formEl) {
  formEl.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!isPhoneValid()) {
      var digits = getDigits(phoneInput ? phoneInput.value : "");
      showPhoneError(digits.length === 0 ? "Обязательное поле" : "Неправильный формат");
      phoneInput && phoneInput.focus();
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Отправка...";
    }

    var formData = new FormData(formEl);

    fetch("send-form.php", {
      method: "POST",
      body: formData,
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.success) {
          showModalSuccess();
          formEl.reset();
          updateSubmitState();
        } else {
          alert("Ошибка: " + (data.message || "Попробуйте позже"));
        }
      })
      .catch(function () {
        alert("Не удалось отправить заявку. Проверьте соединение.");
      })
      .finally(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Записаться на встречу";
        }
      });
  });
}

updateSubmitState();

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const nav = document.querySelector("header nav");
    const navBottom = nav ? nav.getBoundingClientRect().bottom : 80;
    const targetTop = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: targetTop - navBottom - 16, behavior: "smooth" });
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
  var pos = this.selectionStart;
  var oldLen = this.value.length;
  this.value = digits.length ? format(digits) : "+7";
  var newLen = this.value.length;
  var newPos = pos + (newLen - oldLen);
  try { this.setSelectionRange(Math.max(2, newPos), Math.max(2, newPos)); } catch(e) {}
}

function onFocus() {
  if (!this.value || this.value === "+7") this.value = "+7 (";
  var len = this.value.length;
  try { this.setSelectionRange(len, len); } catch(e) {}
}

function onBlur() {
  var digits = getDigits(this.value);
  if (!digits.length) this.value = "";
}

function onKeydown(e) {
  if (e.key !== "Backspace") {
    if (e.key === "Delete" && this.selectionStart <= 2 && this.selectionEnd <= 2) {
      e.preventDefault();
    }
    return;
  }
  e.preventDefault();
  var val = this.value;
  var selStart = this.selectionStart;
  var selEnd = this.selectionEnd;
  var newVal, digits, newPos;
  if (selStart !== selEnd) {
    var clearStart = Math.max(2, selStart);
    newVal = val.slice(0, clearStart) + val.slice(selEnd);
    digits = getDigits(newVal);
    this.value = digits.length ? format(digits) : "+7";
    newPos = clearStart;
  } else {
    if (selStart <= 2) return;
    var pos = selStart - 1;
    while (pos >= 2 && !/\d/.test(val[pos])) pos--;
    if (pos < 2 || !/\d/.test(val[pos])) return;
    newVal = val.slice(0, pos) + val.slice(pos + 1);
    digits = getDigits(newVal);
    this.value = digits.length ? format(digits) : "+7";
    newPos = pos;
  }
  try { this.setSelectionRange(Math.max(2, newPos), Math.max(2, newPos)); } catch(ex) {}
}

document.querySelectorAll('input[type="tel"]').forEach(function (input) {
  input.addEventListener("input", onInput);
  input.addEventListener("focus", onFocus);
  input.addEventListener("blur", onBlur);
  input.addEventListener("keydown", onKeydown);
});

if (document.querySelector(".objects-swiper")) {
  new Swiper(".objects-swiper", {
    loop: true,
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

if (document.querySelector(".cases-swiper")) {
  new Swiper(".cases-swiper", {
    loop: true,
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

document.querySelectorAll(".property-card").forEach(function (card) {
  card.addEventListener("click", openModal);
});

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
