import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import logo from "@public/logo.svg";

function Register() {
  const navigate = useNavigate();
  const [showLoginButton, setShowLoginButton] = useState(false);
  const [authMessage, setAuthMessage] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    isInstructor: false,
  });

  async function handleRegister(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    });
    const data = await response.json();
    setAuthMessage(data.message);
    if (response.status === 201) {
      navigate("/dashboard");
    }
    if (response.status === 400) {
      if (data.message === "User already exists") {
        setShowLoginButton(true);
      }
    }
  }

  function handleLogin(event) {
    event.preventDefault();
    navigate("/login");
  }

  return (
    <div className={styles.registerPage}>
      <img className={styles.logo} src={logo}></img>
      <h1>Register</h1>
      <form
        className={styles.authForm}
        s
        onSubmit={handleRegister}
        onChange={() => {
          setAuthMessage("");
          setShowLoginButton(false);
        }}
      >
        <input
          id="name"
          type="text"
          placeholder="Name"
          value={user.name}
          onChange={(event) => setUser({ ...user, name: event.target.value })}
        />
        <input
          id="email"
          type="text"
          placeholder="Email"
          value={user.email}
          onChange={(event) => setUser({ ...user, email: event.target.value })}
        />
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(event) =>
            setUser({ ...user, password: event.target.value })
          }
        />
        <div className={styles.radioGroup}>
          <label htmlFor="student">
            <input
              id="student"
              type="radio"
              name="userType"
              onChange={() => setUser({ ...user, isInstructor: false })}
              defaultChecked
            ></input>
            Student
          </label>
          <label htmlFor="instructor">
            <input
              id="instructor"
              type="radio"
              name="userType"
              onChange={() => setUser({ ...user, isInstructor: true })}
            ></input>
            Instructor
          </label>
        </div>

        <button className={styles.registerButton} onClick={handleRegister}>
          Register
        </button>
      </form>
      <div
        className={styles.authAlert}
        style={{ display: authMessage ? "block" : "none" }}
      >
        {authMessage}
      </div>
      <button
        className={styles.loginButton}
        onClick={handleLogin}
        style={{ display: showLoginButton ? "block" : "none" }}
      >
        Login
      </button>
    </div>
  );
}

export default Register;
