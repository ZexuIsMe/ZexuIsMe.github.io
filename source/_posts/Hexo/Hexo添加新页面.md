---
title: Hexo 添加新页面
date: 2026-02-03 12:39:00
categories: [技术]
tags: [Hexo, Page]
---

如何在 Hexo 中新开一个页面的操作方法

<!--more-->

1. source目录下创建目标目录，如test
2. 在该目录下创建 index.md
3. 在 index.md 写入
    ```
    ---
    title: Test 标题
    layout: abc
    ---
    ```
4. 前往路径 theme/layout 下创建 abc.ejs
5. abc.ejs 中写入 <div>123</div>
6. 对你的链接标签写入 <a href="<%= url_for('abc')>">Test</a>
7. 保存代码，点击该链接查看是否跳转正常