export default class ProductCard {
  constructor(product) {
    this.product = product;
    this.cardProduct = document.createElement(`div`);
    this.cardProduct.classList.add("card");

    this.cardProduct.insertAdjacentHTML(
      "beforeEnd",
      `<div class="card__top">
    <img src="/assets/images/products/${product.image}" class="card__image" alt="product">
    <span class="card__price">€${product.price.toFixed(2)}</span>
  </div>
  <div class="card__body">
    <div class="card__title">${product.name}</div>
    <button type="button" class="card__button">
      <img src="/assets/images/icons/plus-icon.svg" alt="icon">
    </button>
  </div>`
    );
    this.cardProduct.addEventListener('click',(event) =>{
      const btn = event.target.closest('.card__button') 
    if(btn){
      const productAddEvent = new CustomEvent('product-add',{
        detail: this.product.id,
        bubbles : true,
      })
      
    btn.dispatchEvent(productAddEvent);
    }
      
    });
  }
  get elem() {
    return this.cardProduct;
  }
}
