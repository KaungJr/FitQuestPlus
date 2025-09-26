import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaDumbbell } from 'react-icons/fa'; // For the dumbbell logo
import '../styles/Authentication.css';
// Add your custom CSS for styling

const Authentication = ({ handleLogin, isSignup }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirming password
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8081/contact/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Login failed. Please try again.");
        setLoading(false);
        return;
      }

      const { role } = await response.json();
      handleLogin({ username, role });

      // Redirect to home page after successful login
      navigate("/");  // Redirect to the home page or any page you want

    } catch (err) {
      setError("Failed to log in. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const role = 'user'; // You can update this based on your logic (e.g., admin, user, etc.)
      const response = await fetch("http://localhost:8081/contact/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, confirmPassword, role }), 
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Signup failed. Please try again.");
        setLoading(false);
        return;
      }

      // Redirect to login page after successful signup
      navigate("/login");

    } catch (err) {
      setError("Failed to sign up. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="app-header">
          <FaDumbbell className="logo" />
          <h2 className="app-name">FitQuest</h2>
        </div>
        <h3 className="text-center">{isSignup ? "Sign Up" : "Login"}</h3>
        <form onSubmit={isSignup ? handleSignupSubmit : handleLoginSubmit}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {isSignup && (
            <div className="input-group">
              <label>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}
          {error && <p className="error-text">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? (isSignup ? "Signing up..." : "Logging in...") : isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
        {!isSignup ? (
          <p className="switch-link">
            Don't have an account? <a href="/signup">Sign up here</a>
          </p>
        ) : (
          <p className="switch-link">
            Already have an account? <a href="/login">Login here</a>
          </p>
        )}
      </div>
    </div>
  );
};

export default Authentication;
