---
title: Hexo-手册
date: 2025-06-27 23:24:23
tags: [Hexo, 帮助手册]
categories:
  - 帮助手册
---

> EJS 不是那么容易去做动态渲染的，因为它本来就是为静态服务的。

- <code>page.posts</code>：获取当前页的文章信息
- <code>site.posts</code>：获取所有文章信息
- <code>site.tags</code>：获取所有标签信息
- <code>site.tags.sort('name')</code>：将标签按名字排序，升序

<!--more-->

## 如何引入其他模板

```ejs
<%- partial('_partial/目标模板') %>
```

- 如果该模板是 <code>_partial</code> 的子级，那么，可以省略掉 <code>_partial</code>：<code><%- partial('目标模板') %></code>

## 如何实现点击标签筛选出目标标签内容

```ejs
<!-- 这是一个 ejs 模板组件 -->
<% if (!!item.tags?.length) { %>
    <% item.tags.forEach(tagItem => { %>
        <a class="tag is-info is-light" href="<%= url_for(tagItem.path) %>"><%= tagItem.name%></a>
    <% }) %>
<% } else { %>
    <span>--</span>
<% } %>
```

点击A标签后，会自动跳转到 `archive.ejs` 页面中去，在该页面中 `page.posts` 去获取即可获取到对应的文章

**需要注意的是**：
1. 文章的 tag 标签适合做平级管理；什么啥意思？意思是点击某个某标签会把该标签相关的文章都找出来
2. 文章的 categories 分类适合做层级管理，比如 技术》前端》CSS，这样的，然后他会把分类参数一模一样的找出来，如果你的分类是 前端》技术》CSS，那么这就是两篇文章