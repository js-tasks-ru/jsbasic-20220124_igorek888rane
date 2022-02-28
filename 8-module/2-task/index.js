import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};

    this.elem = createElement(`<div class="products-grid"></div>`);
    this.createCard(this.products);
  }
  createCard(products) {
    this.gridProduct = this.cards = products.map((item) => {
      let card = new ProductCard(item);
      item = card.elem;
      return item;
    });

    if (this.gridInner) this.gridInner.remove();
    this.gridInner = createElement('<div class="products-grid__inner"></div>');

    this.cards.forEach((el) => this.gridInner.append(el));
    this.elem.append(this.gridInner);
  }
  updateFilter(filters) {
    for (let key in filters) {
      if (filters[key] === undefined) continue;
      this.filters[key] = filters[key];
    }

    this.productsSort = this.products;

    if (this.filters.noNuts === true) {
      this.productsSort = this.productsSort.filter((el) => el.nuts !== true);
    }
    if (this.filters.vegeterianOnly === true) {
      this.productsSort = this.productsSort.filter(
        (el) => el.vegeterian === true
      );
    }
    if (this.filters.maxSpiciness || this.filters.maxSpiciness === 0) {
      this.productsSort = this.productsSort.filter(
        (el) => el.spiciness <= this.filters.maxSpiciness
      );
    }
    if (this.filters.category ) {
      this.productsSort = this.productsSort.filter(
        (el) => el.category === this.filters.category
      );
    }

    this.createCard(this.productsSort);
  }
}
