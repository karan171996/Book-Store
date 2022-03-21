import { useState, useRef } from "react";
import { postSignup } from "../api/loginApis/postSignup";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const confirmPassword = useRef("");

  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("confirmPassword", confirmPassword?.current?.value);
    postSignup({
      email,
      password,
      ...(confirmPassword?.current?.value && {
        confirmPassword: confirmPassword.current,
      }),
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
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Confirm Password</label>
          <input
            id="password"
            type="password"
            name="password"
            ref={confirmPassword}
            onChange={(e) => {
              confirmPassword.current = e.target.value;
            }}
          />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};
