import style from "./AddStudent.module.css";
import Title from "@components/title/Title.jsx";
import Toast from "@components/toast/Toast.jsx";
import { useRef, useState } from "react";
import {useParams } from "react-router-dom";
import Sidebar from "@components/sidebar/Sidebar.jsx";

function AddStudent() {
  const [student, setStudent] = useState({
    email: "",
  });
  const toast = useRef();
  const courseId = useParams().courseId;

  async function addStudent(e) {
    e.preventDefault();
    const res = await fetch(
      `${process.env.API_URL}/api/courses/${courseId}/add-student/${student.email}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        redirect: "follow",
        body: JSON.stringify(student),
      }
    );
    if (res.status !== 200) {
      toast.current.show("The student was not found");
      return;
    }
    toast.current.show("Student added!");
  }

  return (
    <div className={style.main}>
      <Sidebar />
      <div className={style.page}>
        <Title title="Add Student" />
        <form onSubmit={addStudent} className={style.studentForm}>
          <input
            className={style.textbox}
            type="text"
            placeholder="Student Email"
            onChange={(event) => {
              setStudent({ ...student, email: event.target.value });
            }}
          />
          <button
            style={
              student.email !== ""
                ? { backgroundColor: "#3737f0" }
                : { backgroundColor: "lightgrey" }
            }
            className={style.submit}
            onClick={addStudent}
          >
            Submit
          </button>
        </form>
      </div>
      <Toast ref={toast} />
    </div>
  );
}

export default AddStudent;
