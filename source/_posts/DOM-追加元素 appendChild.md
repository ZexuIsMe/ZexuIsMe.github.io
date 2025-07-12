---
title: DOM-追加元素 appendChild
date: 2025-06-19 11:40:28
tags: [DOM, 元素追加（appendChild）]
categories:
  - 前端
  - DOM
---

使用 innerHtml 追加元素，很好使，但是又不那么好使，

> Q：为什么？

A：innerHtml 会破坏页面的正常运作，比如通过 addEventListener 绑定了一个点击事件，当对该DOM所在位置进行处理后，会发现DOM结构发生变化，点击事件不在生效了

有时追加的DOM元素是以字符串的形式出现的，比如
```javascript
const tempFunc = function (obj) {
    return `
        <label for="${obj.eg}">
            <span>${obj.name}</span>
            <input type="${obj.inputType}" name="${obj.eg}" id="${obj.eg}" value="${obj.defaultValue}"/>
        </label>`
}
```
接着使用 appendChild 进行元素的追加，控制台报错，appendChild 的参数必须是一个 Node。

<!--more-->

> Q：appendChild 的参数必须是一个 Node，该如何解决呢？

```javascript
function stringToNode(html) {
    const fragment = document.createDocumentFragment();
    const temp = document.createElement('div');
    temp.innerHTML = html;

    // 将temp的子节点移到fragment中
    while (temp.firstChild) {
        fragment.appendChild(temp.firstChild);
    }
    return fragment;
}

DOM.appendChild(stringToNode('<div>123</div>'))
```

## 插队：插入到当前元素的前面

```javascript
// 找到.content类下的table元素
const tables = document.querySelectorAll('.content>table');
tables.forEach(table => {
    // 创建新的div元素
        const wrapperDiv = document.createElement('div');
    // 1. 为div添加类名以便样式设置
        wrapperDiv.className = 'table-wrapper';
    // 2. 将div添加到 table 标签的前面
        table.parentNode.insertBefore(wrapperDiv, table);
    // 3. 将table插入到div中，appendChild 将 table 挪窝到 div 中
        wrapperDiv.appendChild(table);
    // 4. 2 和 3 的代码顺序不能乱，
    // 否则会导致table.parentNode操作出问题：
    // Failed to execute 'appendChild' on 'Node': parameter 1 is not of type 'Node'.
    // 原因是 table 已经不见了，在这个没有添加到页面的 DOM 上
})
```


