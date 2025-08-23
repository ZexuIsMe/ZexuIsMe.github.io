---
title: Ejs-模版渲染绑定事件
date: 2025-06-22 00:02:13
tags: [EJS, 绑定事件, 函数传参]
categories:
  - 前端
  - Ejs
---

```ejs
<% page.form.forEach(item => { %>
    <!-- 不推荐 -->
    <div id="ccc"><%= item.title %></div>
    <!-- 推荐 -->
    <div onclick="onclickTest()"><%= item.title %></div>
<% }) %>

<script>
    // 不推荐
    document.getElementById('ccc').addEventListener('click', () => {
        console.log(123)
    })
    // 推荐
    const onclickTest = () => {
        console.log(123)
    }
</script>
```

- 如果你想把EJS模版中的参数传递到函数中去，那么你需要添加反引号<code>``</code>把他们包裹起来
  - xxxFunc(`${ tags[0].path }`)
  - xxxFunc(`<%= url_for(tags[0].path)  %>`)
- 如果你要传递的参数是对象，那么需要将参数取出来重新组合为一个新的参数，或者 `JSON.stringify()` 转换

如论是哪一种，都是把参数暴露在外的，所以纯静态页面可以用用，

