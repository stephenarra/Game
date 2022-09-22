/** @type {import('next').NextConfig} */

// see https://github.com/martpie/next-transpile-modules#readme
// https://stackoverflow.com/questions/64989575/how-to-load-libraries-which-export-typescript-in-next-js/64990954#64990954
const withTM = require("next-transpile-modules")(["game-types"]);

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["avatars.dicebear.com"],
  },
};

module.exports = withTM(nextConfig);
