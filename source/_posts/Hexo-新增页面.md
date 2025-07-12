---
title: Hexo-新增页面
date: 2025-06-20 12:03:37
tags: [Hexo, 新增页面]
categories:
   - 前端
   - Hexo
   - 新增页面
---

    hexo new page testPage

跟目录 > source：该文件夹下会生成一个名为“testPage”的文件夹和 index.md

- index.md
``` MD
---
title: testPage
date: 2025-06-20 12:29:56
---
testPage  内容....
```

> Q：如何访问？

A：localhost:4000/testPage/

> Q：要是想在里面添加一些其他的用DOM操作的内容怎么操作？

1. theme/主题文件/layout：在该文加下创建一个模板，比如 page.ejs
2. testPage > index.md 的配置信息处添加 layout: page
    ```md
    ---
    title: testPage
    date: 2025-06-20 12:29:56
    layout: page
    ---
    ```
    - layout：表示该MD文件的模板是谁

    之后的操作就在该 page.ejs 中完成你想要的操作与布局

**需要注意的是**：
1. 一般情况下 page.ejs 是 hexo new page htmlName 创建的页面的默认模版，
    - 自定义的话，theme/主题文件/layout：在该文加下创建一个模板，比如 coustom.ejs
    - 相应的，将 layout 值修改为 coustom 即可
2. 一般情况下，他都是在 <%- body %> 中，不会跳出布局，Emmm，可以理解为刚才的操作是创建了一个组件