(function () {
  "use strict";

  var html = document.documentElement;

  /* ---------- Theme toggle (persisted) ---------- */
  var themeToggle = document.getElementById("theme-toggle");
  var iconSun = document.getElementById("icon-sun");
  var iconMoon = document.getElementById("icon-moon");

  function applyTheme(isDark) {
    html.classList.toggle("dark", isDark);
    html.classList.toggle("light", !isDark);
    if (iconSun && iconMoon) {
      iconSun.style.display = isDark ? "block" : "none";
      iconMoon.style.display = isDark ? "none" : "block";
    }
  }

  var savedTheme = null;
  try { savedTheme = localStorage.getItem("kn-theme"); } catch (e) { /* storage may be unavailable */ }
  applyTheme(savedTheme !== "light");

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var nowDark = !html.classList.contains("dark");
      applyTheme(nowDark);
      try { localStorage.setItem("kn-theme", nowDark ? "dark" : "light"); } catch (e) { /* ignore */ }
    });
  }

  /* ---------- Mobile nav ---------- */
  var mobileToggle = document.getElementById("mobile-toggle");
  var mobileMenu = document.getElementById("mobile-menu");
  var iconMenu = document.getElementById("icon-menu");
  var iconClose = document.getElementById("icon-close");

  function setMobileOpen(open) {
    mobileMenu.classList.toggle("open", open);
    iconMenu.style.display = open ? "none" : "block";
    iconClose.style.display = open ? "block" : "none";
  }

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener("click", function () {
      setMobileOpen(!mobileMenu.classList.contains("open"));
    });
    mobileMenu.querySelectorAll("[data-nav-mobile]").forEach(function (link) {
      link.addEventListener("click", function () { setMobileOpen(false); });
    });
  }

  /* ---------- Scroll-spy active section ---------- */
  var navLinks = document.querySelectorAll("[data-nav]");
  var mobileLinks = document.querySelectorAll("[data-nav-mobile]");
  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));

  function setActive(id) {
    navLinks.forEach(function (l) { l.classList.toggle("active", l.dataset.nav === id); });
    mobileLinks.forEach(function (l) { l.classList.toggle("active", l.dataset.navMobile === id); });
  }

  if ("IntersectionObserver" in window && sections.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-25% 0px -65% 0px" }
    );
    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ---------- Project filtering ---------- */
  var filterButtons = document.querySelectorAll("[data-filter]");
  var projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterButtons.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      var filter = btn.dataset.filter;
      projectCards.forEach(function (card) {
        var show = filter === "All" || card.dataset.category === filter;
        card.classList.toggle("hidden", !show);
      });
    });
  });

  /* ---------- Subtle 3D tilt on project visualization panels ---------- */
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduceMotion) {
    document.querySelectorAll(".tilt-card").forEach(function (card) {
      var inner = card.querySelector(".tilt-inner");
      if (!inner) return;
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width;
        var y = (e.clientY - r.top) / r.height;
        inner.style.setProperty("--ry", ((x - 0.5) * 14).toFixed(2) + "deg");
        inner.style.setProperty("--rx", ((0.5 - y) * 14).toFixed(2) + "deg");
      });
      card.addEventListener("mouseleave", function () {
        inner.style.setProperty("--ry", "0deg");
        inner.style.setProperty("--rx", "0deg");
      });
    });
  }
})();
