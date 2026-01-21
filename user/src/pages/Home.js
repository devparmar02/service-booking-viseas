import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <div className="hero_bg_box">
        <div className="img-box">
          <img src="/assets/images/hero-bg.jpg" alt="Hero Background" />
        </div>
      </div>
      <div className="container mt-4">
        <h2 className="display-6 fw-bold mb-3">Welcome to Service Booking App</h2>
        <p className="lead text-muted mb-4">Book your desired services easily and quickly.</p>
        <Link to="/services" className="btn btn-brand rounded-3 px-4 py-2">View All Services</Link>
      </div>
    </div>
  );
}

export default Home;
