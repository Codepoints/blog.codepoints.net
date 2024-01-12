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

  eleventyConfig.addShortcode('cp', async function(int, width=16) {
    let hex = (typeof int === 'number'? int.toString(16) : int).toUpperCase();
    while (hex.length < 4) {
      hex = '0' + hex;
    }
    return `<a class="ln cp" href="https://codepoints.net/U+${hex}" data-cp="U+${hex}">U+${hex}</a>`;
    //const title = (await fetch(`https://codepoints.net/api/v1/codepoint/${hex}?property=na`).then(response => response.json()))?.na || '';
    //return `<a class="ln cp" href="https://codepoints.net/U+${hex}" data-cp="U+${hex}">
    //  <svg width="${width}" height="${width}" class="cpfig__img">
    //    <use href="https://codepoints.net/image/${hex.replace(/..$/, '00')}.svg#U${hex}"/>
    //  </svg>
    //  <span class="title">${title}</span>
    //</a>`;
  });

  return {
    dir: {
      output: outputDir,
    },
  };
};
