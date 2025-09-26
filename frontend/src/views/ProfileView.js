import React, { useState } from "react";

function ProfileView({ userData }) {
  const [newUsername, setNewUsername] = useState(userData.username);
  const [password, setPassword] = useState(""); // Password for updating/deleting
  const [loading, setLoading] = useState(false); // Loading state for requests
  const [error, setError] = useState(""); // Error state
  const [successMessage, setSuccessMessage] = useState(""); // Success message state

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value); // Handle password input for delete and update
  };

  // Handle the Save changes
  const handleSave = async () => {
    if (!password) {
      alert("Password is required to update username.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch(`http://localhost:8081/contact/update/${userData.username}`, {
        method: "PUT", // Use PUT instead of POST
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newUsername,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Failed to update user.");
        setLoading(false);
        return;
      }

      setSuccessMessage("User updated successfully!");
      setLoading(false);
    } catch (err) {
      setError("Error updating user: " + err.message);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!password) {
      alert("Password is required to delete account.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch(`http://localhost:8081/contact/delete/${userData.username}`, {
        method: "DELETE", // Ensure DELETE is used
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Failed to delete account.");
        setLoading(false);
        return;
      }

      setSuccessMessage("Account deleted successfully!");
      setLoading(false);
      // Optionally redirect or reset state after deletion
    } catch (err) {
      setError("Error deleting account: " + err.message);
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Account Profile</h2>
      {successMessage && <div className="alert alert-success mb-3">{successMessage}</div>} {/* Success message */}
      {error && <div className="alert alert-danger mb-3">{error}</div>} {/* Error message */}
      
      <div className="form-group mb-3">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          className="form-control"
          value={newUsername}
          onChange={handleUsernameChange}
          disabled={loading} // Disable input while loading
        />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className="form-control"
          value={password}
          onChange={handlePasswordChange}
          disabled={loading} // Disable input while loading
        />
      </div>

      <div className="d-flex">
        <button
          className="btn btn-primary mt-3 me-3"
          onClick={handleSave}
          disabled={loading} // Disable button while loading
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
        <button
          className="btn btn-danger mt-3"
          onClick={handleDelete}
          disabled={loading} // Disable button while loading
        >
          {loading ? "Deleting..." : "Delete Account"}
        </button>
      </div>
    </div>
  );
}

export default ProfileView;
