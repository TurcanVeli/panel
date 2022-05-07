import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Toast from "@components/toast/Toast";
import Sidebar from "@components/sidebar/Sidebar";
import Title from "@components/title/Title";
import style from "./CoursePage.module.css";
import CourseNavbar from "@components/courseNavbar/CourseNavbar";

function CoursePage() {
  const navigate = useNavigate();
  const [course, setCourse] = useState({
    name: "",
    description: "",
    creationDate: "",
    upcomingAssignments: [],
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
      let tempCourse = data.course;
      tempCourse.upcomingAssignments = data.upcomingAssignments;
      setCourse(tempCourse);
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
          <div className={style.upcomingTableContainer}>
            <table className={style.upcomingTable}>
              <caption>
                <h3>Upcoming Assignments</h3>
              </caption>
              <tbody>
                {course.upcomingAssignments.map((assignment) => {
                  console.log(assignment);
                  return (
                    <tr
                      key={assignment._id}
                      onClick={() => {
                        navigate(
                          `/courses/${courseId}/assignment/${assignment._id}`
                        );
                      }}
                      className={style.upcomingTableRow}
                    >
                      <td className={style.upcomingTableCell}>
                        <div
                          className={`${style.upcomingStatusIndicator} ${
                            assignment.status === "Overdue" ? style.overdue : ""
                          } ${
                            assignment.status === "On Time" ? style.onTime : ""
                          } ${assignment.status === "Late" ? style.late : ""}`}
                        >
                          {
                            {
                              Clear: "",
                              Late: "!",
                              Overdue: "X",
                              "On Time": "✔",
                            }[assignment.status]
                          }
                        </div>
                      </td>
                      <td className={style.upcomingTableCell}>
                        {assignment.name}
                      </td>
                      <td className={style.upcomingTableCell}>
                        {new Date(assignment.dueDate).toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Toast ref={toast} />
    </div>
  );
}

export default CoursePage;
