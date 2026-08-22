import Enquiry from "../models/Enquiry.js";

// Create enquiry
export const createEnquiry = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            company,
            subject,
            message,
        } = req.body;

        if (!name || !email || !phone || !message) {
            return res.status(400).json({
                success: false,
                message: "Name, email, phone and message are required",
            });
        }

        const enquiry = await Enquiry.create({
            name,
            email,
            phone,
            company,
            subject,
            message,
        });

        res.status(201).json({
            success: true,
            message: "Enquiry submitted successfully",
            enquiry,
        });
    } catch (error) {
        console.error("Create enquiry error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to submit enquiry",
        });
    }
};

// Get all enquiries
export const getEnquiries = async (req, res) => {
    try {
        const enquiries = await Enquiry.find().sort({
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            count: enquiries.length,
            enquiries,
        });
    } catch (error) {
        console.error("Get enquiries error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch enquiries",
        });
    }
};

// Get single enquiry
export const getEnquiryById = async (req, res) => {
    try {
        const enquiry = await Enquiry.findById(req.params.id);

        if (!enquiry) {
            return res.status(404).json({
                success: false,
                message: "Enquiry not found",
            });
        }

        res.status(200).json({
            success: true,
            enquiry,
        });
    } catch (error) {
        console.error("Get enquiry error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch enquiry",
        });
    }
};

// Update enquiry status
export const updateEnquiryStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!["new", "contacted", "resolved"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid enquiry status",
            });
        }

        const enquiry = await Enquiry.findByIdAndUpdate(
            req.params.id,
            { status },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!enquiry) {
            return res.status(404).json({
                success: false,
                message: "Enquiry not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Enquiry status updated successfully",
            enquiry,
        });
    } catch (error) {
        console.error("Update enquiry status error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update enquiry status",
        });
    }
};

// Delete enquiry
export const deleteEnquiry = async (req, res) => {
    try {
        const enquiry = await Enquiry.findByIdAndDelete(req.params.id);

        if (!enquiry) {
            return res.status(404).json({
                success: false,
                message: "Enquiry not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Enquiry deleted successfully",
        });
    } catch (error) {
        console.error("Delete enquiry error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete enquiry",
        });
    }
};