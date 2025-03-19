import nextPWA from "next-pwa";

const withPWA = nextPWA({
  dest: "public",
});

module.exports = withPWA({
  reactStrictMode: true,
});
