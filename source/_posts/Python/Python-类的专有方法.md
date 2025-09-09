---
title: Python-类的专有方法
date: 2025-09-09 14:02:55
tags: [Python, 类]
categories:
  - Python
  - 面向对象
---

```Python
class People:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def getName(self):
        return self.name

user = People(name="张三", age=18)
print(vars(user)) # { "name": "张三", "age": 18}
```

## `__init__` 

: 构造函数，在生成对象时调用

## `__str__`

:  重载 str() 函数和 print() 输出

若不书写该方法，在调用 print(user) 时会显示 `<__main__.People object at 0x000001AC623C6900>`，有些不太方便，那么我们可以尝试重载它，也就是写一个同名的函数，对原身进行夺舍。

    # ...
    def __str__():
        return "打印结果被覆盖了哟~"
    # ...

![str](https://origin.picgo.net/2025/09/09/__str__81bb366555726e03.png)

## `__del__`

: 析构函数，释放对象时使用（翻译：删除对象时使用）

无需手动调用，当对象被销毁时由解释器自动触发

    del user.name
    print(vars(user)) # { "age": 18 }

这段代码表示，从 user 中移除变量 name

`__repr__` : 打印，转换

`__setitem__` : 按照索引赋值

`__getitem__`: 按照索引获取值

`__len__`: 获得长度

`__cmp__`: 比较运算

`__call__`: 函数调用

> 算出运算符

`__add__`: 加运算

`__sub__`: 减运算

`__mul__`: 乘运算

`__truediv__`: 除运算

`__floordiv__`: 整除运算

`__mod__`: 求余运算

`__pow__`: 乘方



















