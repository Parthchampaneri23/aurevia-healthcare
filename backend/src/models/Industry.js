import mongoose from "mongoose";

const industryCompanySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
        },
    },
    { _id: false }
);

const industrySchema = new mongoose.Schema(
    {
        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },

        eyebrow: {
            type: String,
            required: true,
            trim: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        image: {
            type: String,
            default: "",
        },

        description: {
            type: String,
            required: true,
        },

        overview: {
            type: String,
            required: true,
        },

        companies: {
            type: [industryCompanySchema],
            default: [],
        },

        supportPoints: {
            type: [String],
            default: [],
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Industry = mongoose.model("Industry", industrySchema);

export default Industry;