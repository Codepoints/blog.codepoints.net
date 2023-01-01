---
layout: base.liquid
eleventyExcludeFromCollections: true
title: Home
permalink: /
---

<h1>Codepoints</h1>

<p>Welcome to the blog about all things characters, letters and Unicode!</p>

<ul>
  {%- for post in collections.post reversed -%}
    {%- if post.data.published -%}
      <li>
        <a href="{{ post.url }}">
          <time>{{ post.data.date.toUTCString | date: "%Y-%m-%d" }}</time>
          <h2>{{ post.data.title }}</h2>
          {%- if post.data.description -%}
            <p>{{ post.data.description }}</p>
          {%- endif -%}
        </a>
      </li>
    {%- endif -%}
  {%- endfor -%}
</ul>
