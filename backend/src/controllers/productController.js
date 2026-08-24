import Product from "../models/Product.js";

// ======================================================
// GET /api/products
// Get all active products
// ======================================================
export const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find({
            isActive: true,
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: products.length,
            products,
        });
    } catch (error) {
        next(error);
    }
};

// ======================================================
// GET /api/products/admin
// Get all products for Admin Panel
// ======================================================
export const getAdminProducts = async (req, res, next) => {
    try {
        const products = await Product.find({})
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: products.length,
            products,
        });
    } catch (error) {
        next(error);
    }
};

// ======================================================
// GET /api/products/:slug
// Get single product by slug
// ======================================================
export const getProductBySlug = async (req, res, next) => {
    try {
        const product = await Product.findOne({
            slug: req.params.slug,
            isActive: true,
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        next(error);
    }
};

// ======================================================
// POST /api/products
// Create product
// ======================================================
export const createProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product,
        });
    } catch (error) {
        next(error);
    }
};

// ======================================================
// PUT /api/products/:id
// Update product
// ======================================================
export const updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product,
        });
    } catch (error) {
        next(error);
    }
};

// ======================================================
// DELETE /api/products/:id
// Delete product
// ======================================================
export const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(
            req.params.id
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

// ======================================================
// POST /api/products/:id/image
// Upload product image
// ======================================================
export const uploadProductImage = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload an image",
            });
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                image: `/uploads/products/${req.file.filename}`,
            },
            {
                new: true,
            }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product image uploaded successfully",
            product,
        });
    } catch (error) {
        next(error);
    }
};

// ======================================================
// PUT /api/products/admin/fix-image-paths
// Fix old product image paths
// ======================================================
export const fixProductImagePaths = async (req, res, next) => {
    try {
        const products = await Product.find({});

        let updatedCount = 0;

        for (const product of products) {
            if (
                product.image &&
                product.image.startsWith("/products/")
            ) {
                product.image = product.image.replace(
                    "/products/",
                    "/uploads/products/"
                );

                await product.save();
                updatedCount++;
            }
        }

        res.status(200).json({
            success: true,
            message: "Product image paths fixed successfully",
            updatedCount,
        });
    } catch (error) {
        next(error);
    }
};