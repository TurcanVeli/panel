import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@components/sidebar/Sidebar.jsx";
import Toast from "@components/toast/Toast.jsx";
import style from "./AddCourse.module.css";

function AddCourse() {
  const courseName = useRef();
  const courseDescription = useRef();
  const toast = useRef();

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (courseName.current.value === "" || courseDescription.current.value === "") {
      toast.current.show("Please fill all fields!");
      return;
    }

    await fetch(`${process.env.API_URL}/api/courses/create-course`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: courseName.current.value,
        description: courseDescription.current.value,
      }),
      credentials: "include",
      redirect: "follow",
    });

    navigate("/dashboard");
  };

  return (
    <div className={style.main}>
      <Sidebar/>
      <div className={style.page}>
        <form onSubmit={onSubmit} className={style.courseform}>
          <label className={style.operationlabel + " " + style.title}>
            <p>Add a New Course</p>
          </label>
          <input
            className={style.textbox}
            type="text"
            placeholder="Course Name"
            ref={courseName}
          />
          <input
            className={style.textbox}
            type="text"
            placeholder="Course Description"
            ref={courseDescription}
          />
          <button className={style.submit} type="submit">
            Create Course
          </button>
        </form>
      </div>
      <Toast ref={toast} />
    </div>
  );
}

export default AddCourse;
