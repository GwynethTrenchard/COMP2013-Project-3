import { useState, useEffect } from "react";
import axios from "axios";
import ProductForm from "./ProductForm";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function EditProductPage() {
  //variables and states
  const location = useLocation();
  const { _id } = location.state

  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    image: "",
    price: "",
  });
  const [postResponse, setPostResponse] = useState("");
  const navigate = useNavigate();
  const [productsData, setProductsData] = useState([]);
  const [productQuantity, setProductQuantity] = useState([]);

  useEffect(() => { //useEffect for handleProductDB
      handleProductDB();
  }, [_id]);


  //Get the products and find the one to edit
const handleProductDB = async () => {
  try {
    const response = await axios.get("http://localhost:3000/products");
    setProductsData([...response.data]); 
    setProductQuantity(
      response.data.map((product) => ({ _id: product._id, quantity: 0 }))
    );

    //find product by matching the id given by useNavigate
    const singleProduct = response.data.find((product) => product._id === _id);
    //Fill form data after iusolating the product
    setFormData(singleProduct)
  } catch (error) {
    console.log(error.message);
  }
};

// handles whenver a change is made
  const handleOnChange = (e) => { 
    setFormData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };

  //Uses patch to update data
const handleOnUpdate = async (id) => {
  try {
    await axios
      .patch(`http://localhost:3000/products/${id}`, formData)
      .then((result) => {
        setPostResponse(result.data.message || "Product updated!");
        navigate("/product");   
      });
  } catch (error) {
    console.log(error.message);
  }
};

//Handles data submission
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    await handleOnUpdate(_id);

  };

  return (
    <div>
      <ProductForm
        formData={formData}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        postResponse={postResponse}
      />
      <a href="/product">Click here to go back to the main page</a>
    </div>
  );
}
