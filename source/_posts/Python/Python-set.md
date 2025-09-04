---
title: Python-set集合
date: 2025-09-04 10:00:08
tags: [Python, set]
categories:
  - Python
  - 基本数据类型
---

    sites = {'Google', 'Taobao', 'Runoob', 'Facebook', 'Zhihu', 'Baidu'}

集合使用大括号 `{}` 表示，元素之间用逗号隔开。
或使用 `set()` 函数创建集合

> 空集合

正确写法：x = set()

错误写法：x = {} # 这是一个空字典

> 快捷拆分字符串

    x = "string"
    a = set(x)
    print(a) # {'s', 't', 'i', 'g', 'n', 'r'}

## 集合运算

集合运算都**有返回值**且**不会修改原集合**
**集合运算仅使用与集合类型**，不能直接与列表、元组等其他类型运算，除非转集合或拼接成集合
集合中的元素是无序且唯一的，**集合运算结果也会自动去重**

> **差**（ - 或 difference() ）

**第一个集合有，第二个集合却没有的元素，就是差值**

```python
    a = {1, 2, 3, 4}
    b = {3, 4, 5}
    print(a - b)  # 输出：{1, 2}（a中有而b中没有的元素）
    print(b - a)  # 输出：{5}（b中有而a中没有的元素）
    print(a.difference(b))  # 输出：{1, 2}
```

> **交集**（ & 或 intersection() ）

输出两个集合<mark>共同拥有</mark>的元素

```python
    a = {1, 2, 3, 4}
    b = {3, 4, 5, 6}
    print(a & b)  # 输出：{3, 4}
    print(a.intersection(b))  # 输出：{3, 4}
```

> **并集**（ | 或者 union() ）

对两个集合进行合并，如同 str + str，合并时**自动去重**

```python
a = {1, 2, 3}
b = {3, 4, 5}
print(a | b)  # 输出：{1, 2, 3, 4, 5}
print(a.union(b))  # 输出：{1, 2, 3, 4, 5}
```

> **对称差集**（ ^ 或 symmetric_difference() ）

输出<mark>两个集合都不存在的</mark>元素

```python
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}
print(a ^ b)  # 输出：{1, 2, 5, 6}
print(a.symmetric_difference(b))  # 输出：{1, 2, 5, 6}
```

> **集合包含关系判断**

`set_1.issubset(set_2)`：判断 1 是否是 2 的**子集**
即集合1所有的元素在集合2中是不是都能找到 
**集合1和集合2做交集操作，若交集输出结果和<mark>集合1</mark>的元素一模一样，那么集合1就是集合2的子集**

`set_1.issuperset(set_2)`：判断 1 是否是 2 的**超集**
**集合1和集合2做交集操作，若交集输出结果和<mark>集合2</mark>的元素一模一样，那么集合1就是集合2的超集**






