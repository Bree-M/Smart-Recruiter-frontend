import React, { useState, useEffect } from "react";
import "../../styles/candidate.css/SettingsPage.css";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [formData, setFormData] = useState({
    fullName: "Jane Doe",
    email: "jane.doe@example.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    theme: "light",
    emailNotifications: true,
    pushNotifications: false,
    language: "en",
    twoFactor: false,
    timeZone: "UTC",
    assessmentDisplay: "list",
    profilePicture: null,
  });
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrorMessages((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
        setErrorMessages((prev) => ({
          ...prev,
          profilePicture: "Only JPEG, PNG, or GIF images are allowed",
        }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessages((prev) => ({
          ...prev,
          profilePicture: "Image size must be less than 5MB",
        }));
        return;
      }
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setFormData((prev) => ({ ...prev, profilePicture: file }));
      setPreviewUrl(URL.createObjectURL(file));
      setErrorMessages((prev) => ({ ...prev, profilePicture: "" }));
    }
  };

  const validateProfile = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = "Full Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    return errors;
  };

  const validateSecurity = () => {
    const errors = {};
    if (!formData.currentPassword) {
      errors.currentPassword = "Current Password is required";
    }
    if (formData.newPassword) {
      if (formData.newPassword.length < 8) {
        errors.newPassword = "New Password must be at least 8 characters";
      } else if (!/[A-Z]/.test(formData.newPassword)) {
        errors.newPassword = "New Password must include an uppercase letter";
      } else if (!/[0-9]/.test(formData.newPassword)) {
        errors.newPassword = "New Password must include a number";
      }
      if (formData.newPassword !== formData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }
    }
    return errors;
  };

  const handleSubmit = (e, tab) => {
    e.preventDefault();
    let validationErrors = {};
    if (tab === "profile") validationErrors = validateProfile();
    if (tab === "security") validationErrors = validateSecurity();

    if (Object.keys(validationErrors).length > 0) {
      setErrorMessages(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage(`${tab} settings updated successfully!`);
      setErrorMessages({});
      setTimeout(() => setSuccessMessage(""), 3000);
    }, 1000);
  };

  const handleAccountDeletion = () => {
    if (deleteConfirmation.toLowerCase() !== "delete") {
      setErrorMessages((prev) => ({
        ...prev,
        deleteConfirmation: "Type 'delete' to confirm",
      }));
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage("Account deletion request submitted.");
      setShowDeleteModal(false);
      setDeleteConfirmation("");
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
            {successMessage && (
              <p className="success-message" aria-live="polite">
                {successMessage}
              </p>
            )}
            {isLoading && <p aria-live="polite">Loading settings...</p>}
            <form
              className="settings-form"
              onSubmit={(e) => handleSubmit(e, "profile")}
              role="form"
              aria-label="Profile Settings Form"
            >
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
                      aria-invalid={errorMessages.profilePicture ? "true" : "false"}
                    />
                    <span className="file-input-label">Choose Image</span>
                  </div>
                  {errorMessages.profilePicture && (
                    <p className="error-message" aria-live="assertive">
                      {errorMessages.profilePicture}
                    </p>
                  )}
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
                  placeholder="Enter your full name"
                  required
                  aria-label="Full Name"
                  aria-invalid={errorMessages.fullName ? "true" : "false"}
                />
                {errorMessages.fullName && (
                  <p className="error-message" aria-live="assertive">
                    {errorMessages.fullName}
                  </p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                  aria-label="Email"
                  aria-invalid={errorMessages.email ? "true" : "false"}
                />
                {errorMessages.email && (
                  <p className="error-message" aria-live="assertive">
                    {errorMessages.email}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
                aria-label="Save Profile Changes"
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
        );
      case "security":
        return (
          <div className="tab-content">
            <h2>Security Settings</h2>
            {successMessage && (
              <p className="success-message" aria-live="polite">
                {successMessage}
              </p>
            )}
            {isLoading && <p aria-live="polite">Loading settings...</p>}
            <form
              className="settings-form"
              onSubmit={(e) => handleSubmit(e, "security")}
              role="form"
              aria-label="Security Settings Form"
            >
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
                  aria-invalid={errorMessages.currentPassword ? "true" : "false"}
                />
                {errorMessages.currentPassword && (
                  <p className="error-message" aria-live="assertive">
                    {errorMessages.currentPassword}
                  </p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  aria-label="New Password"
                  aria-invalid={errorMessages.newPassword ? "true" : "false"}
                />
                {errorMessages.newPassword && (
                  <p className="error-message" aria-live="assertive">
                    {errorMessages.newPassword}
                  </p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  aria-label="Confirm New Password"
                  aria-invalid={errorMessages.confirmPassword ? "true" : "false"}
                />
                {errorMessages.confirmPassword && (
                  <p className="error-message" aria-live="assertive">
                    {errorMessages.confirmPassword}
                  </p>
                )}
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
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
                aria-label="Update Security Settings"
              >
                {isSubmitting ? "Updating..." : "Update Security Settings"}
              </button>
            </form>
          </div>
        );
      case "preferences":
        return (
          <div className="tab-content">
            <h2>Preferences</h2>
            {successMessage && (
              <p className="success-message" aria-live="polite">
                {successMessage}
              </p>
            )}
            {isLoading && <p aria-live="polite">Loading settings...</p>}
            <form
              className="settings-form"
              onSubmit={(e) => handleSubmit(e, "preferences")}
              role="form"
              aria-label="Preferences Form"
            >
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
              <div className="form-group">
                <label htmlFor="timeZone">Time Zone</label>
                <select
                  id="timeZone"
                  name="timeZone"
                  value={formData.timeZone}
                  onChange={handleInputChange}
                  aria-label="Time Zone Selection"
                >
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">America/New York</option>
                  <option value="Europe/London">Europe/London</option>
                  <option value="Asia/Tokyo">Asia/Tokyo</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="assessmentDisplay">Assessment Display</label>
                <select
                  id="assessmentDisplay"
                  name="assessmentDisplay"
                  value={formData.assessmentDisplay}
                  onChange={handleInputChange}
                  aria-label="Assessment Display Preference"
                >
                  <option value="list">List View</option>
                  <option value="grid">Grid View</option>
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
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
                aria-label="Save Preferences"
              >
                {isSubmitting ? "Saving..." : "Save Preferences"}
              </button>
            </form>
          </div>
        );
      case "account":
        return (
          <div className="tab-content">
            <h2>Account Management</h2>
            {successMessage && (
              <p className="success-message" aria-live="polite">
                {successMessage}
              </p>
            )}
            {isLoading && <p aria-live="polite">Loading settings...</p>}
            <div className="account-section">
              <h3>Data Export</h3>
              <p>Request a copy of your account data to be sent to your email.</p>
              <button
                onClick={handleDataExport}
                disabled={isSubmitting}
                className="action-button"
                aria-label="Request Data Export"
              >
                {isSubmitting ? "Requesting..." : "Request Data Export"}
              </button>
            </div>
            <div className="form-section-divider"></div>
            <div className="account-section">
              <h3>Delete Account</h3>
              <p className="danger-text">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <button
                onClick={() => setShowDeleteModal(true)}
                disabled={isSubmitting}
                className="action-button danger"
                aria-label="Delete Account"
              >
                {isSubmitting ? "Processing..." : "Delete Account"}
              </button>
            </div>
            {showDeleteModal && (
              <div className="modal-overlay" role="dialog" aria-label="Confirm Account Deletion">
                <div className="modal-dialog">
                  <h3>Confirm Account Deletion</h3>
                  <p className="danger-text">
                    Type "delete" to confirm permanent deletion of your account.
                  </p>
                  <input
                    type="text"
                    value={deleteConfirmation}
                    onChange={(e) => {
                      setDeleteConfirmation(e.target.value);
                      setErrorMessages((prev) => ({ ...prev, deleteConfirmation: "" }));
                    }}
                    placeholder="Type 'delete'"
                    className="delete-confirmation-input"
                    aria-label="Confirm Deletion"
                    aria-invalid={errorMessages.deleteConfirmation ? "true" : "false"}
                  />
                  {errorMessages.deleteConfirmation && (
                    <p className="error-message" aria-live="assertive">
                      {errorMessages.deleteConfirmation}
                    </p>
                  )}
                  <div className="modal-buttons">
                    <button
                      onClick={() => {
                        setShowDeleteModal(false);
                        setDeleteConfirmation("");
                        setErrorMessages((prev) => ({ ...prev, deleteConfirmation: "" }));
                      }}
                      className="action-button"
                      aria-label="Cancel Deletion"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAccountDeletion}
                      className="action-button danger"
                      aria-label="Confirm Deletion"
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
    <div className="settings-page" role="main" aria-label="Candidate Settings">
      <h1>Settings</h1>
      <nav className="tab-nav" role="tablist">
        {["profile", "security", "preferences", "account"].map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? "active" : ""}`}
            onClick={() => {
              setActiveTab(tab);
              setSuccessMessage("");
              setErrorMessages({});
              setShowDeleteModal(false);
            }}
            role="tab"
            aria-selected={activeTab === tab}
            aria-controls={`panel-${tab}`}
            aria-label={`${tab.charAt(0).toUpperCase() + tab.slice(1)} Settings`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>
      <div id={`panel-${activeTab}`} role="tabpanel" aria-labelledby={`tab-${activeTab}`}>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default SettingsPage;