var mobileToggle = document.getElementById("mobile-menu-toggle"),
    menuList     = document.getElementById("menu-list");

mobileToggle.addEventListener("click", toggleMenu);
window.addEventListener("load", toggleMenu);

/**
 * Toggles the display of the navigation menu in mobile view
 */
function toggleMenu() {
  if (menuList.classList.contains("hidden")) {
    menuList.classList.remove("hidden");
  } else {
    menuList.classList.add("hidden");
  }
}

