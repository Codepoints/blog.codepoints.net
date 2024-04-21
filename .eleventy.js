const pluginRss = require('@11ty/eleventy-plugin-rss');
const Image = require("@11ty/eleventy-img");
const markdownIt = require('markdown-it');
const emoji = require('markdown-it-emoji').full;
const crypto = require('crypto');
const fs = require('fs');

const md = markdownIt({html: true})
        .use(emoji);

module.exports = function(eleventyConfig) {
  const outputDir = 'blog.codepoints.net';
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.setLibrary('md', md);

  eleventyConfig.addPassthroughCopy('img');
  eleventyConfig.addPassthroughCopy('assets');

  eleventyConfig.addFilter('json_encode', s => JSON.stringify(s));

  eleventyConfig.addShortcode('image', async function(src, alt, sizes='', loading='', width=null) {
    const metadata = await Image(src, {
      widths: width? [width] : [240, 480, 960],
      formats: ['webp', 'jpeg'],
      outputDir: `${outputDir}/img`,
    });
    return Image.generateHTML(metadata, {
      alt,
      width,
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

  eleventyConfig.addFilter("bust", async (url) => {
    const [urlPart, paramPart] = url.split("?");
    const params = new URLSearchParams(paramPart || "");
    const relativeUrl = (urlPart.charAt(0) == "/") ? urlPart.substring(1): urlPart;

    const hasher = new Promise((res, rej) => {
      const hash = crypto.createHash('md5');
      const rStream = fs.createReadStream(relativeUrl);
      rStream.on('data', (data) => {
        hash.update(data);
      });
      rStream.on('end', () => {
        res(hash.digest('hex'));
      });
    });
    params.set("v", await hasher);
    return `${urlPart}?${params}`;
  });

  return {
    dir: {
      output: outputDir,
    },
  };
};
