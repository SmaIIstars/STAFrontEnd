const path = require("path");
const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
  webpack: {
    alias: {
      "@": resolve("src"),
      assets: resolve("src/assets"),
      common: resolve("src/common"),
      components: resolve("src/components"),
      servers: resolve("src/servers"),
      views: resolve("src/views"),
      routes: resolve("src/routers"),
      utils: resolve("src/utils"),
    },
  },
};
