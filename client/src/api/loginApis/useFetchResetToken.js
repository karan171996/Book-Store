import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchResetAccount = (token) => {
  const [user, setUser] = useState("");
  useEffect(() => {
    axios
      .get(`/api/auth/reset/${token}`)
      .then((res) => {
        setUser(res?.data?.userId);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  return [user];
};
