/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["lh3.googleusercontent.com", "images.unsplash.com"],
  },
  env: {
    UNSPLASH_CLIENT: process.env.UNSPLASH_CLIENT,
  },
};

module.exports = nextConfig;
