import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import industryRoutes from "./routes/industryRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import careerRoutes from "./routes/careerRoutes.js";

dotenv.config();

const app = express();

connectDB();

// Allowed frontend origins
const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://aurevia-healthcare-one.vercel.app",
];

app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin
            // (Postman, server-to-server requests, etc.)
            if (!origin) {
                return callback(null, true);
            }

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

app.use("/api/products", productRoutes);
app.use("/api/industries", industryRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/careers", careerRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Aurevia Healthcare API is running",
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});