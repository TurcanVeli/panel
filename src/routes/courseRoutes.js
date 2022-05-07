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

router.get("/", [authenticateToken], async (req, res) => {
    const student = await Student.findById(res.locals.userId);
    const instructor = await Instructor.findById(res.locals.userId);
    const user = student || instructor;

    const courses = await Course.find({ _id: { $in: user.courses } });

    return res.status(200).json({ courses });
});

router.get(
    "/:courseId",
    [authenticateToken, verifyCourseExists],
    async (req, res) => {
        let course = res.locals.course;
        // Filtering the submissions to only the ones submitted by the student.
        // If the user is an instructor, they can see all submissions.
        if (!res.locals.isInstructor) {
            course.assignments.forEach((assignment) => {
                assignment.submissions = assignment.submissions.filter((submission) => {
                    return submission.studentId.toString() === res.locals.userId;
                });
            });
        }
        // Sorting the assignments by their status.
        let upcomingAssignments = course.assignments.filter(
            (assignment) =>
                new Date(assignment.dueDate).getTime() + 86400000 * 5 > Date.now()
        );
        upcomingAssignments.sort((a, b) => {
            return a.dueDate - b.dueDate;
        });
        let status = "";
        upcomingAssignments.forEach((assignment) => {
            if (assignment.submissions.length !== 0) {
                assignment.submissions.forEach((submission) => {
                    status =
            submission.submissionDate < assignment.dueDate
                ? "On Time"
                : "Late";
                });
            } else {
                status = assignment.dueDate > Date.now() ? "Clear" : "Overdue";
            }
            assignment._doc.status = status;
        });
        course.announcements = undefined;
        course.files = undefined;

        return res.status(200).json({ course, upcomingAssignments });
    }
);

router.delete(
    "/:courseId",
    [authenticateToken, verifyCourseExists, verifyInstructor],
    async (req, res) => {
        const course = res.locals.course;
        const user = await Instructor.findById(res.locals.userId);
        user.courses.pull(course);
        await user.save();
        await course.remove();
        return res.status(200).json({ message: "Course deleted successfully" });
    }
);

router.post(
    "/:courseId/add-student/:studentMail",
    [authenticateToken, verifyCourseExists, verifyInstructor],
    async (req, res) => {
        const course = res.locals.course;
        const courseId = course._id;
        const student = await Student.findOne({ email: req.params.studentMail });
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        const studentId = student._id;
        course.students.push(studentId);
        student.courses.push(courseId);
        await course.save();
        await student.save();
        return res.status(200).json({ message: "Student added successfully" });
    }
);

router.get(
    "/:courseId/people",
    [authenticateToken, verifyCourseExists],
    async (req, res) => {
        const course = res.locals.course;
        const students = await Student.find({ _id: { $in: course.students } });
        const instructors = await Instructor.find({
            _id: { $in: course.instructors },
        });
        return res.status(200).json({ students, instructors });
    }
);

module.exports = router;
