//Start Of Cart

//Remove with 'X' btn
const removeBtn = document.getElementsByClassName("btn-remove");

for (i = 0; i < removeBtn.length; i++) {
  let button = removeBtn[i];
  button.addEventListener("click", removeCartItem);
}

function removeCartItem(event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.parentElement.remove();
  monitorCart();
  updateCartTotal();
}

//Increase amount buttons
const subtractBtn = document.getElementsByClassName("subtract");
const addBtn = document.getElementsByClassName("add");

function addAndSubtract() {
  for (i = 0; i < subtractBtn.length; i++) {
    let button = subtractBtn[i];
    button.onclick = function () {
      button.nextElementSibling.firstElementChild.value--;
      input = button.nextElementSibling.firstElementChild.value;
      if (isNaN(input) || input <= 0) {
        button.nextElementSibling.firstElementChild.value = 1;
      }
      updateCartTotal();
    };
  }
  //addBtn
  for (i = 0; i < addBtn.length; i++) {
    let button = addBtn[i];
    button.onclick = function () {
      button.previousElementSibling.firstElementChild.value++;
      input = button.previousElementSibling.firstElementChild.value;
      if (isNaN(input) || input <= 0) {
        button.previousElementSibling.firstElementChild.value = 1;
      }
      updateCartTotal();
    };
  }
}
addAndSubtract();

//Price value increase total
let quantityInput = document.getElementsByClassName("item-amount");
for (i = 0; i < quantityInput.length; i++) {
  let input = quantityInput[i].firstElementChild;
  input.addEventListener("change", quantityChanged);
}

function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

//Add to Cart Button
let addToCartButton = document.querySelectorAll(".quick-add-options > ul > li");
console.log(addToCartButton);

for (i = 0; i < addToCartButton.length; i++) {
  let button = addToCartButton[i];
  button.addEventListener("click", addToCartClicked);
}

//select elements to add in new div
function addToCartClicked(event) {
  let button = event.target;
  console.log(button);

  let productContentBox =
    button.parentElement.parentElement.parentElement.parentElement.parentElement
      .parentElement;
  console.log(productContentBox);
  let name = productContentBox.getElementsByClassName("pc_name_price")[0]
    .firstElementChild.innerText;
  let size = button.innerText;
  let color = productContentBox
    .getElementsByClassName("pc_details")[0]
    .getElementsByTagName("span")[1].innerText;
  let price = productContentBox
    .getElementsByClassName("pc_details")[0]
    .getElementsByTagName("span")[0].innerText;
  let imageSrc = productContentBox.getElementsByTagName("img")[0].src;
  addItemToCart(name, color, price, imageSrc, size);
  updateCartTotal();
}

function addItemToCart(name, color, price, imageSrc, size) {
  let cartItems = document.createElement("div");
  cartItems.classList.add("cart-items");
  let cartInfo = document
    .getElementsByClassName("cart-info")[0]
    .getElementsByTagName("li")[0];
  //Prevent Duplicate on click addToCart
  let cartDuplicateTitle = cartInfo.getElementsByClassName("cart-item-name");
  for (let i = 0; i < cartDuplicateTitle.length; i++) {
    if (cartDuplicateTitle[i].innerText == name) {
      alert("It is working");
      return;
    }
  }
  // Styling created div to cart
  cartItemsContents = `
    <div>
      <img src="${imageSrc}" alt="speaker" />
    </div>
    <div>
      <div class="space-between">
        <span class="cart-item-name">${name}</span>
        <button class="btn-remove">×</button>
      </div>
      <div class="cart-item-des">
        <span>size: ${size}</span>
        <span>color: ${color}</span>
      </div>
      <div class="space-between">
        <div>
          <button class="subtract">-</button>
          <span class="item-amount"> <input type="number" value="1"></span>
          <button class="add">+</button>
        </div>
        <span class="cart-price">${price}</span>
    </div>`;
  cartItems.innerHTML = cartItemsContents;
  let allCartItems = document.getElementsByClassName("scroll-items")[0];
  //add full div end of cart
  allCartItems.appendChild(cartItems);
  cartItems
    .getElementsByClassName("btn-remove")[0]
    .addEventListener("click", removeCartItem);
  cartItems
    .getElementsByClassName("subtract")[0]
    .addEventListener("click", addAndSubtract);
  cartItems
    .getElementsByClassName("add")[0]
    .addEventListener("click", addAndSubtract);
  cartItems
    .getElementsByClassName("item-amount")[0]
    .addEventListener("change", quantityChanged);
  monitorCart();
}

//Update prices
function updateCartTotal() {
  let cartItemContainer = document.getElementsByClassName("cart-info")[0];
  let cartItemRows = cartItemContainer.getElementsByClassName("cart-items");
  let total = 0;

  for (i = 0; i < cartItemRows.length; i++) {
    let cartRow = cartItemRows[i];
    let priceElement = cartRow.getElementsByClassName("cart-price")[0];
    let quantityElement = cartRow.getElementsByClassName("item-amount")[0]
      .firstElementChild;
    let price = parseFloat(priceElement.innerText.replace("$", " "));
    let quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;

  // This adds dollar sign infront of price and round to 2 decimal place
  document.querySelector(
    ".cart-total"
  ).firstElementChild.firstElementChild.innerText = "$" + total.toFixed(2);
}

// Clear cartBtn
const clearBtn = document.querySelector(".clear-btn");
let allCartItems = document.getElementsByClassName("scroll-items")[0];
clearBtn.onclick = function (child) {
  while (allCartItems.firstChild) {
    allCartItems.removeChild(allCartItems.firstChild);
  }
  monitorCart();
  updateCartTotal();
};
//End Of Cart

// this handler will be executed every time the hamburger-menu is clicked

// Variables
let hamburgerBtn = document.querySelector(".hamburger-btn");
let hamburgerBtnClose = document.querySelector(".hamberger-btn_close");
let hamburgerMenu = document.querySelector(".hamburger-menu");
let sidebarOverlay = document.querySelector(".sidebar-overlay");

// Open and close side links
let sideMenu = () => {
  showMenu();
  closeMenu();
};

function showMenu() {
  hamburgerBtn.addEventListener("click", () => {
    if (hamburgerBtn) {
      hamburgerMenu.classList.add("open-menu");
    }
  });
}

function closeMenu() {
  closeBtns = [hamburgerBtnClose, sidebarOverlay];
  closeBtns.forEach((element) => {
    element.addEventListener("click", () => {
      if (hamburgerBtnClose) {
        hamburgerMenu.classList.remove("open-menu");
      }
    });
  });
}

sideMenu();

// This will monitor the amount of item within the cart
function monitorCart() {
  const itemAmt = document.querySelector(".cart-item-amount");
  let allCartItems = document.getElementsByClassName("scroll-items")[0];
  let emptyCart = document.querySelector(".emptyCart");
  let cartItemRows = allCartItems.getElementsByClassName("cart-items");
  let emptyCartDiv = `
  <div class="emptyCart">
    <p>You have no iteam in your bag</p>
  </div>`;

  amtOfItem = cartItemRows.length;
  if (amtOfItem >= 1 && emptyCart) {
    emptyCart.parentNode.removeChild(emptyCart);
  }
  // Add 'emptyCartDiv' when 'itemAmt' is zero
  if (amtOfItem === 0) {
    allCartItems.innerHTML = emptyCartDiv;
  }
  // Add scroll if there more than 3 item
  if (amtOfItem > 3) {
    allCartItems.setAttribute("style", "overflow-y:scroll;");
  } else {
    allCartItems.removeAttribute("style", "overflow-y:scroll;");
  }
  itemAmt.innerText = amtOfItem;
}

// Remove logo brands on resizing and load
function resizeEvent() {
  let logos = document.querySelectorAll(".logo");
  let logosArr = Array.from(logos);
  let logoBrand = document.querySelector(".logo_brands");

  ["resize", "load"].forEach(function (event) {
    window.addEventListener(event, () => {
      // 2 logos will be shown if screen width is below 767
      if (screen.width <= 767) {
        if (logosArr.length > 2) {
          let twoLogos = logosArr.slice(0, 2);
          //this is an empty array to push new logos into
          let newLogosArr = [];
          // loop through 'twoLogos' and add each to logoBrands
          twoLogos.forEach((el) => {
            newLogosArr.push(el.outerHTML);
            logoBrand.innerHTML = newLogosArr;
          });
        }
      } else {
        logos.style.display = "block";
      }
    });
  });
}
resizeEvent();
