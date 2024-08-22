document.addEventListener("DOMContentLoaded", () => {
  const containers = document.querySelectorAll(".menu-item-container");
  containers.forEach((container) => {
    const image = container.querySelector(".menu-image");
    const altText = image.getAttribute("alt");

    const overlayText = container.querySelector(".overlay-text");
    overlayText.textContent = altText;
  });
});
