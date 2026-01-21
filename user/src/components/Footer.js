import React from 'react';

function Footer() {
  return (
    <footer className="container-fluid footer_section py-3 mt-5 bg-light">
      <p className="mb-0 text-center text-muted fw-bold">
        &copy; <span id="displayYear">{new Date().getFullYear()}</span> All Rights Reserved By
        <a href="https://html.design/" className="text-brand ms-1"> Free Html Templates</a>
      </p>
    </footer>
  );
}

export default Footer; 