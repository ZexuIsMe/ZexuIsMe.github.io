---
title: Python-条件控制
date: 2025-09-04 14:48:36
tags: [Python, 条件控制, if, match...case]
categories:
  - Python 
---

> match ... case

python 没有 switch case，随着版本的升级，追加了新的if语句：

    match 变量:
        case 参数:
            return ""
        case _:
            return ""

默认值以`_`作为参数

一个 case 也可以设置多个匹配条件，使用 `|` 隔开：

    case 401 | 403 | 404:
        return ""

> 使用变量

例子一

```python
def check_status(status):
    error_codes = (400, 404, 500)  # 定义状态码集合
    
    match status:
        # 使用 if 守卫实现 "status 在 error_codes 中" 的判断
        case code if code in error_codes:
            return f"{code} 是错误状态码"
        case 200:
            return "请求成功"
        case _:
            return "其他状态码"

print(check_status(400))  # 输出：400 是错误状态码
print(check_status(200))  # 输出：请求成功
print(check_status(403))  # 输出：其他状态码
```

例子二

```python
def match_example(item):
    match item:
        case (x, y) if x == y:
            print(f"匹配到相等的元组: {item}")
        case (x, y):
            print(f"匹配到元组: {item}")
        case _:
            print("匹配到其他情况")

match_example((1, 1))  # 输出: 匹配到相等的元组: (1, 1)
match_example((1, 2))  # 输出: 匹配到元组: (1, 2)
match_example("other") # 输出: 匹配到其他情况
```

> **Q：`code if code in error_codes`、`(x, y) if x == y` 是什么写法呢？**

是模式匹配中“结构匹配 + 条件过滤”的组合语法，又叫守卫条件，用于精确匹配“符合特定结构且满足内部条件”的数据

----

除此之外， case 根的参数还可以是函数














