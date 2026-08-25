import express from "express";

import {
    getProducts,
    getAdminProducts,
    getProductBySlug,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadProductImage,
    fixProductImagePaths,
} from "../controllers/productController.js";

import uploadProductImageMiddleware from "../middleware/uploadMiddleware.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// ======================================================
// PUBLIC ROUTES
// ======================================================

// Get all active products
router.get("/", getProducts);


// ======================================================
// ADMIN ROUTES
// ======================================================

// Get all products including inactive products
router.get("/admin", protect, getAdminProducts);

// Fix old product image paths
router.put(
    "/admin/fix-image-paths",
    protect,
    fixProductImagePaths
);

// Create product
router.post(
    "/",
    protect,
    createProduct
);

// Update product
router.put(
    "/:id",
    protect,
    updateProduct
);

// Delete product
router.delete(
    "/:id",
    protect,
    deleteProduct
);

// Upload product image
router.post(
    "/:id/image",
    protect,
    uploadProductImageMiddleware.single("image"),
    uploadProductImage
);


// ======================================================
// PUBLIC SINGLE PRODUCT
// ======================================================

// Get active product by slug
// Keep this AFTER /admin routes
router.get(
    "/:slug",
    getProductBySlug
);

export default router;