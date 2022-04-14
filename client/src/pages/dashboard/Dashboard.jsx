import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@components/sidebar/Sidebar";
import styles from "./Dashboard.module.css";

function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    if (Cookies.get("token")) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div className={styles.dashboard}>
      <div>
        <Sidebar />
      </div>
      <h1>Dashboard</h1>
    </div>
  );
}

export default Dashboard;
