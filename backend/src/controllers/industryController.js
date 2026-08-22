import Industry from "../models/Industry.js";

// GET /api/industries
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


// GET /api/industries/:slug
export const getIndustryBySlug = async (req, res, next) => {
    try {
        const industry = await Industry.findOne({
            slug: req.params.slug,
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


// POST /api/industries
export const createIndustry = async (req, res, next) => {
    try {
        const industry = await Industry.create(req.body);

        res.status(201).json({
            success: true,
            message: "Industry created successfully",
            industry,
        });
    } catch (error) {
        next(error);
    }
};


// PUT /api/industries/:id
export const updateIndustry = async (req, res, next) => {
    try {
        const industry = await Industry.findByIdAndUpdate(
            req.params.id,
            req.body,
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


// DELETE /api/industries/:id
export const deleteIndustry = async (req, res, next) => {
    try {
        const industry = await Industry.findByIdAndDelete(
            req.params.id
        );

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