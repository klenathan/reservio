/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true, reactRefresh: true,
    }, images: {
        remotePatterns: [{
            protocol: "https", hostname: "upload.wikimedia.org",
        }, {
            protocol: "https", hostname: "d3j45rkkmhyyrh.cloudfront.net",
        },],
    },
};

module.exports = nextConfig;
