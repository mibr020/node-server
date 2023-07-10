const { resolve } = require("path");
const webpack = require('webpack');

// eslint-disable-next-line no-undef
module.exports = (env) => {
  return {
    entry: {
      "index.production": "./src/client/index.jsx",
    },
    plugins: [
      new webpack.DefinePlugin({
        "REACT_APP_PORT": JSON.stringify(env.REACT_APP_PORT),
      })],
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: [
            {
              loader: "babel-loader",
              options: { configFile: resolve("babel.config.cjs") },
            },
          ],
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    mode: "production",
    output: {
      // eslint-disable-next-line no-undef
      path: resolve("dist"),
      filename: "[name].js",
    },
  }
};
