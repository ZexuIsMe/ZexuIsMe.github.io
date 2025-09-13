---
title: Python-函数
date: 2025-09-05 13:59:58
tags: [Python, 函数, def]
categories:
  - Python 
  - 函数
---

![函数介绍](https://www.runoob.com/wp-content/uploads/2014/05/py-tup-10-26-1.png)

def 》 define 定义

## 关于函数的参数

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

## **可变参数**，不固定数量的传参

1. 可变参数与默认参数之间没有位置顺序，随便入座
2. 可变参数后常规传参必须是关键字
3. 可变参数不能使用关键字调用，只能标准调用


### *args

**单个星号的参数会以元组(tuple)的形式导入，存放所有未命名的变量参数**

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

| 传参类型                  | *args                                      | 打印结果                 |
|-----------------------|--------------------------------------------|----------------------|
| 元组(tuple)             | x=(1, 2, 3)<br/>print(*x)                  | 1, 2, 3              |
| 列表(list)              | x=\[1, 2, 3]<br/>print(*x)                 | 1, 2, 3              |
| 集合(set)               | x={1, 2, 3}<br/>print(*x)                  | 1, 2, 3              |
| <mark>字典(dict)</mark> | x={ "a": 1, "b": 2, "c": 3 }<br/>print(*x) | <mark>a, b, c</mark> |

### **kwargs

**两个星号**的参数会以字典(dict)的形式导入**

<mark>这样形式的书写，至多一个，且必须在最后</mark>

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

## 默认参数，必须放在最后

```python
# 可写函数说明
def printinfo( age=35,name ):   # 默认参数不在最后，会报错
    "打印任何传入的字符串"
    print("名字: ", name)
    print("年龄: ", age)
    return
```

需要更改为：`printinfo( name, age=35 )`

## 指定数据类型

```Python
def abc(a:str="123")->str:
    print(a)
    return "333"

abc()
abc("456")
```

`a:str="123"` 规定参数a是一个字符串类型，且有默认值，默认值为 123
`->str` 规定该函数的返回类型是字符串类型

规定参数数据类型，非强制数据类型，只是告诉你我设定的这个函数所需要的参数需要的数据类型，即便数据类型不一样，或许也能运行，但结果和预期不一样就不要怪函数有问题

## 递归函数

函数自己调用自己，Python 对函数的自调用有层级限制（<1000）

## 变量作用域

定义一个全局变量

    x = 123

定义一个方法：
    
    def aaa():
        print(x)
    aaa()

打印：123

> Q：为什么？

因为 `x = 123` 是一个全局变量，
调用函数时，函数内部需要用到变量 x，但是函数内部没有定义变量x，
此时，函数会在全局变量字典中寻找是否存在变量 x，若存在则打印，否则返回 None

这说明什么，说明了<mark>全局变量可以在任何地方调用</mark>

若函数内部定义的有变量 x, 则会优先调用函数内部

    def aaa():
        x = 555
        print(x)
    aaa()

打印：555

> 函数内部和全局变量同名了，该局部变量会影响全局变量吗？

**不会**

```python
x = 123

print("1", x) # 123

def aaa():
    x = 555
    print("2", x) # 555
aaa()

print("3", x) # 123
```

除非函数内部使用`global`关键字

    def aaa():
        global x
        x = 555
        print("2", x) # 555
    aaa()

该关键字表示在函数内部表示声明或引用全局变量


