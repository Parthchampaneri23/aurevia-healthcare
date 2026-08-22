import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

import {
    createCareerApplication,
    getCareerApplications,
    getCareerApplicationById,
    updateCareerApplicationStatus,
    deleteCareerApplication,
} from "../controllers/careerController.js";

const router = express.Router();

const uploadDirectory = "uploads/resumes";

if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, {
        recursive: true,
    });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },

    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);

        const filename = `${Date.now()}-${file.fieldname}${extension}`;

        cb(null, filename);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only PDF, DOC and DOCX files are allowed"));
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

// Submit career application
router.post(
    "/",
    upload.single("resume"),
    createCareerApplication
);

// Get all applications
router.get("/", getCareerApplications);

// Get single application
router.get("/:id", getCareerApplicationById);

// Update application status
router.patch(
    "/:id/status",
    updateCareerApplicationStatus
);

// Delete application
router.delete("/:id", deleteCareerApplication);

export default router;