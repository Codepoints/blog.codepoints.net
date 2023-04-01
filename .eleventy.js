const pluginRss = require('@11ty/eleventy-plugin-rss');
const Image = require("@11ty/eleventy-img");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addPassthroughCopy('img');
  eleventyConfig.addPassthroughCopy('assets');

  eleventyConfig.addFilter('json_encode', s => JSON.stringify(s));

  eleventyConfig.addShortcode('image', async function(src, alt, sizes='', loading='') {
    const metadata = await Image(src, {
      widths: [240, 480, 960],
      formats: ['webp', 'jpeg'],
    });
    return Image.generateHTML(metadata, {
      alt,
      sizes,
      loading,
      decoding: 'async',
    });
  });

  return {
    dir: {
      output: 'blog.codepoints.net',
    },
  };
};
