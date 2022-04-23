import styles from "./Announcement.module.css";
import AnnouncementLogo from "@assets/announcement.svg";
import Sidebar from "@components/sidebar/Sidebar.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Announcement() {
  const [announcement, setAnnouncement] = useState({
    title: "",
    description: "",
    files: [],
    date: "",
    publisher: "",
  });
  const announcementId = useParams().announcementId;
  const courseId = useParams().courseId;
  useEffect(async () => {
    let result = await fetch(
      `${process.env.API_URL}/api/courses/${courseId}/announcements/${announcementId}`,
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

    setAnnouncement(json);
  }, []);

  return (
    <div>
      <Sidebar />
      <div className={styles.page}>
        <div className={styles.card}>
          <h2>
            {" "}
            <img src={AnnouncementLogo}></img> {announcement.title}
          </h2>
          <h3>{announcement.publisher} </h3>
          <div className={styles.content}>{announcement.description}</div>
        </div>
      </div>
    </div>
  );
}

export default Announcement;
