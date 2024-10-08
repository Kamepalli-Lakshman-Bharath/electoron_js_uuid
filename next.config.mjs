/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
    },
  },
};

export default nextConfig;
