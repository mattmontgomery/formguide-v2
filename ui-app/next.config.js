/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "media-1.api-sports.io",
      "media-2.api-sports.io",
      "media-3.api-sports.io",
    ],
  },
  redirects: () => [
    { source: "/", destination: "/form/mls/2023", permanent: false },
  ],
};

module.exports = nextConfig;
