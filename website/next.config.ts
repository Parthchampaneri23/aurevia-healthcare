import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aurevia-healthcare.onrender.com",
        pathname: "/uploads/products/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/products/**",
      },
    ],
  },
};

export default nextConfig;