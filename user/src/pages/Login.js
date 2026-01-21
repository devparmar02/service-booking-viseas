import { useState } from "react";
import React from "react";

import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  function postdata(event) {
    event.preventDefault();
    var password = document.getElementById("password").value;
    var email = document.getElementById("email").value;

    axios.post("http://localhost:1221/api/verify", {
      email: email,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        Swal.fire({
          title: "Error!",
          text: response.data.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        const user = {
          sname: response.data[0].name,
          email: email,
        };
        localStorage.setItem("mydata", JSON.stringify(user));
        Swal.fire({
          title: "Success!",
          text: `Welcome ${response.data[0].name}`,
          icon: "success",
          confirmButtonText: "Continue",
        }).then(() => {
          window.location = "/";
        });
      }
    });
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundImage:
          "url('https://m.media-amazon.com/images/I/71YMeHTzeXL._UF1000,1000_QL80_.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div
        className="card shadow"
        style={{
          width: "100%",
          maxWidth: "400px",
          borderRadius: "1rem",
          padding: "2rem",
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
        }}
      >
        <h3 className="text-center mb-4 display-6 fw-bold text-primary">Login</h3>
        <form className="signin-form" onSubmit={postdata}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn btn-success btn-lg rounded-pill w-100 mb-3">
            Login
          </button>
          <div className="text-center">
            <small>Don't have an account?</small>
            <br />
            <Link to="/register" className="text-decoration-none text-primary">
              Click here to Register
            </Link>
            <br />
            <Link to="/ForgetPass" className="text-decoration-none text-primary">
              Forgot password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
