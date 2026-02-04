---
title: Hexo注入数据
date: 2026-02-04 16:00:17
tags: [HEXO, 注入数据]
categories: [HEXO]
---

本文主要介绍如何通过注入的方式拿取服务器数据

<!--more-->

正常来说，Hexo创建的JS无法通过常规手段拿到服务器中数据，比如服务器的 tags 数组信息，请看这段代码

```ejs
<%
    const getItems = function(target) {
        let items = localStorage.getItem(target);
        if (!items) {
            items = site[target].map(item => {
                return {
                    name: item.name,
                    path: item.path
                }
            })
            
            localStorage.setItem(target, JSON.stringify(items));
        } else {
            items = JSON.parse(items);
        }
        
        return items
    }
    <!-- 标签数组 -->
    const tags = getItems('tags');
    <!-- 分类数组 -->
    const categories = getItems('categories');
%>
```

localStorage 是浏览器的 Web API，而 Hexo 在服务器端（Node.js 环境）渲染模板时，localStorage 不存在，会导致控制台报错

方法一：写入到textarea标签中，再获取其内容

     <textarea id="tag-items" readonly style="display: none"><%= tags %></textarea>

```js
const tags = document.getElementById('tag-items').textContent || '[]'
console.log(JSON.parse(tags))
```

方法二：以JSON脚本方式注入，通过ID获取内容即可

    <script id="tag-item" type="application/json"><%= JSON.stringify(tags) %></script>

方法三：推荐此方式

```ejs
<%
    const getItems = function(target) {
            return JSON.stringify(site[target].map(item => {
                return {
                    name: item.name,
                    path: item.path
                }
            }))
        }
%>

<script>
    const tags = JSON.parse(`<%- getItems('tags') %>`)
    console.log('tags', tags)
</script>
```

