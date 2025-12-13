import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormComponent from "./FormComponents";
import Cookies from "js-cookie";

export default function LoginPage() {
  // states/variables
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [postResponse, setPostResponse] = useState("");

  const navigate = useNavigate();

  // handler for change
  const handleOnChange = (e) => {
    setFormData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };
  //handles the login process
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/", {
        ...formData,
      });
      setPostResponse(response.data.message);
      if (response.status === 201) {
        navigate("/product", { state: formData });
        Cookies.set("jwt-authorization", response.data.token);
      }
    } catch (error) {
      console.log(error);
      setPostResponse(error.response.data.message || "Login failed!");
    }
  };
  //handles submitting the login
  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleLogin();
    setFormData({ username: "", password: "" });
  };

  //returns for display
  return (
    <div>
      <FormComponent
        formData={formData}
        postResponse={postResponse}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        nextPage="create-user"
        currentPage=""
      />
    </div>
  );
}
