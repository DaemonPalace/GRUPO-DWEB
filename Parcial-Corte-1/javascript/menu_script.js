document.addEventListener("DOMContentLoaded", () => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const cartList = document.getElementById("cart_items");
  const totalAmount = document.getElementById("total_amount");

  function addToCart(name, price) {
    console.log(`Adding item to cart: ${name} at $${price}`);
    const item = {
      name: name,
      price: parseFloat(price),
      quantity: 1,
    };

    const existingItem = cartItems.find((i) => i.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push(item);
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    updateCart();
  }

  function updateCart() {
    console.log('Updating cart');
    cartList.innerHTML = "";

    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
      const li = document.createElement("li");
      li.textContent = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`;
      cartList.appendChild(li);
    });

    totalAmount.textContent = `$${total.toFixed(2)}`;
  }

  // Initial cart update
  updateCart();

  // Ensure that event listeners are being attached
  const menuImages = document.querySelectorAll(".menu-image");
  console.log(`Found ${menuImages.length} menu images`);

  menuImages.forEach((image) => {
    image.addEventListener("click", function () {
      const name = this.getAttribute("data-name");
      const price = this.getAttribute("data-price");
      console.log(`Image clicked: ${name} at $${price}`);
      if (name && price) {
        addToCart(name, price);
      } else {
        console.error('Image missing data-name or data-price attributes');
      }
    });
  });

  document.getElementById("checkout_button").addEventListener("click", () => {
    console.log('Proceed to checkout');
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    window.location.href = "pagos.html";
  });
});
