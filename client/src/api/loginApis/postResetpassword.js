import axios from "axios";

export const postResetPassword = (payload) => {
  console.log("aaya");
  return axios
    .post("/api/auth/reset-password", {
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
      console.log("err", "resetPassword err");
    });
};
