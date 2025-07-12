---
title: JavaScript-大数字格式化
date: 2025-06-25 14:57:29
tags: [JavaScript, 数字格式化, 异或]
categories:
  - 前端
  - JavaScript
  - 数字格式化
---

数字过长不好理解到具体是多少数值，所以在显示的时候用单位表示是直观的，

此外用逗号分隔的也行，

不过，一般情况下，是根据你面对的对象选择，

假设你面对的对象是一般大众，那么用单位的方式是最直观的，

反之用逗号，因为接触的少，一时间很难反应到该数字到底是多少

```javascript
const handleNumberIndent = damageNumber => {
    // 处理数字的缩进
    if (damageNumber / 1e4 >= 1 && damageNumber / 1e8 < 1) {
        // 伤害在 [万，亿]
        return {
            value: (damageNumber / 1e5).toFixed(2),
            suffix: '万'
        }
    } else if (damageNumber / 1e8 >= 1) {
        // 伤害超过 亿
        return {
            value: (damageNumber / 1e8).toFixed(2),
            suffix: '亿'
        }
    } else {
        return {
            value: damageNumber,
            suffix: ''
        }
    }
}
```

需要注意的是，1e4，表示1万，如果你用 10^4 表示的话，在 JavaScript 中，^符号不是用来表示幂运算的，而是按位异或运算符。

因此，10^4实际上计算的是 10 异或 4，结果为 14，而不是 10 的 4 次方（10000）