import axios from "axios";

export const postLogin = (payload) => {
  return axios
    .post("/api/auth/login", {
      ...payload,
    })
    .then((res) => {
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.log("Login Error", err);
      return false;
    });
};