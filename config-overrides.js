/* eslint-disable */
const path = require('path');

module.exports = (config) => {
  config.entry = path.resolve(__dirname, 'src', 'dev', 'index.tsx');
  return config;
};
