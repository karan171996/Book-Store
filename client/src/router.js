import { Switch, Route } from "react-router-dom";

//Components
import AddProducts from "./components/AddProducts";
import Shop from "./components/Shop";

export const router = () => {
  return (
    <Switch>
      <Route path="/">
        <Shop />
      </Route>
      <Route path="/admin/add-products">
        <AddProducts />
      </Route>
    </Switch>
  );
};
