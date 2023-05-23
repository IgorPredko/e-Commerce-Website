// products list
const products = [
  {
    id: 0,
    name: "iPhone 13",
    price: 1000.99,
    instock: 100,
    imgSrc: "img/Apple/iPhone 13/iPhone13-01.png",
    numberOfUnits: 1,
  },
  {
    id: 1,
    name: "iPhone 14 Pro Max",
    price: 1200.99,
    instock: 100,
    imgSrc:
      "img/Apple/iPhone 14 Pro Max/iPhone_14_Pro_Max_DeepPurple_5G-plus_lrg1 (1).png",
    numberOfUnits: 1,
  },
  {
    id: 2,
    name: "iPhone 14",
    price: 1400.99,
    instock: 100,
    imgSrc: "img/Apple/iphone 14/iPhone_14_Midnight_5G_plus_lrg1 (1).png",
    numberOfUnits: 1,
  },
  {
    id: 3,
    name: "Galaxy S23 Ultra",
    price: 1100.99,
    instock: 100,
    imgSrc:
      "img/Samsung/Samsung Galaxy S23 Ultra/Samsung_Galaxy_S23_Ultra_Lavender_5G_plus_lrg1 (1).png",
    numberOfUnits: 1,
  },
  {
    id: 4,
    name: "Samsung Galaxy S23+",
    price: 900.99,
    instock: 100,
    imgSrc:
      "img/Samsung/Samsung Galaxy S23+/Samsung_Galaxy_S23_Plus_Green_5G_Plus_lrg1.png",
    numberOfUnits: 1,
  },
  {
    id: 5,
    name: "Samsung Galaxy Z Fold4",
    price: 1250.99,
    instock: 100,
    imgSrc: "img/Samsung/Samsung Galaxy Z Fold4/Untitled (460 × 460 px).png",
    numberOfUnits: 1,
  },
  {
    id: 6,
    name: "Google Pixel 6a",
    price: 1250.99,
    instock: 100,
    imgSrc:
      "img/Google pixel/Google Pixel 6a/Google_Pixel-6a_Black_5G-plus_lrg1_en.png",
    numberOfUnits: 1,
  },
  {
    id: 7,
    name: "Google Pixel 7 Pro",
    price: 1250.99,
    instock: 100,
    imgSrc: "img/Google pixel/Google Pixel 7 Pro/Google_Pixel_7_Pro.png",
    numberOfUnits: 1,
  },
  {
    id: 8,
    name: "Google Pixel 7",
    price: 1250.99,
    instock: 100,
    imgSrc: "img/Google pixel/Google Pixel 7/Google_Pixel_7.png",
    numberOfUnits: 1,
  },
  {
    id: 9,
    name: "Moto G Power",
    price: 1250.99,
    instock: 100,
    imgSrc: "img/Motorola/Moto G Power (2022)/Motorola_G_Power_2022_lrg1.png",
    numberOfUnits: 1,
  },
  {
    id: 10,
    name: "Moto G Stylus 5G",
    price: 1250.99,
    instock: 100,
    imgSrc:
      "img/Motorola/Moto G Stylus 5G/Moto_G_Stylus_Steel_Blue_5G_lrg1 (1).png",
    numberOfUnits: 1,
  },
  {
    id: 11,
    name: "Motorola edge",
    price: 1250.99,
    instock: 100,
    imgSrc:
      "img/Motorola/Motorola edge/Motorola_Edge_Mineral_Gray_5G_lrg1 (1).png",
    numberOfUnits: 1,
  },
];

let cartIcon = document.querySelector("#cart-icon");
let cartt = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

// close cart
closeCart.onclick = () => {
  cartt.classList.remove("active");
};
// open cart
cartIcon.onclick = () => {
  cartt.classList.toggle("active");
};

const productsEl = document.querySelector(".shop-content");
const cartItemsEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".total-title");
const totalItemsInCartEl = document.querySelector("#cart-icon span");

cartItemsEl.innerHTML = "Your cart is empty";
// RENDER PRODUCTS
function renderProdcuts() {
  products.forEach((product) => {
    productsEl.innerHTML += `  <div class="product-box">
    <div class="product-wrap")">
    <img src="${product.imgSrc}"
    alt="${product.name}"
      class="product-img"
     alt="product image">
    <div class="product-description">
      <h2 class="product-title">${product.name}</h2>
      <span class="price">${product.price}</span>
    </div>
    </div>
    <button class="button-hover-addcart button add-cart" onclick="addToCart(${product.id})" style.position = "relative">
    <span>Add to cart</span><i class="fa-solid fa-cart-arrow-down"></i>
    </button> </div>
    `;
  });
}
renderProdcuts();

// cart array
let cart = [];
//add to cart
function addToCart(id) {
  //check if product already exist in cart
  if (cart.some((item) => item.id === id)) {
    alert("Product already in cart");
  } else {
    const item = products.find((product) => product.id === id);

    cart.push({
      ...item,
      numberOfUnits: 1,
    });
  }

  updateCart();
}

// // update cart
function updateCart() {
  renderCartItems();
  renderSubtotal();

  // save cart to local storage
  localStorage.setItem("CART", JSON.stringify(cart));
}

// // calculate and render subtotal
function renderSubtotal() {
  let totalPrice = 0,
    totalItems = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });

  subtotalEl.innerHTML = `Subtotal (${totalItems} items): $${totalPrice.toFixed(
    2
  )}`;
  totalItemsInCartEl.style.display = "block";
  totalItemsInCartEl.innerHTML = totalItems;
}

// render cart items
function renderCartItems() {
  cartItemsEl.innerHTML = ""; // clear cart element
  cart.forEach((item) => {
    cartItemsEl.innerHTML += `
        <div class="cart-item">
            <div class="item-info">
                <img src="${item.imgSrc}" alt="${item.name}">
                <h4>${item.name}</h4>
            </div>
            <div class="unit-wrap">
            <div class="unit-price">
                <small>$</small>${item.price}
            </div>
            <div class="units">
                <div class="btn-minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
                <div class="number">${item.numberOfUnits}</div>
                <div class="btn-plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>
            </div>
            <i class="fa-solid fa-trash-can" onclick="removeItemFromCart(${item.id})"></i>
            </div>
        </div>
      `;
  });
}

// remove item from cart
function removeItemFromCart(id) {
  cart = cart.filter((item) => item.id !== id);

  updateCart();
}

// change number of units for an item
function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;

    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus" && numberOfUnits < item.instock) {
        numberOfUnits++;
      }
    }

    return {
      ...item,
      numberOfUnits,
    };
  });

  updateCart();
}

// popup
const popup = document.getElementById("popup");
const orderPlaced = document.querySelector(".orderPlaced");

function openPopup() {
  popup.classList.add("open-popup");
  orderPlaced.style.display = "block";
}

function closePopup() {
  popup.classList.remove("open-popup");
  orderPlaced.style.display = "none";
}

//buy items
let buyBtn = document.querySelector(".btn-buy");
buyBtn.addEventListener("click", () => {
  if (cartt.textContent.includes("Your cart is empty")) {
    alert("Your cart is empty");
  } else if (cartItemsEl.innerHTML === "") {
    cartItemsEl.innerHTML = "Your cart is empty";
    alert("Your cart is empty");
  } else {
    openPopup();
    cartt.classList.remove("active");
    cartItemsEl.innerHTML = "Your cart is empty";
    totalItemsInCartEl.style.display = "none";
    totalItemsInCartEl.innerHTML = "";
    localStorage.clear();
    subtotalEl.innerHTML = `Total (0 items): $0`;
  }
});
/////////////To the top button///////////////////////
const toTheTop = document.querySelector("#return-to-top");

document.addEventListener("scroll", () => {
  btnVisibility();
});

const btnVisibility = () => {
  if (window.scrollY > 100) {
    toTheTop.style.display = "block";
  } else {
    toTheTop.style.display = "none";
  }
};

toTheTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// SLIDER
const slides = document.querySelectorAll(".slide");

slides.forEach((slide, indx) => {
  slide.style.transform = `translateX(${indx * 100}%)`;
});

const nextSlide = document.querySelector(".btn-next");

let curSlide = 0;
let maxSlide = slides.length - 1;

nextSlide.addEventListener("click", function () {
  if (curSlide === maxSlide) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
  });
});

const prevSlide = document.querySelector(".btn-prev");

prevSlide.addEventListener("click", function () {
  if (curSlide === 0) {
    curSlide = maxSlide;
  } else {
    curSlide--;
  }

  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
  });
});
