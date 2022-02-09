import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchProductDetail = (id = "") => {
  const [productDetail, setProductDetail] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios.get(`/api/shops/products/${id}`).then((res) => {
        setProductDetail(res?.data?.product || {});
        setLoading(false);
      });
    }
  }, [id]);

  return [productDetail, loading];
};
