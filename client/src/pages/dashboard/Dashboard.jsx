import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@components/sidebar/Sidebar";
import styles from "./Dashboard.module.css";
import CourseCard from "@components/courseCard/CourseCard";

function Dashboard() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  async function getCourses() {
    const response = await fetch("http://localhost:5000/api/courses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    setCourses(data.courses);
  }
  useEffect(() => {
    if (!Cookies.get("token")) {
      navigate("/login");
    }
    getCourses();
    console.log(courses);
  }, [navigate]);
  return (
    <div className={styles.dashboard}>
      <div>
        <Sidebar />
      </div>
      <h1>Dashboard</h1>
      <div className={styles.courseGrid}>
        {courses.map((course, index) => (
          <CourseCard course={course} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
