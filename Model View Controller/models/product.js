const products = [];

module.exports = class Product {
  constructor(title) {
    this.title = t;
  }

  save() {
    products.push(this);
  }

  static fetchAll() {
    return this.products;
  }
};
