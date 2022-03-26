import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import AddProduct from "./components/AddProduct";
import AdminProduct from "./components/AdminAddProduct";
import Shop from "./components/Shop";
import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail";
import { OuterLayout } from "./OuterLayout";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import Login from "./components/Login";
import { SignUp } from "./components/Signup";
import { Reset } from "./components/Reset";
import NotFoundPage from "./components/NotFoundPage";

import { useFetchCSRFToken } from "./api/loginApis/useFetchCSRFToken";

function App() {
  useFetchCSRFToken();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OuterLayout />}>
          <Route path="products" element={<Products />} />
          <Route path="products/:productId" element={<ProductDetail />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="admin/">
            <Route path="products" element={<AdminProduct />} />
            <Route path="edit-product/:productId" element={<AddProduct />} />
          </Route>
          <Route path="cart" element={<Cart />} />
          <Route path="orders" element={<Orders />} />
          <Route path="login" element={<Login />} />
          <Route path="reset-password" element={<Reset />} />
          <Route path="signup" element={<SignUp />} />
          <Route index element={<Shop />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
