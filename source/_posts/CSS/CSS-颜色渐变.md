---
title: CSS-颜色渐变
date: 2025-06-25 11:30:06
tags: [CSS, 颜色渐变]
categories:
  - 前端
  - CSS
---

<style>
    .ze-gradient {
        min-width: 300px;
        width: 100%; 
        height: 100px;
        line-height: 100px;
        text-align: center;
        font-size: 24px;
        color: whitesmoke;
        border-radius: 6px;
    }
</style>

## 线性渐变（Linear Gradient）

- 特点：颜色沿直线方向均匀过渡，可自定义角度、起点和终点。
- 示例场景：网页背景、按钮悬停效果。

```css
.el {
    background: linear-gradient(to right, #ff6b6b, #4ecdc4); /* 从左到右，红到青 */
    background: linear-gradient(135deg, #a18cd1, #fbc2eb); /* 135度角渐变 */
    background-image: linear-gradient(to right, red, blue);
}
```

<div class="ze-gradient mb-3" style="background: linear-gradient(to right, #ff6b6b, #4ecdc4);">
    <span>background: linear-gradient(to right, #ff6b6b, #4ecdc4); </span>
</div>

<div class="ze-gradient mb-3" style="background: linear-gradient(135deg, #a18cd1, #fbc2eb);">
    <span>background: linear-gradient(135deg, #a18cd1, #fbc2eb); </span>
</div>

<div class="ze-gradient mb-3" style="background-image: linear-gradient(to right, red, blue);">
    <span>background-image: linear-gradient(to right, red, blue); </span>
</div>


<!--more-->

## 径向渐变（Radial Gradient）

- 特点：颜色从中心向四周辐射扩散，可设置圆心位置和形状。
- 示例场景：APP 启动页、圆形图标背景。

```css
.el {
    background: radial-gradient(circle, #ff9a9e, #fad0c4); /* 圆形径向渐变 */
    background: radial-gradient(ellipse at center, #1b89a2, #0d47a1); /* 椭圆中心渐变 */
}
```

<div class="ze-gradient mb-3" style="background: radial-gradient(circle, #ff9a9e, #fad0c4)">
    <span>background: radial-gradient(circle, #ff9a9e, #fad0c4); </span>
</div>

<div class="ze-gradient mb-3" style="background: radial-gradient(ellipse at center, #1b89a2, #0d47a1);">
    <span>background: radial-gradient(ellipse at center, #1b89a2, #0d47a1); </span>
</div>

## 重复渐变（Repeating Gradient）

- 特点：线性或径向渐变的重复模式，用于创建纹理或图案。
- 示例场景：背景底纹、装饰性边框。

```css
.el{
    background: repeating-linear-gradient(45deg, #f09, #f09 10px, #09f 150px, #09f 20px);
}
```

<div class="ze-gradient mb-3" style="background: repeating-linear-gradient(45deg, #f09, #f09 10px, #09f 150px, #09f 20px);">
    <span>background: repeating-linear-gradient(45deg, #f09, #f09 10px, #09f 150px, #09f 20px); </span>
</div>


### 其他

```css
.el {
    linear-gradient(to right, rgba(255,255,255,0.3), rgba(255,255,255,0)), #3498db; /* 半透明渐变叠加纯色背景，模拟磨砂效果 */
}
```

<div class="ze-gradient mb-3" style="background: linear-gradient(to right, rgba(255,255,255,0.3), rgba(255,255,255,0)), #3498db;">
    <span>background: linear-gradient(to right, rgba(255,255,255,0.3), rgba(255,255,255,0)), #3498db; </span>
</div>