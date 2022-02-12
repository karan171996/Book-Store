const fs = require("fs");
const path = require("path");
const Cart = require("./cart");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);
module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    fs.readFile(p, (err, data) => {
      let products = [];
      if (!err) {
        // This for the check file created we need to create new entry
        products = [...JSON.parse(data)];
        if (this.id) {
          let existingProduct = products.findIndex(
            (item) => item.id === this.id
          );
          products[existingProduct] = this;
          fs.writeFile(p, JSON.stringify(products), (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log("File writen!!!");
            }
          });
        } else {
          this.id = Math.random().toString();
          products.push(this);
          fs.writeFile(p, JSON.stringify(products), (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log("File writen!!!");
            }
          });
        }
      } else {
        // This for checking file not created
        products.push(this);
        fs.writeFileSync(p, JSON.stringify(products), (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("File writen!!!");
          }
        });
      }
    });
  }

  static deleteById(id) {
    fs.readFile(p, (err, data) => {
      const product = JSON.parse(data).find((item) => item.id === id);
      const updateProducts = JSON.parse(data).filter((item) => item.id !== id);
      fs.writeFile(p, JSON.stringify(updateProducts), (err, data) => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }

  static findById(id, cb) {
    fs.readFile(p, (err, data) => {
      if (err) {
        cb([]);
      } else {
        const product = JSON.parse(data).find((item) => item.id === id);
        cb(product);
      }
    });
  }
  // it is called not on initial object, It will be called from Product object itself
  static fetchAll(cb) {
    fs.readFile(p, (err, data) => {
      if (err) {
        cb([]);
      } else {
        cb(JSON.parse(data));
      }
    });
  }
};
