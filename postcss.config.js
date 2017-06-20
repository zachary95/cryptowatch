const path = require('path');

module.exports = {
  plugins: {
    autoprefixer: {},
    cssnano: {},
    'postcss-import': {
      path: path.resolve(__dirname, './app/styles')
    },
    'postcss-sassy-mixins': {},
    'postcss-define-property': {},
    'postcss-font-magician': {},
    'postcss-nested': {},
    'postcss-calc': {},
    'postcss-easings': {},
    'postcss-focus': {},
  },
};
