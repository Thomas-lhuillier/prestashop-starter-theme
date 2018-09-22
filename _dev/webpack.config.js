const path = require('path');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const minimizers = [];
const plugins = [
  new BrowserSyncPlugin({
    host: 'localhost',
    port: 3100,
    proxy: 'http://ps1742.thomas.tot/'
  }),
  new webpack.HotModuleReplacementPlugin(),
  // Clear the assets/img/generated folder before each compilation.
  new CleanWebpackPlugin(['assets/img/generated'], {
    root: path.resolve(__dirname, '..'),
    verbose: true
  }),
  new MiniCssExtractPlugin({
    filename: '../css/theme.css'
  })
];

let config = {
  entry: ['./js/theme.js', './css/theme.scss'],
  output: {
    path: path.resolve(__dirname, '../assets/js'),
    filename: 'theme.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      },
      {
        test: /\.(s)?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        // Include small images as base64 (< 8192 bytes),
        // else extract in /assets/img/generated/
        test: /.(svg|jpg|png)(\?[a-z0-9=\.]+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              fallback: 'file-loader',
              name: '../img/generated/[name]_[sha512:hash:base64:7].[ext]'
            }
          }
        ]
      },
      {
        // Extract fonts in /assets/fonts/
        test: /.(woff(2)?|eot|ttf)(\?[a-z0-9=\.]+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '../fonts/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  externals: {
    prestashop: 'prestashop'
  },
  plugins: plugins,
  optimization: {
    minimizer: minimizers
  },
  resolve: {
    extensions: ['.js', '.scss', '.css']
  },
  stats: {
    children: false
  }
};

module.exports = (env, argv) => {
  if (argv.mode === 'production') {
    /**
     * Production specific settings
     */
    config.optimization.minimizer.push(
      // Minimize output
      new UglifyJsPlugin({
        uglifyOptions: {
          extractComments: /^\**!|@preserve|@license|@cc_on/i,
          compress: {
            drop_console: true
          }
        },
        parallel: true
      })
    );

    // Display more infos in console
    config.stats.children = true;
  }

  return config;
};
