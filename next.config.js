/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["axios", "mongoose"],
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "th.bing.com",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "files.edgestore.dev",
                pathname: "**",
            },
        ],
    },
};

module.exports = nextConfig;
