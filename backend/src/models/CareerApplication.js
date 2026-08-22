import mongoose from "mongoose";

const careerApplicationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },

        phone: {
            type: String,
            required: true,
            trim: true,
        },

        position: {
            type: String,
            required: true,
            trim: true,
        },

        experience: {
            type: String,
            trim: true,
            default: "",
        },

        resume: {
            type: String,
            required: true,
        },

        coverMessage: {
            type: String,
            trim: true,
            default: "",
        },

        status: {
            type: String,
            enum: ["new", "reviewing", "shortlisted", "rejected"],
            default: "new",
        },
    },
    {
        timestamps: true,
    }
);

const CareerApplication = mongoose.model(
    "CareerApplication",
    careerApplicationSchema
);

export default CareerApplication;