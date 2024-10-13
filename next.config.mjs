/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    // Enable partial prerendering
    ppr: "incremental",
  },
};

export default nextConfig;
