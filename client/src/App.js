import { BrowserRouter as Router } from "react-router-dom";

//Components
import Navigations from "./components/Navigations";
import { router } from "./router";

function App() {
  return (
    <Router>
      <Navigations />
      {router}
    </Router>
  );
}

export default App;
