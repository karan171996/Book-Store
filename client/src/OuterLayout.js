import { Outlet, Link } from "react-router-dom";
import "./OuterLayout.css";

export function OuterLayout() {
  return (
    <header className="main-header">
      <nav className="main-header__nav">
        <ul className="main-header__item-list">
          <li className="main-header__item">
            <Link className="active" to="/">
              Shop
            </Link>
          </li>
          <li className="main-header__item">
            <Link to="/add-product">Add Product</Link>
          </li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </header>
  );
}
