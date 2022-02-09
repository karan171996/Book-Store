import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useFetchProductDetail } from "../api/useFetchProductDetail";
import { postCartDetails } from "../api/postCartdetails";
import "./ProductDetail.css";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  let urlParams = useParams();
  let navigate = useNavigate();

  const [productDetail, loading] = useFetchProductDetail(urlParams?.productId);
  useEffect(() => {
    setProduct(productDetail);
  }, [productDetail]);

  const addToCartHandler = () => {
    const response = postCartDetails(product?.id);
    if (response) {
      navigate("/cart");
    }
  };
  return (
    <div className="productDetail-container">
      <h1>{product?.title}</h1>
      <hr />
      <div>
        <img src={product?.imageUrl} alt="product" />
      </div>
      <h2>🇮🇳 {product?.price}</h2>
      <p>{product?.description}</p>
      <button onClick={addToCartHandler}>Add To Cart</button>
    </div>
  );
};
export default ProductDetail;
