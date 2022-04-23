import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "@components/sidebar/Sidebar.jsx";
import Toast from "@components/toast/Toast.jsx";
import style from "./AddAnnouncement.module.css";

function AddAnnouncement() {
  const announcementTitle = useRef();
  const announcementDescription = useRef();
  const toast = useRef();
  const { courseId } = useParams();

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (announcementTitle.current.value === "" || announcementDescription.current.value === "") {
      toast.current.show("Please fill all fields!");
      return;
    }

    await fetch(`${process.env.API_URL}/api/courses/${courseId}/add-announcement`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: announcementTitle.current.value,
        description: announcementDescription.current.value,
        postDate: new Date().toISOString(),
      }),
      credentials: "include",
      redirect: "follow",
    });

    navigate(`/courses/${courseId}/announcements`);
  };

  return (
    <div className={style.main}>
      <Sidebar/>
      <div className={style.page}>
        <form onSubmit={onSubmit} className={style.announcementForm}>
          <label className={style.operationlabel + " " + style.title}>
            <p>Add a New Announcement</p>
          </label>
          <input
            className={style.textbox}
            type="text"
            placeholder="Announcement Title"
            ref={announcementTitle}
          />
          <textarea
            className={style.textbox}
            maxLength="1000"
            cols="30"
            rows="10"
            placeholder="Annuoncement Description"
            ref={announcementDescription}
          />
          <button className={style.submit} type="submit">
            Create Announcement
          </button>
        </form>
      </div>
      <Toast ref={toast} />
    </div>
  );
}

export default AddAnnouncement;
