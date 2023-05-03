const jsmin = require('./src/lib/filters/jsmin.js');
const path = require('path');

const inputDir = path.relative(__dirname, 'src/content');
const outputDir = path.relative(__dirname, 'build');

module.exports = function (eleventyConfig) {
  eleventyConfig.setServerOptions({
    port: 9091,
  });

  eleventyConfig.addPassthroughCopy('./src/content/css/');
  eleventyConfig.addNunjucksAsyncFilter('jsmin', jsmin);

  return {
    markdownTemplateEngine: 'njk',
    dir: {
      input: inputDir,
      output: outputDir,
      // The following are relative to the input dir.
      data: '../data/',
      includes: '../includes/',
      layouts: '../layouts/',
    },
  };
};
