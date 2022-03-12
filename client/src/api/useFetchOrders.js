import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchOrders = () => {
  const [orders, setOrders] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/shops/orders`).then((res) => {
      setOrders(res?.data?.orders || {});
      setLoading(false);
    });
  }, []);

  return [orders, loading];
};
