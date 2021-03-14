/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: Danny Zeng
 * @Date: 2021-02-09 15:39:48
 * @LastEditors: Danny Zeng
 * @LastEditTime: 2021-03-13 16:08:27
 */
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

process.env.NODE_ENV = 'development'

// const postCssLoader = [
//   MiniCssExtractPlugin.loader,
//   'css-loader', {
//     loader: 'postcss-loader',
//     options: {
//       postcssOptions: {
//         plugins: ['postcss-preset-env']
//       }
//     }
//   }
// ]


module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.[contenthash:10].js',
    path: resolve(__dirname, 'build')
  },

  //loader配置
  module: {
    rules: [
      // eslint语法检查
      {
        test: /\.js$/,
        exclude: /node-modules/,
        // 有多个loader时优先执行eslint
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      },
      {
        oneOf: [
          //babel兼容性处理
          {
            test: /\.js$/,
            exclude: /node-modules/,
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env',
                  // {
                  //   useBuiltIns: 'entry',
                  //   corejs: {
                  //     version: 3
                  //   },
                  //   targets: {
                  //     chrome: '50',
                  //     firefox: '50',
                  //     ie: '8',
                  //     safari: '10',
                  //     edge: '16'
                  //   }
                  // }
                ]
              ],
              // 开启babel缓存
              cacheDirectory: true,
              'plugins': ['@babel/plugin-transform-runtime']
            }
          },
          {
            test: /\.css$/,
            use: [
              'style-loader',
              'css-loader'],
          },
          {
            test: /\.less$/,
            use: [
              'style-loader',
              'css-loader',
              'less-loader'],
          },
          {
            test: /\.(jpg|png|gif)$/,
            loader: 'url-loader',
            options: {
              limit: 8 * 1024,
              name: '[hash:10].[ext]',
              outputPath: 'img'
            },

          },
          {
            test: /\.html$/,
            loader: 'html-loader'
          }
        ]
      }
    ]
  },

  resolve: {
    alias: {
      $css: resolve(__dirname, 'src/css'),
    },
    extensions: ['.js', '.json', '.less', '.css'],
    // 告诉webpack解析模块在那个目录，加快查找速度
    modules: [resolve(__dirname, '../../node_modules'), 'node_modules']
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.[contenthash:10].css'
    })
  ],

  mode: 'development',
  // mode: 'production'

  devServer: {
    //运行代码基本目录
    contentBase: resolve(__dirname, 'build'),
    //监视文件目录，一旦文件变化重新reload
    watchContentBase: true,
    watchOptions: {
      //忽略监视文件
      ignored: /node_modules/
    },
    //启用gzip压缩
    compress: true, //是否启用gzip压缩
    port: 3000,
    //自动打开浏览器
    open: true,
    //开启HMR功能
    hot: true,
    //浏览器控制台不显示启动服务器日志信息
    clientLogLevel: 'none',
    //除了一些基本启动信息，其他都不要显示
    quiet: true,
    //如果出错，不要全屏提示
    overlay: false,
    //服务器代理，解决跨域问题
    proxy: {
      '/api': {
        target: 'http://localhost:8888',
        //发送请求时，路径重写： /api/xxx -> /xxx
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  devtool: 'source-map'
}