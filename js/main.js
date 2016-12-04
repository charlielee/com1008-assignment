var mobileToggle = document.getElementById("mobile-menu-toggle"),
    menuList     = document.getElementById("menu-list");

mobileToggle.addEventListener("click", toggleMenu);

/**
 * Toggles the display of the navigation menu in mobile view
 */
function toggleMenu() {
  if (menuList.classList.contains("visible")) {
    menuList.classList.remove("visible");
  } else {
    menuList.classList.add("visible");
  }
}