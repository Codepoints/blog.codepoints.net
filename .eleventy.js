const pluginRss = require('@11ty/eleventy-plugin-rss');
const Image = require("@11ty/eleventy-img");
const markdownIt = require('markdown-it');

const md = markdownIt({html: true})
        .use(require('markdown-it-emoji'));

module.exports = function(eleventyConfig) {
  const outputDir = 'blog.codepoints.net';
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.setLibrary('md', md);

  eleventyConfig.addPassthroughCopy('img');
  eleventyConfig.addPassthroughCopy('assets');

  eleventyConfig.addFilter('json_encode', s => JSON.stringify(s));

  eleventyConfig.addShortcode('image', async function(src, alt, sizes='', loading='') {
    const metadata = await Image(src, {
      widths: [240, 480, 960],
      formats: ['webp', 'jpeg'],
      outputDir: `${outputDir}/img`,
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
      output: outputDir,
    },
  };
};
