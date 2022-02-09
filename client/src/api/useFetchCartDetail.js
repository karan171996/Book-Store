import { useEffect, useState } from "react";
import axios from "axios";

export const useFetchCartdetails = () => {
  const [cart, setCartData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  return [cart, loading];
};
