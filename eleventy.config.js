import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

import pluginRss from '@11ty/eleventy-plugin-rss';
import Image from '@11ty/eleventy-img';

import markdownIt from 'markdown-it';
import { full as emoji } from 'markdown-it-emoji';

const md = markdownIt({html: true})
        .use(emoji);

export default function(eleventyConfig) {
  const outputDir = 'blog.codepoints.net';

  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addPlugin(Image.eleventyImageTransformPlugin, {
    widths: [300, 600, 960, 'auto'],
    formats: ['webp', 'jpeg', 'png', 'svg', 'auto'],
    filenameFormat: function (id, src, width, format, options) {
      const extension = path.extname(src);
      const name = path.basename(src, extension);
      return `img/${name}-${id}.${width}.${format}`;
    },
  });

  eleventyConfig.setLibrary('md', md);

  eleventyConfig.addPassthroughCopy('img');
  eleventyConfig.addPassthroughCopy('assets');

  eleventyConfig.addFilter('json_encode', s => JSON.stringify(s));

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
