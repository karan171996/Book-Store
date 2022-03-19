import { useEffect } from "react";
import { postLogout } from "../api/loginApis/postLogout";
import { useNavigate, useMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthCookie } from "../reducers/cookieReducer";

function NotFoundPage() {
  const navigate = useNavigate();
  const match = useMatch("/logout");
  const dispatch = useDispatch();

  useEffect(() => {
    if (match) {
      postLogout().then(() => {
        dispatch(setAuthCookie(false));

        navigate("/login");
      });
    }
  }, [match]);
  return <h1>Page Not Found</h1>;
}

export default NotFoundPage;
