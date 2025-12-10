import { useState, useEffect } from "react";
import axios from "axios";
import ProductForm from "./ProductForm";
import { link } from "react-router-dom"; // to link back to main REFERNCE: https://stackoverflow.com/questions/63979705/how-to-link-to-another-page-in-react

export default function AddProduct() {
  //States
  const [prroductsData, setProductsData] = useState([]);
  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    image: "",
    price: "",
  });
  const [postResponse, setPostResponse] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  //Handlers
  //Getting Data from DB handler
  const handleProductsDB = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      // console.log(response); // for testing to see if it connects
      setProductsData(() => response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  //Handle the submission of data
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        handleOnUpdate(formData._id);
      } else {
        await axios
          .post("http://localhost:3000/products", formData)
          .then((response) => {
            setPostResponse(response.data);
            console.log(response);
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //Handle the onChange event for the form
  const handleOnChange = (e) => {
    setFormData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };

  //Handle updating the api patch route
  const handleOnUpdate = async (id) => {
    try {
      const result = await axios.patch(
        `http://localhost:3000/products/${id}`,
        formData
      );
      setPostResponse({ message: result.data.message, date: result.data.date });
    } catch (error) {
      console.log(error);
    }
  };

  //Render
  return (
    <div>
      <div className="AddProduct"></div>
      <ProductForm
        productName={formData.productName}
        brand={formData.brand}
        price={formData.price}
        image={formData.image}
        handleOnSubmit={handleOnSubmit}
        handleOnChange={handleOnChange}
      />
      <p style={{ color: "green" }}>{postResponse?.message}</p>
      <button onClick={handleSubmit}>Submit</button>
      <Link to="./MainPage">Click here to go back to main</Link>
    </div>
  );
}
