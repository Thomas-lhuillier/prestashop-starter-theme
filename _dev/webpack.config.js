/**
 * 2007-2017 PrestaShop
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2017 PrestaShop SA
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const plugins = [];
const minimizers = [];

plugins.push(
  new MiniCssExtractPlugin({
    filename: '../css/theme.css'
  })
);

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
        test: /.(svg|jpg|png)(\?[a-z0-9=\.]+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '../img/[name]_[sha512:hash:base64:7].[ext]'
            }
          }
        ]
      },
      {
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
    // Minimize output
    config.optimization.minimizer.push(
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

    // Show more infos in console
    config.stats.children = true;
  }

  return config;
};
