---
title: CSS-骨架
date: 2025-06-27 09:35:21
tags: [CSS, 骨架（skeleton）, 加载效果（loading）]
categories:
  - 前端
  - CSS
---

<style>
    @keyframes css-skeleton-loading {
        0% {
            background-position-x: 100% ;
        }
        100% {
            background-position-x: -100% ;
        }
    }

    @keyframes css-skeleton-loading-2 {
        0% {
            background-position-x: 100% ;
        }
        100% {
            background-position-x: -50% ;
        }
    }
    .css-skeleton, .css-skeleton-2 {
        height: 100%;
        width: 100%;
        margin-bottom: 10px;
        border-radius: 5px;
        background-image: linear-gradient(to right, whitesmoke, #8a7f7f, #e38484);
        background-size: 200%;
        background-position-x: 0 ;
    }
    .css-skeleton {
        animation: css-skeleton-loading 1.5s linear infinite;
    }
    .css-skeleton-2 {
        animation: css-skeleton-loading-2 1.5s linear infinite;
    }
</style>

> 实现一个简单骨架效果

<div style="width: 100%; height: 200px" class="my-8">
    <div class="css-skeleton"></div>
</div>

<!--more-->

```html

<div class="skeleton"></div>

<style>
    @keyframes skeleton-loading {
        0% {
            background-position-x: 100%;
        }
        100% {
            background-position-x: -100%;
        }
    }

    .skeleton {
        height: 100%;
        width: 100%;
        margin-bottom: 10px;
        border-radius: 5px;
        background-image: linear-gradient(to right, whitesmoke, #8a7f7f, #e38484);
        background-size: 200%;
        background-position-x: 0;
        animation: skeleton-loading 1.5s linear infinite;
    }
</style>
```

<div style="width: 100%; height: 200px" class="my-8">
    <div class="css-skeleton"></div>
</div>

**你需要留意的是**
- <code>background-size: 200%;</code>
  - 如果**不是做精确控制，那么它的参数设置为 200%**，是最妥帖的。
  - 你或许可以尝试将参数设置为 100%，你就会发现端倪
- <code>background-position</code>
  - 它的工作逻辑为：实际位置 = (元素尺寸 - 背景图片尺寸) × 百分比
- 如果是做精确控制，那么位置参数需要和DOM大小一致
  - 比如我有一个解析后宽度为1312px的DOM需要从左往右的移动效果，
  - 那么 background-position 的需要像这样设置
```css
@keyframes skeleton-loading {
  0% {
      background-position-x: -1312px ;
  }
  100% {
      background-position-x: 1312px ;
  }
}
```

- 当参数不是完整的倍数时，会出现移动闪烁，比如我将参数设置100%时的动画效果设置为50%
  - 那么动画会将背景渐变推动到一半的时候就重新循环了

<div style="width: 100%; height: 200px" class="my-8">
    <div class="css-skeleton-2 d-flex justify-center align-center">
        <span style="background-color: transparent; font-family: cursive;line-height: 2; font-size: 16px">
100% {
    background-position-x: -50% ;
}
        </span>
    </div>
</div>