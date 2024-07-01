// 公共配置
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CompressionPlugin = require("compression-webpack-plugin");

const isDev = process.env.NODE_ENV === "development"; // 是否是开发模式

module.exports = {
  entry: path.join(__dirname, "../src/index.tsx"), // 入口文件
  // 打包文件出口
  output: {
    filename: "static/js/[name].[chunkhash:8].js", //每个输出js的名称
    path: path.join(__dirname, "../dist"), // 打包结果输出路径
    clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
    publicPath: "/", // 打包后文件的公共前缀路径
  },
  // exclude: path.resolve(__dirname, 'node_modules'),
  module: {
    rules: [
      {
        test: /\.css$/, //匹配所有的 ccs 文件
        include: [path.resolve(__dirname, "../src"), path.resolve(__dirname, "../node_modules"),],
        use: [isDev ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.less$/, //匹配 css和less 文件
        include: [path.resolve(__dirname, "../src")],
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                // [path][name]__[local]--[hash:base64:5]
                localIdentName: "[name]__[local]___[hash:base64:5]",
              },
            },
          },
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /.(js|ts|tsx)$/,
        include: [path.resolve(__dirname, "../src")], //只对项目src文件的ts,tsx进行loader解析
        use: ["thread-loader", "babel-loader"],
        
      },
      {
        test: /.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
        type: "asset", //
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: "static/images/[name].[contenthash:8][ext]", // 加上[contenthash:8]
        },
      },
      {
        test: /.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: "static/fonts/[name].[contenthash:8][ext]", // 加上[contenthash:8]
        },
      },
      {
        test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: "static/media/[name].[contenthash:8][ext]", // 加上[contenthash:8]
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".tsx", ".ts",],
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
    // 如果用的是pnpm 就暂时不要配置这个，会有幽灵依赖的问题，访问不到很多模块。
    // modules: [path.resolve(__dirname, "../node_modules")],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"), // 模板取定义root节点的模板
      title: "个人学习记录",
      inject: true, // 自动注入静态资源
      collapseWhitespace: true, //去除所有的空格
      removeComments: true, //去除所有的注释
    }),
    new webpack.DefinePlugin({
      "process.env.BASE_ENV": JSON.stringify(process.env.BASE_ENV),
    }),
    // new CompressionPlugin({
    //   filename: "[path].gz[query]", // 文件命名
    //   algorithm: "gzip", // 压缩格式,默认是gzip
    //   test: /\.js$|\.css$|\.html$|\.ttf$|\.eot$|\.woff$/, // 只生成css,js压缩文件
    //   threshold: 10240, // 只有大小大于该值的资源会被处理。默认值是 10k
    //   minRatio: 0.8, // 压缩率,默认值是 0.8
    //   deleteOriginalAssets: false// 假如出现访问.gz文件访问不到的时候，还可以访问源文件双重保障
    // }),
  ],
  cache: {
    type: "filesystem", // 使用文件缓存
  },
};
