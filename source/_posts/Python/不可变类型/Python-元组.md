---
title: Python-元组（tuple）
date: 2025-09-07 21:04:31
tags: [Python, 元组, tuple, 基本数据类型]
categories:
  - Python
  - 数据类型 
---

与字符串一样，**<mark>元组</mark>通过下标修改元素是非法的，除非该元素是引用数据类型**
是 iterable 可迭代对象，**支持切片**；

**若元组只有参数，需要在屁股后面添加一个逗号**，表示这是一个元组：`(20,)`
**只读数据类型**
**元组的访问速度比列表更快**，因为元组的不可变性，让元组天生比列表少了很多代码，**少即是快**

<!--more-->

方法：
count: 同 list.count
index: 同 list.index

> 元组，特别的引用数据类型

若元组内<mark>不存在</mark>引用数据类型，且存在相同的元组，那么它的存储地址是<mark>一样</mark>的

    x = (1, 2, 3)
    y = (1, 2, 3)
    print(id(x), id(y))
    # 2239728983744 2239728983744

若元组内<mark>存在</mark>引用数据类型，且存在相同的元组，那么它的存储地址是<mark>不一样</mark>的

    x = (1, [2, 3])
    y = (1, [2, 3])
    print(id(x), id(y))
    # 2510646136448 2510646136384

这里的代码涉及到<mark>深拷贝</mark>与<mark>浅拷贝</mark>相关知识

> 元组遇到乘法：翻倍输出

    x = (1, 2, 3)
    print(x * 2) # (1, 2, 3, 1, 2, 3)
    print(2 * x) # (1, 2, 3, 1, 2, 3)
    print(*x) # 1 2 3
    print(x*) # 非法输出
    print(**x) # 非法输出
    print(2**x) # 非法输出

注意：`print(*x)` 仅用于输出，不能用于变量赋值，用于变量赋值属于非法

> 元组遇到加法（+）：合并

    tuple = (123, 'runoob')
    tinytuple = ('abcd', 786 )
    print(tuple + tinytuple) # 拼接
    ## (123, 'runoob', 'abcd', 786 )

> 通过索引访问时不可超出范围

    x = (1, 2, 3)
    print(x[3:]) # ()
    print(x[3])
    # IndexError: tuple index out of range
    # 索引错误：元组索引超出范围








