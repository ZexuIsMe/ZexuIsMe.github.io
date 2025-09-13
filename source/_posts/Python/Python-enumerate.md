---
title: Python-enumerate
date: 2025-09-13 09:43:12
tags: [Python, enumerate, 迭代器函数]
categories:
  - Python
  - 迭代器
---

    # 格式
    enumerate(iterable, start=0)

【参数】`iterable`: 可迭代对象
【参数】`start`：默认从数字0开始；
分配索引时，索引的起始位置;
**只能是`int`，字符串数值类型也不行**;

【返回值】一个可枚举对象，包含索引和对应元素的**元组**：`((index, value), (index, value), ...)`
【适用场景】需要同时返回元素的索引和的值的情景

-----

> 它不会对可迭代对象做任何处理，而是对它们的元素赋予下标

```python
list1 = [1, 2, 3]
x = enumerate(list1)
print(x)
for i in x:
    print(i)
```

打印结果

    <enumerate object at 0x000001BC797F9B20>
    (0, 1)
    (1, 2)
    (2, 3)

> 






