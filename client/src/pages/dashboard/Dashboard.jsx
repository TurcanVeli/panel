import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}

export default Dashboard;
