---
title: Python-基本语法
date: 2025-09-03 10:42:27
tags: [Python]
categories:
  - Python 
---

python 中 0.0 就是 0
若需要**换行书写，使用`\`**


## 命名规则

1. 命名必须是 \[a-zA-Z_] 范围内的作为命名开头
2. 除了下划线，不以任何符号写入命名，比如：x@123
3. 驼峰命名
4. 不以关键字作为名字
5. 虽然没有长度限制，但尽可能的不要超长命名，尽量控制在20字符以内

## 数字计算

```python
print(2 ** 5) # 》 32
print(0.25 ** 0.5) # 0.5
```

在混合计算时，Python会把整型转换成为浮点数。

> 数值的除法包含两个运算符

`/`: 除法
`//` ：整除，取值向下取整

```python
print("1:", 10/3) # 1: 3.3333333333333335

print("2:", 10//3) # 2: 3

print("3:", -10/3) # 3: -3.3333333333333335

print("4:", -10//3) # 4: -4
```

> 取余

```python
print(10%3) # 1
print(10%-3) # -2
print(-10%3) # 2
print(-10%-3) # -1
```

取余时看右侧数值符号决定结果，向下取整


### 进制书写方式（用的少）

> 2 进制：ob2 或者 0B2 

Eg: `x=0b01010101`

> 8 进制：oo8 或者 0O8

Eg: `y=0o7654321`

> 16 进制：ox16 或者 0X16

Eg: `z=0Xabcdef`

打印的时候显示的是10进制

--------

    x = b"hello"
    y = x[1:3]  # 切片操作，得到 b"el"
    z = x + b"world"  # 拼接操作，得到 b"helloworld"

> 整数值转进制

**bin(整数值)**：显示2进制
**oct(整数值)**：显示8进制
**hex(整数值)**：显示16进制

```python
# 数据类型：
type(bin(x)) # <class 'str'>
type(oct(y)) # <class 'str'>
type(hex(z)) # <class 'str'>
```

## Float

用很少的存储空间可以保存很长的位数
但精度不准，位长到16位开始精度开始不准

> 支持科学计数法

    # 格式
    mE(e)n

- m 表示底数
- n 表示指数
- mEn=m*10 的n次方

Eg:

    print(-2e3) # -2000.00 》 -2*10*10*10
    print(-2e-3) # - 0.002 》 -2*0.1*0.1*0.1


> 判断

```python
print(1 == 1.0) # True
```

> 强制转换：浮点 》 整数

直接取整，尾巴不要

```python
print(int(1.5)) # 1
print(int(-1.5)) # -1
```

## 字符

- 数字字符 + 数字的行为不可取，可通过 int() 强制转换数字字符为数字类型
- 单双引号都支持（英文状态下），系统内置使用的是单引号
- 多行字符串用一对三个单引号或3双引号
- `\t`: 缩进，若是`\t\t`缩进加倍
- `\n`: 换行
- `\`：转义符，如`print(\\n)` 》 输出：\n


> 多行字符

```python
tem_str = """
张三
王五
"""
print(tem_str)
```
----


    t_str = "Runoob"


字符串属于 iterable，可序列类型，翻译：有下标的，可以被拆分的

```python
for temp_str in t_str:
    print(temp_str)

# R
# u
# n
# o
# o
# b

```


```python
tem_str = "张三\n李四\t\t王五"
for temp_str in tem_str:
    print(temp_str)
```

      1. 张
      2. 三
      3.  （\n）
      4.  （\n）
      5. 李
      6. 四
      7.  （\t）
      8.  （\t） 
      9. 王
      10. 五

**Q：为什么 `\n` 这里是两行？**

因为 print 默认以 \n  结尾

```python
tem_str = "张三\n李四\t\t王五"
for temp_str in tem_str:
    print(temp_str, sep="  ", end="!!")
```

    张!!三!!
    !!李!!四!!	!!	!!王!!五!!

> 截取：str\[头下标:尾下标:步长]

```python
    print(t_str[0:-1]) # Runoo
    print(t_str[1:-2]) # uno
    print(t_str[0:]) # Runoob
```

|    --    | -- | -- | -- | -- | -- | -- |
|:--------:|:--:|:--:|:--:|:--:|:--:|:--:|
|   头下标    | 0  | 1  | 2  | 3  | 4  | 5  |
|  string  | R  | u  | n  | o  | o  | b  |
|   尾下标    | -6 | -5 | -4 | -3 | -2 | -1 |

**\[1:-2]：可看做区间 \[1, -2)**
**\[::-1]：倒序输出**

> 字符乘法：

```python
    print(t_str * 2) # （翻倍输出） RunoobRunoob
```

必须是 `>= 1` 的**正整数**

> 字符加法：

```python
    print(t_str + 'ABC') # RunoobABC
```

> 前缀 f：字符内引用变量

```python
age = 20
print(f"年龄{age}岁")
print("年龄%d岁" %age)
```

%d 对应 %age，age变量是数字，所以是 d

若是多个呢
```python
name = '张三'
print("年龄%d岁，%s" %(age, name))
```

> 前缀 r：表示字符串的原始格式，将所有引用和转义都无效化

```python
print("张三\n李四\t王五")
print(r"张三\n李四\t王五")
```

> 前缀 b：表示不是字符串类型，是字节 bytes

英文的字节型可用小写字母 b 来书写，但中文只能对中文字符串执行编码

```python
print(b"abc", b"大家好") # 报错
print(b"abc", "大家好".encode("UTF-8"))
```
编码：encode("UTF-8")
解码：decode("UTF-8")
前缀 b 不支持中文，但中文支持字母
```python
print(b"abc", "大家好".encode("UTF-8"))
# b'abc' b'\xe5\xa4\xa7\xe5\xae\xb6\xe5\xa5\xbdefg'
```

## 运算符

**<mark>关系</mark>运算符**没有优先顺序

```python
print("12" > "3") # False
print("a" > "A") # True
print("123" > 12) # Error
```
数字字符、字母字符比较均按首个字符做比较
约定俗成：按ASCLL表的排号比较

> a in b：判断 a 是否在 b 对象中

```python
print("bc" in "abcd") # True
print("bc" in "aBcd") # False
# 对大小写敏感
```

> a is b：对象判断，判断两侧对象是否为同一个对象

```python
x="ab"
y="ab"

print(id(x), id(y), x is y)
# 2532953731456 2532953731456 True

```
`id(x)`：返回变量X的参数在内存中的存储地址
因此，is 的对象判断是指内存地址是否一样

## 非运算

- 非空目标转为 bool 时都被视为 True
- 数字0、浮点型0.0 转为 bool 时被视为 False
- not 值：取反，值不限类型，但返回结果均是 bool

## 与运算

**与运算口诀**：<mark>前真则后，否则为前</mark>

```python
print(1 and 2) # 2
print(0 and 1) # 0
print(0 and []) # 0
print(None and 'abc') # None
print('abc' and '123') # 123
```

若用于判断，就是熟悉的一假全假

```python
print(True and True) # True
print(False and True) # False
```
按口诀取值，你会发现完全符合一假全假

## 或运算

**或运算口诀**：<mark>前真则前，否则为后</mark>

```python
print(1 and 2) # 1
print(0 and 1) # 1
print(0 and []) # []
print(None and 'abc') # abc 
print('abc' and '123') # abc
```

若用于判断，就是熟悉的一真全真

```python
print(True and True) # True
print(False and True) # True
```

> 执行顺序：非 > 与 > 或

## 链式比较

```python
x=5
print(1<x<10)
# 等价于 print(1<x and x<10)
```

## 赋值运算

> 迭代赋值

如：+=、-=....

> 多重赋值

Eg：x,y = 1, 'ab'
Eg：(x,y) = (1, 'ab')
Eg：(x,y) = \[1, 'ab']
Eg：x,y = \[1, 'ab']

主要用途：两值互换

> 链式赋值

Eg: x = y = 1

python 中不支持 i++,++i

## 列表

- 可变数据类型
- 属于引用数据类型，
  - 引用数据类型的特点就是，一般情况下，即便元素相同，存储地址也是不同的
  - 链式赋值型的列表除外
- 修改、追加、删除都是针对列表内部，不会影响到存储地址，存储地址不会变

```python
list = [1, 2, 3, 4, 5, 6]

list[2:5] = [13, 14, 15]
print(list) # [1, 2, 13, 14, 15, 6]

list[2:5] = []
print(list) # [1, 2, 6]
```

<mark>`list[2:5]`：可看做 [2, 5)，也就是下标 2,3,4</mark>

> 修改元素

    list = [1, 2, 3, 4, 5, 6]
    list[0] = 9
    print(list) # [9, 2, 3, 4, 5, 6]

若列表是空列表，空列表没有填充物，也就是没有下标
或者目标下标根本不存在，这样的无法通过下标进行赋值或修改

> 插入元素：insert

    list.insert(1, 'abc')

insert(索引, 值)，表示向列表的索引位置插入一个元素

> 追加元素：append

    list.append(1, 'efg')

向列表的末尾（正向的下标的末尾）添加追加一个元素

> 删除元素：pop

    list.pop()

删除列表最后一个元素，是影响列表本身的删除，会返回被移除的元素

    list.pop(index)

--------------

通过提供指定的下标，移除指定位置处的元素

    list.remove(3)

从列表中移除第一个是 3 的元素，且该方法没有返回值

    list.clear()

清空列表

    lista = [1,2,3,4,5]
    lista.reverse()
    print(lista) # [5, 4, 3, 2, 1]

反转列表，无返回值

    list.sort()

升序排序，无返回值

    list.sort(reverse=True)

降序排序，无返回值

    x = [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1]
    y = x.count(5)
    print(y)

统计元素出现的次数

    x.index(元素[, 起始下标][, 结束下标])

获取目标元素下标，返回目标元素下标

    # x.cpoy()
    x = [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1]
    y = x.copy()
    y[0] = 1
    print("x", x)
    print("y", y)

拷贝列表，属于浅拷贝

## 元组

```python
tuple = (123, 'runoob')
tinytuple = ('abcd', 786 )

print(tuple * 2) # 输出两次元组
## (123, 'runoob', 123, 'runoob')

print(tuple + tinytuple) # 连接
## (123, 'runoob', 'abcd', 786 )
```

元组通过下标修改参数是非法的，同字符一样，除非该元素是引用数据类型
是 iterable 可迭代对象，支持切片
**若元组只有参数，需要在屁股后面添加一个逗号**，表示这是一个元组：`(20,)`
**只读数据类型**

方法：
count: 同 list.index
index: 同 list.index

> 元组是特别的引用数据类型

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






























## 额外补充

### 补充：切片

切片时，若同时运用头尾步长任一一种组合形式，如下所示

    x = "string"
    print(x[2]) # r <class 'str'>
    print(x[2:]) # ring <class 'str'>

    x = [('Runoob', 1), ('Google', 2), ('Taobao', 3)]
    print(x[2]) # ('Taobao', 3) <class 'tuple'>
    print(x[2:]) # [('Taobao', 3)] <class 'list'>

    x = ('Runoob', 1, 5, 6)
    print(x[2]) # 5 <class 'int'>
    print(x[2:]) # (5, 6) <class 'tuple'>

其输出结果均以对应的数据类型展示，
比如，字符串的 `x[2:]` 输出的结果是字符串，且输出结果类型是字符串
比如，列表的 `x[2:]` 输出的结果是**中括号**包裹的，且输出结果类型是**列表**
比如，元组的 `x[2:]` 输出的结果是**括号**包裹的，且输出结果类型是**元组**

### 补充：快速颗粒化字符串

    x = "string"
    # 列表
    a = list(x)
    print(a)
    # 元组
    a = tuple(x)
    print(a)
    # 集合
    a = set(x)
    print(a)

那么如何还原呢？

    y = "".join(a)
    print(y)