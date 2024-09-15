let ProductsInCart = localStorage.getItem("ProductsInCart")
    ? JSON.parse(localStorage.getItem("ProductsInCart"))
    : [];

function drawCartProducts() {
    let myProductsDiv = document.querySelector(".my-products");
    let totalPriceDiv = document.querySelector(".total-price");

    if (ProductsInCart.length === 0) {
        myProductsDiv.innerHTML = '<p style="color: white; text-align:center; margin-top:200px; font-size:30px;">Your cart is empty.</p>';
        totalPriceDiv.innerHTML = 'Total Price : $0';
        return;
    }

    let html = ProductsInCart.map((item) => {
        return `
        <div class="card col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12" style="background-color: #161618; width: 24rem; padding-top: 15px; margin-top: 20px; margin-bottom:30px;">
            <img src="${item.imageurl}" class="card-img-top">
            <div class="card-body">
              <p style="color: beige;">Category: ${item.Category}</p>
              <h4 style="color: white;" class="card-title">${item.title}</h4>
              <p class="card-price" style="color: aliceblue; font-size: 1.2rem;">Price: ${item.price}$</p>
              <p class="card-quantity" style="color: aliceblue; font-size: 1rem;">Quantity: ${item.quantity}</p>
              <button class="btn btn-success" style="background-color: #9b1818; border: none;" onclick="removeFromCart(${item.id})">Remove From Cart</button>
            </div>
          </div>
        `;
    }).join('');

    myProductsDiv.innerHTML = html;

    let totalPrice = ProductsInCart.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);

    totalPriceDiv.innerHTML = `Total Price: $${totalPrice.toFixed(2)}`;
}

function removeFromCart(id) {
    ProductsInCart = ProductsInCart.filter(item => item.id !== id);
    localStorage.setItem("ProductsInCart", JSON.stringify(ProductsInCart));
    drawCartProducts();
}

function clearCart() {
    localStorage.removeItem("ProductsInCart");
    ProductsInCart = [];
    drawCartProducts();
}

document.addEventListener("DOMContentLoaded", drawCartProducts);

let clearCartBtn = document.querySelector("#clear-cart-btn");
if (clearCartBtn) {
    clearCartBtn.addEventListener("click", clearCart);
}

let favoriteItems = localStorage.getItem("Favorites") ? JSON.parse(localStorage.getItem("Favorites")) : [];

// Function to draw favorite products
function drawFavoriteProducts() {
    let bestoDiv = document.querySelector(".besto");

    if (favoriteItems.length === 0) {
        bestoDiv.innerHTML = '<p style="color: white; text-align:center; margin-top:200px; font-size:30px;">No favorites added yet.</p>';
        return;
    }

    let html = favoriteItems.map((item) => {
        return `
        <div class="card col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 " style="background-color: #161618; width: 24rem; padding-top: 15px; margin-top: 20px; margin-bottom:30px;">
            <img src="${item.imageurl}" class="card-img-top">
            <div class="card-body">
                <p style="color: beige;">Category: ${item.Category}</p>
                <h4 style="color: white;" class="card-title">${item.title}</h4>
                <p class="card-price" style="color: aliceblue; font-size: 1.2rem;">Price: ${item.price}$</p>
                <button class="btn btn-danger" onclick="removeFromFavorites(${item.id})">Remove from Favorites</button>
            </div>
        </div>
        `;
    }).join('');

    bestoDiv.innerHTML = html;
}

// Function to remove product from favorites
function removeFromFavorites(id) {
    favoriteItems = favoriteItems.filter(item => item.id !== id);
    localStorage.setItem("Favorites", JSON.stringify(favoriteItems));
    drawFavoriteProducts(); // Re-draw the favorites section
}

drawFavoriteProducts();
