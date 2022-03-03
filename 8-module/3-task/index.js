export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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
    this.cartItems.forEach((item, index) => {
      if (item.product.id === productId) item.count += amount;
      if (item.count == 0) this.cartItems.splice(index, 1);
    });

    this.onProductUpdate(this.cartItems);
  }

  isEmpty() {
    return !this.cartItems.length;
  }

  getTotalCount() {
    return  this.cartItems
      .map((el) => el.count)
      .reduce((sum, current) => sum + current);

   
  }

  getTotalPrice() {
    return  this.cartItems
      .map((el) => el.product.price * el.count)
      .reduce((sum, current) => sum + current);

   
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}
