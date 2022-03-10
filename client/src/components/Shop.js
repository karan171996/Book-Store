import { useState, useEffect } from "react";
import "./Shop.css";
import { useNavigate } from "react-router-dom";

//api
import { postCartDetails } from "../api/postCartdetails";
import { useFetchProducts } from "../api/useFetchProducts";

const Shop = () => {
  const [product, setProduct] = useState([]);
  const [products, loading] = useFetchProducts();

  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && products.length) {
      setProduct(products);
    }
  }, [products, loading]);

  const addToCartHandler = (id) => {
    const response = postCartDetails(id);
    if (response) {
      navigate("/cart");
    }
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
                <button onClick={() => addToCartHandler(item?.id)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Shop;
