import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },

        category: {
            type: String,
            required: true,
            trim: true,
        },

        shortDescription: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
        },

        applications: {
            type: [String],
            default: [],
        },

        specifications: {
            type: [
                {
                    label: {
                        type: String,
                        required: true,
                    },

                    value: {
                        type: String,
                        required: true,
                    },
                },
            ],
            default: [],
        },

        image: {
            type: String,
            default: "",
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

const Product = mongoose.model("Product", productSchema);

export default Product;