import axios from "axios";

export const postLogin = (payload) => {
  return axios
    .post("/api/auth/login", {
      ...payload,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err?.response;
    });
};
