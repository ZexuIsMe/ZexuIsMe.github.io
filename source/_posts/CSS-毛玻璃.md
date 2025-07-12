---
title: 毛玻璃
date: 2025-06-26 12:59:51
tags: [CSS, 毛玻璃效果]
categories:
  - 前端
  - CSS
---

<style>
    .el-mbl {
        backdrop-filter: blur(10px);
        background-color: transparent;
        position: absolute;
        top:50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 400px;
        height: 200px;
        color: white;
    }
</style>

<div id="css-mbl" class="text-center" style="position: relative; width: 100%; height: 300px;">
    <div class="el-mbl d-flex align-center justify-center">
        backdrop-filter: blur(10px);
        <br />
        background-color: transparent;
    </div>
    <img src="https://picsum.photos/600/300" alt="演示图片" style="width: 600px; height: 300px" class="skeleton"/>
</div>

> backdrop: blur(10px)

```css
    .el-mbl {
        backdrop-filter: blur(10px);
        background-color: transparent;
        position: absolute;
        top:50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 400px;
        height: 200px;
        color: white;
    }
```

<!--more-->

```html
<div class="text-center" style="position: relative; width: 100%; height: 300px">
    <div class=".el-mbl">
        backdrop-filter: blur(10px);
        <br />
        background-color: transparent;
    </div>
    <img src="https://picsum.photos/600/300" alt="演示图片" />
</div>

<style>
    .mbl {
        backdrop-filter: blur(10px);
        background-color: transparent;
        position: absolute;
        top:50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 400px;
        height: 200px;
        color: white;
    }
</style>

需要注意的是：backdrop-filter 如果遇到 opacity: 1, 需要 opacity 参数小于1，才能看到效果

```