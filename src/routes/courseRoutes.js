const router = require("express").Router();
const authenticateToken = require("../middleware/authenticateToken");
const verifyInstructor = require("../middleware/verifyInstructor");
const { Course } = require("../models/course");
const { User } = require("../models/user");

router.post(
    "/create-course",
    [authenticateToken, verifyInstructor],
    async (req, res) => {
        const { name, description } = req.body;
        const course = new Course({
            name,
            description,
            instructor: res.locals.userId,
        });
        const user = await User.findById(res.locals.userId);
        user.courses.push(course);
        await user.save();
        await course.save();
        return res.status(201).json({ message: "Course created successfully" });
    }
);

// TODO: Add a route to get all the courses

module.exports = router;
