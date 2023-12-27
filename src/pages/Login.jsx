import React, { useState } from "react";
import { supabase } from "../client";
import { Link,useNavigate } from "react-router-dom";

const Login = () => {

    let navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //console.log(formData);
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
      // const { data, error } = await supabase.auth.signInWithPassword({
      //   email: formData.email,
      //   password: formData.password,
      // });


      
let { data: users1, error } = await supabase
.from('users1')
.select()
.eq('email', formData.email)
.eq('password', formData.password);


      if(error) throw error
      //console.log(data)
     
      if (users1 && users1.length > 0) {
        // User with the specified email and password exists
        console.log(users1)
        navigate('/homepage',{ state: { user: users1[0] } })
        console.log('User found:', users1[0]);
      } else {
        // No user found
        alert("Invalid Credentials");
        console.log('User not found');
      }
    } catch (error) {
      alert(error);
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="login-form"> 
        <input placeholder="Email" name="email" onChange={handleChange}  className="input-field"/>
        <input
          placeholder="Password"
          name="password"
          type="password"
          onChange={handleChange}
          className="input-field"
        />
        <button type="submit" className="submit-button">Login</button>
      </form>
      <p className="signup-link">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
     
    </div>
  );
};

export default Login;
