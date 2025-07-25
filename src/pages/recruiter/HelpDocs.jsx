// src/pages/recruiter/HelpDocs.jsx

import React from "react";
import "../../styles/HelpDocs.css";

const HelpDocs = () => {
  return (
    <div className="help-docs-container">
      <div className="help-docs-card">
        <h2>Need Assistance?</h2>
        <p>
          Our dedicated support team is here to assist you with any questions or issues related to the Smart Recruiter platform.
          Whether you need help with account setup, feature navigation, or troubleshooting, we’re just a message away!
        </p>

        <ul>
          <li>
            <strong>Email Support:</strong>{" "}
            <a href="mailto:support@smartrecruiter.com">
              support@smartrecruiter.com
            </a>
            {/* Replaced inline style with a class */}
            <p className="help-docs-list-description">
              Expect a response within 24 hours during business days (Monday–Friday, 9 AM–5 PM EAT).
            </p>
          </li>
          <li>
            <strong>WhatsApp Support:</strong>{" "}
            <a
              href="https://wa.me/254796847341?text=Hi%2C%20I%20need%20help%20with%20the%20Smart%20Recruiter%20platform."
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat with us on WhatsApp
            </a>
            {/* Replaced inline style with a class */}
            <p className="help-docs-list-description">
              Available from 8 AM to 8 PM EAT, Monday through Saturday.
            </p>
          </li>
          <li>
            <strong>Phone Support:</strong>{" "}
            <a href="tel:+254796847341">+254 796 847341</a>
            {/* Replaced inline style with a class */}
            <p className="help-docs-list-description">
              Call us during business hours (Monday–Friday, 9 AM–5 PM EAT).
            </p>
          </li>
        </ul>

        <p className="help-docs-contact-note">
          For more resources, check out our{" "}
          <a href="https://moringaschool.com/" target="_blank" rel="noopener noreferrer">
            Help Center
          </a>{" "}
          for FAQs, guides, and tutorials.
        </p>
      </div>
    </div>
  );
};

export default HelpDocs;