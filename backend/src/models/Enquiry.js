import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
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

        company: {
            type: String,
            trim: true,
            default: "",
        },

        subject: {
            type: String,
            trim: true,
            default: "",
        },

        message: {
            type: String,
            required: true,
            trim: true,
        },

        status: {
            type: String,
            enum: ["new", "contacted", "resolved"],
            default: "new",
        },
    },
    {
        timestamps: true,
    }
);

const Enquiry = mongoose.model("Enquiry", enquirySchema);

export default Enquiry;