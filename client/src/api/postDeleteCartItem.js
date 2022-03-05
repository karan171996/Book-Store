import axios from "axios";

export const postCartDetails = (id) => {
  return axios
    .post("/api/shops/cart-delete-item", {
      productId: id,
    })
    .then((res) => {
      if (res.status === 200) {
        return true;
      }
    });
};
