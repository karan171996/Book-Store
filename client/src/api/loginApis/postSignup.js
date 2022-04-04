import axios from "axios";
import { notification } from "antd";

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
      if (err?.response?.status === 422) {
        console.log("err", err?.response?.data?.error);
        notification["error"]({
          message: `Validation Error in ${err?.response?.data?.error[0].param}`,
          description: err?.response?.data?.error[0].msg,
        });
      }
      return false;
    });
};
