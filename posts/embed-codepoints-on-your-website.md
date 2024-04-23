---
date: 2013-01-09T22:28:02
title: "Embed Codepoints on Your Website"
description: "Now you can use the information of codepoints.net to enhance your own articles."
image:
  src: "img/ryoji-iwata-5siQcvSxCP8-unsplash.jpg"
  alt: "hand hovering over a puzzle game, holding a red puzzle piece"
tags:
  - machine room
---

<figure>
  {% image "img/ryoji-iwata-5siQcvSxCP8-unsplash.jpg", "hand hovering over a puzzle game, holding a red puzzle piece", "960" %}
  <figcaption>
    Photo by <a href="https://unsplash.com/de/@ryoji__iwata">Ryoji Iwata</a> on
    <a href="https://unsplash.com/de/fotos/person-holding-red-jigsaw-puzzle-5siQcvSxCP8">Unsplash</a>
  </figcaption>
</figure>

We offer now a new service: Embed codepoints on your website. It’s quite
simple: Just search for the codepoint you want, add `?embed` to its
URL and put all this in an HTML iframe element:

    <iframe src="https://codepoints.net/U+0067?embed"
            style="width: 100px; height: 100px;">
    </iframe>

The result is responsive, that means, it adapts itself automatically to fit the
size you need it. From a small 24x24px icon to a full-sized info box, the HTML
is the same. Some selected sizes:

<div style="color: #bbb">
200x26px:<br/><iframe src="https://codepoints.net/U+0067?embed" style="border:1px solid;width:200px;height:26px"></iframe><br/>
500x26px:<br/><iframe src="https://codepoints.net/U+0067?embed" style="border:1px solid;width:500px;height:26px"></iframe><br/>
25x40px:<br/><iframe src="https://codepoints.net/U+0067?embed" style="border:1px solid;width:26px;height:40px"></iframe><br/>
200x65px:<br/><iframe src="https://codepoints.net/U+0067?embed" style="border:1px solid;width:200px;height:65px"></iframe><br/>
400x450px:<br/><iframe src="https://codepoints.net/U+0067?embed" style="border:1px solid;width:400px;height:450px"></iframe><br/>
500x600px:<br/><iframe src="https://codepoints.net/U+0067?embed" style="border:1px solid;width:500px;height:600px"></iframe>
</div>
