---
title: Python-推导
date: 2025-09-04 17:21:57
tags: [Python, 推导]
categories:
  - Python
---

推导公式核心，记住这个就行

    表达式 for 变量 in 列表
    或者
    表达式 for 变量 in 列表 if 条件

列表用`[]`包裹推导，字典用`{}`包裹推导

特别的，元组，生成的是一个表达式；

    a = (x for x in range(1,10))
    print(a)
    # 返回的是生成器对象
    ## <generator object <genexpr> at 0x7faf6ee20a50>  
    
    # 使用 tuple() 函数，可以直接将生成器对象转换成元组
    tuple(a)
    ## (1, 2, 3, 4, 5, 6, 7, 8, 9)

元组推导式可以利用 range 区间、元组、列表、字典和集合等数据类型，快速生成一个满足指定需求的元组。









