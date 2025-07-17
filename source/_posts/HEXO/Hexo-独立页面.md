---
title: Hexo-独立页面
date: 2025-06-29 09:59:52
tags: [Hexo, 独立页面]
categories:
  - 前端
  - Hexo
  - 独立页面
---

如果你想在Hexo中创建一个完全独立的，不需要它帮你处理的页面，那么你可以尝试 `skip_render`。

之前添加一个页面需要用到 `hexo new page xxx` 创建一个目标页面，

> skip_render: 'targetPage\*'  表示渲染时忽略掉 targetPage 页面下所有内容，以实现完全自定义操作
> 同样的，也适用于文章

```yaml
# 多个情况
skip_render:
  - "assets/js/*"
  - "assets/css/*"
  - "docs/**/*"
```

```bash
hexo new Page targetPage
```

- 修改该文件下的 index.md

```markdown
---
title: 周末旅行
date: 2023-01-01
layout: false
categories:
  - life
---
{% raw %}

<html lang="">
<!-- Head tag -->
<!DOCTYPE html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>xxx | 粥记捣蛋</title>
</head>

<body>11111</body>

</html>

{% endraw %}
```

需要注意的是 `{ % raw % }` 和 `{ % endraw % }` 之间的代码是必须的，

> Q：那么如何访问呢？

A：localhost://targetPage/

> Q: 这样一来自定义页面就没有页面导航栏了啊！

A：将 `layout: false` 更改为 `theme/your-theme/layout` 下模板即可。

假设你填写的是 `layout: life`，那么输入 localhost:4000/life/ 即可访问，

这样，避免了完全渲染，也同样保证了自定义渲染内容的输出