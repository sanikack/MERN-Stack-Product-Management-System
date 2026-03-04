import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import Swal from "sweetalert2";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate= useNavigate();

  //ALERT
  const showAlert= (icon,message)=>{
    Swal.fire({
      toast:true,
      icon,
      title: message,
      showConfirmButton: false,
      timer: 2500,
      position: "top"
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try{
      const res= await axios.post("http://localhost:5000/api/user/login",{
        email,
        password
      });

      //SAVE TOKEN IN LOCAL STORAGE
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("role", res.data.role);

      showAlert("success", res.data.message);

      setTimeout(() => {
        if(res.data.role === "admin"){
          navigate("/admin/dashboard")
        }
        else{
          navigate("/productlist");
        }
      }, 1500);

    }
    catch(err){
      showAlert("error", err.response?.data?.message)
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Login to continue managing products</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">Login</button>
        </form>

        <p className="bottom-text">
          Don’t have an account? <Link to="/register">Create Account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;