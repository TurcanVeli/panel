const bcrypt = require("bcrypt");
const { User } = require("../models/user");
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
            return res.status(400).json({ msg: "Please enter all fields" });
        }

        const oldUser = await User.findOne({ email: email });

        if (oldUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const passwordHash = bcrypt.hashSync(password, 10);

        const user = new User({
            name,
            email,
            password: passwordHash,
            isInstructor,
        });

        const token = jwt.sign(
            { userId: user._id, isInstructor: user.isInstructor },
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
            return res.status(400).json({ msg: "Please enter all fields" });
        }

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ msg: "User does not exist" });
        }

        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: "Wrong password" });
        }

        const token = jwt.sign(
            { userId: user._id, isInstructor: user.isInstructor },
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

router.post("/logout", (req, res) => {
    if (req.cookies.token) {
        res.clearCookie("token");
        res.json({ message: "User logged out successfully" });
    } else {
        res.json({ message: "No user logged in" });
    }
});

module.exports = router;
