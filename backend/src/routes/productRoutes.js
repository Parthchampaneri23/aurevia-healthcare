import express from "express";

import {
    getProducts,
    getAdminProducts,
    getProductBySlug,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadProductImage,
} from "../controllers/productController.js";

import uploadProductImageMiddleware from "../middleware/uploadMiddleware.js";

const router = express.Router();

// ======================================================
// Public routes
// ======================================================

// Get active products
router.get("/", getProducts);

// ======================================================
// Admin routes
// Authentication will be added later
// ======================================================

// Get all products including inactive products
router.get("/admin", getAdminProducts);

// Create product
router.post("/", createProduct);

// Update product
router.put("/:id", updateProduct);

// Delete product
router.delete("/:id", deleteProduct);

// Upload product image
router.post(
    "/:id/image",
    uploadProductImageMiddleware.single("image"),
    uploadProductImage
);

// ======================================================
// Public single product route
// Keep this AFTER /admin
// ======================================================

router.get("/:slug", getProductBySlug);

export default router;