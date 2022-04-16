import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@pages/login/Login.jsx";
import Register from "@pages/register/Register.jsx";
import Dashboard from "@pages/dashboard/Dashboard.jsx";
import Assignments from "@pages/assignments/Assignments.jsx";
import Announcements from "@pages/announcements/Announcements.jsx";
import NotFound from "@pages/notfound/NotFound.jsx";
import AssignmentDetails from "@pages/assignmentdetails/AssignmentDetails.jsx";
import AddCourse from "@pages/addcourse/AddCourse.jsx";
import AddAssignment from "@pages/addassignment/AddAssignment.jsx";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/add-course" element={<AddCourse />} />
        <Route path="/courses/:courseId/assignments" element={<Assignments />} />
        <Route path="/courses/:courseId/announcements" element={<Announcements />} />
        <Route path="/courses/:courseId/assignment/:assignmentId" element={<AssignmentDetails />} />
        <Route path="/courses/:courseId/add-assignment" element={<AddAssignment />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
