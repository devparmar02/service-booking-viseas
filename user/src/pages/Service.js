import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Service() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userIsAdmin = true;

  useEffect(() => {
    axios.get('http://localhost:1221/api/dest_get')
      .then(res => {
        setServices(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch services');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Load Razorpay script only once
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up the script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  if (loading) return <div className="container mt-5">Loading services...</div>;
  if (error) return <div className="container mt-5 text-danger">{error}</div>;
  
  var bookservice = (serviceId, price) => {
    // Get user info from localStorage
    const user = JSON.parse(localStorage.getItem("mydata"));
    if (!user || !user.email) {
      alert("Please log in to book a service.");
      return;
    }
  
    if (typeof window.Razorpay === "undefined") {
      alert("Payment SDK not loaded. Please try again in a moment.");
      return;
    }

    var options = {
      key: "rzp_test_60v2W0km5tB9fH",
      amount: price * 100,
      name: "IT",
      description: "Booking for Destination",
      currency: "INR",
      prefill: {
        name: user.sname || "User",
        email: user.email,
        contact: user.mobile || "",
      },
      handler: function (response) {
        // response.razorpay_payment_id
        // Call backend to save booking
        axios.post('http://localhost:1221/api/save_booking', {
          service_id: serviceId,
          user_email: user.email,
          payment_id: response.razorpay_payment_id
        })
        .then((res) => {
          alert(res.data.message || "Booking successful! Check your email for confirmation.");
        })
        .catch((error) => {
          alert("Booking failed: " + (error.response?.data?.message || error.message));
        });
      },
      theme: {
        color: "#528FF0"
      }
    };
  
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  
  return (
    <div>
      <div className="hero_bg_box">
        <div className="img-box">
          <img src="/assets/images/hero-bg.jpg" alt="Hero Background" />
        </div>
      </div>
      <section className="service_section layout_padding">
        <div className="container">
          <div className="heading_container heading_center">
            <h2 className="display-6 fw-bold mb-3">Our Services</h2>
          </div>
         
          <div className="row">
            {services.length === 0 && (
              <div className="col-12 text-center">No services available.</div>
            )}
            {services.map((service, idx) => (
              <div className="col-md-6 mb-4" key={service.id || idx} data-aos="fade-up">
                <div className="box">
                  <div className="img-box" style={{height:200, overflow:'hidden'}}>
                    <img 
                      src={service.image ? `http://localhost:1221/public/${service.image}` : '/assets/images/s1.png'} 
                      alt={service.name} 
                      style={{maxHeight: '180px', objectFit: 'cover', width: '100%'}}
                    />
                  </div>
                  <div className="detail-box">
                    <h6 className="fw-bold mb-2">{service.name}</h6>
                    <p className="text-muted mb-2">{service.description}</p>
                    <p className="mb-1"><b>City:</b> {service.city}</p>
                    <p className="mb-2"><b>Price:</b> ₹{service.price}</p>
                    <button type="button" className="btn btn-primary" onClick={() => bookservice(service.id, service.price)}>Book Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Service;