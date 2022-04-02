import axios from "axios";

export const postResetAccount = (payload) => {
  return axios
    .post("/api/auth/new-password", {
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
      console.log("err", "resetAccount err");
    });
};
