import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchAdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get("/api/admin/products").then((res) => {
      setProducts(res?.data?.products || []);
      setLoading(false);
    });
  }, []);

  return [products, loading];
};
