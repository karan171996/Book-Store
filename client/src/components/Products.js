import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Shop.css";

//api
import { useFetchProducts } from "../api/useFetchProducts";

const Products = () => {
  const [product, setProduct] = useState([]);
  const [products, loading] = useFetchProducts();

  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && products.length) {
      setProduct(products);
    }
  }, [products, loading]);

  const productDetailHandler = () => {};

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
              <button
                onClick={() => navigate(`/products/123`, { replace: true })}
              >
                Details
              </button>
              <button>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Products;
