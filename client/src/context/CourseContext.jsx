import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const CourseContext = createContext();

export function CourseProvider({ children }) {
  const [courseName, setCourseName] = useState("");
  return (
    <CourseContext.Provider value={[courseName, setCourseName]}>
      {children}
    </CourseContext.Provider>
  );
}

CourseProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
