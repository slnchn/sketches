const path = require("node:path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: {
      waves: "./src/pages/waves/waves.js",
      "white-noise": "./src/pages/white-noise/white-noise.js",
      index: "./src/pages/index.js",
    },

    output: {
      path: path.resolve(__dirname, "./dist"),
      clean: true,
    },

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
        },
      ],
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),

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

    devServer: {
      port: 8080,
      hot: false,
      liveReload: true,
    },

    optimization: {
      minimize: isProduction,
      minimizer: [`...`, new CssMinimizerPlugin()],
    },
  };
};
