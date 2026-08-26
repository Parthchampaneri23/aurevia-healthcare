import express from "express";

import {
    getIndustries,
    getAdminIndustries,
    getIndustryBySlug,
    createIndustry,
    updateIndustry,
    deleteIndustry,
    uploadIndustryImage,
} from "../controllers/industryController.js";

import { uploadIndustryImage as uploadIndustryImageMiddleware } from "../middleware/uploadMiddleware.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// ======================================================
// PUBLIC ROUTES
// ======================================================

// Get all active industries
router.get("/", getIndustries);


// ======================================================
// ADMIN ROUTES
// ======================================================

// Get ALL industries including inactive
// IMPORTANT: This MUST be before /:slug
router.get(
    "/admin",
    protect,
    getAdminIndustries
);

// Create industry
router.post(
    "/",
    protect,
    createIndustry
);

// Update industry
router.put(
    "/:id",
    protect,
    updateIndustry
);

// Delete industry
router.delete(
    "/:id",
    protect,
    deleteIndustry
);

// Upload industry image
router.post(
    "/:id/image",
    protect,
    uploadIndustryImageMiddleware.single("image"),
    uploadIndustryImage
);


// ======================================================
// PUBLIC SINGLE INDUSTRY
// ======================================================

// Get active industry by slug
// MUST remain LAST
router.get(
    "/:slug",
    getIndustryBySlug
);

export default router;