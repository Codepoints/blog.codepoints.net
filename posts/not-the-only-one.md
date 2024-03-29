---
date: 2012-07-07T12:34:00
title: "Not the only one"
---

Of course the idea of a Unicode visualization is not new. If <a
href="http://google.com/search?q=Unicode">you google for it</a>, there are a
multitude of lists of Unicode blocks and stuff. However, the quality is
extremely mixed. While anyone can write a loop around Python’s <a
href="http://docs.python.org/library/unicodedata.html">`unicodedata`</a>
library and print the result, the important informations, which Unicode
version, how does the character look usually, is it deprecated, and so on, are
seldomly found.

I’d like to present you here some projects that have in
my opinion a high quality and can help you find your way through Unicode in
many different facettes.

<h3>The <a href="http://cldr.unicode.org/unicode-utilities">Unicode Utilities</a></h3>

These tools are directly on the Unicode.org website. This is a set of tools
that allow browsing Unicode characters in a lot of different ways. Most
commonly, you can simply view character definitions, but you can also search
for confusables (characters similar to a specific one), regular expression
tokens, and so on. The trustworthiness is high by nature, since the database is
curated by members of the Unicode consortium itself.

<h3><a href="http://decodeunicode.org">Decode Unicode</a></h3>

The site is, in its own words, “an independent online-platform for digital
type culture, developed at the Department of Design at the University of
Applied Sciences in Mainz.” It presents all of Unicode 5 in a very tidy and
stylish environment and has an attached wiki with information for many
codepoints. Its greatest advantage is, that the people behind have visualized
_every single one_ of the Unicode codepoints they present.

<h3><a href="http://graphemica.com">Graphemica</a></h3>

(“For people who ♥ letters, numbers, punctuation, &amp;c”) It is a social
Unicode browser. That is, you can pick and share favourites, add tags and
comment on single codepoints. Unfortunately they also haven’t got support for
the new Unicode 6.0 characters.

<h3><a href="http://www.fileformat.info/info/unicode/">FileFormat.info</a></h3>

It presents all current Unicode characters up to version 6.1 together with
renderings from fonts. It shows a great lot of representations of a character
from Python escapes to mappings in other character sets.

<h3><a href="http://rishida.net/utilities">Richard Ishida’s Utilities</a></h3>

Richard Ishida is “the International­ization Activity Lead at the W3C (World
Wide Web Consortium) and [he] contribute[s] to the Unicode Editorial
Committee.” On his website he provides a set of tools to browse codepoints and
also to modify them, especially a very helpful tool called <a
href="http://rishida.net/scripts/uniview/">UniView</a>.

He also authored
most of the <a href="http://www.w3.org/International/articlelist">articles the
W3C has published</a> about internationalization and Unicode. They are a
must-read for everyone only slightly concerned with this topic.

<h3><a href="http://shapecatcher.com/">Shapecatcher</a>: Unicode Character Recognition</h3>

If you don’t know the name of a character but its general shape, you can
search for it on Shapecatcher. Paint the shape in a box, and Shapecatcher will
compare the drawing with about 11,000 characters it has in its database,
presenting you the best matches. This works remarkably well for many character
classes.
