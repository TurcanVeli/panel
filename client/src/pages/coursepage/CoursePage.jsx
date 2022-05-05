import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Toast from "@components/toast/Toast";
import Sidebar from "@components/sidebar/Sidebar";
import Title from "@components/title/Title";
import style from "./CoursePage.module.css";
import CourseNavbar from "@components/courseNavbar/CourseNavbar";

function CoursePage() {
  var assignmentStatus = false;
  const navigate = useNavigate();
  const [course, setCourse] = useState({
    name: "",
    description: "",
    creationDate: "",
    assignments: [],
  });
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
      setCourse(data.course);
    }
    getCourse();
  }, []);

  return (
    <div className={style.main}>
      <Sidebar />
      <CourseNavbar />
      <div className={style.page}>
        <div className={style.courseDetails}>
          <div className={style.controls}>
            <Title title={course.name} />
          </div>
          <div className={style.upcomingListContainer}>
            <ul className={style.upcomingList}>
              <h3>Upcoming Assignmnets</h3>
              {course.assignments
                .filter(
                  (assignment) =>
                    new Date(assignment.dueDate).getTime() >
                    new Date(Date.now()).setDate(
                      new Date(Date.now()).getDate() - 2
                    )
                )
                .sort((a, b) => {
                  return a.dueDate > b.dueDate ? 1 : -1;
                })
                .map((assignment) => {
                  assignmentStatus =
                    new Date(assignment.dueDate).getTime() < Date.now() &&
                    assignment.submissions.length === 0;
                  return (
                    <li
                      className={style.upcomingItem}
                      key={assignment._id}
                      onClick={() => {
                        navigate(
                          `/courses/${courseId}/assignment/${assignment._id}`
                        );
                      }}
                    >
                      <div
                        className={`
                            ${style.upcomingItemStatus}
                            ${
                    assignmentStatus
                      ? style.upcomingItemStatusOverdue
                      : ""
                    }`}
                      >
                        {assignmentStatus ? "X" : "✔"}
                      </div>
                      <div className={style.upcomingItemTitle}>
                        {assignment.name}
                      </div>
                      <div className={style.upcomingItemDueDate}>
                        {new Date(assignment.dueDate).toUTCString()}
                      </div>
                      <div className={style.upcomingItemMaxPoints}>
                        {assignment.maxPoints}
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
      <Toast ref={toast} />
    </div>
  );
}

export default CoursePage;
