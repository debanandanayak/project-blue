import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  redirects: async () => {
    return [
      { source: "/api/:path*", destination: "http://localhost:1221/api/:path*", permanent: true }
    ]
  }
}

export default nextConfig
