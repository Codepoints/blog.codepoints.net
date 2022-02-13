---
date: 2013-07-16T06:40:00
title: "Brand-new Unicode REST API"
tags: ["unicode", "rest api", "json", "cors", "github", "http"]
---

This is a buzzword-filled post to say the least. We have just published our
new REST API to Codepoints.net. See the [documentation at the Github
Wiki](https://github.com/Boldewyn/Codepoints.net/wiki/API).

The API features JSON and JSON-P access to codepoints, sample glyphs,
blocks, planes, scripts, and so on as well as transformation and filter
functions for UTF-8 input strings.

A [typical request](https://codepoints.net/api/v1/codepoint/0064) would look
like this:

    GET /api/v1/codepoint/0064
    Host: codepoints.net

with an answer giving you information about “LATIN SMALL LETTER D” to your
heart’s content:

    HTTP/1.1 200 OK
    Date: Wed, 17 Jul 2013 18:21:34 GMT
    Link: <https://codepoints.net/U+0064>; rel=alternate
    Link: <https://codepoints.net/api/v1/block/basic_latin>; rel=up
    Link: <https://codepoints.net/api/v1/codepoint/0065>; rel=next
    Link: <https://codepoints.net/api/v1/codepoint/0063>; rel=prev
    Access-Control-Allow-Origin: *
    Unicode-Version: 6.1.0
    Content-Language: en
    Last-Modified: Mon, 08 Jul 2013 23:21:20 +0200
    Content-Type: application/json; charset=UTF-8

    {

        "cp": "100",
        "age": "1.1",
        "na": "LATIN SMALL LETTER D",
        "na1": "",
        "gc": "Ll",
        "ccc": "0",
        "bc": "L",
        ...
    }

We’d love to hear your feedback! Please comment or hop over to
[Twitter](https://twitter.com/CodepointsNet).
