import React, { useContext, useState, useEffect } from "react";
import "./AuthUser.css";
import axios from "axios";
import { AuthContext } from "../Contexts/AuthContext";

export default function AuthUser({ isOpen, onClose, defaultMode }) {
  const { register } = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(defaultMode === "login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Update mode whenever popup opens
  useEffect(() => {
    setIsLogin(defaultMode === "login");
  }, [defaultMode, isOpen]);

  const toggleForm = () => setIsLogin(!isLogin);
  const togglePassword = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    setSuccessMsg("");

    try {
      let res;
      if (isLogin) {
        res = await axios.post("http://localhost:3000/api/auth/login", {
          email: formData.email,
          password: formData.password,
        });
        
      } else {
        res = await axios.post(
          "http://localhost:3000/api/auth/register",
          formData
        );
      }

      const userdata = res.data.user;
      const token = res.data.token;
      register(userdata, token);

      setLoading(false);
      setSuccessMsg(isLogin ? "Logged in successfully!" : "Registered successfully!");

      setTimeout(() => {
        setSuccessMsg("");
        onClose();
      }, 3000);
    } catch (error) {
      setLoading(false);
      alert(error.response?.data?.message || "Authentication failed!");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="auth-backdrop">
      <div className="auth-popup">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2 style={{ paddingBottom: "20px" }}>{isLogin ? "Login" : "Register"}</h2>

        {successMsg ? (
          <div className="success-message">{successMsg}</div>
        ) : (
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="input-group">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className={formData.username ? "filled" : ""}
                />
                <label>Username</label>
              </div>
            )}

            <div className="input-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={formData.email ? "filled" : ""}
              />
              <label>Email</label>
            </div>

            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className={formData.password ? "filled" : ""}
              />
              <label>Password</label>
              <span className="toggle-password" onClick={togglePassword}>
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            {!isLogin && (
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className={formData.confirmPassword ? "filled" : ""}
                />
                <label>Confirm Password</label>
              </div>
            )}

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? <span className="spinner"></span> : isLogin ? "Login" : "Register"}
            </button>
          </form>
        )}

        {!successMsg && (
          <p className="toggle-text">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <span className="toggle-link" onClick={toggleForm}>
              {isLogin ? "Register" : "Login"}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
