import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "@components/sidebar/Sidebar.jsx";
import Title from "@components/title/Title.jsx";
import Assignment from "@components/assignment/Assignment.jsx";
import AssignmentLogo from "@assets/assignment.svg";
import style from "./Assignments.module.css";
import Cookies from "js-cookie";

function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [type, setType] = useState("");

  const { courseId } = useParams();

  const navigate = useNavigate();

  async function getCourse() {
    let result = await fetch(
      `${process.env.API_URL}/api/courses/${courseId}/assignments`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        redirect: "follow",
      }
    );
    let json = await result.json();

    setAssignments(json);
  }

  useEffect( () => {
    getCourse();
    setType(Cookies.get("isInstructor") === "true");
  }, []);

  return (
    <div className={style.main}>
      <Sidebar />
      <div className={style.page}>
        <div className={style.controls}>
          <Title title="Assignments" />
          {type && (
            <button
              className={style.addassignment}
              onClick={() => {
                navigate(`/courses/${courseId}/add-assignment`);
              }}
            >
              Add Assignment
            </button>
          )}
        </div>

        {assignments.length === 0 ? (
          <div className={style.noassignments}>
            <img
              className={style.noassignmentslogo}
              src={AssignmentLogo}
              alt="No Assignments"
            />
            <p>No assignments yet!</p>
          </div>
        ) : (
          <ul className={style.assignmentcontainer}>
            {assignments.map((assignment) => (
              <Assignment assignment={assignment} key={assignment._id} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Assignments;
