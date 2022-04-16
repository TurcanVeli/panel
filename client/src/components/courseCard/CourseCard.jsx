import { useNavigate } from "react-router-dom";
import * as svgs from "@assets";
import styles from "./CourseCard.module.css";
import PropTypes from "prop-types";

function CourseCard(props) {
  const navigate = useNavigate();

  return (
    <div className={styles.courseCard}>
      <div
        className="courseCardUpper"
        onClick={() => {
          navigate(`/courses/${props.course._id}`);
        }}
      >
        <style>
          {`
            .courseCardUpper {
                word-wrap: break-word;
                padding-left: 10px;
                color: rgba(255, 255, 255, 0.75);
                font-size: 40px;
                font-weight: bold;
                height: 70%;
                width: 100%;
                background-color: hsl(${Math.floor(Math.random() * 360) + 1}, 35%, 50%);
                overflow: visible;
            }
        `}
        </style>
        {props.course.name}
      </div>
      <div className={styles.courseCardLower}>
        <div className={styles.actions}>
          <div
            className={styles.actionItem}
            onClick={() => {
              navigate("/announcements");
            }}
          >
            <img src={svgs.Announcement}></img>
          </div>
          <div
            className={styles.actionItem}
            onClick={() => {
              navigate("/assignments");
            }}
          >
            <img src={svgs.Assignment}></img>
          </div>
          <div
            className={styles.actionItem}
            onClick={() => {
              navigate("/files");
            }}
          >
            <img src={svgs.Files}></img>
          </div>
        </div>
      </div>
    </div>
  );
}

CourseCard.propTypes = {
  course: PropTypes.object.isRequired,
};

export default CourseCard;
