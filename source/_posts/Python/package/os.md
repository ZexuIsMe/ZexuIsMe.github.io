---
title: os
date: 2025-10-13 16:16:05
tags: [Python, package, os]
categories:
  - Python
  - package
---

`__file__`: （魔法变量）获取当前文件的地址

## os

| 方法          | 描述                                     |
|-------------|----------------------------------------|
| os.sep      | 表示 /                                   |
| os.getcwd() | 获取当前目录，约等于 `os.ptah.dirname(__file__)` |

## os.path

    from os import path

| 方法                       | 描述                             |
|--------------------------|--------------------------------|
| path.dirname(\_\_file__) | 获取当前目录                         |
| path.join()              | 路径拼接                           |
| path.abspath()           | 输出绝对路径，可以利用它来纠正斜杠和相对定位，输出正确的地址 |

```python
from os import path

def get_path(val):
    path_join = os.path.join(os.getcwd(), val)
    return os.path.abspath(path_join)
```

