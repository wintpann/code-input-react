/* eslint-disable */
const path = require('path');

module.exports = (config) => {
  config.entry = path.resolve(__dirname, 'src', 'storybox', 'index.tsx');
  return config;
};
