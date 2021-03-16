const withFonts = require("next-fonts");
module.exports = withFonts({
  webpack(config, options) {
    return config;
  },
});

const withImages = require("next-images");
module.exports = withImages({
  webpack(config, options) {
    return config;
  },
});

module.exports = {
  assetPrefix: process.env.BASE_PATH || "",
  publicRuntimeConfig: {
    basePath: process.env.BASE_PATH || "",
  },
};
