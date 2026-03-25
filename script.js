const root = document.documentElement;

const toast = (msg) => {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.hidden = false;
  t.style.opacity = "1";
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => {
    t.style.opacity = "0";
    setTimeout(() => (t.hidden = true), 200);
  }, 1400);
};

// Copy buttons
document.querySelectorAll("[data-copy]").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const val = btn.getAttribute("data-copy");
    try {
      await navigator.clipboard.writeText(val);
      toast(`Copied: ${val}`);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = val;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      toast(`Copied: ${val}`);
    }
  });
});

// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Theme toggle (persists)
const themeToggle = document.getElementById("themeToggle");
const saved = localStorage.getItem("theme");
if (saved === "light") root.classList.add("light");

const setThemeLabel = () => {
  const icon = themeToggle.querySelector(".icon");
  const isLight = root.classList.contains("light");
  icon.textContent = isLight ? "☀" : "☾";
};
setThemeLabel();

themeToggle.addEventListener("click", () => {
  root.classList.toggle("light");
  localStorage.setItem("theme", root.classList.contains("light") ? "light" : "dark");
  setThemeLabel();
});

// Mobile menu
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
  const isOpen = !mobileMenu.hidden;
  mobileMenu.hidden = isOpen;
  hamburger.setAttribute("aria-expanded", String(!isOpen));
});

mobileMenu.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    mobileMenu.hidden = true;
    hamburger.setAttribute("aria-expanded", "false");
  });
});