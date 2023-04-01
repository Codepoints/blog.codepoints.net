---
date: 2023-03-31
title: "What is Tofu?"
published: false
tags:
  - codepoints academy
---

You might know those pervasive white blocks of coagulated soy milk called
“tofu“ from cooking. But did you know that this is also a typographical
technical term?

## Tofu on the screen

When a computer decodes text for display it needs to decide on a glyph from
a font to show for each character. It might well be, however, that for a given
character no font is installed on the system. In this case the software reaches
for a special glyph in the default font [named `.notdef`][1]. Twenty years ago
this fallback glyph was often a simple square.

The effect of this implementation was, though, that if you wanted to read text in
a language, where the glyphs were not present on your computer, the display
looked something like this:

> □□□□□ □□□□□ □□□□□ □□□ □□□□, □□□□□□□□□□□□ □□□□□□□□□□ □□□□.

This has the appearance of blocks of literal tofu lying next to each other.
In Japan, where the term “tofu” for this phenomenon was finally coined, the
problem was especially rampant. If you happened to have a PC without any
East-Asian fonts installed, all text in your native language could suddenly be
“tofu”.

## The proof of the tofu is in the eating

Luckily the amount of tofu is going steadily down for all users. (At least the
typographic tofu, that is.) This is due to better internationalized base fonts
in stock OS installations and in particular due to an initiative started by
Google and aided by Adobe that wants to provide a font for each character in
the Unicode standard, the [Noto font family](https://fonts.google.com/noto).

The name “Noto” is actually [an abbreviation][2] of the font’s aim: “No Tofu”.
Together with GNU Unifont this font family also powers the character display
on codepoints.net almost exclusively.

## Origins

I wasn’t successful in unearthing the first occurences of the term “tofu” with
the meaning of garbled text. The Noto Font project [started in 2014][3], and
most search results (including for the Japanese term “豆腐”) date from the
following years. In 2014 it was [added][4] to the Wiktionary.

On the Unicode mailing list it [appeared for the first time in 2009][5], while
Chris Lilley mentioned it on a W3C mailing list [as early as May 2000][6]. This
suggests that at this time the term must have been in regular use in Japan for
some time.

The phenomenon itself seems to be known and named at least in 1990, where
according to [this answer][7] Japanese users coined the term “hexagana” for
substitution glyphs that showed the hexadecimal code for an unknown character
instead of a simple empty box.

## At Least Not Mojibake

While having text unreadable because of missing glyphs this is still the lesser
of two evils. At least it can be made readable simply by finding and installing
a suitable font.

If the content is mangled due to wrongly specified encodings, though, it might
be unsavably lost. This phenomenon is called [Mojibake][8].

But even tofu itself is not all made equal. The Fake Unicode twitter account
[detailed different ways][9] fonts can handle missing glyphs, from terrible
(“show nothing at all”) to actually somewhat useful (“show the hex code of the
unknown character”).

So, all is not lost, if you encounter these blocks again in the future. And to
make use of them even if they are illegible on your system, try pasting them
in the [codepoints.net search field](https://codepoints.net/search) to find
out, what your tofu is actually made of.

[1]: https://learn.microsoft.com/de-de/typography/opentype/spec/recom#glyph-0-the-notdef-glyph
[2]: https://en.wikipedia.org/wiki/Noto_fonts#Etymology
[3]: https://lwn.net/Articles/613284/
[4]: https://en.wiktionary.org/w/index.php?title=%E8%B1%86%E8%85%90&oldid=25190670
[5]: http://www.unicode.org/mail-arch/unicode-ml/y2009-m03/0102.html
[6]: https://lists.w3.org/Archives/Public/www-svg/2000May/0102.html
[7]: https://english.stackexchange.com/a/352613/18098
[8]: https://en.wikipedia.org/wiki/Mojibake
[9]: https://twitter.com/FakeUnicode/status/1194628388473819137
