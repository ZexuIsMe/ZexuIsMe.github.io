---
title: Markdown渲染解析（测试：代码解析）
date: 2025-06-05 09:05:06
tags: [Markdown, 渲染解析]
categories:
  - 前端
  - Markdown
  - 渲染解析
---

## Markdown解析：[showdown.js](https://github.com/showdownjs/showdown)

``` javascript
import Showdown from 'showdown'

const converter = new Showdown.Converter({
  tables: true,
  tasklists: true,
  smoothLivePreview: true,
  emoji: true // see https://github.com/showdownjs/showdown/wiki/Emojis (since v.1.8.0)
})
document.getElementById('markdown-content').innerHTML = converter.makeHtml(`${payload.data}${text}`)
```

<!-- more --> 

## Markdown样式包

[点击此链接前往 GitHub](https://github.com/sindresorhus/github-markdown-css)

```
$ npm install github-markdown-css
```

### 调用

1. 一般情况下：html中使用

```
<link rel="stylesheet" href="github-markdown.css">
```

2. 如果你是 Vue，你可以这样做

``` javascript
# app.js

import 'github-markdown-css'
```

3. 使用

``` html
1) 在最外层的 index.html 设置如下代码：

      .markdown-body {
        box-sizing: border-box;
        min-width: 200px;
        max-width: 980px;
        margin: 0 auto;
        padding: 45px;
      }

      @media (max-width: 767px) {
        .markdown-body {
          padding: 15px;
        }
      }

2) 在需要用到 github-markdown-css 的地方引用 markdown-body

      <div id="showMarkdownContent" class="markdown-body"></div>
```
