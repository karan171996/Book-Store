import { useState, useRef } from "react";
import { postResetPassword } from "../api/loginApis/postResetpassword";
import { useNavigate } from "react-router-dom";

export const Reset = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    postResetPassword({
      email,
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
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};
