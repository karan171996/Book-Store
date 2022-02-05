const products = [];

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    products.push(this);
  }
  // it is called not on instantial object, It will be called from Product object itself
  static fetchAll() {
    return products;
  }
};
