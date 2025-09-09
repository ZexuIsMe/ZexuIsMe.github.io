---
title: Python-匿名函数
date: 2025-09-09 16:16:17
tags: [Python, 匿名函数, lambda, 三目运算]
categories:
  - Python 
  - 函数
---

匿名函数，没有名称的函数，导致匿名函数无法定义后，再调用，只能将匿名函数定义在一个变量的赋值当中。

    x = lambda a : a + 10
    print(x(5)) ## 15
    # 扩展开来
    def 匿名(a):
        return a + 10
    x = 匿名(5)

lambda 只是一个表达式，
lambda 主体**是表达式，不是代码块**
lambda 函数表达式中冒号**左侧的是函数参数**

```python
# 可写函数说明
sum = lambda arg1, arg2: arg1 + arg2

# 调用sum函数
print ("相加后的值为 : ", sum( 10, 20 ))
print ("相加后的值为 : ", sum( 20, 20 ))
```

> lambda 函数参数与局部变量与全局变量

```python
def outer():
    a = 10  # outer 局部变量
    func = lambda x: x + a  # lambda 定义时捕获了 a 的值

    print(1111)

    a = 20  # 尝试在 lambda 定义后修改 a
    return func # 约等于 lambda x: x + a，因此 a 的参数被刷新了

result = outer()
print(result(5))  # 输出 25（非15）
```

> 封装调用

    def myfunc(n):
        return lambda a: a * n
    mydoubler = myfunc(2) # 2 是 myfunc 的形参 n
    print(mydoubler(11)) # 11 是 lambda 需要的形参 a

> Python 3.8：强制位置参数

形参语法 `/` 用来指明函数形参必须使用指定位置参数，不能使用关键字参数的形式。
翻译：斜杠（/）左侧的必须是位置参数，斜杠（/）右侧的可以是位置也可以是关键字参数

`*, c`：星号（*）后面的参数必须是关键字参数

```python
def func1(a, /, b, *, c):
   print(a, b, c)
   
# 正确用法：a 必须作为位置参数传递，c 必须作为关键字参数传递
func1(1, 2, c=3) # 输出：1 2 3

# 错误用法：a 不能作为关键字参数传递
func1(a=1, b=2, c=3)

# 错误用法：c 必须作为关键字参数传递
func1(1, b=2, 3)
```

> lambda 函数使用关键字传参

    g= lambda x,y : x**2+y**2
    g(2,3) # 13
    g(y=3,x=2) #13

> lambda 函数使用默认值

    g= lambda x=0,y=0 : x**2+y**2
    g(2,3) # 13
    g(2) # 4
    g(y=3) # 9

## 三目运算

    x = 0
    y = 0 if x > 0 else 1

当 x > 0 为真时，输出 0，反之输出 1 

    y = (0 if x > 0 else 1)

是 lambda 函数中为数不多的判断

