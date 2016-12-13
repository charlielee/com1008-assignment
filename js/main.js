/*!
  JavaScript used on the entire website
  Author: Charles Lee
  Created: 03/12/16
*/

var mobileToggle = document.getElementById("mobile-menu-toggle"),
    menuList     = document.getElementById("menu-list");

mobileToggle.addEventListener("click", toggleMenu);
window.addEventListener("load", toggleMenu);

/**
 * Toggles the display of the navigation menu in mobile view
 */
function toggleMenu() {
  menuList.classList.toggle("hidden");
}

