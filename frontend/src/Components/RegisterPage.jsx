import FormComponent from "./FormComponents";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function RegisterPage(){
    // states
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [postResponse, setPostResponse] = useState("");
    const navigate = useNavigate();

    //handlers
    const handleOnChange = (e) => {
        setFormData((prevData) => {
            return { ...prevData, [e.target.name]: e.target.value };
        });
    };

    const handleRegister = async () => {
        try{
            const response = await axios.post("http://localhost:3000/create-user", { 
                ...formData,
            });
            setPostResponse(response.data.message);
        
            if(response.status === 201){
                navigate("/");
            }
        
        }catch(error){
            setPostResponse(error.response.data.message || "Cannot create user");
        }
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        handleRegister()
        setFormData({ username: "", password: "" })
    };

    return (
    <div>
        <FormComponent
            formData={formData}
            postResponse={postResponse}
            handleOnChange={handleOnChange}
            handleOnSubmit={handleOnSubmit}
            currentPage="create-user"
            nextPage=""
        />
    </div>
);
}
