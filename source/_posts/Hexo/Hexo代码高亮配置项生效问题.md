---
title: Hexo 代码块高亮生效情况
date: 2026-02-02 22:00:00
categories: 技术
tags: [Hexo, highlight.js]
---

解决 Hexo 代码块高亮异常的问题。

<!--more-->


# Hexo 代码块高亮生效情况

Hexo 自带高亮色块，但是设置后始终无法生效，很是奇怪，解决方案如下

```bash
hexo clean

hexo generate

hexo server
```

原因分析：缓存导致的。

你在下载一个样式表引入即可。

```css
pre code.hljs {
    display: block;
    overflow-x: auto;
    padding: 1em
}

code.hljs {
    padding: 3px 5px
}

.hljs {
    color: #abb2bf;
    background: #282c34
}

.hljs-comment,.hljs-quote {
    color: #5c6370;
    font-style: italic
}

.hljs-doctag,.hljs-formula,.hljs-keyword {
    color: #c678dd
}

.hljs-deletion,.hljs-name,.hljs-section,.hljs-selector-tag,.hljs-subst {
    color: #e06c75
}

.hljs-literal {
    color: #56b6c2
}

.hljs-addition,.hljs-attribute,.hljs-meta .hljs-string,.hljs-regexp,.hljs-string {
    color: #98c379
}

.hljs-attr,.hljs-number,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-pseudo,.hljs-template-variable,.hljs-type,.hljs-variable {
    color: #d19a66
}

.hljs-bullet,.hljs-link,.hljs-meta,.hljs-selector-id,.hljs-symbol,.hljs-title {
    color: #61aeee
}

.hljs-built_in,.hljs-class .hljs-title,.hljs-title.class_ {
    color: #e6c07b
}

.hljs-emphasis {
    font-style: italic
}

.hljs-strong {
    font-weight: 700
}

.hljs-link {
    text-decoration: underline
}
```