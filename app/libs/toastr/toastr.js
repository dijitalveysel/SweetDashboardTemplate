import { DEFAULT_OPTIONS } from "./default-options.js";
import { createContainer } from "./functions.js";

export default class Toast {
  #toastElem;
  #autoCloseInterval;
  #removeBinded;
  #timeVisible = 0;
  #autoClose;
  #progressInterval;
  #isPaused = false;
  #unpause;
  #pause;
  #visibilityChange;
  #shouldUnPause;

  /**
   * @param {number} options.autoClose Auto close time.
   * @param {string} options.status Statuses: primary, secondary, success, danger, warning, info.
   * @param {string} options.text Toast text.
   * @param {string} options.position Positions: top-left, top-right, top-center, bottom-right, bottom-left, bottom-center.
   * @param {boolean} options.pauseOnHover
   * @param {boolean} options.pauseOnFocusLoss
   * @param {boolean} options.canClose
   */
  constructor(options) {
    this.#toastElem = document.createElement("div");
    this.#toastElem.classList.add("toast");
    requestAnimationFrame(() => {
      this.#toastElem.classList.add("show");
    });
    this.#removeBinded = this.remove.bind(this);
    this.#unpause = () => (this.#isPaused = false);
    this.#pause = () => (this.#isPaused = true);
    this.#visibilityChange = () => {
      this.#shouldUnPause = document.visibilityState === "visible";
    };
    this.update({ ...DEFAULT_OPTIONS, ...options });
  }

  set status(value) {
    this.#toastElem.classList.add(`bg-${value}`);
  }

  set autoClose(value) {
    this.#autoClose = value;
    this.#timeVisible = 0;
    if (value === false) return;

    let lastTime;
    const func = (time) => {
      if (this.#shouldUnPause) {
        lastTime = null;
        this.#shouldUnPause = false;
      }
      if (lastTime == null) {
        lastTime = time;
        this.#autoCloseInterval = requestAnimationFrame(func);
        return;
      }
      if (!this.#isPaused) {
        this.#timeVisible += time - lastTime;
        if (this.#timeVisible >= this.#autoClose) {
          this.remove();
          return;
        }
      }

      lastTime = time;
      this.#autoCloseInterval = requestAnimationFrame(func);
    };

    this.#autoCloseInterval = requestAnimationFrame(func);
  }

  set position(value) {
    const currentContainerElem = this.#toastElem.parentElement;
    const selector = `.toast-container[data-position=${value}]`;
    const containerElem =
      document.querySelector(selector) || createContainer(value);
    containerElem.append(this.#toastElem);
    if (currentContainerElem == null || currentContainerElem.hasChildNodes())
      return;
    currentContainerElem.remove();
  }

  set text(value) {
    this.#toastElem.textContent = value;
  }

  set canClose(value) {
    this.#toastElem.classList.toggle("can-close", value);
    if (value) {
      this.#toastElem.addEventListener("click", this.#removeBinded);
      return;
    }
    this.#toastElem.removeEventListener("click", this.#removeBinded);
  }

  set showProgress(value) {
    this.#toastElem.classList.toggle("progress", value);
    this.#toastElem.style.setProperty("--progress", 1);

    if (value) {
      const func = () => {
        if (!this.#isPaused) {
          this.#toastElem.style.setProperty(
            "--progress",
            1 - this.#timeVisible / this.#autoClose
          );
        }
        this.#progressInterval = requestAnimationFrame(func);
      };

      this.#progressInterval = requestAnimationFrame(func);
    }
  }

  set pauseOnHover(value) {
    if (value) {
      this.#toastElem.addEventListener("mouseover", this.#pause);
      this.#toastElem.addEventListener("mouseleave", this.#unpause);
    } else {
      this.#toastElem.removeEventListener("mouseover", this.#pause);
      this.#toastElem.removeEventListener("mouseleave", this.#unpause);
    }
  }

  set pauseOnFocusLoss(value) {
    if (value) {
      document.addEventListener("visibilitychange", this.#visibilityChange);
    } else {
      document.removeEventListener("visibilitychange", this.#visibilityChange);
    }
  }

  update(options) {
    Object.entries(options).forEach(([key, value]) => {
      this[key] = value;
    });
  }

  remove() {
    cancelAnimationFrame(this.#autoCloseInterval);
    cancelAnimationFrame(this.#progressInterval);
    const container = this.#toastElem.parentElement;
    this.#toastElem.classList.remove("show");
    this.#toastElem.addEventListener("transitionend", () => {
      this.#toastElem.remove();
      if (container.hasChildNodes()) return;
      container.remove();
    });
    this.onClose();
  }
}
