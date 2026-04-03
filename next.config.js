/** @type {import('next').NextConfig} */
if (
  process.env.VERCEL === "1" &&
  !String(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "").trim()
) {
  throw new Error(
    "Production build on Vercel requires NEXT_PUBLIC_SANITY_PROJECT_ID. " +
      "Add it under Project Settings → Environment Variables for Production (and Preview if needed), " +
      "then redeploy.",
  );
}

const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
};

module.exports = nextConfig;
