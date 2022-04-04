const verifyInstructor = async (req, res, next) => {
    const isInstructor = res.locals.isInstructor;

    if (!isInstructor) {
        return res.status(401).json({ message: "Only instructors are authorized" });
    }

    next();
};

module.exports = verifyInstructor;
