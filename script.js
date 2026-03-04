(() => {
  const phone = "+34686284561";

  // Año footer
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Menú móvil
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("nav-menu");

  if (toggle && menu) {
    const closeMenu = () => {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    // Cerrar al clicar un enlace
    menu.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (a && a.getAttribute("href")?.startsWith("#")) closeMenu();
    });

    // Cerrar al clicar fuera
    document.addEventListener("click", (e) => {
      if (!menu.classList.contains("is-open")) return;
      if (e.target.closest(".nav")) return;
      closeMenu();
    });

    // Cerrar con ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }

  // Animaciones al hacer scroll
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        }
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  // Carrusel de opiniones
  const testimonials = [
    {
      quote: "“Todos unos profesionales y conscientes de una urgencia. Me han sorprendido muy gratamente.”",
      who: "— Manuel Molina",
    },
    {
      quote: "“Personas agradables que orientan y dan opciones. En estos tiempos eso no tiene precio.”",
      who: "— Antonio Javier García",
    },
    {
      quote: "“Trabajando con Linagra desde 2019. Renovación de calentador y más trabajos en mi vivienda.”",
      who: "— Hein van Leeuwen",
    },
    {
      quote: "“Buenos profesionales, puntuales y formales. Recomendables 100%.”",
      who: "— Isolina Marín",
    },
  ];

  const quoteEl = document.getElementById("quote");
  const whoEl = document.getElementById("who");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const dotsEl = document.getElementById("dots");

  let idx = 0;
  let timer = null;

  function renderDots() {
    if (!dotsEl) return;
    dotsEl.innerHTML = "";
    testimonials.forEach((_, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", `Ir a la opinión ${i + 1}`);
      b.setAttribute("aria-current", i === idx ? "true" : "false");
      b.addEventListener("click", () => {
        idx = i;
        render();
        restart();
      });
      dotsEl.appendChild(b);
    });
  }

  function render() {
    if (!quoteEl || !whoEl) return;
    quoteEl.textContent = testimonials[idx].quote;
    whoEl.textContent = testimonials[idx].who;
    renderDots();
  }

  function next() {
    idx = (idx + 1) % testimonials.length;
    render();
  }

  function prev() {
    idx = (idx - 1 + testimonials.length) % testimonials.length;
    render();
  }

  function restart() {
    if (timer) window.clearInterval(timer);
    timer = window.setInterval(next, 7000);
  }

  if (quoteEl && whoEl && testimonials.length) {
    render();
    restart();
  }

  if (nextBtn) nextBtn.addEventListener("click", () => { next(); restart(); });
  if (prevBtn) prevBtn.addEventListener("click", () => { prev(); restart(); });

  // Extra: click rápido a llamar si quisieras usarlo en algún sitio
  window.linagraCall = () => window.location.href = `tel:${phone}`;
})();
