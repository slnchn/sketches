const path = require("node:path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    waves: "./src/pages/waves/waves.js",
    "white-noise": "./src/pages/white-noise/white-noise.js",
    index: "./src/pages/index.js",
  },

  output: {
    path: path.resolve(__dirname, "./dist"),
    // filename: "[name]/[name].js",
    clean: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: "waves.html",
      template: "./src/pages/waves/waves.html",
      chunks: ["waves"],
    }),
    new HtmlWebpackPlugin({
      filename: "white-noise.html",
      template: "./src/pages/white-noise/white-noise.html",
      chunks: ["white-noise"],
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/pages/index.html",
      chunks: ["index"],
    }),
  ],
};
