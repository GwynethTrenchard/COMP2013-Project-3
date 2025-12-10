import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";
import MainPage from "./Components/MainPage";
import AddProduct from "./Components/Add-Product";
import GroceriesAppContainer from "./Components/GroceriesAppContainer";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/products" element={<GroceriesAppContainer />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/create-user" element={<RegisterPage />} />
          <Route path="product" element={<MainPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

//<GroceriesAppContainer products={products} />
