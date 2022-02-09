import { useEffect, useState } from "react";
import { useFetchProductDetail } from "../api/useFetchProductDetail";
import "./ProductDetail.css";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [productDetail, loading] = useFetchProductDetail("123");
  console.log("productDetail", productDetail);
  useEffect(() => {
    setProduct(productDetail);
  }, [productDetail]);
  return (
    <div className="productDetail-container">
      <h1>{product?.title}</h1>
      <hr />
      <div>
        <img src={product?.imageUrl} alt="product" />
      </div>
      <h2>🇮🇳 {product?.price}</h2>
      <p>{product?.description}</p>
      <button>Add To Cart</button>
    </div>
  );
};
export default ProductDetail;
