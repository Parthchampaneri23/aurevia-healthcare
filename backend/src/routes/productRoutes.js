import express from "express";

import {
    getProducts,
    getProductBySlug,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadProductImage,
} from "../controllers/productController.js";

import uploadProductImageMiddleware from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getProducts);
router.get("/:slug", getProductBySlug);

// Admin routes — authentication will be added later
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

// Product image upload
router.post(
    "/:id/image",
    uploadProductImageMiddleware.single("image"),
    uploadProductImage
);

export default router;