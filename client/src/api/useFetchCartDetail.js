import { useEffect, useState } from "react";
import axios from "axios";
import { authorisedLoggedIn } from "../utility/authNavigation";
import { useNavigate } from "react-router-dom";

export const useFetchCartdetails = () => {
  const [cart, setCartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/shops/cart")
      .then((res) => {
        setCartData(res?.data);
        setLoading(false);
      })
      .catch((err) => {
        if (!authorisedLoggedIn(err)) {
          navigate("/login");
        }
      });
  }, []);

  return [cart, loading];
};
