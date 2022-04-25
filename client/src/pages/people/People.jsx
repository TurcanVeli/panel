import style from "./People.module.css";
import CourseNavbar from "@components/courseNavbar/CourseNavbar";
import Sidebar from "@components/sidebar/Sidebar";
import Title from "@components/title/Title";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function People() {
  const isInstructor = Cookies.get("isInstructor") === "true";
  const courseId = useParams().courseId;
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [instructors, setInstructors] = useState([]);
  useEffect (() => {
    async function getPeople() {
      const response = await fetch(
        `${process.env.API_URL}/api/courses/${courseId}/people`,
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
        return;
      }
      const data = await response.json();
      setStudents(data.students);
      setInstructors(data.instructors);
    }
    getPeople();
    
  }, []);
  return (
    <div className={style.main}> 
      <Sidebar />
      <CourseNavbar/>
      <div className={style.page}>
        <div className={style.controls}>
          <Title title="People" />
          {isInstructor && (
            <button
              className={style.addStudent}
              onClick={() => {
                navigate(`/courses/${courseId}/add-student`);
              }}
            >
              Add Student
            </button>
          )}
        </div>
        <div className={style.peopleList}>
          {instructors.map(person => (
            <div className={style.peopleListItem} key={person._id}>
              <li>
                {person.name}
              </li>
              <div className={style.instructorType}>
                Instructor
              </div>
            </div>
          ))}
          {students.map(person => (
            <div className={style.peopleListItem} key={person._id}>
              <li>
                {person.name}
              </li>
              <div className={style.studentType}>
                Student
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>

  );
}

export default People;