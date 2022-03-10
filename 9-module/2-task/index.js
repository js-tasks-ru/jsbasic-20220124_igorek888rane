import Carousel from "../../6-module/3-task/index.js";
import slides from "../../6-module/3-task/slides.js";

import RibbonMenu from "../../7-module/1-task/index.js";
import categories from "../../7-module/1-task/categories.js";

import StepSlider from "../../7-module/4-task/index.js";
import ProductsGrid from "../../8-module/2-task/index.js";

import CartIcon from "../../8-module/1-task/index.js";
import Cart from "../../8-module/4-task/index.js";

export default class Main {
  constructor() {}

  async render() {
    this.carousel = new Carousel(slides);
    let carouselHolder = document.querySelector("[data-carousel-holder]");
    carouselHolder.append(this.carousel.elem);

    this.ribbonMenu = new RibbonMenu(categories);
    let ribbonMenuHolder = document.querySelector("[data-ribbon-holder]");
    ribbonMenuHolder.append(this.ribbonMenu.elem);

    this.stepSlider = new StepSlider({ steps: 5, value: 3 });
    let sliderHolder = document.querySelector("[data-slider-holder]");
    sliderHolder.append(this.stepSlider.elem);

    this.cartIcon = new CartIcon();
    let cartIconHolder = document.querySelector("[data-cart-icon-holder]");
    cartIconHolder.append(this.cartIcon.elem);

    this.cart = new Cart(this.cartIcon);

    const response = await fetch("products.json").then((response) =>
      response.json()
    );
    this.productsGrid = new ProductsGrid(response);
    let productsGridHolder = document.querySelector(
      "[data-products-grid-holder]"
    );
    productsGridHolder.append(this.productsGrid.elem);

    this.productsGrid.updateFilter({
      noNuts: document.getElementById("nuts-checkbox").checked,
      vegeterianOnly: document.getElementById("vegeterian-checkbox").checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value,
    });

    document.body.addEventListener("product-add", (event) => {
      response.forEach((el) => {
        if (el.id === event.detail) this.cart.addProduct(el);
      });
    });

    document.body.addEventListener("slider-change", (event) => {
      this.productsGrid.updateFilter({
        maxSpiciness: event.detail,
      });
    });

    document.body.addEventListener("ribbon-select", (event) => {
      this.productsGrid.updateFilter({
        category: event.detail,
      });
    });

    let noNuts = document.querySelector('#nuts-checkbox')
    noNuts.addEventListener('change',(event) => {
      this.productsGrid.updateFilter({
        noNuts: event.target.checked,
      });

    })

    let vegeterianOnly = document.querySelector('#vegeterian-checkbox')
    vegeterianOnly.addEventListener('change',(event) => {
      this.productsGrid.updateFilter({
        vegeterianOnly: event.target.checked,
      });

    })
    
  }
}
