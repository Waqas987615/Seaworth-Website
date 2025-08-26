const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");

// Environment variable overrides
const config = {
  disableHotReload: process.env.DISABLE_HOT_RELOAD === "true",
};

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    configure: (webpackConfig) => {
      if (config.disableHotReload) {
        // Remove HMR plugin safely
        webpackConfig.plugins = webpackConfig.plugins.filter(
          (plugin) => plugin?.constructor?.name !== "HotModuleReplacementPlugin"
        );

        // Disable watch mode
        webpackConfig.watch = false;
        webpackConfig.watchOptions = {
          ignored: /./, // Ignore all files
        };
      } else {
        // Ensure watchOptions exists
        webpackConfig.watchOptions = {
          ...(webpackConfig.watchOptions || {}),
          ignored: [
            "**/node_modules/**",
            "**/.git/**",
            "**/build/**",
            "**/dist/**",
            "**/coverage/**",
            "**/public/**",
          ],
        };
      }

      // ✅ Add ESLint plugin (modern replacement for eslint-loader)
      webpackConfig.plugins.push(
        new ESLintPlugin({
          extensions: ["js", "jsx"],
          emitWarning: true,
          failOnError: false,
        })
      );

      return webpackConfig;
    },
  },
};
