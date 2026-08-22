import express from "express";

import {
    createEnquiry,
    getEnquiries,
    getEnquiryById,
    updateEnquiryStatus,
    deleteEnquiry,
} from "../controllers/enquiryController.js";

const router = express.Router();

// Create enquiry
router.post("/", createEnquiry);

// Get all enquiries
router.get("/", getEnquiries);

// Get single enquiry
router.get("/:id", getEnquiryById);

// Update enquiry status
router.patch("/:id/status", updateEnquiryStatus);

// Delete enquiry
router.delete("/:id", deleteEnquiry);

export default router;