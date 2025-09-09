---
title: Python-排序
date: 2025-09-09 16:40:11
tags: [Python, 排序, 冒泡]
categories:
  - Python
---

## 冒牌排序

```python
import random
x = [random.randint(1,200) for i in range(30)]
x_len = len(x)

for j in range(0, x_len-1):
    for i in range(0, x_len-1):
        if x[i] > x[i+1]:
            x[i], x[i+1] = x[i+1], x[i]
print(x)
```

## 快速排序

从列表中任选一个元素作为标记
然后将 `<=` 标记的元素都挪到标记左侧，`>` 标记的元素都移动到右侧

```python
import random

x_list = [random.randint(1,200) for i in range(30)]
print(111, x_list)
def func1(x):
    if len(x) <= 1:
        return x

    middle = x[0]

    y_left = []
    y_right = []

    for i in x[1:]:
        if i > middle:
            y_right.append(i)
        else:
            y_left.append(i)

    return func1(y_left)+[middle]+func1(y_right)

print(222, func1(x_list))
```