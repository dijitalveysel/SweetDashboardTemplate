import { Counter } from "./libs/counter-animation/counter.js";
import { VanillaTilt } from "./libs/vanilla-tilt/vanilla-tilt.js";
import { TiltConfig } from "./constants/tilt-config.js";

/**
 * Get Elements
 */
const toggleElement = document.querySelector("#toggle");
const sidebarElement = document.querySelector("#sidebar");
const pageBodyElement = document.querySelector("#pageBody");
const cards = pageBodyElement.querySelectorAll(".card");
const numbers = document.querySelectorAll(".card>.card-information>.number");
const loader = document.querySelector("#loader");
const tableBody = pageBodyElement.querySelector("table#sweetCandies tbody");

/**
 * Build Out Functions
 */
function menuToggle() {
  sidebarElement.classList.toggle("active");
  pageBodyElement.classList.toggle("active");
}

function showLoader(duration) {
  setTimeout(() => {
    loader.style.display = "none";
  }, duration);
}

/**
 * Hook Up The Event Listeners
 */
toggleElement.addEventListener("click", menuToggle);

/**
 * Counter Init Function
 */
Counter.init(numbers, 10);

/**
 * VanillaTilt Init Function
 */
VanillaTilt.init(cards, TiltConfig);

/**
 * Loader Showing Duration
 */
showLoader(2000);
