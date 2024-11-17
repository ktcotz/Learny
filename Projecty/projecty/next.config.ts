import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */ images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "comsfxjrkfxpvocboflo.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
    ],
  },
};

export default nextConfig;
