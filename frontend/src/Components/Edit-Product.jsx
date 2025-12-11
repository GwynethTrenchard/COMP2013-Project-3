import { useState, useEffect } from "react";
import axios from "axios";
import ProductForm from "./ProductForm";

export default function EditProductPage({ productId }) {
  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    image: "",
    price: "",
  });
  const [postResponse, setPostResponse] = useState("");
  const [isEditing, setIsEditing] = useState(true);

  // Fetch the product with useEffect
  useEffect(() => {
    handleProductDB();
  }, [postResponse]);

  //Get the data from the db
  const handleProductDB = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/products/${productId}`,
      );
      setFormData(response.data);
    } catch (error) {
      console.log(error.message);
      setPostResponse(error.response.data.message || "Failed to load product");
    }
  };

  // Handle changes on the form
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Handle form reset
  const handleResetForm = () => {
    setFormData({ productName: "", brand: "", image: "", price: "" });
  };

  //Update the prodcut by id
  const handleOnUpdate = (id) => {
    axios
      .patch(`http://localhost:3000/products/${id}`, formData)
      .then((result) => {
        setPostResponse(result.data.message || "Product updated!");
      })
      .catch((error) => {
        console.log(error);
        setPostResponse(
          error.response.data.message || "Failed to update product",
        );
      });
  };

  // Handle form submit
  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      handleOnUpdate(formData._id);
      handleResetForm();
      setIsEditing(false);
    } else {
      // Adding a new product
      axios
        .post("http://localhost:3000/products", formData)
        .then((response) => {
          setPostResponse(response.data.message || "Product added!");
          handleResetForm();
        })
        .catch((error) =>
          setPostResponse(
            error.response.data.message || "Failed to add product",
          ),
        );
    }
  };

  return (
    <div>
      <ProductForm
        formData={formData}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        postResponse={postResponse}
        isEditing={isEditing}
      />
      <a href="/products">Click here to go back to main page </a>
    </div>
  );
}
