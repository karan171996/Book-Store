import { useState } from "react";
import { postLogin } from "../../api/loginApis/postLogin";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthCookie } from "../../reducers/cookieReducer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    postLogin({
      email,
      password,
    })
      .then((result) => {
        if (result) {
          dispatch(setAuthCookie(true));
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("Login error", err);
      });
  };

  const resetPassword = () => {
    navigate("/reset-password");
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
        <div style={{ display: "flex", gap: 10 }}>
          <button type="submit">Login</button>
          <button onClick={resetPassword}>Reset-Password</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
