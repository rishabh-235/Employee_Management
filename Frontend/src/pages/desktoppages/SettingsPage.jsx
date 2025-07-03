import React from "react";
import "./styles/settingpage.css";

function SettingsPage() {
  return (
    <div className="settings-page-container">
      <div className="settings-page-content">
        <div className="settings-page-header">
          Edit Profile
          <svg
            width="116"
            height="3"
            viewBox="0 0 116 3"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="settings-header-line"
          >
            <path
              d="M0.784668 3C0.784668 1.34315 2.12781 0 3.78467 0H112.266C113.923 0 115.266 1.34315 115.266 3V3H0.784668V3Z"
              fill="#747474"
            />
          </svg>
        </div>

        <div className="settings-form-container">
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" />
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" />
          <label htmlFor="email">Email</label>
          <input type="email" id="email" />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" />
        </div>

        <button className="settings-save-button">
          Save
        </button>
      </div>
    </div>
  );
}

export default SettingsPage;
