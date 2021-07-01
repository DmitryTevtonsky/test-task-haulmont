/* eslint-disable */
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const removeWebpackPlugins = require("react-app-rewire-unplug");
const { TypedCssModulesPlugin } = require("typed-css-modules-webpack-plugin");

const {
  override,
  addLessLoader,
  addBundleVisualizer,
  addWebpackPlugin
} = require("customize-cra");

const appBuild = path.resolve("build");

const proxyFile = path.resolve(__dirname, "middlewares");

const removePlugins = () => config => {
  return removeWebpackPlugins(config, config.mode, {
    pluginNames: [
      // "HtmlWebpackPlugin",
      "MiniCssExtractPlugin",
      "InlineChunkHtmlPlugin",
      "ManifestPlugin",
      "GenerateSW"
    ],
    verbose: true
  });
};

const supportMjs = () => config => {
  config.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    type: "javascript/auto"
  });

  return config;
};

const webpackConfig = () => config => {
  config.entry = {
    [process.env.npm_package_name]:
      config.mode === "production"
        ? [path.resolve("src", "index.tsx")]
        : [
            path.resolve("src", "index.tsx"),
            "webpack-hot-middleware/client?path=/__webpack_hmr&reload=true"
          ]
  };
  config.output = {
    ...config.output,
    path: appBuild,
    filename: path.join(
      "js",
      `bundle.js`
    ),
    chunkFilename: path.join(
      "js",
      "chunks",
      "[name].[contenthash].js"
    )
  };
  config.optimization.splitChunks = {};
  config.optimization.runtimeChunk = false;
  config.devServer = {
    hot: true,
    compress: true,
    host: "127.0.0.1",
    proxy: process.env.PROXY,
    localPort: 8080,
    open: true,
    overlay: { warnings: false, errors: true },
  };
  return config;
};

module.exports = {
  webpack: override(
    webpackConfig(),
    supportMjs(),
    removePlugins(),
    addLessLoader({
      lessOptions: {
        javascriptEnabled: true,
        cssModules: {
          localIdentName: "[path][name]__[local]--[hash:base64:5]",
        },
      }
    }),
    addBundleVisualizer({}, true),
    addWebpackPlugin(
      new TypedCssModulesPlugin({
        globPattern: "src/**/*.css",
        camelCase: "dashesOnly"
      })
    ),
    addWebpackPlugin(
      new MiniCssExtractPlugin({
        filename: path.join(
          "css",
          "bundle.css"
        ),
        chunkFilename: path.join(
          "css",
          "chunks",
          "[id].[contenthash].css"
        ),
      })
    ),
  ),

  paths(paths) {
    paths.proxySetup = path.join(proxyFile, "index.js");
    paths.appBuild = appBuild;
    return paths;
  }
};
