---
title: JavaScript-元素查找（querySelector）
date: 2025-06-29 16:03:09
tags: [JavaScript, 元素查找（querySelector）]
categories:
  - 前端
  - JavaScript
---

总是通过 id，className, tagName 去操作太麻烦，于是有一个合并在一起的方法 `querySelector`

怎么用？

```html
<i class="video-player v-pointer fas fa-play text-white"></i>
```

```javascript
console.log(document.querySelector('i'))
```

做**模糊类**的精确查找，你需要注意**空格**别乱打，空格和CSS样式表中一样，表示后代元素

举个例子 `document.querySelector('i .fas .fa-play')`

它在执行的时候要寻找的目标是

- i
  - .fas
    - fa-play 
  
是这样的一个层级关系，

所以，如果你想要找模糊精确查找 i 标签同时具有 fas 和 fa-play 的元素，你需要 `document.querySelector('i.fas.fa-play')` 这样做。

## 某标签下所有元素

```javascript
document.addEventListener('DOMContentLoaded', function() {
    // 找到.content类下的所有table元素
    const tables = document.querySelectorAll('.content>table');

    // 遍历所有找到的table元素
    tables.forEach(table => {
        // 为每个table元素添加.test类
        // table.className = 'table is-striped'
    });
});

```
- .content>table 表示找出 content这个类下的table子元素
- .content table 表示找出 content这个类下的所有table子元素

## 题外操作

Q：如何实现向上找父级，直到根元素都没有就返回 null

```javascript
let findRecord = 0
const findParentBySelector = (element, selector) => {
    const parent = element.parentElement
    if (!parent || findRecord >= 10) return null;
    if (parent.matches(selector)) return parent;
    findRecord += 1;
    return this.findParentBySelector(parent, selector);
}
```
- element：你的起始位置的DOM
- selector：你要找的父级
- matches：用于检查元素是否与指定的 CSS 选择器匹配。在向上查找父级元素时，结合 matches() 可以灵活地根据选择器条件来定位目标元素。
  ```Javascript
  const div = document.getElementById('container');
  
  div.matches('.box');      // true（匹配类名）
  div.matches('#container'); // true（匹配 ID）
  div.matches('div');       // true（匹配标签名）
  div.matches('div.box');   // true（匹配组合选择器）
  div.matches('span');      // false（不匹配标签名）
  ```