import axios from "axios";

export const postLogout = () => {
  console.log("aaya");
  return axios.post("/api/auth/logout").then((res) => {
    if (res.status === 200) {
      return true;
    }
  });
};
