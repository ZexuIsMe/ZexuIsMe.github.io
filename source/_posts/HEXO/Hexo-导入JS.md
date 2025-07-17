---
title: Hexo-导入JS
date: 2025-06-19 09:28:37
tags: [Javascript]
---

## ES6
在 package.json 中添加
``` json
{
  "type": "module"
}
```

导入JS
```javascript
import "路径.js"
```

载入JS
```html
<script type="module" src="/js/目标.js"></script>
```