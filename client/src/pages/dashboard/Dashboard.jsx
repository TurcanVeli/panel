import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@components/sidebar/Sidebar.jsx";
import styles from "./Dashboard.module.css";
import CourseCard from "@components/courseCard/CourseCard.jsx";
import Title from "@components/title/Title.jsx";

function Dashboard() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [type, setType] = useState(false);
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
    localStorage.removeItem("courseNames");
    localStorage.setItem(
      "courseNames",
      JSON.stringify(data.courses.map((course) => `${course._id}:${course.name}`))
    );
  }
  useEffect(() => {
    if (!Cookies.get("token") || !Cookies.get("isInstructor")) {
      navigate("/login");
    }
    getCourses();
    setType(Cookies.get("isInstructor") === "true");
  }, [navigate]);
  return (
    <div className={styles.dashboard}>
      <div>
        <Sidebar />
      </div>

      <div className={styles.controls}>
        <Title title="Dashboard" />
        {type === true && (
          <button
            className={styles.addCourse}
            onClick={() => {
              navigate("/add-course");
            }}
          >
            Add Course
          </button>
        )}
      </div>
      <div className={styles.courseGrid}>
        {courses.map((course, index) => (
          <CourseCard course={course} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
