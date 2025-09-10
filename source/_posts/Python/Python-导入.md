---
title: Python-导入
date: 2025-09-10 17:12:21
tags: [Python, import, from]
categories:
  - Python 
---

> 查看当前 Python 本地的包

》 搜索：Python 版本 Module Docs
》 点击进入

## 导入方式

    # 格式
    import 包名.模块
    from 包名 import 模块

模块名可以通过 as 设置别名；
通过 import 导入的模块，调用是必须完整的输入，比如，调用某包的`func1函数`

    x = 包名.模块.func1()

注意：**导入的时候会运行该模块**