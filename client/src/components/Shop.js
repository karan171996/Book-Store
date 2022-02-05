import { useState, useEffect } from "react";
import axios from "axios";

//api
// import { fetchProducts } from "../api/fetchProducts";

const Shop = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get("/api/shops").then((res) => {
      setProduct(res?.data?.products || []);
    });
  };

  return (
    <div>
      <h1>My Products</h1>
      <p>List of All the products....</p>
    </div>
  );
};
export default Shop;
