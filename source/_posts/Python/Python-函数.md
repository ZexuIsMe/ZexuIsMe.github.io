---
title: Python-函数
date: 2025-09-05 13:59:58
tags: [Python, 函数, def]
categories:
  - Python 
---


![函数介绍](https://www.runoob.com/wp-content/uploads/2014/05/py-tup-10-26-1.png)

> 关于函数的参数

变量本身不具备任何类型，只是说通过赋值，赋值的值是有数据类型的，让变量拥有了数据类型

    x # 定义了一个变量x
    x = "123" 
    # 字符串 123，通过赋值的方式，让 x 成为了一个字符类型
    x = 123
    # 此时，数字123 被赋值给 x，这时 x 是一个数字类型

具有引用数据类型特点的数据类型在函数内被修改后，会影响到源对象

```python
#!/usr/bin/python3

# 可写函数说明
def changeme( mylist ):
    mylist.append([1,2,3,4])
    print ("函数内取值: ", mylist)
    return

# 调用changeme函数
mylist = [10,20,30]
changeme( mylist )
print ("函数外取值: ", mylist)
```

    函数内取值: [10, 20, 30, [1,2,3,4]]
    函数外取值: [10, 20, 30, [1,2,3,4]]

> 函数参数，不固定数量的传参

**星号 * 的参数会以元组(tuple)的形式导入，存放所有未命名的变量参数**

```python
# 可写函数说明
def printinfo(arg1, *vartuple):
    "打印任何传入的参数"
    print("输出: ")
    print(arg1) # 70
    print(vartuple) # (60, 50)


# 调用printinfo 函数
printinfo(70, 60, 50)
```

**星号 ** 的参数会以字典(dict)的形式导入**

```python
#!/usr/bin/python3
  
# 可写函数说明
def printinfo( arg1, **vardict ):
   "打印任何传入的参数"
   print ("输出: ")
   print (arg1) # 1
   print (vardict) # {"a": 2, "b": 3}
 
# 调用printinfo 函数
printinfo(1, a=2,b=3)
```

> 默认参数，必须放在最后

```python
# 可写函数说明
def printinfo( age=35,name ):   # 默认参数不在最后，会报错
    "打印任何传入的字符串"
    print("名字: ", name)
    print("年龄: ", age)
    return
```

需要更改为：printinfo( name, age=35 )

## 匿名函数：lambda

    x = lambda a : a + 10
    print(x(5)) # 15
    扩展开来
    def 匿名(a):
        return a + 10
    x = 匿名(5)

lambda 只是一个表达式，
lambda 主体是一个表达式，不是代码块
lambda 函数表达式中冒号左侧的是函数参数

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
    a = 10  # 外层函数的局部变量
    func = lambda x: x + a  # lambda 定义时捕获了 a 的值

    print(1111)

    a = 20  # 尝试在 lambda 定义后修改 a
    return func # 约等于 lambda x: x + a，因此 a 的参数被刷新了

result = outer()
print(result(5))  # 输出 25（非15）
```

> 封装调用

```python
def myfunc(n):
    return lambda a: a * n

mydoubler = myfunc(2)

print(mydoubler(11))
```

`mydoubler` 调用函数 `myfunc`，并传参 4，根据返回值被赋值成为`lambda`表达式： `lambda a: a * 2`

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







