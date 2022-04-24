import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Toast from "@components/toast/Toast";
import Sidebar from "@components/sidebar/Sidebar";
import Title from "@components/title/Title";
import styles from "./CoursePage.module.css";
import Cookies from "js-cookie";
import CourseNavbar from "@components/courseNavbar/CourseNavbar";

function CoursePage() {
  const [course, setCourse] = useState({
    name: "",
  });
  const courseId = useParams().courseId;
  const toast = useRef();
  const isInstructor = Cookies.get("isInstructor") === "true";
  const navigate = useNavigate();
  useEffect(() => {
    async function getCourse() {
      const response = await fetch(
        `${process.env.API_URL}/api/courses/${courseId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          redirect: "follow",
        }
      );
      if (response.status !== 200) {
        toast.current.show("Something went wrong!");
        return;
      }
      const data = await response.json();
      setCourse(data.course);
    }
    getCourse();
  }, []);

  return (
    <div className={styles.main}>
      <Sidebar />
      <CourseNavbar courseId={courseId} />
      <div className={styles.page}>
        <div className={styles.courseDetails}>
          <div className={styles.controls}>
            <Title title={course.name} />
            {isInstructor && (
              <button
                className={styles.addStudent}
                onClick={() => {
                  navigate("" + "add-student");
                }}
              >
                Add Student
              </button>
            )}
          </div>
        </div>
      </div>
      <Toast ref={toast} />
    </div>
  );
}

export default CoursePage;
