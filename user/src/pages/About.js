import React, { useState } from 'react';

function About() {
  const [showMore, setShowMore] = useState(false);
  
  return (
    <div>
      <div className="hero_bg_box">
        <div className="img-box">
          <img src="/assets/images/hero-bg.jpg" alt="Hero Background" />
        </div>
      </div>

      {/* About Section */}
      <section className="about_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 px-0">
              <div className="img_container">
                <div className="img-box">
                  <img src="/assets/images/about-img.jpg" alt="About" />
                </div>
              </div>
            </div>
            <div className="col-lg-6 px-0">
              <div className="detail-box">
                <div className="heading_container">
                  <h2 className="display-6 fw-bold mb-3">Who Are We?</h2>
                </div>
                <p className="text-muted mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  {showMore && (
                    <span> Additional information about the company can go here. You can expand this section as needed.</span>
                  )}
                </p>
                <div className="btn-box">
                  <button className="btn btn-brand rounded-3 px-4 py-2" onClick={() => setShowMore(!showMore)}>
                    {showMore ? 'Show Less' : 'Read More'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;