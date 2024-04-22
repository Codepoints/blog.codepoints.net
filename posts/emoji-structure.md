---
date: 2024-04-22
title: "Emojis under the Hood"
description: "Getting those nice little images to appear is sometimes surprisingly tricky."
tags:
  - codepoints academy
---

<figure>
  {% image "img/emoji-structure.jpg", "cogwheels in a machine with one cogwheel looking like a smiling emoji", "960" %}
  <figcaption>
    Photo by <a href="https://unsplash.com/@zoltantasi">Zoltan Tasi</a> on
    <a href="https://unsplash.com/de/fotos/CLJeQCr2F_A">Unsplash</a>, emoji
    from <a href="https://fonts.google.com/noto">Google Noto Font</a>.
  </figcaption>
</figure>

Some love them, some loathe them, but emojis are now indisputably a central
part of the day-to-day communication of billions of people around the world.
Since their [invention in the late 90’s][eevee-history] their number grew
from 176, a set that made it into the [Museum of Modern Arts][moma-emoji], to
far [over 3,700][unicode-count] (as of April 2024).

Their incorporation into the Unicode standard was flanked by more and more
requests to extend their expressiveness and their adaptability, and by
impatient vendors pressing ahead with their own custom emojis.

Today we want to take a look under the hood of the emoji mechanics and identify
the parts that make an emoji an emoji.

## Peculiarities

The details that we look into below will allow us to explain some seemingly
strange occurences when working with emojis. For example, if you’re allowed
only a given amount of characters in a web form, and you enter the “Family:
Woman, Woman, Girl, Boy” emoji 👩‍👩‍👧‍👦, then you’ll likely
notice the counter going down by 7, although it looks like only a single
character was added.

<figure>
  {% image "img/string_length.png", "screenshot of a text input field with a single emoji entered, below the text “Your string is 11 characters long”.", "960" %}
  <figcaption>
    Where are the other 10 characters coming from? Screenshot from codebeautify.org.
  </figcaption>
</figure>

When you then start deleting the emoji again, the counter will go down by one,
while the emoji changes to 👩‍👩‍👧. Another hit on the delete button
keeps the emoji, but the counter still goes down by one.

On the other hand simply pasting the “Family” emoji 👪 doesn’t show any of those
peculiarities. It acts exactly as you’d expect any other character to behave.

Sometimes emojis become monochromous, when you try to delete them. Sometimes
they change to [tofu](./what-is-tofu.html). Let’s look at the mechanics at work
that lead to these behaviours!

## Emojis in Unicode

The technicalities are specified in Unicode’s
[technical report #51][unicode-tr]. This document details, which code points
can act as emojis and under which circumstances. It is accompanied by the
actual data, the [concrete list of emojis][unicode-emoji-data] as defined by
Unicode.

Some code points have special properties that mark them as part of the emoji
world. Those code points and their properties are listed [in a separate
file][unicode-data] of the Unicode data folder.

Finally the <abbr title="Common Locale Data Repository">CLDR</abbr> project
collects a name (and possible aliases) for each emoji in different languages,
e.g. [in English][cldr-annotation]. This data is used by Emoji picker widgets
to let you search for emojis by name.

And to get this out of the way: Yes, you [can propose a new emoji][unicode-propose],
but the bar for inclusion is high, and you will be asked to thoroughly proof
the actual need.

## Anatomy of an Emoji

Let‘s go back to the technical report #51 and the special properties mentioned
above. They are specified in chapter 1.4 and comprise:

* `Emoji`: code points with this property can be an emoji or be part of an emoji
* `Emoji_Presentation`: a single emoji code point can be either a (usually)
    colorful emoji or a monochromous “normal” glyph as default. Code points
    with this property should be rendered as colorful emojis. We will see
    later, how we can switch from one presentation mode to the other.
* `Emoji_Modifier`: a code point, that can change the appearance of another
    emoji preceding it. An example are skin tones.
* `Emoji_Modifier_Base`: an emoji code point, that actually _can_ be modified
    by a preceding emoji modifier.

### Single Code Point Emojis

This knowledge allows us to identify the composition of the most simple emojis,
the emoji characters:

> 1. Code points with the property `Emoji_Presentation` are stand-alone emojis.

What about characters that have the `Emoji` property but not the
`Emoji_Presentation` property? To convert them into an emoji they have to have
the special code point {% cp "fe0f" %} (named “Variation Selector 16”)
appended. This converts them into the colorful representation.

> 2. Code points with the `Emoji` property together with an appended code point
>    {% cp "fe0f" %} are emojis.

Note that not _all_ code points with the `Emoji` property can be converted to
emojis this way. The notable exceptions are the modifiers. Curiously enough,
the digits 0 to 9 however _can_ be [emojified this way][emojipedia-one].

The opposite is possible as well with these emojis. If you add a Variation
Selector 15, {% cp "fe0e" %}, to any of them, they are forced into the
monochromous “normal glyph” mode.

{% image "img/vs.png", "a 2×3 table that shows the rendering of two emojis without any, with U+FE0F and with U+FE0E added. Both are colorful in the second and monochromous in the third row, but differ in the first row.", "(max-width: 512px) 256px, 512px", "lazy", 512 %}

To describe whether a certain string is definitively an emoji or only maybe,
Unicode uses the labels “fully qualified” (yep, definitively rendered as an emoji!),
“unqualified” (nope, surely not rendered as an emoji) and “minimally qualified” (¯\\_(ツ)_/¯
might become an emoji, if you add an U+FE0F).

Great! We know now a good deal about single-code-point emojis! On to the next
step!

### Emoji Sequences

When the interest in and demand for emojis started to take off, a lot of
variations for existing emojis were requested, e.g., changing of skin tone or
gender, more than the original [10 flags][emojipedia-flags], and so on.

Now, instead of creating hundreds of new code points for every possible emoji the
Unicode consortium decided to specify sequences of code points to represent
a single emoji. This is similar to how some diacritics in Unicode work. The
technical term for such a construction is a [grapheme][wp-grapheme].

> For example, if you combine {% cp "0061" %} and {% cp "0308" %} you get an
> _a_ with an umlaut, “ä” (which is the same as {% cp "00E4" %} actually, but
> that is a topic for a different post).

What we’re dealing with, then, are several code points in a row, that will end
up on screen as a single emoji. This is in itself a worthwhile idea, but we will
see that the devil is in the detail here. And a fiendish Beelzebub this is!

#### Flags

Let’s start with a fairly easy one: flags.

Early emoji sets already hard-coded some flags like :jp: Japan and :us: USA.
When it came to encoding the remaining country flags, Unicode had no mind to
deal themselves with the question of what is or isn’t a country. They
outsourced this to the [ISO 3166-1 standard][wp-iso] and created a set of 26
“[regional language indicators](https://codepoints.net/U+1F1E6..U+1F1FF)” that
are used to build a flag emoji from a pair of them.

> 3. Flag emojis consist of two code points from the set
>    [U+1F1E6..U+1F1FF](https://codepoints.net/U+1F1E6..U+1F1FF) that
>    represent an existing ISO 3166-1 country code.

Unless when they aren’t. See, the <del>UK</del>, um, ... I mean <del>GB</del>, or...
the ... Commonw... this entity that encompasses parts of the British Isles had
needs unmet by this definition. And to encode the English, Welsh, and Scottish
flags, Unicode went back to the drawing board and pulled
_another_ set of code points out of their hat.

> 4. Regional flags consist of the Black Flag {% cp "1F3F4" %} and a series of
> [tag characters](https://codepoints.net/tags) finished by {% cp "E007F" %}.

And that’s how to encode emoji flags. Apart from the Transgender flag. Or the
Skull & Crossbone flag. Or the Rainbow flag. Or the Checkered flag. Terence
Eden has a [good overview][edent-flags], if you want to read on on emoji
flags.

#### Zero-Width-Joiners

There are times when you want to combine two emoji concepts to form another
emoji. For example, if you want to represent a woman mechanic :woman_mechanic:,
you could use :woman: and :wrench: somehow. And indeed this is how the emoji
is defined, with the magic codepoint {% cp "200D" %} in between both.

```
U+1F469 + U+200D + U+1F527 = Woman Mechanic emoji
Woman     ZWJ      Wrench
```

U+200D is named the “zero-width joiner” or ZJW for short. It’s original use
case is to force a character into its joining form, even if it stands isolated.
For example, in Arabic “me” is <span lang="ar" dir="rtl">أنا</span>, where the
middle character is <span lang="ar" dir="rtl">ن</span>. Note, that it looks
differently in its isolated form than when it is connected to the left above.

The ZWJ now helps you in tasks like “show how <span lang="ar" dir="rtl">ن</span>
looks like in <span lang="ar" dir="rtl">أنا</span>”. Think e.g. of teaching
books for Arabic. Then append an U+200D to the letter and it combines with...
well, with nothing actually: <span lang="ar" dir="rtl">&#x200d;&#x0646;&#x200d;</span>.
(You might not see a difference here depending on the text layout system your
computer uses.)

> 5. ZWJ sequences are sequences of base emojis joined by a U+200D codepoint.

Families are constructed this way, too. While the “base family” emoji is a
single code point {% cp "1F46A" %}, any combination like “Man, Man, Boy, Girl”
is combined of several separate emojis, each joined with a U+200D:

```
U+1F468 U+200D U+1F468 U+200D U+1F467 U+200D U+1F466 = 👨‍👨‍👧‍👦
Man     ZWJ    Man     ZWJ    ZWJ    Girl    Boy
```

Let’s come back to the intro of this post, where we noticed something strange
when hitting the backspace key at the end of a family emoji. Now we can
explain what happens. The backspace key doesn’t delete the whole emoji. Instead
it deletes only the last code point. This results in the sequence

```
U+1F468 U+200D U+1F468 U+200D U+1F467 = 👨‍👨‍👧
Man     ZWJ    Man     ZWJ    Girl
```

a different emoji, and a trailing U+200D.


#### Modifier Sequences

One modification to emojis is so common, that Unicode introduced another
way of representing it. Skin tones do not need the U+200D glue. They are
directly attached to their base emoji. Under the hood Unicode represents this
feature with the “Emoji Modifier” property mentioned above that is true for
[these five codepoints][cp-search-emod].

> 6. Modifier sequences are base emojis followed by a modifier. They can also
> appear as components in a ZWJ sequence.

To change the skin tone of a base emoji you append the appropriate skin tone
modifier like this:

```
U+1F469 U+1F3FD          = 👩🏽
Woman   Medium Skin Tone   Woman with medium skin tone
```

You can then use such a modified emoji in a more complex ZWJ sequence, too:

```
U+1F469 U+1F3FD          U+200D U+1F9B0  = 👩🏽‍🦰
Woman   Medium Skin Tone ZWJ    Red Hair   Woman with medium skin tone and red hair
```


#### Keycap Sequence

The last type of sequence traces back to the old days of the very first emoji
standard in 2014. It was a kind of ad-hoc lumping together of codepoints to
simulate the keys on a telephone key pad. Emoji versions of them were present
almost from the beginning in the late ’90s in SoftBank’s and KDDI’s emoji sets.

The structure is quite simple: Take a literal digit or one of `*` or `#` and
append a variation selector U+FE0F and {% cp "20E3" %} Combining Enclosing Keycap.
Presto! Emojis.

> 7. Keycap sequences consist of one character from the set `[0-9*#]`, a
> variation selector 16 and a combining enclosing keycap.

That’s more or less all ways emojis can be constructed.


## Non-standard Emojis

I say “more or less”, because sometimes vendors go wild with their own ideas
for new emojis. And while currently all known additions adhere to the types of
sequences defined by Unicode, there is no guarantee that this will stay true
in the future.

The Unicode Consortium acknowledges this fact. It comments its list of emojis
therefore with the label “Recommended for General Interchange” or “RGI”. On
the other hand this makes all emojis not on the list “non-RGI” and thus
possibly not safe to exchange between different platforms or apps.

An example for a non-RGI emoji is [“Woman in Business Suit Levitating, Light
Skin Tone”][emojipedia-woman-suit].
This emoji is currently only supported by Twitter and Facebook and not yet
standardized by Unicode.

Sometimes non-RGI emojis become so widely used that Unicode picks them up in
the official standard. This happened with the [pirate
flag][emojipedia-pirate-flag] emoji :pirate_flag:, introduced by Twitter in
2016 and added to Unicode in 2018.

## Detecting Emojis in Plain Text

In principle we’ve got now a finite list of ways to make emojis. However,
given the possible combinations (like family members), invalid compositions
(like skin tone modifiers on :palm_tree:), instable world politics (that might
change what is or is not a flag emoji) and future extensions, it is all but
trivial to detect emojis in a string of text. Doing this with a regular
expression increases your Javascript code base by [12.5 KB][js-emoji-regex].

{% image "img/emoji_regex.png", "screenshot of a code editor. The text is a very long regular expression on a wrapping line, that doesn’t even fit on the screenshot", "730px" %}

At the end of the day this is, however, often the most reasonable route to
take for arbitrary texts.

If you are the author of the source text, too, it is often better to use
placeholders instead of the actual emojis. Many new chat interfaces, from
WhatsApp to Slack support so-called shortcodes with colons, like `:palm_tree:`,
and map them onto emojis in a second step. These codes are easier to match in
code, and sometimes even easier to write.

## Where Are We Standing Now?

Charlotte Buff gives us a [good overview][buff-emoji-length] how the raw string
lengths are distributed between emojis.

But even now that we know how emojis are created it is [all but
trivial][edent-quiz] to determine the actual composition of a given emoji. In
most cases the best way is to enter it into a [code point analyzer][cp-analyze]
to see what it is actually made of, or to search it in the Emojipedia.

Luckily in most cases it is completely irrelevant what code points make up a
given emoji, exactly as irrelevant in day-to-day communication whether an “ä”
is a {% cp "0061" %}-{% cp "0308" %} combination or a {% cp "00E4" %}.
But if we encounter a strange situation where seemingly unexplicable emoji
phenomenons appear we now have the tools to explain their nature.

To conclude this post, here are again the 6 ways official Unicode emojis can be
structured as handy overview:

| #  | description | example |
| -- | ----------- | ------- |
| 1. | single code points, with or without U+FE0F added | U+1F602 ⇒ 😂; U+262F + U+FE0F ⇒ ☯️ |
| 2. | keycap sequences | “1” + U+FE0F + U+20E3 ⇒ 1️⃣ |
| 3. | modifier sequences | U+1F64B + U+1F3FD ⇒ 🙋🏽 |
| 4. | flag sequences with regional indicators | U+1F1E6 + U+1F1F6 ⇒ 🇦🇶 |
| 5. | flag sequences with tags | U+1F3F4 + U+E0067 + U+E0062 + U+E0077 + U+E006C + U+E0073 + U+E007F ⇒ 🏴󠁧󠁢󠁷󠁬󠁳󠁿 |
| 6. | emoji sequences with zero width joiner | U+1F469 + U+200D + U+1F680 ⇒ 👩‍🚀 |

----

_N.B._ The original Japanese plural of “emoji” is “emoji”, too. However,
according to [the Emojipedia][emojipedia-emojis] the anglicised plural “emojis”
has meanwhile also become OK. 🤓😎

[eevee-history]: https://eev.ee/blog/2016/04/12/apple-did-not-invent-emoji/
[moma-emoji]: https://www.moma.org/collection/works/196070
[unicode-count]: https://unicode.org/emoji/charts/emoji-counts.html
[unicode-tr]: https://www.unicode.org/reports/tr51/
[unicode-data]: https://unicode.org/Public/UCD/latest/ucd/emoji/
[unicode-emoji-data]: https://www.unicode.org/Public/emoji/latest/
[cldr-annotation]: https://github.com/unicode-org/cldr/blob/main/common/annotations/en.xml
[unicode-propose]: http://unicode.org/emoji/proposals.html
[emojipedia-one]: https://emojipedia.org/digit-one
[emojipedia-woman-suit]: https://emojipedia.org/woman-in-suit-levitating-light-skin-tone
[emojipedia-pirate-flag]: https://emojipedia.org/pirate-flag
[wp-iso]: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
[wp-grapheme]: https://en.wikipedia.org/wiki/Grapheme
[emojipedia-emojis]: https://blog.emojipedia.org/emojis-on-the-rise-as-plural/
[emojipedia-flags]: https://blog.emojipedia.org/emoji-flags-explained/
[cp-search-emod]: https://codepoints.net/search?EMod=1
[cp-analyze]: https://codepoints.net/analyze?q=%F0%9F%8F%B4%F3%A0%81%A7%F3%A0%81%A2%F3%A0%81%B7%F3%A0%81%AC%F3%A0%81%B3%F3%A0%81%BF
[js-emoji-regex]: https://github.com/mathiasbynens/emoji-test-regex-pattern/blob/main/dist/emoji-15.1/javascript.txt
[edent-flags]: https://shkspr.mobi/blog/2019/06/quirks-and-limitations-of-emoji-flags/
[edent-quiz]: https://mastodon.social/@Edent/112302999448151018
[buff-emoji-length]: https://charlottebuff.com/unicode/misc/emoji-length/

[cp-search-emoji]: https://codepoints.net/search?Emoji=1
