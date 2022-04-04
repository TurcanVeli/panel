const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const token = req.cookies.token;

    if (token == null) return res.sendStatus(401);

    try {
        const data = jwt.verify(token, process.env.TOKEN_SECRET);
        res.locals.userId = data.userId;
        res.locals.isInstructor = data.isInstructor;
        next();
    } catch (error) {
        res.sendStatus(401);
    }
}

module.exports = authenticateToken;
