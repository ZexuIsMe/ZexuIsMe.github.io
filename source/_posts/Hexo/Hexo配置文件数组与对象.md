---
title: Hexo配置文件数组与对象
date: 2026-02-05 16:14:32
tags: [Hexo, yaml, Object, Array]
categories: [Hexo]
---

主要描述数组与对象在配置文件中的表现形式

<!--more-->

输出的是一个对象
```yaml
nav:
  home:          # 对象的键
    - text: 首页  # 数组的第一个元素
    - path: /index  # 数组的第二个元素
  archives:      # 对象的键
    - text: 归档  # 数组的第一个元素
    - path: /archives  # 数组的第二个元素
  about:         # 对象的键
    - text: 关于  # 数组的第一个元素
    - path: /about  # 数组的第二个元素
```

输出的是一个数组
```yaml
nav:
    - text: 首页  # 数组的第一个元素
      path: /index  # 数组的第二个元素
    - text: 归档  # 数组的第一个元素
      path: /archives  # 数组的第二个元素
    - text: 关于  # 数组的第一个元素
      path: /about  # 数组的第二个元素
```