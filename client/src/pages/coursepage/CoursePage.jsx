import { useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import Toast from "@components/toast/Toast";
import Sidebar from "@components/sidebar/Sidebar";
import Title from "@components/title/Title";
import styles from "./CoursePage.module.css";
import CourseNavbar from "@components/courseNavbar/CourseNavbar";
import { CourseContext } from "@context/CourseContext";

function CoursePage() {
  const [courseName, setCourseName] = useContext(CourseContext);
  const courseId = useParams().courseId;
  const toast = useRef();
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
      setCourseName(data.course.name);
    }
    getCourse();
  }, []);

  return (
    <div className={styles.main}>
      <Sidebar />
      <CourseNavbar />
      <div className={styles.page}>
        <div className={styles.courseDetails}>
          <div className={styles.controls}>
            <Title title={courseName} />
          </div>
        </div>
      </div>
      <Toast ref={toast} />
    </div>
  );
}

export default CoursePage;
