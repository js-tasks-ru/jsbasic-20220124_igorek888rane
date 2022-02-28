import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.render();
    this.scroll();
    this.selectRibbon();
    this.arrowLeft.classList.remove("ribbon__arrow_visible");
    this.arrowRight.classList.add("ribbon__arrow_visible");
  }
  render() {
    this.ribbon = createElement(
      `<div class="ribbon">
    <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>

    <nav class="ribbon__inner"></nav>
    
    <button class="ribbon__arrow ribbon__arrow_right ">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
  </div>`
    );

    this.ribbonInner = this.ribbon.querySelector(".ribbon__inner");

    for (const el of this.categories) {
      this.ribbonInner.insertAdjacentHTML(
        "beforeEnd",
        `<a href="#" class="ribbon__item" data-id="${el.id}">${el.name}</a>`
      );
    }

    return this.ribbon;
  }
  scroll() {
    this.arrowLeft = this.ribbon.querySelector(".ribbon__arrow_left");
    this.arrowRight = this.ribbon.querySelector(".ribbon__arrow_right");


    this.ribbon.addEventListener("click", (event) => {
      if (event.target.closest(".ribbon__arrow_right")) {
        this.ribbonInner.scrollBy(350, 0);
        this.arrowLeft.classList.add("ribbon__arrow_visible");

        if (this.ribbonInner.scrollWidth-this.ribbonInner.scrollLeft-this.ribbonInner.clientWidth < 1) {
          this.arrowRight.classList.remove("ribbon__arrow_visible");
        }
      }
      if (event.target.closest(".ribbon__arrow_left ")) {
        this.ribbonInner.scrollBy(-350, 0);
        
        this.arrowRight.classList.add("ribbon__arrow_visible");
        if (this.ribbonInner.scrollLeft === 0) {
          this.arrowLeft.classList.remove("ribbon__arrow_visible");
        }
      }
    });
  }
  selectRibbon() {
    this.ribbon.addEventListener("click", (event) => {
      event.preventDefault();
      this.ribbonItem = event.target.closest(".ribbon__item");
      this.itemActive = this.ribbon.querySelector(".ribbon__item_active");

      if (this.ribbonItem) {
        this.ribbonItem.classList.add("ribbon__item_active");
        const ribbonSelect = new CustomEvent("ribbon-select", {
          detail: this.ribbonItem.dataset.id,
          bubbles: true,
        });
        this.ribbonItem.dispatchEvent(ribbonSelect);
        if (this.itemActive) {
          this.itemActive.classList.remove("ribbon__item_active");
        }
      }
    });
  }
}
