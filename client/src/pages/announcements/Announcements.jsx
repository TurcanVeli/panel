import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Sidebar from "@components/sidebar/Sidebar.jsx";
import Title from "@components/title/Title.jsx";
import Announcement from "@components/announcement/Announcement.jsx";
import Toast from "@components/toast/Toast.jsx";
import AnnouncementLogo from "@assets/announcement.svg";
import style from "./Announcements.module.css";

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [type, setType] = useState(false);
  const toast = useRef();

  const { courseId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    setType(Cookies.get("isInstructor") === "true");
    async function getAnnouncements() {
      let result = await fetch(
        `${process.env.API_URL}/api/courses/${courseId}/announcements`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          redirect: "follow",
        }
      );

      if (result.status !== 200) {
        toast.current.show("Something went wrong!");
        return;
      }

      let json = await result.json();
      setAnnouncements(json);
    }

    getAnnouncements();
  }, []);

  return (
    <div className={style.main}>
      <Sidebar />
      <div className={style.page}>
        <div className={style.controls}>
          <Title title="Announcements" />
          {type && (
            <button
              className={style.addAnnouncement}
              onClick={() => {
                navigate(`/courses/${courseId}/add-announcement`);
              }}
            >
              Add Announcement
            </button>
          )}
        </div>
        {announcements.length === 0 ? (
          <div className={style.noAnnouncements}>
            <img src={AnnouncementLogo}  alt="Announcement Logo" />
            <p>No announcements yet!</p>
          </div>
        ) : (
          <div className={style.announcements}>
            {announcements.map((announcement) => (
              <Announcement
                key={announcement._id}
                announcement={announcement}
              />
            ))}
          </div>
        )}
      </div>
      <Toast ref={toast} />
    </div>
  );
}

export default Announcements;
