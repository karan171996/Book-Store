import { Outlet, Link } from "react-router-dom";

export function OuterLayout() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Shop</Link>
          </li>
          <li>
            <Link to="/add-product">Add Product</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
