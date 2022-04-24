export function createContainer(position) {
  const containerElem = document.createElement("div");
  containerElem.classList.add("toast-container");
  containerElem.dataset.position = position;
  document.body.append(containerElem);
  return containerElem;
}
