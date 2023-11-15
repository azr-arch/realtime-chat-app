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
        ],
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.externals.push({
            "utf-8-validate": "commonjs utf-8-validate",
            bufferutil: "commonjs bufferutil",
            "supports-color": "commonjs supports-color",
        });
        return config;
    },
};

module.exports = nextConfig;
