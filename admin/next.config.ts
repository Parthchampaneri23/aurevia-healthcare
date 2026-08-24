import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aurevia-healthcare.onrender.com",
      },
    ],
  },
};

export default nextConfig;