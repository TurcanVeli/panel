import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import AnnouncementLogo from "@assets/announcement.svg";
import style from "./Announcement.module.css";

function Announcement(props) {
  const navigate = useNavigate();
  const { announcement } = props;
  const courseId = useParams().courseId;
  
  return ( 
    <li
      className={style.announcemententry}
      onClick={() => {
        navigate(`/courses/${courseId}/announcements/${announcement._id}`);
      }}
    >
      <div className={style.announcementcontainer}>
        <img
          className={style.announcementlogo}
          src={AnnouncementLogo}
          alt="Announcement"
        />
        <div className={style.announcementdetails}>
          <p className={style.title}>{announcement.title}</p>
          <p className={style.content}>{announcement.description}</p>
          <p className={style.date}>
            {new Date(announcement.postDate).toLocaleDateString(
              "en-US",
              {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              }
            )}
          </p>
        </div>
      </div>
    </li>
  );
}

Announcement.propTypes = {
  announcement: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    publisher: PropTypes.string.isRequired,
    postDate: PropTypes.string.isRequired,
    files: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};


export default Announcement;