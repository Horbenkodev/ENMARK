import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    serverActions: {
      // Admin forms upload photos (product image, gallery, category image)
      // straight from a phone camera; the 1MB default is too small for that.
      bodySizeLimit: "20mb",
    },
    // src/proxy.ts runs on all /admin/:path* requests and buffers the body;
    // must be >= bodySizeLimit above or large uploads get silently truncated.
    proxyClientMaxBodySize: "20mb",
  },
};

export default nextConfig;
