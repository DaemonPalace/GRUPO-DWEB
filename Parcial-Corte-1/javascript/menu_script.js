document.addEventListener("DOMContentLoaded", () => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const cartList = document.getElementById("cart_items");
  const totalAmount = document.getElementById("total_amount");

  // Function to add item to cart
  function addToCart(name, price) {
    const item = {
      name: name,
      price: parseFloat(price),
      quantity: 1,
    };

    // Check if item is already in cart
    const existingItem = cartItems.find((i) => i.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push(item);
    }

    // Save updated cart to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    updateCart();
  }

  // Function to update the cart UI
  function updateCart() {
    // Clear the current cart display
    cartList.innerHTML = "";

    // Update cart items
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
      const li = document.createElement("li");
      li.textContent = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`;
      cartList.appendChild(li);
    });

    // Update total amount
    totalAmount.textContent = `$${total.toFixed(2)}`;
  }

  // Load cart data and update UI
  updateCart();

  // Event listener for "Add to Cart" by clicking images
  document.querySelectorAll(".menu-image").forEach((image) => {
    image.addEventListener("click", function () {
      const name = this.getAttribute("data-name");
      const price = this.getAttribute("data-price");
      addToCart(name, price);
    });
  });

  // Event listener for "Proceed to Checkout" button
  document.getElementById("checkout_button").addEventListener("click", () => {
    // Save the cart data to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Redirect to checkout page
    window.location.href = "pagos.html"; // Change this to your checkout page URL
  });
});
