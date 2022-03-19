import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuthCookie } from "../reducers/cookieReducer";

import "./Shop.css";

//api
import { postCartDetails } from "../api/postCartdetails";
import { useFetchProducts } from "../api/useFetchProducts";

const Products = () => {
  const [product, setProduct] = useState([]);
  const [products, loading] = useFetchProducts();
  const pageActive = useSelector(selectAuthCookie);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && products.length) {
      setProduct(products);
    }
  }, [products, loading]);

  const addToCartHandler = (id) => {
    postCartDetails(id).then(() => {
      navigate("/cart");
    });
  };

  return (
    <div className="shop-container">
      <div className="card-container">
        {product.map((item, index) => (
          <div className="card" key={index}>
            <h3>{item?.title}</h3>
            <img className="book-image" src={item.imageUrl} alt="book" />
            <div className="description-section">
              <p className="description">{item?.description}</p>
              <p className="price">{item?.price}</p>
              <div className="button-section">
                <button
                  onClick={() =>
                    navigate(`/products/${item._id}`, { replace: true })
                  }
                >
                  Details
                </button>
                {pageActive && (
                  <button onClick={() => addToCartHandler(item?._id)}>
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Products;
