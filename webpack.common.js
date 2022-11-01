const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/scripts/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/view/index.html",
      favicon: "./favicon.ico",
      filename: "index.html",
      inject: "body",
    }),
    new HtmlWebpackPlugin({
      template: "./src/view/rencana.html",
      favicon: "./favicon.ico",
      filename: "rencana.html",
      inject: "body",
    }),
    new HtmlWebpackPlugin({
      template: "./src/view/resep.html",
      favicon: "./favicon.ico",
      filename: "resep.html",
      inject: "body",
    }),
    new HtmlWebpackPlugin({
      template: "./src/view/credits.html",
      favicon: "./favicon.ico",
      filename: "credits.html",
      inject: "body",
    }),
    new MiniCssExtractPlugin(),
    new ESLintPlugin(),
    new StylelintPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
