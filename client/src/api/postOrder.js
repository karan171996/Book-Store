import axios from "axios";

export const postOrder = () => {
  return axios.post("/api/shops/create-order").then((res) => {
    if (res.status === 200) {
      return true;
    }
  });
};
