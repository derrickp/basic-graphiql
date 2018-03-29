const webpack = require("webpack");
require("dotenv").config();

module.exports = () => {
  return {
    mode: process.env.BUILD_MODE,
    devtool: false,
    entry: {
      index: "./src/index.tsx",
    },
    output: {
      filename: "[name].js",
      path: __dirname + "/public/dist",
    },
    resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: [".ts", ".tsx", ".js"],
    },
    plugins: [
      new webpack.DefinePlugin({
        GRAPHQL_URI: JSON.stringify(process.env.GRAPHQL_URI),
      }),
    ],
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            chunks: "initial",
            name: "vendor",
            priority: 10,
            enforce: true,
          },
        },
      },
    },
    module: {
      rules: [
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        { test: /\.tsx?$/, loader: "ts-loader", exclude: /node_modules/ },
        { test: /\.flow$/, loader: "ignore-loader" },
      ],
    },
  };
};
