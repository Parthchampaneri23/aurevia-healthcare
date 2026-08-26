import Industry from "../models/Industry.js";

// ======================================================
// GET ALL ACTIVE INDUSTRIES
// GET /api/industries
// PUBLIC
// ======================================================

export const getIndustries = async (req, res, next) => {
    try {
        const industries = await Industry.find({
            isActive: true,
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: industries.length,
            industries,
        });
    } catch (error) {
        next(error);
    }
};


// ======================================================
// GET ALL INDUSTRIES
// GET /api/industries/admin
// ADMIN
// ======================================================

export const getAdminIndustries = async (req, res, next) => {
    try {
        const industries = await Industry.find({})
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: industries.length,
            industries,
        });
    } catch (error) {
        next(error);
    }
};


// ======================================================
// GET SINGLE ACTIVE INDUSTRY BY SLUG
// GET /api/industries/:slug
// PUBLIC
// ======================================================

export const getIndustryBySlug = async (req, res, next) => {
    try {
        const { slug } = req.params;

        const industry = await Industry.findOne({
            slug: slug.toLowerCase(),
            isActive: true,
        });

        if (!industry) {
            return res.status(404).json({
                success: false,
                message: "Industry not found",
            });
        }

        res.status(200).json({
            success: true,
            industry,
        });
    } catch (error) {
        next(error);
    }
};


// ======================================================
// CREATE INDUSTRY
// POST /api/industries
// ADMIN
// ======================================================

export const createIndustry = async (req, res, next) => {
    try {
        const {
            slug,
            eyebrow,
            title,
            image,
            description,
            overview,
            companies,
            supportPoints,
            isActive,
        } = req.body;

        // Basic validation
        if (
            !slug ||
            !eyebrow ||
            !title ||
            !description ||
            !overview
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Slug, eyebrow, title, description and overview are required",
            });
        }

        // Check duplicate slug
        const existingIndustry = await Industry.findOne({
            slug: slug.toLowerCase().trim(),
        });

        if (existingIndustry) {
            return res.status(409).json({
                success: false,
                message:
                    "An industry with this slug already exists",
            });
        }

        const industry = await Industry.create({
            slug: slug.toLowerCase().trim(),
            eyebrow: eyebrow.trim(),
            title: title.trim(),
            image: image?.trim() || "",
            description: description.trim(),
            overview: overview.trim(),
            companies: Array.isArray(companies)
                ? companies
                : [],
            supportPoints: Array.isArray(supportPoints)
                ? supportPoints
                : [],
            isActive:
                typeof isActive === "boolean"
                    ? isActive
                    : true,
        });

        res.status(201).json({
            success: true,
            message: "Industry created successfully",
            industry,
        });
    } catch (error) {
        next(error);
    }
};


// ======================================================
// UPDATE INDUSTRY
// PUT /api/industries/:id
// ADMIN
// ======================================================

export const updateIndustry = async (req, res, next) => {
    try {
        const { id } = req.params;

        const updateData = {
            ...req.body,
        };

        // Normalize slug if provided
        if (updateData.slug) {
            updateData.slug = updateData.slug
                .toLowerCase()
                .trim();

            // Check whether another industry
            // already uses this slug
            const existingIndustry =
                await Industry.findOne({
                    slug: updateData.slug,
                    _id: { $ne: id },
                });

            if (existingIndustry) {
                return res.status(409).json({
                    success: false,
                    message:
                        "Another industry already uses this slug",
                });
            }
        }

        // Clean string fields
        if (typeof updateData.eyebrow === "string") {
            updateData.eyebrow =
                updateData.eyebrow.trim();
        }

        if (typeof updateData.title === "string") {
            updateData.title =
                updateData.title.trim();
        }

        if (typeof updateData.image === "string") {
            updateData.image =
                updateData.image.trim();
        }

        if (
            typeof updateData.description ===
            "string"
        ) {
            updateData.description =
                updateData.description.trim();
        }

        if (
            typeof updateData.overview ===
            "string"
        ) {
            updateData.overview =
                updateData.overview.trim();
        }

        // Ensure arrays
        if (
            updateData.companies !== undefined &&
            !Array.isArray(updateData.companies)
        ) {
            updateData.companies = [];
        }

        if (
            updateData.supportPoints !== undefined &&
            !Array.isArray(updateData.supportPoints)
        ) {
            updateData.supportPoints = [];
        }

        const industry =
            await Industry.findByIdAndUpdate(
                id,
                updateData,
                {
                    new: true,
                    runValidators: true,
                }
            );

        if (!industry) {
            return res.status(404).json({
                success: false,
                message: "Industry not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Industry updated successfully",
            industry,
        });
    } catch (error) {
        next(error);
    }
};


// ======================================================
// DELETE INDUSTRY
// DELETE /api/industries/:id
// ADMIN
// ======================================================

export const deleteIndustry = async (req, res, next) => {
    try {
        const { id } = req.params;

        const industry =
            await Industry.findByIdAndDelete(id);

        if (!industry) {
            return res.status(404).json({
                success: false,
                message: "Industry not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Industry deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

// ======================================================
// UPLOAD INDUSTRY IMAGE
// POST /api/industries/:id/image
// ADMIN
// ======================================================
export const uploadIndustryImage = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload an image",
            });
        }

        const industry = await Industry.findByIdAndUpdate(
            req.params.id,
            {
                image: `/uploads/industries/${req.file.filename}`,
            },
            {
                new: true,
            }
        );

        if (!industry) {
            return res.status(404).json({
                success: false,
                message: "Industry not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Industry image uploaded successfully",
            industry,
        });
    } catch (error) {
        next(error);
    }
};