import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  compiler: {
    styledComponents: true,
  },
};

const config = withVanillaExtract(nextConfig);

export default config;
