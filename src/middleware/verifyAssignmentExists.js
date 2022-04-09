const verifyAssignmentExists = async (req, res, next) => {
    const course = res.locals.course;
    const assignmentId = req.params.assignmentId;

    const assignment = course.assignments.id(assignmentId);
    if (!assignment) {
        return res.status(404).json({message: "Assignment not found"});
    }
    res.locals.assignment = assignment;
    next();
};

module.exports = verifyAssignmentExists;