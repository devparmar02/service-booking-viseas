import React, { useState } from 'react';

function Contact() {
  // useState for form fields
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${form.firstName} ${form.lastName}! Your message has been submitted.`);
    setForm({ firstName: '', lastName: '', email: '', phone: '', message: '' });
  };

  return (
    <div>
      <div className="hero_bg_box">
        <div className="img-box">
          <img src="/assets/images/hero-bg.jpg" alt="Hero Background" />
        </div>
      </div>

      {/* Contact Section */}
      <section className="contact_section layout_padding">
        <div className="contact_bg_box">
          <img src="/assets/images/contact-bg.jpg" alt="Contact Background" />
        </div>
        <div className="container">
          <div className="heading_container heading_center">
            <h2 className="display-6 fw-bold mb-3">Contact Us</h2>
          </div>
          <div className="row">
            <div className="col-md-9 mx-auto">
              <div className="form_container">
                <form onSubmit={handleSubmit}>
                  <div className="form-row row">
                    <div className="form-group col-md-6 mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="First Name"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group col-md-6 mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last Name"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row row">
                    <div className="form-group col-md-6 mb-3">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group col-md-6 mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Phone Number"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="message-box"
                      placeholder="Message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="btn-box">
                    <button type="submit" className="btn btn-success btn-lg rounded-pill w-100">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;