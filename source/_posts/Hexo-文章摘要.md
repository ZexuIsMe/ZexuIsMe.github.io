---
title: Hexo-文章摘要
date: 2025-06-08 12:03:37
tags: [Hexo, 文章摘要]
categories:
  - 前端
  - Hexo
  - 文章摘要
---

Hexo 会自动提取文章的前一部分内容作为 excerpt，并保留 HTML 格式


- 操作
``` ejs
<!-- 直接使用内置的 excerpt 属性 -->
<%- item.excerpt %>

<!-- 如果 excerpt 为空，使用 content （但可能会显示全文） -->
<%- item.excerpt || item.content %>
```
**注意**
- Hexo 默认会提取文章的前 140 个字符作为 excerpt，不会截断 HTML 标签，因此格式会保留。
- 如果文章中包含 <!-- more --> 标签，excerpt 会自动截取到该标签为止。


