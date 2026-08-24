import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import industryRoutes from "./routes/industryRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import careerRoutes from "./routes/careerRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

connectDB();

/* ----------------------------------
   ES Module Path Setup
---------------------------------- */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ----------------------------------
   Allowed Frontend Origins
---------------------------------- */

const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://aurevia-healthcare-one.vercel.app",
];

app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin
            // Postman, server-to-server requests, etc.
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

/* ----------------------------------
   Body Parsers
---------------------------------- */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ----------------------------------
   Static Files
---------------------------------- */

// Existing uploads route
app.use(
    "/uploads",
    express.static(path.join(__dirname, "../uploads"))
);

// Product images
// Database stores: /products/tablet1.jpg
// Actual file: uploads/products/tablet1.jpg
app.use(
    "/products",
    express.static(path.join(__dirname, "../uploads/products"))
);

/* ----------------------------------
   API Routes
---------------------------------- */

app.use("/api/products", productRoutes);
app.use("/api/industries", industryRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/auth", authRoutes);

/* ----------------------------------
   Root Route
---------------------------------- */

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Aurevia Healthcare API is running",
    });
});

/* ----------------------------------
   Server
---------------------------------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});