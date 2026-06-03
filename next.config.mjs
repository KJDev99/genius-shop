/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.geniusstorerf.ru",
      },
    ],
  },
};

export default nextConfig;