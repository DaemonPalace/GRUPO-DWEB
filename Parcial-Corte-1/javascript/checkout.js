document.addEventListener("DOMContentLoaded", () => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const cartList = document.getElementById("cart_items_summary");
  const totalAmount = document.getElementById("total_amount_summary");

  // Function to update the cart summary
  function updateCartSummary() {
    // Clear the current cart display
    cartList.innerHTML = "";

    // Update cart items
    let total = 0;
    cartItems.forEach((item, index) => {
      total += item.price * item.quantity;
      const li = document.createElement("li");
      li.innerHTML = `
        ${item.name} - $${item.price.toFixed(2)} x 
        <input type="number" class="quantity" data-index="${index}" value="${
        item.quantity
      }" min="1">
        <button class="remove" data-index="${index}">Remove</button>
      `;
      cartList.appendChild(li);
    });

    // Update total amount
    totalAmount.textContent = `$${total.toFixed(2)}`;
  }

  // Load cart data and update UI
  updateCartSummary();

  // Event listener for quantity changes
  cartList.addEventListener("change", (event) => {
    if (event.target.classList.contains("quantity")) {
      const index = event.target.getAttribute("data-index");
      const newQuantity = parseInt(event.target.value, 10);
      if (newQuantity > 0) {
        cartItems[index].quantity = newQuantity;
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        updateCartSummary();
      }
    }
  });

  // Event listener for item removal
  cartList.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove")) {
      const index = event.target.getAttribute("data-index");
      cartItems.splice(index, 1);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      updateCartSummary();
    }
  });

  // Event listener for the payment form submission
  document
    .getElementById("payment_form")
    .addEventListener("submit", (event) => {
      // event.preventDefault();
      // // Add your payment processing logic here
      // // Clear the cart data from localStorage
      // localStorage.removeItem("cartItems");
      // // Redirect or show a confirmation message
      // alert("Payment processed successfully!");
      // window.location.href = "Menu_POKE.html"; // Redirect to a confirmation page or home page
    });
});
