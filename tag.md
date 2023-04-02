---
layout: tag.njk
eleventyExcludeFromCollections: true
permalink: "tag/{{ tag.name | slugify }}.html"
eleventyComputed:
  title: "{{ tag.name }}"
pagination:
  data: tags
  size: 1
  alias: tag
---

{% if tag.description %}
  <p>{{ tag.description }}</p>
{% endif %}

<ul class="posts">
  {%- for post in collections[tag.tag] reversed -%}
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
