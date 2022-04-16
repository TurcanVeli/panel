const { Course } = require("../models/course");
const { Student } = require("../models/user");

const verifyCourseExists = async (req, res, next) => {
    const userId = res.locals.userId;
    const courseId = req.params.courseId;

    const course = await Course.findById(courseId);
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }

    const isInstructor = course.instructors.includes(userId);
    const student = await Student.findById(userId);
    let isStudent = false;
    if (student) {
        isStudent = student.courses.includes(courseId);
    }

    if (!isInstructor && !isStudent) {
        return res
            .status(401)
            .json({ message: "The user is not enrolled in the course" });
    }
    res.locals.course = course;
    next();
};

module.exports = verifyCourseExists;
