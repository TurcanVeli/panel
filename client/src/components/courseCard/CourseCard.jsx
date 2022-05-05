import PropTypes from "prop-types";
import style from "./CourseCard.module.css";
import * as svgs from "@assets";
import { useNavigate } from "react-router-dom";

function CourseCard(props) {
  let navigate = useNavigate();

  const getSemester = () => {
    let date = new Date(props.course.creationDate);
    let month = date.getMonth();
    let year = date.getFullYear();

    return `${year}-${month > 8 ? 1 : 2}`;
  };

  const generateCourseColor = () => {
    let h = randomInt(0, 360);
    let s = randomInt(42, 98);
    let l = randomInt(40, 90);
    let color = `hsl(${h}, ${s}%, ${l}%)`;
    localStorage.setItem(`color:${props.course._id}`, color);
    return color;
  };

  const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const cardColorStyle = {
    backgroundColor:
      localStorage.getItem(`color:${props.course._id}`) ||
      generateCourseColor(),
  };

  return (
    <div className={style.courseCard}>
      <div
        className={style.courseCardUpper}
        style={cardColorStyle}
        onClick={() => {
          navigate(`/courses/${props.course._id}`);
        }}
      ></div>
      <div className={style.courseCardLower}>
        <div className={style.courseName}>{props.course.name}</div>
        <div className={style.courseSemester}>{getSemester()}</div>
        <div className={style.actions}>
          <div
            className={style.actionItem}
            onClick={() => {
              navigate(`/courses/${props.course._id}/announcements`);
            }}
          >
            <img src={svgs.Announcement}></img>
          </div>
          <div
            className={style.actionItem}
            onClick={() => {
              navigate(`/courses/${props.course._id}/assignments`);
            }}
          >
            <img src={svgs.Assignment}></img>
          </div>
          <div
            className={style.actionItem}
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
  course: PropTypes.shape({
    name: PropTypes.string.isRequired,
    creationDate: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }),
};

export default CourseCard;
