import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import logo from "@assets/logo.svg";
import Cookies from "js-cookie";

function Login() {
  const navigate = useNavigate();
  const [authMessage, setAuthMessage] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
    isInstructor: false,
  });

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
    return;
  }

  function handleRegister(event) {
    event.preventDefault();
    navigate("/register");
  }

  useEffect(() => {
    Object.keys(Cookies.get()).forEach(function (cookieName) {
      Cookies.remove(cookieName);
    });
  }, []);

  return (
    <div className={styles.loginPage}>
      <img className={styles.logo} src={logo}></img>
      <h1>Login</h1>
      <form
        className={styles.authForm}
        onSubmit={handleLogin}
        onChange={() => {
          setAuthMessage("");
        }}
      >
        <input
          id="email"
          type="text"
          placeholder="Email"
          value={user.email}
          onChange={(event) => {
            setUser({ ...user, email: event.target.value });
          }}
        />
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(event) => {
            setUser({ ...user, password: event.target.value });
          }}
        />
        <div>
          <button className={styles.loginButton} onClick={handleLogin}>
            Login
          </button>
          <button className={styles.registerButton} onClick={handleRegister}>
            Register
          </button>
        </div>
      </form>
      <div
        className={styles.authAlert}
        style={{ display: authMessage ? "block" : "none" }}
      >
        {authMessage}
      </div>
    </div>
  );
}

export default Login;
