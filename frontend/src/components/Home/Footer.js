import React from 'react';
import './footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Quick Links Section */}
        <div className="footer-links">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="/services">Services</a></li>
            <li><a href="/gallery">Gallery</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact Information Section */}
        <div className="footer-contact">
          <h2>Contact Us</h2>
          <p>Email: event@gmail.com</p>
          <p>Phone: +123 456 7890</p>
          <p>Address: 123 sasthiri Lane, Joytown, TamilNadu</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Event-Pro. All rights reserved.</p>
      </div>
    </footer>
  );
}
