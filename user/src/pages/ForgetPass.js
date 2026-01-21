import axios from "axios";
import React from "react";

function ForgetPass() {
  const sendpass = (event) => {
    event.preventDefault();
    var email = document.getElementById("email").value;
    axios
      .post("http://localhost:1221/api/forgotpass", {
        email: email,
      })
      .then((Response) => {
        if (Response.data.message) {
          alert(Response.data.message);
          window.location = "/ForgetPass";
        } else {
          alert("Success!");
          window.location = "/login";
        }
      });
  };

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
        <h3 className="text-center mb-4 display-6 fw-bold text-primary">Forgot Password</h3>
        <form className="signin-form" onSubmit={sendpass}>
          <div className="mb-4">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>
          <button type="submit" className="btn btn-success btn-lg rounded-pill w-100 mb-3">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgetPass;
