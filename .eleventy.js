const pluginRss = require('@11ty/eleventy-plugin-rss');

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addPassthroughCopy('img');
  eleventyConfig.addPassthroughCopy('assets');

  eleventyConfig.addFilter('json_encode', s => JSON.stringify(s));

  return {
    dir: {
      output: 'blog.codepoints.net',
    },
  };
};
