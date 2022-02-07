import { useState, useEffect } from "react";
import "./Shop.css";

//api
import { useFetchProducts } from "../api/fetchProducts";

const Shop = () => {
  const [product, setProduct] = useState([]);
  const [products, loading] = useFetchProducts();

  useEffect(() => {
    if (!loading && products.length) {
      setProduct(products);
    }
  }, [products, loading]);

  return (
    <div className="shop-container">
      <div className="card-container">
        {product.map((item, index) => (
          <div className="card" key={index}>
            <h3>{item?.title}</h3>
            <img className="book-image" src={item.imageUrl} alt="book" />
            <p>{item?.description}</p>
            <p>{item?.price}</p>
            <div className="button-section">
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Shop;
