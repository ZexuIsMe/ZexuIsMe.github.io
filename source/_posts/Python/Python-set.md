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








## 方法

> 添加

添加元素到集合，如果元素已存在，则不进行任何操作

    set.add(x)
    # 是随机插入元素，可能在最后一个，也有可能在第一个

另一种添加方式：update，效果同 add 一样，随机插入，若存在同元素则跳过

    set.update(x)

不同的是，update 可以是列表、元组、字典、字符；

如果是字典

    thisset = set(("Google", "Runoob", "Taobao"))
    thisset.update({"name": "123"})
    print(thisset, type(thisset))
    ## 输出结果：{'Taobao', 'Runoob', 'Google', 'name'}

只会取 key 写入

如果是字符，那么也是一样的，只不过会将字符进行拆分，拆分成元组、列表、集合，再塞进去

    thisset = set(("Google", "Runoob", "Taobao"))
    thisset.update("string")
    print(thisset, type(thisset))
    ## 输出结果：
    ## {'t', 'i', 'r', 'Runoob', 'Google', 'n', 's', 'Taobao', 'g'}

> 删除

    set.remove(x)

将元素 x 从集合中移除，如果元素不存在，则会发生错误；

如果元素不存在时，不希望出现错误：discard

    set.discard(x)

随机删除
    
    set.pop()

> 获取长度：len()
> 清空集合：set.clear()



