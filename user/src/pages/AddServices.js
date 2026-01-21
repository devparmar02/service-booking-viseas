import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function AddService() {
  const [imageFile, setImageFile] = useState("");

  const postData = (e) => {
    e.preventDefault();
    const name = document.getElementById("serviceName").value;
    const description = document.getElementById("serviceDesc").value;
    const city = document.getElementById("serviceCity").value;
    const price = document.getElementById("servicePrice").value;
    let formData = new FormData();

    formData.append("image", imageFile);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("city", city);
    formData.append("price", price);
    axios.post("http://localhost:1221/api/addservice", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then((res) => {
        if (res.data.msg) {
          Swal.fire("Success", res.data.msg, "success");
          window.location.href = "/services";
        } else {
          Swal.fire("Success", "Service added successfully", "success");
        }
      })
      .catch((err) => {
        Swal.fire("Error", "Failed to add service", "error");
        console.error(err);
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
          maxWidth: "450px",
          borderRadius: "1rem",
          padding: "2rem",
          background: "rgba(255, 255, 255, 0.93)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 16px rgba(24,90,157,0.15)",
        }}
      >
        <h3 className="text-center mb-3 display-6 fw-bold text-primary">Add Service</h3>
        <p className="text-center text-muted mb-4 lead">Fill in the details to add a new service</p>
        <form onSubmit={postData}>
          <div className="form-group mb-3">
            <input type="text" id="serviceName" placeholder="Service Name*" className="form-control" required />
          </div>
          <div className="form-group mb-3">
            <input type="text" id="serviceDesc" placeholder="Description*" className="form-control" required />
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <input type="text" id="serviceCity" placeholder="City*" className="form-control" required />
            </div>
            <div className="col-md-6 mb-3">
              <input type="number" id="servicePrice" placeholder="Price*" className="form-control" required />
            </div>
          </div>
          <div className="form-group mb-4">
            <input type="file" className="form-control" onChange={(e) => setImageFile(e.target.files[0])} required />
          </div>
          <button className="btn btn-success btn-lg rounded-pill w-100" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddService;
