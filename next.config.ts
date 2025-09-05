import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "be-nobat.ir",
    //     pathname: "/images/**",
    //   },
    // ],
    domains: ["be-nobat.ir"],
  },
};

export default nextConfig;
