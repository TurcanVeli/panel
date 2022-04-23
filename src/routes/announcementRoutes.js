const router = require("express").Router();
const authenticateToken = require("../middleware/authenticateToken");
const verifyCourseExists = require("../middleware/verifyCourseExists");
const verifyInstructor = require("../middleware/verifyInstructor");
const verifyAnnouncementExists = require("../middleware/verifyAnnouncementExists");
const { Instructor } = require("../models/user");

router.post(
    "/:courseId/add-announcement",
    [authenticateToken, verifyInstructor, verifyCourseExists],
    async (req, res) => {
        const { title, description } = req.body;
        const course = res.locals.course;

        course.announcements.push({
            title,
            description,
            publisher: res.locals.userId,
        });
        await course.save();
        res.status(201).json({ message: "Announcement created successfully" });
    }
);

router.get(
    "/:courseId/announcements",
    [authenticateToken, verifyCourseExists],
    async (req, res) => {
        const course = res.locals.course;
        const announcements = course.announcements;

        res.send(announcements);
    }
);

router.get(
    "/:courseId/announcements/:announcementId",
    [authenticateToken, verifyCourseExists, verifyAnnouncementExists],
    async (req, res) => {
        let announcement = res.locals.announcement;
        const publisher = await Instructor.findById(announcement.publisher);
        announcement = { ...announcement._doc, publisher: publisher.name };
        res.send(announcement);
    }
);

router.delete(
    "/:courseId/announcements/:announcementId",
    [
        authenticateToken,
        verifyInstructor,
        verifyCourseExists,
        verifyAnnouncementExists,
    ],
    async (req, res) => {
        const course = res.locals.course;
        const announcement = res.locals.announcement;
        
        course.announcements.pull(announcement);
        await course.save();
        await announcement.remove();
        res.status(200).json({ message: "Announcement deleted successfully" });
    }
);

module.exports = router;
