const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);
module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    fs.readFile(p, (err, data) => {
      let products = [];
      if (!err) {
        // This for the check fle created we need to create new entry
        products = [...JSON.parse(data)];
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("File writen!!!");
          }
        });
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
  // it is called not on instantial object, It will be called from Product object itself
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
