const verifyAnnouncementExists = async (req, res, next) => {
    const course = res.locals.course;
    const announcementId = req.params.announcementId;

    const announcement = course.announcements.find(
        (announcement) => announcement._id.toString() === announcementId
    );

    if (!announcement) {
        return res.status(404).json({ message: "Announcement not found" });
    }
    res.locals.announcement = announcement;
    next();
};

module.exports = verifyAnnouncementExists;
