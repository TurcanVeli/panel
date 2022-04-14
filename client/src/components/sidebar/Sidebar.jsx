import styles from "./Sidebar.module.css";
import * as svgs from "@assets";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const sidebarItems = [
    {
      name: "Account",
      icon: svgs.Account,
      path: "/account",
    },
    {
      name: "Dashboard",
      icon: svgs.Dashboard,
      path: "/dashboard",
    },
    {
      name: "Courses",
      icon: svgs.Courses,
      path: "/courses",
    },
  ];
  return (
    <div className={styles.sidebar}>
      <ul className={styles.sidebarList}>
        {sidebarItems.map((item) => (
          <li
            className={styles.sidebarItem}
            key={item.name}
            onClick={() => {
              navigate(item.path);
            }}
          >
            <img src={item.icon} className={styles.sidebarIcon}></img>
            <div className={styles.sidebarText}>{item.name}</div>
          </li>
        ))}
        <li
          className={styles.sidebarItemLogout}
          key="Logout"
          onClick={() => {
            navigate("/login");
          }}
        >
          <img src={svgs.Logout} className={styles.sidebarIcon}></img>
          <div className={styles.sidebarText}>Logout</div>
        </li>
      </ul>
      
    </div>
  );
}

export default Sidebar;
