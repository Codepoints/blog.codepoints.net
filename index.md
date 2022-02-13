---
layout: base.liquid
eleventyExcludeFromCollections: true
title: Home
permalink: /
---

<ul>
  {%- for post in collections.post reversed -%}
    {%- if post.data.published -%}
      <li><a href="{{ post.url }}">{{ post.data.date | date: "%Y-%m-%d" }}: {{ post.data.title }}</a></li>
    {%- endif -%}
  {%- endfor -%}
</ul>
