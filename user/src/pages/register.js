import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  function postdata(event) {
    event.preventDefault();

    axios.post("http://localhost:1221/api/insert", {
      name,
      email,
      mobile,
      password,
    })
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "User Registered!!!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          window.location = "/login";
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: error.response?.data?.message || "Something went wrong.",
          icon: "error",
          confirmButtonText: "OK",
        });
        console.error(error);
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
        <h3 className="text-center mb-4 display-6 fw-bold text-primary">Register</h3>
        <form onSubmit={postdata}>
          <div className="mb-3">
            <label className="form-label">Your Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Mobile</label>
            <input
              type="text"
              className="form-control"
              placeholder="Mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Choose a secure password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-success btn-lg rounded-pill w-100 mb-3">
            Register
          </button>

          <div className="text-center">
            <small>Already have an account?</small>
            <br />
            <Link to="/login" className="text-decoration-none text-primary">
              Click here to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
