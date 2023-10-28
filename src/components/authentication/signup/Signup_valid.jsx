import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
const SIGNUP_URL ='https://udemy-nx1v.onrender.com/sign-up'
const Signup_valid = () => {
  let success=false;
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const [name,setName]  =  useState("");
  const [username,setUsername]  =  useState("");
  const [errorEmail,setErrorEmail]  =  useState("");
  const [errorPassword,setErrorPassword]  =  useState("");
  const [errorName,setErrorName]  =  useState("");
  const [errorUserName,setErrorUsername]  =  useState("");
  const emailValid = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9.-]{2,}$/;
  const validText=/^[a-zA-Z]+([\s][a-zA-Z]+)*$/;
  const passwordValid=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/;
  const validUsername=/^[a-z_.\d]{1,30}$/;
  const invalidUsername=/^(?=.*[A-Z])[A-Za-z_.\d]{1,}$/;
  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";
    if (name === "name") {
      if (!validText.test(value.trim())&&value!=="") {
        errorMessage = "The name should only contain letters";
      }
      setErrorName(errorMessage);
    } else if (name === "email") {
      if (!emailValid.test(value)&&value!=="") {
        errorMessage = "Invalid email";
      }
      setErrorEmail(errorMessage);
    } else if (name === "password"&&value!=="") {
      if (!passwordValid.test(value)) {
        errorMessage = "Password should be at least 8 characters long and contain at least one letter and one number";
      }
      setErrorPassword(errorMessage);
    } else if (name === "username") {
      if (!validUsername.test(value)&&invalidUsername.test(value)) {
        errorMessage = "Capital letters not allowed";
      }
      else if (!validUsername.test(value)&&!invalidUsername.test(value)&&(value)==="") {
        errorMessage = "";
      }
      else if (!validUsername.test(value)&&!invalidUsername.test(value)) {
        errorMessage = "Invalid Username";
      }
      setErrorUsername(errorMessage);
    }
    if(value!=="")
    {if(name==="name")
    setName(value);
  else if(name==="username")
  setUsername(value);
  else if(name==="email")
  setEmail(value);
  else if(name==="password")
  setPassword(value);
}
  }
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
  console.log(username)
    let hasErrors = true;
    if(!(errorUserName||errorPassword||errorEmail||errorName))
    {hasErrors=false}

    if (!hasErrors) {
    console.log("Form submitted:");
    localStorage.setItem("signupEmail",email);
    try{
      const response = await axios.post(SIGNUP_URL,{username:username,name:name,email:email,password:password},
        {headers:{'Content-Type':'application/json; charset=utf-8'},
          withCredentials: false});
          console.log("success");
          success=response.data.success;
  }catch(err){
  if(err.response){
  console.log('Server responded');
  setErrorUsername(err.response.data.message);
  }
  else
    console.log('No Server response');
  }
    }
    if(success)
    navigate('/otp');
  };

  return { handleChange, handleSubmit,errorEmail,errorName,errorPassword,errorUserName};
};

export default Signup_valid;