// Header shadow once the page scrolls
const header = document.querySelector(".site-header");
const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Mobile navigation
const toggle = document.getElementById("nav-toggle");
const nav = document.getElementById("main-nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});
nav.addEventListener("click", (e) => {
  if (e.target.matches(".nav-link")) {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }
});

// Reveal-on-scroll (once), including the ECG divider draw
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const targets = document.querySelectorAll(".reveal, .ecg-divider");
if (reduceMotion || !("IntersectionObserver" in window)) {
  targets.forEach((el) => el.classList.add("in-view"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
  );
  targets.forEach((el) => observer.observe(el));
}

// Stat count-ups — animate once when the stats band scrolls into view
const counters = document.querySelectorAll(".count");
const runCount = (el) => {
  const target = Number(el.dataset.count);
  const duration = 1000;
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
if (reduceMotion || !("IntersectionObserver" in window)) {
  counters.forEach((el) => (el.textContent = el.dataset.count));
} else if (counters.length) {
  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          runCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((el) => countObserver.observe(el));
}

// Appointment form — demo handler; wire to the booking backend before launch
const form = document.getElementById("appointment-form");
if (form) {
  const errorMsg = document.getElementById("form-error");
  const successMsg = document.getElementById("form-success");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const required = ["f-name", "f-phone", "f-dept"].map((id) => document.getElementById(id));
    let valid = true;
    required.forEach((field) => {
      const empty = !field.value.trim();
      field.classList.toggle("is-invalid", empty);
      if (empty) valid = false;
    });
    errorMsg.hidden = valid;
    if (!valid) return;
    successMsg.hidden = false;
    form.querySelector(".form-submit").disabled = true;
    successMsg.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
  });
  form.addEventListener("input", (e) => {
    if (e.target.classList.contains("is-invalid") && e.target.value.trim()) {
      e.target.classList.remove("is-invalid");
    }
  });
}

// Active nav state follows the visible section
const sections = [...document.querySelectorAll("section[id], footer[id]")];
const navLinks = [...document.querySelectorAll(".main-nav .nav-link")];
if ("IntersectionObserver" in window) {
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((l) =>
          l.classList.toggle("is-active", l.getAttribute("href") === `#${entry.target.id}`)
        );
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach((s) => spy.observe(s));
}
