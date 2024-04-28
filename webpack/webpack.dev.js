/*
 * @Author: Lyq
 * @Date: 2024-01-20 16:04:56
 * @LastEditors: Lyq 
 * @LastEditTime: 2024-04-22 21:21:38
 */
const path = require("path");
const { merge } = require("webpack-merge");
const WebpackBar = require("webpackbar");
const baseConfig = require("./webpack.base.js");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

// 合并公共配置，并添加开发环境配置
module.exports = merge(baseConfig, {
  mode: "development", // 开发模式，不会压缩最终代码
  devServer: {
    port: 3001, // 服务端口号
    compress: false, // gzip压缩，开发环境不开启，提升速度
    historyApiFallback: true,// 解决路由跳转404问题
    proxy: [{
      context: ['/development'],
      target: 'http://localhost:3000/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    }],
    hot: true,
    client: {
      overlay: {
        errors: false,
        warnings: false,
        runtimeErrors: false
      }
    },
    static: {
      //托管静态资源文件
      directory: path.join(__dirname, "../public"),
    },
  },
  devtool: "eval-cheap-module-source-map",
  plugins: [
    // 开启react模块热替换插件
    new ReactRefreshWebpackPlugin(),
    new WebpackBar(),
  ],
});
