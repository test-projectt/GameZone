let userInfo = document.querySelector("#user_info");
let userD = document.querySelector("#user");
let links = document.querySelector(".navbar-nav");

function updateUserInfo() {
    if (localStorage.getItem("username")) {
        links.style.display = "none";
        userInfo.style.display = "block";
        userD.innerHTML = localStorage.getItem("username");
    } else {
        links.style.display = "block";
        userInfo.style.display = "none";
    }
}

updateUserInfo();

let logoutBtn = document.querySelector("#logout-btn");

logoutBtn.addEventListener("click", function() {
    clearCart(); // Clear cart on logout
    localStorage.removeItem("username");
    window.location.href = "Log in.html";
});

// Products
let allproducts = document.querySelector(".products");

let products = [
    { id: 1, Category: "games", title: "FIFA", imageurl: "img/fif.png", price: 60 },
    { id: 2, Category: "accessories", title: "Gaming Headphone", imageurl: "img/headphone.png", price: 150 },
    { id: 3, Category: "Electronic", title: "Computer Gaming", imageurl: "img/pc.png", price: 2499 },
    { id: 4, Category: "accessories", title: "Logitech G502", imageurl: "img/mouse.png", price: 100 },
    { id: 5, Category: "games", title: "SpiderMan", imageurl: "img/spider.jpg", price: 80 },
    { id: 6, Category: "accessories", title: "Gaming Keyboard", imageurl: "img/keyboard-removebg.png", price: 250 },
    { id: 7, Category: "Electronic", title: "Gaming Chair", imageurl: "img/chair.png", price: 400 },
    { id: 8, Category: "games", title: "Mortal Kombat", imageurl: "img/ghost.png", price: 30 },
    { id: 9, Category: "Electronic", title: "Laptop gaming", imageurl: "img/lap.png", price: 1099 }
];

let addItem = [];

function createProductHTML(item) {
    let inCart = addItem.some(cartItem => cartItem.id === item.id);
    let buttonText = inCart ? "Remove From Cart" : "Add To Cart";
    let buttonClass = inCart ? "btn btn-danger" : "btn btn-success";
    
    let isFavorite = favoriteItems.some(favItem => favItem.id === item.id);
    let heartColor = isFavorite ? "green" : "white";

    return `
    <div class="card col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12" style="background-color: #161618; width: 24rem; padding-top: 15px; padding-bottom: 27px; margin-top: 20px;">
        <img src="${item.imageurl}" class="card-img-top">
        <div class="card-body">
            <p style="color: beige;">Category: ${item.Category}</p>
            <h4 style="color: white;" class="card-title">${item.title}</h4>
            <p class="card-price" style="color: aliceblue; font-size: 1.2rem;">Price: ${item.price}$</p>
            <button id="cart-btn-${item.id}" class="add-btn ${buttonClass}">${buttonText}</button>
            <i id="heart-${item.id}" style="color: ${heartColor}; cursor:pointer;" class="fa-solid fa-heart favourit"></i>
        </div>
    </div>
    `;
}

function drawItems() {
    let html = products.map(createProductHTML).join('');
    allproducts.innerHTML = html;

    products.forEach(item => {
        let button = document.getElementById(`cart-btn-${item.id}`);
        button.addEventListener("click", () => {
            if (addItem.some(cartItem => cartItem.id === item.id)) {
                removeFromCart(item.id);
            } else {
                addToCart(item.id);
            }
        });

        let heart = document.getElementById(`heart-${item.id}`);
        heart.addEventListener('click', () => {
            if (favoriteItems.some(favItem => favItem.id === item.id)) {
                removeFromFavorites(item.id, heart);
            } else {
                addToFavorites(item.id, heart);
            }
        });
    });
}

function removeFromCart(id) {
    addItem = addItem.filter(item => item.id !== id);
    localStorage.setItem("ProductsInCart", JSON.stringify(addItem));
    drawCartItems();
    drawItems();
    incrementCart();
}

function addToCart(id) {
    if (!localStorage.getItem("username")) {
        window.location.href = "Log in.html";
        return;
    }

    let choosenItem = products.find((item) => item.id === id);
    let existingItemIndex = addItem.findIndex((item) => item.id === id);

    if (existingItemIndex !== -1) {
        addItem[existingItemIndex].quantity += 1;
    } else {
        addItem.push({ ...choosenItem, quantity: 1 });
    }

    localStorage.setItem("ProductsInCart", JSON.stringify(addItem));
    drawCartItems();
    drawItems();
    incrementCart();
}

function drawCartItems() {
    let mycarts = document.querySelector(".cart-div");
    mycarts.innerHTML = "";

    let html = addItem.map((item) => {
        return `
        <div id="cart-item-${item.id}">
            <p>${item.title} x<span class="pm">${item.quantity}</span>
            <button onclick="changeQuantity(${item.id}, 1)"> <i class="plus fa-solid fa-circle-plus"></i> </button>
            <button onclick="changeQuantity(${item.id}, -1)"> <i class="minus fa-solid fa-circle-minus"></i></button></p>
        </div>
        `;
    }).join('');

    mycarts.innerHTML = html;
}

function changeQuantity(id, change) {
    let itemElem = document.getElementById(`cart-item-${id}`);
    if (itemElem) {
        let quantityElem = itemElem.querySelector(".pm");
        let currentNumber = parseInt(quantityElem.innerText);
        let newNumber = currentNumber + change;
        if (newNumber > 0) {
            quantityElem.innerText = newNumber;
            addItem = addItem.map(item => item.id === id ? { ...item, quantity: newNumber } : item);
            localStorage.setItem("ProductsInCart", JSON.stringify(addItem));
        } else {
            itemElem.remove();
            addItem = addItem.filter(item => item.id !== id);
            localStorage.setItem("ProductsInCart", JSON.stringify(addItem));
        }
        incrementCart();
    }
}

function incrementCart() {
    let cartNumDiv = document.querySelector(".cartnum");
    let newNumber = addItem.length;
    cartNumDiv.innerText = newNumber;
}

function clearCart() {
    localStorage.removeItem("ProductsInCart");
    addItem = [];
    drawCartItems();
    incrementCart();
}

let shoppingCartIcon = document.querySelector(".shopping");
let cartsProducts = document.querySelector(".carts-prod");

shoppingCartIcon.addEventListener("click", function() {
    if (cartsProducts.style.display === "block") {
        cartsProducts.style.display = "none";
    } else {
        cartsProducts.style.display = "block";
    }
});

// Search Function
function searchpage() {
    let searchText = document.querySelector(".search-bar").value.toLowerCase();
    let selectedCategory = document.querySelector("#categoryes").value.toLowerCase();

    let filteredProducts = products.filter((item) => {
        let matchesCategory = selectedCategory === "" || item.Category.toLowerCase() === selectedCategory;
        let matchesSearch = searchText === "" || item.title.toLowerCase().includes(searchText);
        return matchesCategory && matchesSearch;
    });

    let html = filteredProducts.map(createProductHTML).join('');

    if (filteredProducts.length === 0) {
        allproducts.innerHTML = '<p style="color: white; text-align:center; margin-top:200px; font-size:30px;">No products found.</p>';
    } else {
        allproducts.innerHTML = html;
    }
}

document.querySelector(".search-bar").addEventListener("input", searchpage);
document.querySelector("#categoryes").addEventListener("change", searchpage);

// Initialize cart on page load
function initializeCart() {
    let storedCartItems = localStorage.getItem("ProductsInCart");
    if (storedCartItems) {
        addItem = JSON.parse(storedCartItems);
    } else {
        addItem = [];
    }
    drawCartItems();
    incrementCart();
}

document.addEventListener("DOMContentLoaded", function() {
    initializeCart();
    drawItems(); // Draw products when the page loads
});

let favoriteItems = localStorage.getItem("Favorites") ? JSON.parse(localStorage.getItem("Favorites")) : [];

function addToFavorites(id, heartElement) {
    let favoriteProduct = products.find(item => item.id === id);

    if (!favoriteItems.some(item => item.id === id)) {
        favoriteItems.push(favoriteProduct);
        localStorage.setItem("Favorites", JSON.stringify(favoriteItems));
        heartElement.style.color = "green";
    }
}

function removeFromFavorites(id, heartElement) {
    favoriteItems = favoriteItems.filter(item => item.id !== id);
    localStorage.setItem("Favorites", JSON.stringify(favoriteItems));
    heartElement.style.color = "white";
}

document.querySelectorAll('.favourit').forEach((heart, index) => {
    let productId = products[index].id;

    if (favoriteItems.some(item => item.id === productId)) {
        heart.style.color = "green"; 
    }

    heart.addEventListener('click', () => {
        if (favoriteItems.some(item => item.id === productId)) {
            removeFromFavorites(productId, heart);
        } else {
            addToFavorites(productId, heart);
        }
    });
});
