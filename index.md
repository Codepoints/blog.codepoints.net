---
layout: index.njk
eleventyExcludeFromCollections: true
title: Codepoints
description: "The blog about all things characters, letters and Unicode"
permalink: /
---

Welcome to the blog about all things characters, letters and Unicode!

<ul class="posts">
  {%- for post in collections.post reversed -%}
    {%- if post.data.published or env.ENV == 'development' -%}
      <li>
        <a href="{{ post.url }}">
          <time>{{ post.page.date | date: "%Y-%m-%d" }}</time>
          <h2>{{ post.data.title }}</h2>
          {%- if post.data.description -%}
            <p>{{ post.data.description }}</p>
          {%- endif -%}
        </a>
      </li>
    {%- endif -%}
  {%- endfor -%}
</ul>
