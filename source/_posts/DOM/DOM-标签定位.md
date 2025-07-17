---
title: DOM-标签定位
date: 2025-06-27 11:16:13
tags: [DOM, A标签定位, 滚动（Scroll）]
categories:
  - 前端
  - DOM
  - 定位
---

利用 <code>a</code> 标签，可快速制作定位

```html
<div
        id="dom-position"
        class="d-flex align-end"
        style="height: 120vh; width: 100%; scroll-behavior: smooth; border: 1px dashed red"
>
    <a href="#dom-position">
        点击试一下吧~
    </a>
</div>
```

- 注意：这样的标签定位，href 需要 #，请务必加上！

<!--more-->

<div id="dom-position" class="d-flex align-end" style="height: 120vh; width: 100%; scroll-behavior: smooth; border: 1px dashed red">
        <a href="#dom-position">
            点击试一下吧~
        </a>
</div>

- 如果 href 不填东西，那么点击后会重新加载页面
- 在这个过程有一个参数是比较重要的 <code>scroll-behavior: smooth</code>：它让定位变得丝滑起来