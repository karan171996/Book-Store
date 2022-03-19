import axios from "axios";

export const postLogin = () => {
  return axios.post("/api/auth/login").then((res) => {
    if (res.status === 200) {
      return true;
    }
  });
};
