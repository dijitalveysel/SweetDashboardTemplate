export default class Counter {
  constructor() {}

  static init(elements, duration) {
    if (elements instanceof Node) {
      elements = [elements];
    }

    if (elements instanceof NodeList) {
      elements = [...elements];
    }

    if (!(elements instanceof Array)) {
      return;
    }

    elements.forEach((element) => {
      const limit = parseInt(element.innerText);
      const start = 0;
      if (isNaN(limit)) {
        return;
      }
      this.#counterAnimate(element, start, limit, duration);
    });
  }

  static #counterAnimate(element, start, end, duration) {
    if (start === end) return;
    const range = end - start;
    let current = start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    let timer = setInterval(() => {
      current += increment;
      element.innerHTML = current;
      if (current == end) {
        clearInterval(timer);
      }
    }, stepTime);
  }
}
