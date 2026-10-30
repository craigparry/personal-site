/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone', // Minimizes the final production bundle
    async rewrites() {
        return [
        {
            // Add /:path* to forward any sub-routes correctly
            source: '/api/backend/:path*',
            // Match your backend's expected trailing slash structure
            destination: 'http://localhost:8000/:path*/', 
        },
        ];
    },
};

module.exports = nextConfig;