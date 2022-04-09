const router = require("express").Router();
const authenticateToken = require("../middleware/authenticateToken");
const verifyCourseExists = require("../middleware/verifyCourseExists");
const verifyInstructor = require("../middleware/verifyInstructor");
const verifyAssignmentExists = require("../middleware/verifyAssignmentExists");
const { Course } = require("../models/course");

router.post(
    "/:courseId/add-assignment",
    [authenticateToken, verifyInstructor, verifyCourseExists],
    async (req, res) => {
        const courseId = req.params.courseId;

        const { name, description, dueDate } = req.body;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).send("Course not found");
        }

        course.assignments.push({
            name,
            description,
            courseId: courseId,
            dueDate: dueDate,
        });
        await course.save();
        res.status(201).json({ message: "Assignment created successfully" });
    }
);

router.get(
    "/:courseId/assignment/:assignmentId",
    [authenticateToken, verifyCourseExists],
    async (req, res) => {
        const assignmentId = req.params.assignmentId;

        const course = res.locals.course;

        const assignment = course.assignments.id(assignmentId);
        if (!assignment) {
            return res.status(404).send("Assignment not found");
        }

        res.status(200).json(assignment);
    }
);

router.get(
    "/:courseId/assignments",
    [authenticateToken, verifyCourseExists],
    async (req, res) => {
        const course = res.locals.course;

        res.status(200).json(course.assignments);
    }
);

router.delete(
    "/:courseId/assignments/:assignmentId",
    [
        authenticateToken,
        verifyCourseExists,
        verifyInstructor,
        verifyAssignmentExists,
    ],
    async (req, res) => {
        const course = res.locals.course;
        const assignment = res.locals.assignment;

        course.assignments.pull(assignment);
        await course.save();
        res.status(200).json({ message: "Assignment deleted successfully" });
    }
);

module.exports = router;
