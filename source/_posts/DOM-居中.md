---
title: DOM-居中
date: 2025-06-19 11:48:08
tags: [CSS, 居中]
categories:
  - 前端
  - CSS
  - 居中
---

## 基础型
```css
/* 水平垂直居中 */
.class{
    text-align: center;
    vertical-align: middle;
}
```
- <code>vertical-align</code>：只对表格有效

## Flex
```css
/* 水平垂直居中 */
.d-flex {
    display: flex;
}
.justify-content-center {
    justify-content: center;
}
.align-items-center {
    align-items: center;
}
```

## 定位型
```css
/* 水平垂直居中 */
.class {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```