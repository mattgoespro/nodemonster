import path from "path";
import { Configuration } from "webpack";

const config: Configuration = {
  entry: "./src/index.ts",
  devtool: "cheap-source-map",
  output: {
    filename: "nodemonster.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  }
};

export default config;
