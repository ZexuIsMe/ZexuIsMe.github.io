---
title: CSS-过渡效果和动画效果
date: 2025-07-05 15:31:36
tags: [过渡（transition）, 动画（animation）]
categories:
  - 前端
  - 康复训练计划表
  - 过渡效果和动画效果
---

> Q：如何解决CSS兼容方面的问题

- 通过添加对应厂家前缀的方式：`--webkit-transition`
- 特性检测：使用`Modernizr ` 或 `@supports` 检测是否支持
- 根据提供的浏览器和浏览器版本选择实现技术

## 关于时间

Q：他们分别是什么意思呢？
- `transition: 1s .5s`
- `transition: .5s 1s`
- `transition: 1s -.5s`
- `transition: -.5s 1s`