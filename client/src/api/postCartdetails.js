import axios from "axios";

export const postCartDetails = (id) => {
  return axios
    .post("/api/shops/cart", {
      productId: id,
    })
    .then((res) => {
      console.log("res", res);
      if (res.status === 200) {
        return true;
      }
    });
};
