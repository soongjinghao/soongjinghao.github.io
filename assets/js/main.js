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

// 没有外部链接的奖项：点击后预览证书图片
const awardDialog = document.getElementById("award-preview-dialog");
const awardImage = document.getElementById("award-preview-image");
const awardTitle = document.getElementById("award-preview-title");
const awardClose = awardDialog?.querySelector(".award-dialog-close");
const awardTriggers = document.querySelectorAll(".award-preview");
let lastAwardTrigger = null;

const closeAwardDialog = () => {
  if (awardDialog?.open) awardDialog.close();
};

awardTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const title = trigger.dataset.awardTitle || "奖项图片";
    const image = trigger.dataset.awardImage || "assets/ward/avatar.avif";

    lastAwardTrigger = trigger;
    awardImage.src = image;
    awardImage.alt = `${title}图片`;
    awardTitle.textContent = title;
    awardDialog.showModal();
    document.body.classList.add("award-dialog-open");
  });
});

awardClose?.addEventListener("click", closeAwardDialog);

awardDialog?.addEventListener("click", (event) => {
  if (event.target === awardDialog) closeAwardDialog();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && awardDialog?.open) {
    event.preventDefault();
    closeAwardDialog();
  }
});

awardDialog?.addEventListener("close", () => {
  document.body.classList.remove("award-dialog-open");
  lastAwardTrigger?.focus();
});

awardImage?.addEventListener("error", () => {
  if (!awardImage.src.endsWith("/assets/ward/avatar.avif")) {
    awardImage.src = "assets/ward/avatar.avif";
  }
});
