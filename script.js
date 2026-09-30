/* ============================================================
   交互脚本：主题切换 / 移动端菜单 / 滚动动画 / 导航高亮
   一般不需要修改这个文件
   ============================================================ */

(function () {
  "use strict";

  /* ---------- 主题：跟随系统，记住用户选择 ---------- */
  var root = document.documentElement;
  var toggle = document.getElementById("themeToggle");

  var saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}

  var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(saved || (prefersDark ? "dark" : "light"), false);

  function setTheme(theme, persist) {
    root.setAttribute("data-theme", theme);
    if (persist) {
      try { localStorage.setItem("theme", theme); } catch (e) {}
    }
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark", true);
    });
  }

  /* ---------- 移动端菜单 ---------- */
  var menuBtn = document.getElementById("menuBtn");
  var navLinks = document.getElementById("navLinks");

  function closeMenu() {
    if (!navLinks) return;
    navLinks.classList.remove("is-open");
    if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
  }

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function () {
      var open = navLinks.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    navLinks.addEventListener("click", function (e) {
      if (e.target.tagName === "A") closeMenu();
    });
    document.addEventListener("click", function (e) {
      if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) closeMenu();
    });
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---------- 滚动时给导航加分隔线 ---------- */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle("is-stuck", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- 元素进入视口时淡入 ---------- */
  var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var group = Array.prototype.slice.call(
          entry.target.parentElement ? entry.target.parentElement.children : []
        );
        var index = Math.max(0, group.indexOf(entry.target));
        entry.target.style.transitionDelay = Math.min(index * 70, 280) + "ms";
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.08 });

    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- 导航高亮当前区块 ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
  var links = navLinks ? Array.prototype.slice.call(navLinks.querySelectorAll("a")) : [];

  if (sections.length && links.length && "IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- 页脚年份自动更新 ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
