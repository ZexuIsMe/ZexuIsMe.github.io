---
title: Hexo 创建主题配置文件
date: 2026-02-02 23:00:00
categories: 技术
tags: Hexo, 主题配置
---


# 创建主题配置文件

## 1. 为什么需要主题配置文件

为主题创建独立的配置文件有以下优势：
- **模块化设计**：主题配置和站点配置分离，结构清晰
- **易于维护**：主题开发者提供默认配置，用户按需覆盖
- **可移植性**：配置随主题一起分发，方便用户使用
- **灵活性高**：用户可以在不修改主题文件的情况下自定义行为

## 2. 创建主题配置文件

在 `themes/pixel-theme/` 目录下创建 `_config.yml` 文件，添加如下内容，内容是自定义的，并不是 Hexo 默认的配置项：

```yaml
# Pixel Theme Configuration

# Writing Settings
excerpt_depth: 5  # 自动摘要的标题层级
auto_excerpt:
  enable: true    # 启用自动摘要
  length: 150     # 自动摘要的长度（字符数）

# Article Display
article:
  show_excerpt: true  # 在首页显示文章摘要
  show_date: true     # 显示文章日期
  show_categories: true  # 显示文章分类
  show_tags: true      # 显示文章标签

# Navigation
nav:
  home: 首页
  articles: 文章
  about: 关于

# Comments
comments:
  disqus_shortname:  # Disqus 评论系统短名称
  enable: false      # 是否启用评论功能
```


## 3. 在模板中使用主题配置

在 EJS 模板中，你可以通过 `theme` 对象访问这些配置：

```ejs
<!-- 检查是否启用自动摘要 -->
<% if (theme.auto_excerpt.enable) { %>
    <p class="mb-4"><%= post.excerpt %></p>
<% } %>

<!-- 使用配置的摘要长度 -->
<p class="mb-4">
    <%= post.excerpt.length > theme.auto_excerpt.length 
        ? post.excerpt.substring(0, theme.auto_excerpt.length) + '...' 
        : post.excerpt %>
</p>
```

## 4. 用户覆盖主题配置

如果用户想要覆盖主题的默认配置，可以在站点根目录的 `_config.yml` 中添加 `theme_config` 部分：

```yaml
# 站点根目录的 _config.yml
theme_config:
  auto_excerpt:
    enable: false
    length: 200
  article:
    show_excerpt: true
```
