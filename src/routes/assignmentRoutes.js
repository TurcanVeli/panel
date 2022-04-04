const router = require("express").Router();
const authenticateToken = require("../middleware/authenticateToken");
const verifyCourseExists = require("../middleware/verifyCourseExists");
const { Course } = require("../models/course");
const { Assignment } = require("../models/assignment");
const verifyInstructor = require("../middleware/verifyInstructor");

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

        const assignment = new Assignment({
            name,
            description,
            courseId: courseId,
            dueDate: dueDate,
        });

        course.assignments.push(assignment);
        await course.save();
        await assignment.save();
        res.status(201).json({ message: "Assignment created successfully" });
    }
);

router.get(
    "/:courseId/assignment/:assignmentId",
    [authenticateToken, verifyCourseExists],
    async (req, res) => {
        const courseId = req.params.courseId;
        const assignmentId = req.params.assignmentId;

        const course = await Course.findById(courseId);

        const assignment = course.assignments.id(assignmentId);
        if (!assignment) {
            return res.status(404).send("Assignment not found");
        }

        res.status(200).json(assignment);
    }
);

module.exports = router;
