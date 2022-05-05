import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Register.module.css";
import logo from "@assets/logo.svg";
import Cookies from "js-cookie";
import Toast from "@components/toast/Toast.jsx";

function Register() {
  const navigate = useNavigate();
  const [showLoginButton, setShowLoginButton] = useState(false);
  const toast = useRef();
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
    console.log(data);
    if (response.status === 201) {
      navigate("/dashboard");
    }
    if (response.status === 400) {
      if (data.message === "User already exists") {
        toast.current.show("User already exists");
        setShowLoginButton(true);
      }
    }
  }

  function handleLogin(event) {
    event.preventDefault();
    navigate("/login");
  }

  useEffect(() => {
    Object.keys(Cookies.get()).forEach(function (cookieName) {
      Cookies.remove(cookieName);
    });
    localStorage.removeItem("courseNames");
  }, []);

  return (
    <div className={style.registerPage}>
      <img className={style.logo} src={logo}></img>
      <h1 style={{"margin": "8px"}}>Register</h1>
      <form
        className={style.authForm}
        onSubmit={handleRegister}
        onChange={() => {
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
        <div className={style.radioGroup}>
          <label htmlFor="student">
            <input
              id="student"
              type="radio"
              name="userType"
              checked={!user.isInstructor}
              onChange={() => setUser({ ...user, isInstructor: false })}
            ></input>
            Student
          </label>
          <label htmlFor="instructor">
            <input
              id="instructor"
              type="radio"
              name="userType"
              checked={user.isInstructor}
              onChange={() => setUser({ ...user, isInstructor: true })}
            ></input>
            Instructor
          </label>
        </div>
        <div>
          <button className={style.registerButton} onClick={handleRegister}>
            Register
          </button>
          <button
            className={style.loginButton}
            onClick={handleLogin}
            style={{ display: showLoginButton ? "block" : "none" }}
          >
            Login
          </button>
        </div>
      </form>
      <Toast ref={
        toast
      }/>
    </div>
  );
}

export default Register;
