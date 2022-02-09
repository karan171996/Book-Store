const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      let existingProduct = cart.products.find((item) => item.id === id);
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
      } else {
        updatedProduct = { id: id, qty: 1 };
      }
      cart.totalPrice += productPrice;
      cart.products = [...cart.products, updatedProduct];
      fs.writeFileSync(p, JSON.stringify(cart), (err) => {
        if (err) {
          console.log("Error While writing into cart!!!");
        }
      });
    });
  }
};
