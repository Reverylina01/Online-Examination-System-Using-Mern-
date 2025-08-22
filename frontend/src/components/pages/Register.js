import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errortxt, setErrortxt] = useState("");

  const inputName = (event) => {
    setName(event.target.value);
  };
  const inputEmail = (event) => {
    setEmail(event.target.value);
  };
  const inputPassword = (event) => {
    setPassword(event.target.value);
  };

  const registerUser = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5001/api/users/register",
        { name, email, password }
      );

      if (response.status === 201) {
        // Save user info if needed
        localStorage.setItem("user", JSON.stringify(response.data));

        // Redirect to login page after successful registration
        navigate("/login");
      } else {
        setErrortxt(response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      setErrortxt(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="text-center text-success">Register</h2>

        {errortxt && (
          <p className="text-danger text-center mb-3">{errortxt}</p>
        )}

        <form onSubmit={registerUser}>
          <div className="form-group">
            <label>Name</label>
            <input
              onChange={inputName}
              type="text"
              className="form-control"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              onChange={inputEmail}
              type="email"
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              onChange={inputPassword}
              type="password"
              className="form-control"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn btn-success btn-block mt-3">
            Register
          </button>
        </form>

        <p className="text-center mt-3">
          Have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
