---
title: Python-循环语句
date: 2025-09-04 16:01:07
tags: [Python, 循环语句, for, while]
categories:
  - Python
  - 循环语句
---


## while

    counter = 1
    while counter <= 10:
        counter += 1

累计，当条件为 False 时，终止循环

可以与 `else:` 配合使用

    counter = 1
    while counter <= 10:
        counter += 1    
    else:
        print("while 循环结束了")

## for 循环

for 循环也可以和 `else` 配合使用

    for <variable> in <sequence>:
        <statements>
    else:
        <statements>


## 范围数据类型 range

**没有直接的书写方式，只能用 range 类创建 range 对象**
且创建的对象输出时也看不到对象的元素
只能通过索引的方式查看，也就是循环
**支持切片**
**只读类型**

range 创建对象有 3 种方式
`range(n)` 表示：[0, n)
`range(m, n)` 表示：[m, n)
`range(m, n, e)` 表示：[m, n)，间隔为 e 

## break、continue

![for语句代码执行过程](https://www.runoob.com/wp-content/uploads/2014/05/break-continue-536.png)

break: 跳出循环，终止当前循环
continue：跳出当前循环，进入下一次循环

## pass（空语句）

空语句，不做任何事情，保证代码的正常运行




































