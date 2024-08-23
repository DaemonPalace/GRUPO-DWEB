document.addEventListener("DOMContentLoaded", () => {
  const containers = document.querySelectorAll(".menu-item-container");
  containers.forEach((container) => {
    const image = container.querySelector(".menu-image");
    const altText = image.getAttribute("alt");

    const overlayText = container.querySelector(".overlay-text");
    overlayText.textContent = altText;
  });
});

// Función para actualizar el total en el carrito
function updateTotal(price) {
  totalAmount += price;
  totalAmountElement.textContent = `$${totalAmount.toFixed(2)}`;
}

// Función para añadir un producto al carrito
function addItemToCart(item) {
  const itemImageSrc = item.querySelector(".menu-image").src;
  const itemName = item.querySelector("img").alt;
  const itemPrice = parseFloat(item.dataset.price); // Asegúrate de que el precio esté en el dataset

  // Crear un nuevo elemento li para el carrito
  const cartItem = document.createElement("li");
  cartItem.classList.add("cart-item");

  // Añadir imagen, nombre y precio al carrito
  cartItem.innerHTML = `
    <img src="${itemImageSrc}" alt="${itemName}" class="cart-item-image" />
    <span class="cart-item-name">${itemName}</span>
    <span class="cart-item-price">$${itemPrice.toFixed(2)}</span>
  `;

  // Añadir el item al ul del carrito
  cartItemsList.appendChild(cartItem);

  // Actualizar el total
  updateTotal(itemPrice);
}

// Añadir un evento de clic a cada elemento del menú
menuItems.forEach((item) => {
  item.addEventListener("click", () => addItemToCart(item));
});
