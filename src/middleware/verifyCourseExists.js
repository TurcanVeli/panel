const { Course } = require("../models/course");

const verifyCourseExists = async (req, res, next) => {
    const userId = res.locals.userId;
    const courseId = req.params.courseId;

    const course = await Course.findById(courseId);
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }

    const isInstructor = course.instructor.toString() === userId;
    const user = isInstructor
        ? course.instructor
        : course.students.filter((student) => student.userId === userId)[0];
    console.log(user);

    if (!user) {
        return res
            .status(401)
            .json({ message: "The user is not enrolled in the course" });
    }
    next();
};

module.exports = verifyCourseExists;
