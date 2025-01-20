/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "www.launchuicomponents.com",
            },
            {
                protocol: "https",
                hostname: "tailwindui.com",
            },
        ],
    },
    webpack: (config) => {
        config.cache = false; // Disable Webpack caching
        return config;
    },
};

export default nextConfig;
