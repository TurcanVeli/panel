const router = require("express").Router();
const authenticateToken = require("../middleware/authenticateToken");
const verifyCourseExists = require("../middleware/verifyCourseExists");
const verifyInstructor = require("../middleware/verifyInstructor");
const { Course } = require("../models/course");
const { Instructor, Student } = require("../models/user");

router.post(
    "/create-course",
    [authenticateToken, verifyInstructor],
    async (req, res) => {
        const { name, description } = req.body;
        const course = new Course({
            name,
            description,
            instructors: [res.locals.userId],
        });
        const user = await Instructor.findById(res.locals.userId);
        user.courses.push(course);
        await user.save();
        await course.save();
        return res.status(201).json({ message: "Course created successfully" });
    }
);

router.get("", [authenticateToken], async (req, res) => {
    const student = await Student.findById(res.locals.userId);
    const instructor = await Instructor.findById(res.locals.userId);
    const user = student || instructor;

    const courses = user.courses;
    return res.status(200).json({ courses });
});

router.get(
    "/:courseId",
    [authenticateToken, verifyCourseExists],
    async (req, res) => {
        const course = res.locals.course;
        return res.status(200).json({ course });
    }
);

module.exports = router;
