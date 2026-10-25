// 自动更新页脚年份
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// 手机端导航
const toggle = document.getElementById("nav-toggle");
const nav = document.getElementById("main-nav");

toggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

// 点击导航项后自动收起手机菜单
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
  });
});

// 页面滚动时，高亮当前导航项
const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];

const activateNav = () => {
  const offset = window.scrollY + 140;
  let currentId = "";

  for (const section of sections) {
    if (section.offsetTop <= offset) {
      currentId = section.id;
    }
  }

  navLinks.forEach((link) => {
    const targetId = link.getAttribute("href").slice(1);
    link.classList.toggle("active", targetId === currentId);
  });
};

window.addEventListener("scroll", activateNav, { passive: true });
activateNav();
