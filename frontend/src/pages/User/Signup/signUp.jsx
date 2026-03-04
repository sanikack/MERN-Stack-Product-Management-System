import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signUp.scss";
import Swal from "sweetalert2"
import axios from "axios"


const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const navigate= useNavigate();

  const showAlert= (icon,message)=> {
    Swal.fire({
      toast:true,
      icon,
      title:message,
      showConfirmButton: false,
      timer: 2500,
      position: "top"
    })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   try{

    const res= await axios.post("http://localhost:5000/api/user/register",
      formData
    )
    
    showAlert("success", res.data.message);

    //REDIRECT AFTER 1.5 SEC
    setTimeout(() => {
   navigate("/");
  }, 1500);
   }

   catch(err){
    showAlert("error", err.response?.data?.message)
   }
   
  };



  return (
    <div className="register-wrapper">
      <div className="register-box">
        <div className="register-header">
          <h2>Create Account</h2>
          <p>Start managing your products today</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              onChange={handleChange}
            />
          </div>

          <button type="submit">Register</button>
        </form>

        <p className="bottom-text">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;