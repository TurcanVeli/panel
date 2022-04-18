import styles from "./Announcement.module.css";
import Title from "@components/title/Title.jsx";
import Sidebar from "@components/sidebar/Sidebar.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Announcement() {
  const [announcement, setAnnouncement] = useState({
    title: "",
    description: "",
    files: [],
    date: "",
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
  });

  return (
    <div>
      <Sidebar />
      <div className={styles.page}>
        <Title title={announcement.title}></Title>
        <div className={styles.content}>
          <p>{announcement.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Announcement;
