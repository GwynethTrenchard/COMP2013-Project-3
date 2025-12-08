import { useEffect, useState } from "react"; //the import wall
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import ProductCard from "./ProductCard"; //all the includes from other files i used
import CartContainer from "./CartContainer";
import NavBar from "./NavBar";

export default function MainPage() { 
    const [productQuantity, setProductQuantity] = useState([]); //the states used in MainPage
    const [cartList, setCartList] = useState([]);
    const [productData, setProductData] = useState([]);
    const [currentUser, setCurrentUser] = useState(() => {
    const jwtToken = Cookies.get("jwt-authorization");
    if (!jwtToken) return {username: "", isAdmin: false}; //return empty + false if its not the Token
    try {
      const decodedToken = jwtDecode(jwtToken); //decodes token
      return {
      username: decodedToken.username || "", //then returns the username and isAdmin
      isAdmin: decodedToken.username === "admin",
      };
    } catch {
      return {username: "", isAdmin: false}; //catches anything else not expected
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = Cookies.get("jwt-authorization");

    if(!jwtToken){ //if its not the token return to login
        navigate("/");
        return;
    }

    try {
        jwtDecode(jwtToken);
    } catch (error) { //catches invalid JWT and returns to login
        console.error("Invalid JWT", error);
        navigate("/");
    }
  },[navigate]);

  useEffect(() => {
    handleProductsDB();
    }, []);

  const handleLogout = () => { //handles the logout, setting the user to nothing and going back to login
    Cookies.remove("jwt-authorization");
    setCurrentUser("");
    navigate("/");
  };

  const handleProductsDB = async () => {
  try {
    const response = await axios.get("http://localhost:3000/products");
    setProductData(response.data); //stores product object
    const initialQuantities = response.data.map((product) => ({id: product.id,quantity: 0,})); //creates an array for the initial quantities of products while setting it to 0
    setProductQuantity(initialQuantities); //sets the state with the initialized quantities
    } catch (error) {
    console.log(error.message);
    }
  };

const handleAddQuantity = (productId, mode) => { //function for adding quantities
    if (mode === "cart") { 
      const newCartList = cartList.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
      setCartList(newCartList);
      return;
    } else if (mode === "product") {
      const newProductQuantity = productQuantity.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
      setProductQuantity(newProductQuantity);
      return;
    }
  };

  const handleRemoveQuantity = (productId, mode) => { //function for removing quantities
    if (mode === "cart") {
      const newCartList = cartList.map((product) => {
        if (product.id === productId && product.quantity > 1) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      setCartList(newCartList);
      return;
    } else if (mode === "product") {
      const newProductQuantity = productQuantity.map((product) => {
        if (product.id === productId && product.quantity > 0) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      setProductQuantity(newProductQuantity);
      return;
    }
  };
    const handleDeleteProduct = async (productId) => { //handles deleting the product
    try {
      await axios
        .delete(`http://localhost:3000/products/${productId}`)
        .then((result) => {
          console.log(result);
          setProductData(productData.filter((product) => product._id !== productId));
          setPostResponse(
            `${result.data.productName} deleted\n with id: ${result.data.id}`
          );
        });
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleAddToCart = (productId) => { //handles adding to the cart
    const product = productData.find((product) => product.id === productId);
    const pQuantity = productQuantity.find(
      (product) => product.id === productId
    );
    const newCartList = [...cartList];
    const productInCart = newCartList.find(
      (product) => product.id === productId
    );
    if (productInCart) {
      productInCart.quantity += pQuantity.quantity;
    } else if (pQuantity.quantity === 0) {
      alert(`Please select quantity for ${product.productName}`);
    } else {
      newCartList.push({ ...product, quantity: pQuantity.quantity });
    }
    setCartList(newCartList);
  };

  const handleRemoveFromCart = (productId) => { //handles removing from the cart
    const newCartList = cartList.filter((product) => product.id !== productId);
    setCartList(newCartList);
  };

  const handleAddNewProduct = () => { //handles sending the user to add-product form
  navigate("/add-product");
  };

  const handleEditProduct = () => { //handles sending the user to eit-product form
    navigate("/edit-product");
  }

return( //return statement for sending all the values to the different files to get the correct display
<div className="MainPage">
    <NavBar
      username={currentUser.username}
      isAdmin={currentUser.isAdmin}
      handleLogout={handleLogout}
      handleAddNewProduct={handleAddNewProduct}
      quantity={cartList.length}
    />
  <div className="GroceriesApp-Container">
    <div className="ProductsContainer">
      {productData.map((product) => (
        <ProductCard
          key={product.id}
          productName={product.productName}
          brand={product.brand}
          image={product.image}
          price={product.price}
          id={product.id}
          isAdmin = {currentUser.isAdmin}
          productQuantity={productQuantity.find((q) => q.id === product.id).quantity}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={() => handleAddToCart(product.id)}
          _id={product._id} 
          handleDeleteProduct={() => handleDeleteProduct(product._id)}
          handleEditProduct={() => handleEditProduct(product._id)}
        />
      ))}
    </div>
    <div className="CartContainer">
      <CartContainer
        cartList={cartList}
        handleRemoveFromCart={handleRemoveFromCart}
        handleAddQuantity={handleAddQuantity}
        handleRemoveQuantity={handleRemoveQuantity}
        handleClearCart={() => setCartList([])}
      />
    </div>
  </div>
</div>
);
}