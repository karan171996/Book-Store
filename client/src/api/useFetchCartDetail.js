import { useEffect, useState } from "react";
import axios from "axios";

export const useFetchCartdetails = () => {
  const [cart, setCartData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get("/api/shops/cart").then((res) => {
      console.log("res", res?.data);
      setCartData(res?.data);
      setLoading(false);
    });
  }, []);

  return [cart, loading];
};
