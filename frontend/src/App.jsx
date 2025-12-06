import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";


import GroceriesAppContainer from "./Components/GroceriesAppContainer";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/products" element={<GroceriesAppContainer />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/create-user" element={<RegisterPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

//<GroceriesAppContainer products={products} />
