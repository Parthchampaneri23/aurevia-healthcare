import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Product from "../models/Product.js";
import products from "./productData.js";

dotenv.config();

const seedProducts = async () => {
    try {
        await connectDB();

        console.log("MongoDB connected for product seeding");

        // Remove ALL existing products
        await Product.deleteMany({});

        // Insert exactly the products from productData.js
        await Product.insertMany(products);

        const count = await Product.countDocuments();

        console.log(`${count} products seeded successfully`);

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error("Product seeding failed:", error.message);

        await mongoose.connection.close();
        process.exit(1);
    }
};

seedProducts();