---
title: JavaScript-Class类封装
date: 2025-06-27 13:07:01
tags: [JavaScript, 封装, class]
categories:
  - 前端
  - JavaScript
  - 封装
---

- 类的继承，不会继承**静态方法**

```javascript
class Parent {
    constructor() {
        // ...
    }

    static createALink (url) {
        if (!url) {
            console.error('没有链接')
            return
        }
        const aLink = document.createElement('a')
        aLink.href = url
        aLink.target = '_blank';
        aLink.click()
    }
}

class Pagination extends Parent{
    constructor() {
        super();
        // ...
    }

    onclickPage () {
        console.log(this.createALink); // 打印结果为：undefined
    }
}

const pagination = new Pagination();
```
