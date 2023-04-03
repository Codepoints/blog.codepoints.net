---
date: 2023-03-31
title: "What is Tofu?"
description: "Trying to read text and instead seeing only little white boxes where letters should be? There’s a name for this phenomenon."
tags:
  - codepoints academy
---

<figure>
  {% image "img/taylor-kiser-3PHZi-5wKiI-unsplash.jpg", "several blocks of real tofu readily prepared to be cooked", "960" %}
  <figcaption>
    Photo by <a href="https://unsplash.com/@foodfaithfit">Taylor Kiser</a> on
    <a href="https://unsplash.com/de/fotos/3PHZi-5wKiI">Unsplash</a>
  </figcaption>
</figure>


You might know those prevalent white blocks of coagulated soy milk called
_tofu_ from cooking. But did you know that this is also a typographical
technical term?

## Tofu on the screen

When a computer decodes text for display it searches for a glyph from
an installed font for each character. It is possible, though, that
no supporting font is installed on the system for a given character. In this
case the software reaches for a special glyph in the default font [named
`.notdef`][1]. Sometimes this fallback glyph is just a simple white square.

Now, if you want to read text in a language, where the
glyphs are not present on your computer, the display looks something like this:

> □□□□□ □□□□□ □□□□□ □□□ □□□□, □□□□□□□□□□□□ □□□□□□□□□□ □□□□.

This has the appearance of blocks of literal tofu lying next to each other.
In Japan, where the term “tofu” for this phenomenon was initially coined, the
problem was especially rampant. Software being written with only one
character set in mind could easily become unusable when fed with text in a
different encoding, even if it knew how to switch between them. This might not
be too large an issue for a European, when their umlauts are suddenly missing.
But if two completely different writing systems have to battle for the font
stack you easily end up with a whole screen filled only with white boxes.

## The proof of the tofu is in the eating

Today operating systems come with better internationalized base fonts
pre-installed. And to end the phenomenon once and for all an initiative
started by Google and aided by Adobe wants to provide a font for each character
in the Unicode standard, the [Noto font family](https://fonts.google.com/noto).

The name “Noto” is actually [an abbreviation][2] of the font’s aim: “No Tofu”.
Together with [GNU Unifont][unifont] this font family also powers the character
display on codepoints.net almost exclusively.

If you stumble upon tofu nowadays, it is in most cases due to [new
emojis][em-latest] being codified by Unicode, but not being implemented in your
platform’s emoji font. In day-to-day use tofu is luckily becoming less of an
issue than it was in the 90’s.

## Origins

The earliest occurrences of the term “tofu” with the meaning of garbled text are
lost in the mist of time. The Noto Font project [started in 2014][3], and
most search results (including for the Japanese term “豆腐”) date from the
following years. In 2014 it was [added][4] to the Wiktionary and started to
gain widespread attention.

On the Unicode mailing list it [appeared for the first time in 2009][5], while
Chris Lilley mentioned it on a W3C mailing list [as early as May 2000][6]. This
suggests that at this time the term must have been in regular use in Japan for
some time.

The phenomenon itself seems to be known and named at least in 1990, where
according to [this answer][7] Japanese users coined the term “hexagana” for
substitution glyphs that showed the hexadecimal code for an unknown character
instead of a simple empty box.

## How to Cook with Tofu?

Having text unreadable because of missing glyphs is still the lesser of two
evils that regularly happen to electronic text. At least it can be made
readable again by finding and installing a suitable font.

If the content is mangled due to wrongly specified encodings, though, it might
be irreversibly damaged. This phenomenon is called [Mojibake][8]. It appears,
when the changing and/or interpretation of font encoding went wrong. You might
have encountered a strange “Ã¤” instead of an “ä”. Fixing this problem [is
often extremely tedious][9].

But even tofu itself is not all made equal. The Fake Unicode twitter account
[detailed different ways][10] fonts can handle missing glyphs, from terrible
(“show nothing at all”) to actually somewhat useful (“show the hex code of the
unknown character”). If you want to know, whether a brand-new emoji will show
as tofu on Android or iOS, you can consult [Is It Tofu?][isittofu] for an
answer (including a rough percentage of users that will see the emoji).

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
[9]: https://text-mode.tumblr.com/post/31409503070/russian-postmen-fix-an-error-caused-by-an
[10]: https://twitter.com/FakeUnicode/status/1194628388473819137
[em-latest]: https://emojipedia.org/draft-emojis/
[unifont]: https://unifoundry.com/unifont/
[isittofu]: https://tofu.quest/
