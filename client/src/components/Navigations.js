import { Link } from "react-router-dom";

import "./Navigation.css";

const Navigations = () => (
  <div className="navigation-container">
    <ul>
      <li>
        <Link to="/">Shop</Link>
      </li>
      <li>
        <Link to="/admin/add-product">Add Product</Link>
      </li>
    </ul>
  </div>
);

export default Navigations;
