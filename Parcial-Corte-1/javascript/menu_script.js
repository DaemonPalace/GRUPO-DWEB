document.addEventListener("DOMContentLoaded", () => {
  const containers = document.querySelectorAll(".menu-item-container");
  containers.forEach((container) => {
    const image = container.querySelector(".menu-image");
    const altText = image.getAttribute("alt");
    const productPrice = image.getAttribute("data-price");
    const productDescription = image.getAttribute("description");

    const overlayText = container.querySelector(".overlay-text");
    overlayText.textContent =
      altText + " - " + productPrice + " - " + productDescription;

    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const cartList = document.getElementById("cart_items");
    const totalAmount = document.getElementById("total_amount");

    // Function to add an item to the cart
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

    // Function to update the cart display
    function updateCart() {
      console.log("Updating cart");
      cartList.innerHTML = "";

      let total = 0;
      cartItems.forEach((item) => {
        total += item.price * item.quantity;
        const li = document.createElement("li");
        li.textContent = `${item.name} - $${item.price.toFixed(2)} x ${
          item.quantity
        }`;
        cartList.appendChild(li);
      });

      totalAmount.textContent = `$${total.toFixed(2)}`;
    }

    // Handle item click to add to cart
    function handleItemClick(event) {
      const target = event.target.closest(".menu-item-container img");
      if (target) {
        const name = target.getAttribute("data-name");
        const price = parseFloat(target.getAttribute("data-price"));
        if (name && price) {
          addToCart(name, price);
        } else {
          console.error("Image missing data-name or data-price attributes");
        }
      }
    }

    // Initial cart update
    updateCart();

    // Ensure that event listeners are being attached
    const menuImages = document.querySelectorAll(".menu-item-container img");
    console.log(`Found ${menuImages.length} menu images`);

    menuImages.forEach((image) => {
      image.addEventListener("click", handleItemClick);
    });

    // Checkout button event listener
    document.getElementById("checkout_button").addEventListener("click", () => {
      console.log("Proceed to checkout");
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      window.location.href = "pagos.html";
    });
  });
});
