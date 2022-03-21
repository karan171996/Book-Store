import { useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import "./OuterLayout.css";
import { useSelector } from "react-redux";
import { selectAuthCookie } from "./reducers/cookieReducer";

export function OuterLayout() {
  const pageActive = useSelector(selectAuthCookie);

  const activeStyle = ({ isActive }) =>
    isActive
      ? {
          color: "#fff",
        }
      : {
          color: "black",
        };
  return (
    <header className="main-header">
      <nav className="main-header__nav">
        <ul className="main-header__item-list">
          <li className="main-header__item">
            <NavLink style={activeStyle} to="/">
              Shop
            </NavLink>
          </li>
          <li className="main-header__item">
            <NavLink style={activeStyle} to="/products">
              Products
            </NavLink>
          </li>
          {pageActive && (
            <>
              <li className="main-header__item">
                <NavLink style={activeStyle} to="/cart">
                  Cart
                </NavLink>
              </li>
              <li className="main-header__item">
                <NavLink style={activeStyle} to="/orders">
                  Orders
                </NavLink>
              </li>
              <li className="main-header__item">
                <NavLink style={activeStyle} to="/add-product">
                  Add Product
                </NavLink>
              </li>
              <li className="main-header__item">
                <NavLink style={activeStyle} to="/admin/products">
                  Admin Product
                </NavLink>
              </li>
            </>
          )}
        </ul>
        <ul className="main-header__item-list">
          {!pageActive && (
            <>
              <li className="main-header__item">
                <NavLink style={activeStyle} to="/login">
                  Login
                </NavLink>
              </li>
              <li className="main-header__item">
                <NavLink style={activeStyle} to="/signup">
                  Signup
                </NavLink>
              </li>
            </>
          )}

          {pageActive && (
            <li className="main-header__item">
              <NavLink style={activeStyle} to="/logout">
                Logout
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </header>
  );
}
