const router = require("express").Router();
const authenticateToken = require("../middleware/authenticateToken");
const { Course } = require("../models/course");

router.post("/create-course", authenticateToken, async (req, res) => {
    if (res.locals.isInstructor) {
        const { name, description } = req.body;
        const course = new Course({
            name,
            description,
            instructor: res.locals.userId,
        });
        await course.save();
        res.status(201).json({ message: "Course created successfully" });
    } else {
        return res.status(403).json({ msg: "Only instructors can create courses" });
    }
});

module.exports = router;
