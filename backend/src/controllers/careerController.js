import CareerApplication from "../models/CareerApplication.js";

// Create career application
export const createCareerApplication = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            position,
            experience,
            coverMessage,
        } = req.body;

        if (!name || !email || !phone || !position) {
            return res.status(400).json({
                success: false,
                message: "Name, email, phone and position are required",
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Resume is required",
            });
        }

        const application = await CareerApplication.create({
            name,
            email,
            phone,
            position,
            experience,
            resume: `/uploads/resumes/${req.file.filename}`,
            coverMessage,
        });

        res.status(201).json({
            success: true,
            message: "Career application submitted successfully",
            application,
        });
    } catch (error) {
        console.error("Create career application error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to submit career application",
        });
    }
};

// Get all applications
export const getCareerApplications = async (req, res) => {
    try {
        const applications = await CareerApplication.find().sort({
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            count: applications.length,
            applications,
        });
    } catch (error) {
        console.error("Get career applications error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch career applications",
        });
    }
};

// Get single application
export const getCareerApplicationById = async (req, res) => {
    try {
        const application = await CareerApplication.findById(req.params.id);

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Career application not found",
            });
        }

        res.status(200).json({
            success: true,
            application,
        });
    } catch (error) {
        console.error("Get career application error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch career application",
        });
    }
};

// Update application status
export const updateCareerApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const allowedStatuses = [
            "new",
            "reviewing",
            "shortlisted",
            "rejected",
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid application status",
            });
        }

        const application = await CareerApplication.findByIdAndUpdate(
            req.params.id,
            { status },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Career application not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Application status updated successfully",
            application,
        });
    } catch (error) {
        console.error("Update career application status error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update application status",
        });
    }
};

// Delete application
export const deleteCareerApplication = async (req, res) => {
    try {
        const application = await CareerApplication.findByIdAndDelete(
            req.params.id
        );

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Career application not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Career application deleted successfully",
        });
    } catch (error) {
        console.error("Delete career application error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete career application",
        });
    }
};