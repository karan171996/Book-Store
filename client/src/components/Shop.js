import { useState, useEffect } from "react";
import axios from "axios";

const Shop = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const product = fetchProducts().then((res) => res.json());
    console.log("product", product);
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get("/api/shops/");
    return await res;
  };
  return (
    <div>
      <h1>My Products</h1>
      <p>List of All the products....</p>
    </div>
  );
};
export default Shop;
