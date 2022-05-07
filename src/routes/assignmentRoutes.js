const router = require("express").Router();
const authenticateToken = require("../middleware/authenticateToken");
const verifyCourseExists = require("../middleware/verifyCourseExists");
const verifyInstructor = require("../middleware/verifyInstructor");
const verifyAssignmentExists = require("../middleware/verifyAssignmentExists");
const fs = require("fs");

router.post(
    "/:courseId/add-assignment",
    [authenticateToken, verifyInstructor, verifyCourseExists],
    async (req, res) => {
        const courseId = req.params.courseId;

        const { name, description, dueDate, maxPoints } = req.body;

        const course = res.locals.course;

        course.assignments.push({
            name,
            description,
            courseId: courseId,
            dueDate: dueDate,
            maxPoints: maxPoints,
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

        let course = res.locals.course;

        let assignment = course.assignments.id(assignmentId);

        assignment.submissions = res.locals.isInstructor
            ? assignment.submissions
            : assignment.submissions.filter(
                (submission) => submission.studentId.toString() === res.locals.userId
            );
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
        let course = res.locals.course;
        course.assignments.forEach((assignment) => {
            assignment.submissions = assignment.submissions.filter(
                (submission) => submission.studentId.toString() === res.locals.userId
            );
        });
        res.status(200).json(course.assignments);
    }
);

router.delete(
    "/:courseId/assignment/:assignmentId",
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

router.post(
    "/:courseId/assignment/:assignmentId/submit",
    [authenticateToken, verifyCourseExists, verifyAssignmentExists],
    async (req, res) => {
        const { files } = req.body;

        if (!files) {
            return res.status(400).send({ error: "No files provided" });
        }

        files.forEach((file) => {
            if (
                !fs.existsSync(
                    `${process.env.UPLOAD_ROOT}/uploads/students/` +
            `${res.locals.userId}/${file}`
                )
            ) {
                return res.status(400).send({ error: "File not found" });
            }
        });

        let course = res.locals.course;
        let assignment = course.assignments.find(
            (assignment) => assignment._id.toString() === req.params.assignmentId
        );

        assignment.submissions.push({
            studentId: res.locals.userId,
            files: files,
        });

        await course.save();

        res.status(200).send({ message: "Assignment submitted" });
    }
);

module.exports = router;
