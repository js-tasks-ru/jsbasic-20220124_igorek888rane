import createElement from "../../assets/lib/create-element.js";
import escapeHtml from "../../assets/lib/escape-html.js";

import Modal from "../../7-module/2-task/index.js";

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (product) {
      let cartItem = this.cartItems.find(
        (item) => item.product.id === product.id
      );
      if (cartItem) {
        cartItem.count++;
      } else {
        cartItem = {
          product,
          count: 1,
        };
        this.cartItems.push(cartItem);
      }

      this.onProductUpdate(this.cartItems);
    } else {
      return;
    }
  }

  updateProductCount(productId, amount) {
    this.cartItems.forEach((item) => {
      if (item.product.id === productId) item.count += amount;
    });

    this.onProductUpdate(this.cartItems);
  }

  isEmpty() {
    return !this.cartItems.length;
  }

  getTotalCount() {
    return this.cartItems.reduce((sum, current) => sum + current.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce(
      (sum, current) => sum + current.product.price * current.count,
      0
    );
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();

    this.modalBody = createElement(`<div></div>`);
    this.modalBody.append(this.renderOrderForm());

    for (let item of this.cartItems) {
      let product = this.renderProduct(item.product, item.count);
      this.modalBody.insertAdjacentElement("afterBegin", product);
    }

    this.modal.setTitle("Your order");
    this.modal.setBody(this.modalBody);
    this.modal.open();

    document.querySelectorAll(".cart-product").forEach((el) => {
      el.addEventListener("click", (event) => {
        if (event.target.closest(".cart-counter__button_plus")) {
          
          this.updateProductCount(el.dataset.productId, 1);
        }
        if (event.target.closest(".cart-counter__button_minus")) {
          
          this.updateProductCount(el.dataset.productId, -1);
        }
      });
    });

    document.querySelector("form").onsubmit = (event) => this.onSubmit(event);
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    if (!document.body.closest(".is-modal-open")) {
      return;
    }

    for (let item of cartItem) {
      let productId = item.product.id;

      if (item.count === 0) {
        cartItem.forEach((item, index) => {
          if (item.count === 0) cartItem.splice(index, 1);
        });

        document.querySelector(`[data-product-id="${productId}"] `).remove();
      } else {
        document.querySelector(
          `[data-product-id="${productId}"] .cart-counter__count`
        ).innerHTML = item.count;

        document.querySelector(
          `[data-product-id="${productId}"] .cart-product__price`
        ).innerHTML = "€" + (item.count * item.product.price).toFixed(2);
      }

      document.querySelector(`.cart-buttons__info-price`).innerHTML =
        "€" + this.getTotalPrice().toFixed(2);
    }
    if (this.cartItems.length === 0) {
      this.modal.close();
    //  document.querySelector('.cart-icon').classList.remove('cart-icon_visible');
    }
  }

  onSubmit(event) {
   
    event.preventDefault();
    document.querySelector('button[type="submit"]').classList.add("is-loading");
    let form = document.querySelector(".cart-form");
    let data = new FormData(form);

    fetch("https://httpbin.org/post", {
      method: "POST",
      body: data,
    }).then((response) => {
      if (response.ok) {
        this.modal.setTitle("Success!");
        this.cartItems = [];
        this.cartIcon.update(this);
       
        
        document
          .querySelector('button[type="submit"]')
          .classList.remove("is-loading");
        document.querySelector('.modal__body').innerHTML = `
           <div class="modal__body-inner">
              <p>
                Order successful! Your order is being cooked :) <br>
                We’ll notify you about delivery time shortly.<br>
                <img src="/assets/images/delivery.gif">
              </p>
          </div>
             `;
      }
    });
    
     
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}


