const bcrypt = require("bcrypt");
const { Instructor, Student } = require("../models/user");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/register", async (req, res) => {
    try {
        const { name, email, password, isInstructor } = req.body;

        if (
            name === "" ||
            email === "" ||
            password === "" ||
            typeof isInstructor === "undefined"
        ) {
            return res.status(400).json({ message: "Please enter all fields" });
        }

        const oldStudent = await Student.findOne({ email: email });
        const oldInstructor = await Instructor.findOne({ email: email });

        if (oldStudent || oldInstructor) {
            return res.status(400).json({ message: "User already exists" });
        }

        const passwordHash = bcrypt.hashSync(password, 10);

        let user = null;
        if (isInstructor) {
            user = new Instructor({
                name,
                email,
                passwordHash: passwordHash,
            });
        } else {
            user = new Student({
                name,
                email,
                passwordHash: passwordHash,
            });
        }

        const token = jwt.sign(
            { userId: user._id, isInstructor: isInstructor },
            process.env.TOKEN_SECRET,
            {
                expiresIn: "1h",
            }
        );

        await user.save();

        res
            .status(201)
            .cookie("token", token)
            .json({ message: "User created successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === "" || password === "") {
            return res.status(400).json({ message: "Please enter all fields" });
        }

        const student = await Student.findOne({ email: email });
        const instructor = await Instructor.findOne({ email: email });

        if (!student && !instructor) {
            return res.status(400).json({ message: "User does not exist" });
        }

        let user = student || instructor;

        const isMatch = bcrypt.compareSync(password, user.passwordHash);

        if (!isMatch) {
            return res.status(400).json({ message: "Wrong password" });
        }

        const isInstructor = user instanceof Instructor;

        const token = jwt.sign(
            { userId: user._id, isInstructor: isInstructor },
            process.env.TOKEN_SECRET,
            {
                expiresIn: "1h",
            }
        );

        res
            .status(200)
            .cookie("token", token)
            .json({ message: "User logged in successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
