---
title: Python-global
date: 2025-09-12 14:05:21
tags: [Python, 全局变量, global]
categories:
  - Python 
---

| 属性名         | 值                                                                                                  |
|-------------|----------------------------------------------------------------------------------------------------|
| name        | main                                                                                               |
| doc         | None                                                                                               |
| package     | None<br/>表示本模块的包，只能在 python -m 包,本模块 这样的运行放下才能有值                                                   |
| loader      | 表示本模块如何被 Python 加载。<br/><_frozen_importlib_external.SourceFileLoader object at 0x000002090589A190> |
| spec        | None                                                                                               |
| annotations | {}                                                                                                 |
| builtins    | <module 'builtins' (built-in)><br/>                                                                |
| file        | D:\py_work\pythonProject\pythonProject1\Day5\kuozhan.py                                            |
| cached      | None                                                                                               |
| del         | 删除变量或方法                                                                                            |
| ...         | ...                                                                                                |

> `__name__`

该条件判断表示，只有本模块自行运行时才执行以下语句

    if __name__ == "__main__":
        print("模块运行了")

何为自行运行？非调用导入等操作，是直接运行文件本身的时候

    print(__name__)

如果是直接运行，其打印结果为：`__main__`；
通过导入的方式引入，其打印结果为文件的名字

> `__file__`：当前文件的绝对路径

```python
import os

p = os.path.dirname(__file__)
# os 包中的path模块中的dirname函数，作用是返回 File 文件所在的目录
```

> `__doc__`

在当前py文件顶部用注释书写，它的值就是这些注释内容

    1 """作者：xxx"""
    2 
    3 print(globals().get("__doc__"))
    4 # 打印结果：作者：xxx

> `__builtins__`

表示本模块内置加载的其他模块，默认固定 builtins ，表示自动加载的模块名为 builtins；
各种常用的数据类型、异常类型、各种函数都定义在这个模块中；
除了`builtins`模块外，其他的模块要使用，都必须手动通过 `import` 或 `from import` 导入；

## 根基类（object）

特点：
名字以双下划线开头，以双下划线结尾，如：`__name__`








