---
title: Postman-utils
date: 2025-09-28 16:00:18
tags: [软件测试, Postman]
categories:
  - Postman
  - utils
---

## 生成指定长度的字符串

```javascript
function generateRandomString(length) {
    // 定义字符集：数字 + 小写字母 + 大写字母
    const charset = '123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    let result = '';
    
    // 检查输入的长度是否有效
    if (typeof length !== 'number' || length <= 0 || !Number.isInteger(length)) {
        throw new Error('请提供一个正整数作为长度');
    }
    
    // 生成随机字符串
    for (let i = 0; i < length; i++) {
        // 从字符集中随机选择一个字符的索引
        const randomIndex = Math.floor(Math.random() * charset.length);
        // 将选中的字符添加到结果中
        result += charset[randomIndex];
    }
    
    return result;
}
```
