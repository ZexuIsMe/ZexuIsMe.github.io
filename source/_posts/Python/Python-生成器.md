---
title: Python-生成器
date: 2025-09-10 14:46:58
tags: [Python, 生成器]
categories:
  - Python
---

> \[int(num) for num in "1 2 3".split(" ")]

```python
x_list = [int(num) for num in "1 2 3".split(" ")]
print(x_list) # [1, 2, 3]

## 等价于

j = []
for num in "1 2 3".split(" "):
    j.append(int(num))
print(j)
```