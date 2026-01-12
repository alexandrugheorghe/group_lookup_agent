import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Note: Native modules like @boundaryml/baml should work with Turbopack
  // Mark as external to prevent bundling issues
  serverExternalPackages: ['@boundaryml/baml'],
};

export default nextConfig;
