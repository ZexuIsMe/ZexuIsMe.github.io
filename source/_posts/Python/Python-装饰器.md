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