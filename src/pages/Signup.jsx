import React, { useState } from "react";
import { supabase } from "../client";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  let navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    age:null
  });

  console.log(formData);
  function handleChange(event) {
    setFormData((prevFormatData) => {
      return {
        ...prevFormatData,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function handleSubmit(e) {

    e.preventDefault();
    try {      
      console.log("handleSubmitIs caled"+formData.email+formData.password)
      const { data: existingUser, error: existingUserError } = await supabase
      .from("users1")
      .select()
      .eq("email", formData.email);
      
      if (existingUserError) {
        console.log("existing User Err")
        throw existingUserError;
      }
      
      if (existingUser && existingUser.length > 0) {
        console.log("existing User ")
        // User with the given email already exists
        alert("User with this email is already registered");
      } else{
        console.log("No User ")
        
        const { data, error } = await supabase
        .from('users1')
        .insert([
          { email: formData.email, password: formData.password ,name:formData.fullName ,age:formData.age },
        ])
        .select();
        console.log(" User Created ")
        console.log(data)
      }

      navigate('/')
     
    } catch (error) {
      alert(error)
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="signup-container">
        <input
          placeholder="Full Name"
          name="fullName"
          onChange={handleChange}
        />
        <input placeholder="Email" name="email" onChange={handleChange} />
        <input placeholder="Password" name="password" type= 'password' onChange={handleChange} />
        <input placeholder="Age" name="age" type= 'number' onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
      Already have an account?<Link to='/'>Login</Link> 
    </div>
  );
};

export default Signup;
