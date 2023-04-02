---
date: 2012-07-14T22:15:00
title: "What are Digraphs?"
description: "A powerful way to extend your grasp into Unicode with a combination of ASCII letters"
tags:
  - codepoints academy
---

![a screenshot of a code point detail page pointing to the digraph entry for this code point](img/tumblr_m7683f2XqC1r08iii.png)

Some codepoints show a mysterious line in the “Representations” section
called “digraphs.” What does that code mean? It’s a way to enter this character
with only an easy to memorize set of ASCII letters. Many digraphs are
standardized in [RFC 1345](http://www.faqs.org/rfcs/rfc1345.html),
and you can use this technique in several editors and environments. The
[Wikipedia knows the
details](https://en.wikipedia.org/wiki/Digraph_(computing)).

A single digraph is composed of two (or sometimes more) ASCII characters and
represents uniquely a certain Unicode codepoint. For example, the digraph AE
represents the Unicode codepoint [U+0198 (LATIN CAPITAL LETTER AE):
Æ](https://codepoints.net/U+0198). To distinguish digraphs from regular ASCII
characters some introducing has to occur. In Vim, the famous text editor, the
Ctrl-K sequence starts the digraph entering mode.

You can try digraphs online at [this digraphs demo
page](https://boldewyn.github.io/digraphs/demo.html). In a short time you will
become adicted to the editing power of them.

There is a [Firefox
addon](https://addons.mozilla.org/de/firefox/addon/digraphs/) to enter digraphs
in your favorite browser. It is written by me, but I must admit, that it lacks
several features at the moment. In most environments it works as advertised,
but it isn’t as stable as I wished it to be. If you happen to know some bits
about Firefox addon development, please get in touch. I’d love to hear from you
how to improve the addon.
