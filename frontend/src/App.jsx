import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";
import MainPage from "./Components/MainPage";
import AddProduct from "./Components/Add-Product";
import GroceriesAppContainer from "./Components/GroceriesAppContainer";
import EditProductPage from "./Components/Edit-Product";
import NotAuthorized from "./Components/NotAuthorized";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/products" element={<GroceriesAppContainer />} />
          <Route path="/main-page" element={<LoginPage />} />
          <Route path="/create-user" element={<RegisterPage />} />
          <Route path="/product" element={<MainPage />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit-product" element={<EditProductPage />} />
          <Route path="/not-authorized" element={<NotAuthorized />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

//<GroceriesAppContainer products={products} />
