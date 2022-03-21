import axios from "axios";

export const postSignup = (payload) => {
  console.log("payload", payload);
  return axios
    .post("/api/auth/signup", {
      ...payload,
    })
    .then((res) => {
      if (res.status === 200) {
        return true;
      } else if (res.status === 404) {
        return false;
      }
    })
    .catch((err) => {
      console.log("err", err);
      return false;
    });
};
