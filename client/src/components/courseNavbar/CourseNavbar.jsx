import style from "./CourseNavbar.module.css";
import { useNavigate, useParams } from "react-router-dom";
import AnnouncementLogo from "@assets/announcement.svg";
import PeopleLogo from "@assets/people.svg";
import FilesLogo from "@assets/files.svg";
import AssignmentLogo from "@assets/assignment.svg";

function CourseNavbar() {
  const navigate = useNavigate();
  const courseId = useParams().courseId;
  return (
    <div className={style.courseNavbar}>
      <ul className={style.courseNavbarList}>
        <li className={style.courseNavbarItem} onClick={() => navigate(`/courses/${courseId}/announcements`)}>
          <img src={AnnouncementLogo}/>Announcements
        </li>
        <li className={style.courseNavbarItem} onClick={() => navigate(`/courses/${courseId}/assignments`)}>
          <img src={AssignmentLogo}/>Assignments
        </li>
        <li className={style.courseNavbarItem} onClick={() => navigate(`/courses/${courseId}/files`)}>
          <img src={FilesLogo}/>Files
        </li>
        <li className={style.courseNavbarItem} onClick={() => navigate(`/courses/${courseId}/people`)}>
          <img src={PeopleLogo}/>People
        </li>
      </ul>
    </div>
  );
}

export default CourseNavbar;
