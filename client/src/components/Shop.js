import { useState, useEffect } from "react";
import axios from "axios";
import "./Shop.css";

//book-image
import book from "../asset/books.jpeg";

const Shop = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get("/api/shops").then((res) => {
      setProduct(res.data.products);
    });
  };
  console.log("products", product);
  return (
    <div className="shop-container">
      <div className="card-container">
        {product.map((item, index) => (
          <div className="card" key={index}>
            <h3>{item?.title}</h3>
            <img className="book-image" src={book} alt="book" />
            <p>This is the random subtitle for this book</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Shop;
