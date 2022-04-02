import { useState } from "react";
import { useFetchResetAccount } from "../api/loginApis/useFetchResetToken";
import { postResetAccount } from "../api/loginApis/postresetAccount";
import { useNavigate, useParams } from "react-router-dom";

export const ResetAccount = () => {
  const [resetPassword, setResetPassword] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  const [user] = useFetchResetAccount(params?.resetTokenPassword);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    postResetAccount({
      password: resetPassword,
      userId: user,
      passwordToken: params?.resetTokenPassword,
    })
      .then((result) => {
        if (result) {
          navigate("/login");
        }
      })
      .catch((err) => console.log("err", err));
  };
  return (
    <div>
      <form className="product-form" onSubmit={onSubmitHandler}>
        <div className="form-control">
          <label htmlFor="password">Reset-Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={resetPassword}
            onChange={(e) => setResetPassword(e.target.value)}
          />
        </div>
        <button type="submit">Update Password</button>
      </form>
    </div>
  );
};
