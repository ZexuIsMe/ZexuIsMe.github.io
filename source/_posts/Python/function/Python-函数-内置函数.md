---
title: Python-内置函数
date: 2025-09-13 16:23:36
tags: [Python, 内置函数]
categories:
  - Python 
---

## 内置函数：all()

该函数等同于 `and`,即一假全假

```python
## 简单的举个例子
print(all([1, 0, 1])) # False
print(all([1, 1, 1])) # True
```

注意：**空可迭代对象会返回 True**，如空列表`[]`会返回True，可通过 `bool()` 方法解决，

    bool([2, 3]) # True
    bool([]) # False

## 内置函数：any()

该函数等同于 `or`，即一真全真

```python
## 简单的举个例子
print(any([1, 0, 1])) # True
print(any([1, 1, 1])) # True
```
