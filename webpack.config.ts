import path from "path";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { Configuration } from "webpack";

const config: Configuration = {
  entry: "./src/index.ts",
  target: "node",
  devtool: false,
  output: {
    filename: "nodemonster.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  plugins: [new CleanWebpackPlugin()]
};

export default config;
