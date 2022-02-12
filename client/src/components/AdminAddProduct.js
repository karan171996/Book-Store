import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./Shop.css";

//api
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

  const deleteProductHandler = async (id) => {
    await axios
      .post("/api/admin/delete-product", { productId: id })
      .then((res) => {
        if (res?.status === 200) {
          navigate("/admin/products");
        }
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
                    navigate(`/admin/edit-product/${item.id}?edit=true`)
                  }
                >
                  Edit
                </button>
                <button onClick={() => deleteProductHandler(item.id)}>
                  Delete
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
