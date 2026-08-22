import express from "express";

import {
    getIndustries,
    getIndustryBySlug,
    createIndustry,
    updateIndustry,
    deleteIndustry,
} from "../controllers/industryController.js";

const router = express.Router();

// Public routes
router.get("/", getIndustries);

router.get("/:slug", getIndustryBySlug);

// Admin routes
// Authentication will be added later
router.post("/", createIndustry);

router.put("/:id", updateIndustry);

router.delete("/:id", deleteIndustry);

export default router;