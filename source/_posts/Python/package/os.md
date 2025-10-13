---
title: os
date: 2025-10-13 16:16:05
tags: [Python, package, os]
categories:
  - Python
  - package
---

`__file__`: （魔法变量）获取当前文件的地址
`os.path.dirname(__file__)`: 获取父级目录路径
`os.sep`: 表示 /
`os.path.join(file_path, "路径")`：路径拼接
`os.path.abspath()`: 输出绝对路径，可以利用它来纠正斜杠和相对定位，输出正确的地址

```python
from os import path

parent_dir = path.dirname(__file__)
target_path = path.abspath(parent_dir, "../abc.log")

```
