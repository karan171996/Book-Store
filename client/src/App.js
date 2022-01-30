import { Routes, Route } from "react-router-dom";

// Components
import AddProduct from "./components/AddProduct";
import Shop from "./components/Shop";
import { OuterLayout } from "./OuterLayout";

import NotFoundPage from "./components/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<OuterLayout />}>
        <Route index element={<Shop />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;