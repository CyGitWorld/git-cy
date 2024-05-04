import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

if (process.env.NODE_ENV === "development") {
  await setupDevPlatform();
}

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  env: {
    CLIENT_ID: process.env.CLIENT_ID,
  },
};

const config = withVanillaExtract(nextConfig);

export default config;
