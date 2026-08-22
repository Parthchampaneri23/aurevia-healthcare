import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Industry from "../models/Industry.js";
import industries from "./industryData.js";

dotenv.config();

const seedIndustries = async () => {
    try {
        await connectDB();

        console.log("MongoDB connected for industry seeding");

        // Remove existing industries
        await Industry.deleteMany({});

        // Insert official Aurevia industries
        await Industry.insertMany(industries);

        const count = await Industry.countDocuments();

        console.log(`${count} industries seeded successfully`);

        await mongoose.connection.close();

        process.exit(0);
    } catch (error) {
        console.error("Industry seeding failed:", error.message);

        await mongoose.connection.close();

        process.exit(1);
    }
};

seedIndustries();