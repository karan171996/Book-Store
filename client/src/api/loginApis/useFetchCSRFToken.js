import { useEffect } from "react";
import axios from "axios";

export const useFetchCSRFToken = () => {
  useEffect(() => {
    getCSRFToken();
  }, []);

  const getCSRFToken = async () => {
    const response = await axios.get("/api/getCSRFToken");
    axios.defaults.headers.post["X-CSRF-Token"] = response.data.CSRFToken;
  };
};
