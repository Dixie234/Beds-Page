// Declare variables

const cartBtn = document.querySelector('.cartBtn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const productsDOM = document.querySelector('.products-center');

// Placing information for the cart
let cart = [];

//Getting the products
class Products {
 async getProducts() {
  try {
     let result = await fetch("products.json");
     let data = await result.json();
     let products = data.items;
     products = products.map(item => {
       const {title,price} = item.fields;
       const {id} = item.sys;
       const image = item.fields.image.fields.file.url;
       return {title,price,id,image}
     })
     return products
  } catch(error) {
    console.log(error);
  }
 }
}

//Display Products
class UI {
displayProducts(products) {
  let result = '';
  products.forEach(product => {
    result += `
<!-- single product-->
     <article class="product">
       <div class="img-container">
         <img src= ${product.image}
         class = "product-img"/>
         <button class = "bag-btn" data-id=${product.id}>
           <i class = "fas fa-shopping cart"></i>
           add to cart
         </button>
       </div>
       <h3>${product.title}</h3>
       <h4>$${product.price}</h4>
     </article>
<!-- end of single product-->
    `;
  });
  productsDOM.innerHTML = result;
 }
}

//Local Storage
class Storage {
 static saveProducts(products) {
   localStorage.setItem("products",JSON.stringify(products));
 }
}

document.addEventListener("DOMContentLoaded",() => {
  const ui = new UI();
  const products = new Products();

//Get all products
products.getProducts().then(products => {
  ui.displayProducts(products);
  Storage.saveProducts(products);
 });
});
