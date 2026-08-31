/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "olboys.fr" },
    ],
  },
};

export default nextConfig;
