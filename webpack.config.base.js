/**
 * Base webpack config used across other specific configs
 */

import path from 'path';
import webpack from 'webpack';

export default {
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      }
    }]
  },

  output: {
    path: path.join(__dirname, 'app'),
    filename: 'bundle.js',
    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2'
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      'node_modules'
    ],
    alias: {
      Components: path.resolve(__dirname, './app/components'),
      Data: path.resolve(__dirname, './app/data'),
      Styles: path.resolve(__dirname, './app/styles'),
      Utils: path.resolve(__dirname, './app/utils'),
    }
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
  ],
};
