---
title: CSS-图片处理
date: 2025-06-25 10:57:14
tags: [DOM，图片处理，图片降低质量]
categories:
  - 前端
  - CSS
---

## Fixed

通过 Fixed 营造视觉差效果，首页效果就是这种

```css
.element {
    background-image: url('your-image.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed; /* 固定背景 */
}
```

## 模糊度

- filter: blur(10px);

如果DOM中存在其他元素，但会一起模糊掉，解决方案如下，这样做结构清晰，便于维护

```html
<div style="position: relative">
    <div id="xxx-bg"></div>
    <div>
        <!-- content -->
    </div>
</div>

<style>
    #xxx-bg {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-image: url('your-image.jpg');
        background-size: cover;
        background-repeat: no-repeat;
        background-attachment: fixed; /* 固定背景 */
        z-index: -1;
    }
</style>
```

- 方案二：伪元素 before

只模糊背景，不模糊元素

```css
.element {
  position: relative;
  min-height: 500px; /* 设置最小高度 */
  overflow: hidden; /* 防止模糊溢出 */
}

.element::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('your-image.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  
  /* 只模糊背景层 */
  filter: blur(8px);
  
  /* 将模糊后的背景向下和向右偏移，填补因模糊导致的边缘空白 */
  transform: scale(1.05);
  z-index: -1; /* 置于内容下方 */
}
```

## 图像质量降低

使用 Canvas 操作达到降低图片质量的目的，大体操作是通过 Canvas 加载图片，之后再转化图片，在这个转化过程中，你可以转成为你想到的图片尺寸，模糊度，等等