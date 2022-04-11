import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "@public/logo.svg";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    isInstructor: false,
  });
  const [authMessage, setAuthMessage] = useState("");

  async function handleLogin(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    });
    const data = await response.json();
    setAuthMessage(data.message);
    if (response.status === 200) {
      navigate("/dashboard");
    }
  }

  return (
    <div className="login-page">
      <img className="logo" src={logo}></img>
      <h1>Login</h1>
      <form className="auth-form" onSubmit={handleLogin}>
        <input
          id="email"
          className="form-field"
          type="text"
          placeholder="Email"
          value={user.email}
          onChange={(event) => setUser({ ...user, email: event.target.value })}
        />
      </form>
      <form className="auth-form" onSubmit={handleLogin}>
        <input
          id="password"
          className="form-field"
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(event) =>
            setUser({ ...user, password: event.target.value })
          }
        />
      </form>
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
      <div
        className="auth-message"
        style={{ display: authMessage === "" ? "none" : "block" }}
      >
        {authMessage}
      </div>
    </div>
  );
}

export default Login;
