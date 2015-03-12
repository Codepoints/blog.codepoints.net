#!/usr/bin/env node

var Hogan = require('hogan');
var fs = require('fs');
var path = require('path');
var content = JSON.parse(fs.readFileSync('./content.json', {encoding:'utf-8'}));
var meta;

var from = process.argv[2];
var to = path.basename(from);
var slug = path.basename(from, '.html');

if (slug === 'index') {

  var output = content.posts.reduce(function(before, item) {
    return before +
      '<li><a href="'+item.slug+'.html">'+item.title+'</a> &mdash; '+item.date+'</li>';
  }, '<ul>')+'</ul>';

  var output = Hogan.compile(fs.readFileSync('src/base.mustache',
        {encoding:'utf-8'})).render({
          content: output
        });
  fs.writeFileSync(to, output);

} else {

  var input = fs.readFileSync(from, {encoding:'utf-8'});

  content.posts.map(function(item) {
    if (item.slug === slug) {
      meta = item;
    }
  });

  if (! meta) {
    throw "No Meta found for "+from;
  }

  meta.content = input;

  var output = Hogan.compile(fs.readFileSync('src/base.mustache',
        {encoding:'utf-8'})).render(meta);
  fs.writeFileSync(to, output);

}
