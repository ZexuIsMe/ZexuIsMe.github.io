---
title: Python-装饰器
date: 2025-09-10 13:59:42
tags: [Python, 装饰器]
categories:
  - Python 
---

```python
def func_1(f):
    print(111)
    return f

@func_1
def func_2():
    print(222)
    
func_2()
## 111
## 222
```

## 装饰器带参数

```python
def func_1(name):
    def aaa (func):
        def bbb(*args, **keargs):
            print("name")
            x=func(*args, **keargs)
        return x
    return bbb
return aaa

@func_1(name="ccc")
def ccc(x, y):
    return x+y
```








