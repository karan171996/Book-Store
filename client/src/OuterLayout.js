import { Outlet, NavLink } from "react-router-dom";
import "./OuterLayout.css";

export function OuterLayout() {
  return (
    <header className="main-header">
      <nav className="main-header__nav">
        <ul className="main-header__item-list">
          <li className="main-header__item">
            <NavLink
              style={({ isActive }) =>
                isActive
                  ? {
                      color: "#6200ff",
                    }
                  : {
                      color: "black",
                    }
              }
              to="/"
            >
              Shop
            </NavLink>
          </li>
          <li className="main-header__item">
            <NavLink
              style={({ isActive }) =>
                isActive
                  ? {
                      color: "#6200ff",
                    }
                  : {
                      color: "black",
                    }
              }
              activeClassName="active"
              to="/add-product"
            >
              Add Product
            </NavLink>
          </li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </header>
  );
}
