import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function useAuth() {
  const [isInstructor, setIsInstructor] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!Cookies.get("token") || !Cookies.get("isInstructor")) {
      navigate("/login", { replace: true });
      return;
    }

    setIsInstructor(Cookies.get("isInstructor") === "true");
  }, []);

  return isInstructor;
}

export default useAuth;