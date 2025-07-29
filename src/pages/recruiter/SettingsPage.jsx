import React, { useState } from "react";
import "../../styles/SettingsPage.css";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    theme: "light",
    emailNotifications: false,
    pushNotifications: false,
    language: "en",
    twoFactor: false,
    profilePicture: null,
  });
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrorMessage("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
        setErrorMessage("Only JPEG, PNG, or GIF images are allowed");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage("Image size must be less than 5MB");
        return;
      }
      setFormData((prev) => ({ ...prev, profilePicture: file }));
      setPreviewUrl(URL.createObjectURL(file));
      setErrorMessage("");
    }
  };

  const validateProfile = () => {
    if (!formData.fullName.trim()) return "Full Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return "Invalid email format";
    return "";
  };

  const validateSecurity = () => {
    if (!formData.currentPassword) return "Current Password is required";
    if (formData.newPassword.length < 8) return "New Password must be at least 8 characters";
    if (formData.newPassword !== formData.confirmPassword) return "Passwords do not match";
    return "";
  };

  const handleSubmit = (e, tab) => {
    e.preventDefault();
    let validationError = "";
    if (tab === "Profile") validationError = validateProfile();
    if (tab === "Security") validationError = validateSecurity();

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage(`${tab} settings updated successfully!`);
      setErrorMessage("");
      setTimeout(() => setSuccessMessage(""), 3000);
    }, 1000);
  };

  const handleAccountDeletion = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage("Account deletion request submitted.");
      setShowDeleteModal(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    }, 1000);
  };

  const handleDataExport = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage("Data export request sent to your email.");
      setTimeout(() => setSuccessMessage(""), 3000);
    }, 1000);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="tab-content">
            <h2>Profile Settings</h2>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <form className="settings-form" onSubmit={(e) => handleSubmit(e, "Profile")}>
              <div className="form-group">
                <label htmlFor="profilePicture">Profile Picture</label>
                <div className="profile-pic-container">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Profile picture preview"
                      className="profile-pic-preview"
                    />
                  ) : (
                    <div className="profile-pic-placeholder">No Image</div>
                  )}
                  <div className="file-input-wrapper">
                    <input
                      id="profilePicture"
                      name="profilePicture"
                      type="file"
                      accept="image/jpeg,image/png,image/gif"
                      onChange={handleFileChange}
                      aria-label="Profile Picture Upload"
                    />
                    <span className="file-input-label">Choose Image</span>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  required
                  aria-label="Full Name"
                  aria-invalid={errorMessage.includes("Full Name") ? "true" : "false"}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="recruiter@example.com"
                  required
                  aria-label="Email"
                  aria-invalid={errorMessage.includes("email") ? "true" : "false"}
                />
              </div>
              <button type="submit" disabled={isSubmitting} className="submit-button">
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span> Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </form>
          </div>
        );
      case "security":
        return (
          <div className="tab-content">
            <h2>Security Settings</h2>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <form className="settings-form" onSubmit={(e) => handleSubmit(e, "Security")}>
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  required
                  aria-label="Current Password"
                  aria-invalid={errorMessage.includes("Current Password") ? "true" : "false"}
                />
              </div>
              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  required
                  aria-label="New Password"
                  aria-invalid={errorMessage.includes("New Password") ? "true" : "false"}
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  aria-label="Confirm New Password"
                  aria-invalid={errorMessage.includes("Passwords do not match") ? "true" : "false"}
                />
              </div>
              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    name="twoFactor"
                    type="checkbox"
                    checked={formData.twoFactor}
                    onChange={handleInputChange}
                    aria-label="Enable Two-Factor Authentication"
                  />
                  Enable Two-Factor Authentication
                </label>
                {formData.twoFactor && (
                  <div className="two-factor-info">
                    <p>Scan this QR code with your authenticator app:</p>
                    <div className="qr-code-placeholder">QR Code Placeholder</div>
                  </div>
                )}
              </div>
              <button type="submit" disabled={isSubmitting} className="submit-button">
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span> Updating...
                  </>
                ) : (
                  "Update Security Settings"
                )}
              </button>
            </form>
          </div>
        );
      case "preferences":
        return (
          <div className="tab-content">
            <h2>Preferences</h2>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <form className="settings-form" onSubmit={(e) => handleSubmit(e, "Preferences")}>
              <div className="form-group">
                <label htmlFor="theme">Theme</label>
                <select
                  id="theme"
                  name="theme"
                  value={formData.theme}
                  onChange={handleInputChange}
                  aria-label="Theme Selection"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System Default</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="language">Language</label>
                <select
                  id="language"
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  aria-label="Language Selection"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    name="emailNotifications"
                    type="checkbox"
                    checked={formData.emailNotifications}
                    onChange={handleInputChange}
                    aria-label="Enable Email Notifications"
                  />
                  Enable Email Notifications
                </label>
              </div>
              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    name="pushNotifications"
                    type="checkbox"
                    checked={formData.pushNotifications}
                    onChange={handleInputChange}
                    aria-label="Enable Push Notifications"
                  />
                  Enable Push Notifications
                </label>
              </div>
              <button type="submit" disabled={isSubmitting} className="submit-button">
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span> Saving...
                  </>
                ) : (
                  "Save Preferences"
                )}
              </button>
            </form>
          </div>
        );
      case "account":
        return (
          <div className="tab-content">
            <h2>Account Management</h2>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <div className="account-section">
              <h3>Data Export</h3>
              <p>Request a copy of your account data to be sent to your registered email.</p>
              <button onClick={handleDataExport} disabled={isSubmitting} className="action-button">
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span> Requesting...
                  </>
                ) : (
                  "Request Data Export"
                )}
              </button>
            </div>
            <div className="form-section-divider"></div>
            <div className="account-section">
              <h3>Delete Account</h3>
              <p className="danger">Permanently delete your account and all associated data. This action cannot be undone.</p>
              <button
                onClick={() => setShowDeleteModal(true)}
                disabled={isSubmitting}
                className="action-button danger"
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span> Processing...
                  </>
                ) : (
                  "Delete Account"
                )}
              </button>
            </div>
            {showDeleteModal && (
              <div className="modal-overlay">
                <div className="modal-dialog">
                  <h3>Confirm Account Deletion</h3>
                  <p className="danger">
                    Are you sure you want to delete your account? This action is irreversible and will remove all your data.
                  </p>
                  <div className="modal-buttons">
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="action-button"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAccountDeletion}
                      className="action-button danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="settings-container glass-card">
      <h1 className="settings-title">Settings</h1>
      <nav className="tab-nav">
        {["profile", "security", "preferences", "account"].map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? "active" : ""}`}
            onClick={() => {
              setActiveTab(tab);
              setSuccessMessage("");
              setErrorMessage("");
              setShowDeleteModal(false);
            }}
            aria-label={`${tab.charAt(0).toUpperCase() + tab.slice(1)} Settings`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>
      {renderTabContent()}
    </div>
  );
};

export default SettingsPage;