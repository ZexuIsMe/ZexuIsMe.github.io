---
title: Python-字符串
date: 2025-09-04 09:07:15
tags: [Python, 字符串]
categories:
  - Python
  - 数据类型
---

基础信息翻阅：Python-基本语法

> 将字符串从第2个字符开始到倒数第2个字符顺序翻转

```python
x = "string"
x_start = x[0:2]
x_end = x[-2:]
x_middle = x[2:-2][::-1]

print(x_start + x_middle + x_start)
```

    x[2:-2][::-1]
    或
    x[-2:2:-1]


```python
x = "string"
x_list=[]

for item in x:
    print(item)
    x_list.append(item)

x_middle=x_list.copy()[2:-1]
x_middle.reverse()

y=""
for item in x_list[0:2]+x_middle+x_list[-2:]:
    y+=item
print('y', y)
```

## 字符串拼接

> list 拼接：`"".join(str)`

```python
x = ['I', 'have', 'a', 'pen']
"".join(x)
## 按空格对元素进行拼接
```








