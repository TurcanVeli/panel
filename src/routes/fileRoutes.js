const express = require("express");
const multer = require("multer");
const fs = require("fs");
const authenticateToken = require("../middleware/authenticateToken");
const verifyCourseExists = require("../middleware/verifyCourseExists");
const verifyInstructor = require("../middleware/verifyInstructor");
const { nanoid } = require("nanoid");
const path = require("path");

const router = express.Router();

const userUpload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            let path =
                `${process.env.UPLOAD_ROOT}/uploads/` +
                `students/${req.res.locals.userId}/`;

            if (!fs.existsSync(path)) {
                fs.mkdirSync(path, { recursive: true });
            }

            cb(null, path);
        },
        filename: (req, file, cb) => {
            let edition = 1;
            let extension = file.originalname.split(".").pop();
            let filename = file.originalname.split(".").slice(0, -1).join(".");
            let path =
                `${process.env.UPLOAD_ROOT}/uploads/students/` +
                `${req.res.locals.userId}/${file.originalname}`;
            let name = file.originalname;
            while (fs.existsSync(path)) {
                path =
                    `${process.env.UPLOAD_ROOT}/uploads/students/` +
                    `${req.res.locals.userId}/` +
                    `${filename}_${edition}.${extension}`;
                name = `${filename}_${edition}.${extension}`;
                edition++;
            }
            if (req.res.locals.fileNames === undefined) {
                req.res.locals.fileNames = [];
            }
            req.res.locals.fileNames.push(name);
            cb(null, name);
        },
    }),
});

const courseUpload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            let path =
                `${process.env.UPLOAD_ROOT}/uploads/` +
                `courses/${req.res.locals.course._id}/${req.params["0"]}`;

            if (!fs.existsSync(path)) {
                fs.mkdirSync(path, { recursive: true });
            }

            cb(null, path);
        },
        filename: (req, file, cb) => {
            let edition = 1;
            let extension = file.originalname.split(".").pop();
            let filename = file.originalname.split(".").slice(0, -1).join(".");
            let path =
                `${process.env.UPLOAD_ROOT}/uploads/courses/` +
                `${req.res.locals.course._id}/${file.originalname}`;
            let name = file.originalname;
            while (fs.existsSync(path)) {
                path =
                    `${process.env.UPLOAD_ROOT}/uploads/courses/` +
                    `${req.res.locals.course._id}/` +
                    `${filename}_${edition}.${extension}`;
                name = `${filename}_${edition}.${extension}`;
                edition++;
            }
            if (req.res.locals.fileNames === undefined) {
                req.res.locals.fileNames = [];
            }
            req.res.locals.fileNames.push(name);
            cb(null, name);
        },
    }),
});

router.post(
    "/user/upload",
    [authenticateToken, userUpload.array("files")],
    async (req, res) => {
        res.status(200).send({
            message: "File(s) uploaded",
            files: res.locals.fileNames,
        });
    }
);

router.post(
    "/course/:courseId/upload/*",
    [authenticateToken, verifyInstructor, verifyCourseExists, 
        courseUpload.array("files")],
    async (req, res) => {
        res.status(200).send({
            message: "File(s) uploaded",
            files: res.locals.fileNames,
        });
    }
);

router.post(
    "/course/:courseId/upload",
    [
        authenticateToken,
        verifyCourseExists,
        verifyInstructor,
        courseUpload.array("files"),
    ],
    async (req, res) => {
        res.status(200).send({
            message: "File(s) uploaded",
            files: res.locals.fileNames,
        });
    }
);

router.get(
    "/course/:courseId",
    [authenticateToken, verifyCourseExists],
    async (req, res) => {

        const files = [{
            name: res.locals.course.name,
            type: "folder",
            children: getFileStructure(".", req.params.courseId),
            id: nanoid(6),
            path: ".",
        }];

        res.status(200).send(files);
    }
);

router.get(
    "/course/:courseId/*",
    [authenticateToken, verifyCourseExists],
    async (req, res) => {
        const filePath = req.params["0"];

        if (filePath.includes("..")) {
            res.status(400).send({
                message: "Invalid path",
            });
            return;
        }

        const fullPath = path.join(process.env.UPLOAD_ROOT,
            "uploads", "courses", req.params.courseId, filePath);

        if (!fs.existsSync(fullPath)) {
            res.status(404).send({
                message: "File not found",
            });

            return;
        }

        res.status(200).download(fullPath);
    }
);

const getFileStructure = (path, courseId) => {
    let result = [];

    if (!fs.existsSync(
        `${process.env.UPLOAD_ROOT}/uploads/courses/${courseId}/${path}`)) {
        return result;
    }

    let list = fs.readdirSync(
        `${process.env.UPLOAD_ROOT}/uploads/courses/${courseId}/${path}`);

    list.forEach((file) => {
        const currentPath = `${process.env.UPLOAD_ROOT}/uploads/` +
            `courses/${courseId}/${path}/${file}`;

        const stat = fs.statSync(currentPath);

        if (stat.isFile()) {
            result.push({
                name: file,
                size: stat.size,
                creationDate: stat.birthtime,
                path: `${path}/${file}`,
                id: nanoid(6),
                type: "file",
            });
        } else {
            result.push({
                name: file,
                type: "folder",
                id: nanoid(6),
                path: `${path}/${file}`,
            });

            const index = result.length - 1;
            result[index].children = getFileStructure(`${path}/${file}`, courseId);
        }
    });

    return result;
};

router.post(
    "/course/:courseId/newfolder/*",
    [authenticateToken, verifyInstructor, verifyCourseExists],
    async (req, res) => { 
        
        let path = req.params["0"];
        let courseId = req.res.locals.course._id;

        let newPath = `${process.env.UPLOAD_ROOT}/uploads/` + 
            `courses/${courseId}/${path}`;

        if (fs.existsSync(newPath)) {
            res.status(400).send({
                message: "Folder already exists",
            });
        } else {
            fs.mkdirSync(newPath);
            res.status(200).send({
                message: "Folder created",
            });
        }
    }
);

module.exports = router;
