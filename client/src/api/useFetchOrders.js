import { useState, useEffect } from "react";
import axios from "axios";
import { authorisedLoggedIn } from "../utility/authNavigation";
import { useNavigate } from "react-router-dom";

export const useFetchOrders = () => {
  const [orders, setOrders] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/shops/orders`)
      .then((res) => {
        setOrders(res?.data?.orders || {});
        setLoading(false);
      })
      .catch((err) => {
        if (!authorisedLoggedIn(err)) {
          navigate("/login");
        }
      });
  }, []);

  return [orders, loading];
};
