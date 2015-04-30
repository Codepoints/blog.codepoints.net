#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var sanitizeHtml = require('sanitize-html');

var content = JSON.parse(fs.readFileSync('./content.json', {encoding:'utf-8'}));

var data = fs.readFileSync('./posts/'+content.posts[0].slug+'.html', {encoding:'utf-8'});
data = sanitizeHtml(data, {
  allowedTags: [ 'b', 'i', 'em', 'strong', 'a' ],
}).substr(0, 255);

fs.writeFileSync('./current.json', JSON.stringify({
  content: data,
  title: content.posts[0].title,
  url: 'https://blog.codepoints.net/'+content.posts[0].slug+'.html',
}));
