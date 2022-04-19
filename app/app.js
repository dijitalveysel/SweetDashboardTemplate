import { Counter } from "./libs/counter-animation/counter.js";
import { VanillaTilt } from "./libs/vanilla-tilt/vanilla-tilt.js";
import { TiltConfig } from "./constants/tilt-config.js";

/**
 * Get Elements
 */
const toggleElement = document.querySelector("#toggle");
let sidebarElement = document.querySelector("#sidebar");
let pageBodyElement = document.querySelector("#pageBody");
const cards = pageBodyElement.querySelectorAll(".card");
const numbers = document.querySelectorAll(".card>.card-information>.number");

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

/**
 * Counter Init Function
 */
Counter.init(numbers, 10);

/**
 * VanillaTilt Init Function
 */
VanillaTilt.init(cards, TiltConfig);
