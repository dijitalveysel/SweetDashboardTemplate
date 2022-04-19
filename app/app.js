/**
 * Get Elements
 */
const toggleElement = document.querySelector("#toggle");
let sidebarElement = document.querySelector("#sidebar");
let pageBodyElement = document.querySelector("#pageBody");

/**
 * Build Out Functions
 */
function menuToggle() {
  sidebarElement.classList.toggle("active");
  pageBodyElement.classList.toggle("active");
}

/**
 * Hook Up The Event Listeners
 */
toggleElement.addEventListener("click", menuToggle);
