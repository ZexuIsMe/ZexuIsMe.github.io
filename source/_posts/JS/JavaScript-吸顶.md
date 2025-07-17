---
title: JavaScript-吸顶
date: 2025-06-19 17:26:46
tags: [JavaScript, 吸顶, 滚动（Scroll）]
categories:
  - 前端
  - JavaScript
---

```css
.fixed-header {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    transition: transform 0.3s linear, opacity 0.3s linear; /* 线性过渡 */
}

.fixed-header-hidden {
    transform: translateY(-100%);
    opacity: 0;
}
```

<!-- more -->

```javascript
// 导航栏吸顶功能实现
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.fixed-header');
    let lastScrollTop = 0;
    const threshold = 50; // 滚动阈值，越小越敏感

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // 页面顶部始终显示
        if (scrollTop <= threshold) {
            navbar.classList.remove('fixed-header-hidden');
        }
        // 向下滚动且超过阈值
        else if (scrollTop > lastScrollTop && scrollTop > threshold) {
            navbar.classList.add('fixed-header-hidden');
        }
        // 向上滚动
        else {
            navbar.classList.remove('fixed-header-hidden');
        }

        lastScrollTop = scrollTop;
    });
});
```

> Q：为什么不使用sticky？

A: 因为sticky的行为受限于父元素，不够灵活
 
 
