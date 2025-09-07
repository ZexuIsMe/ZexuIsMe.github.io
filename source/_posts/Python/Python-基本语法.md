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

`/`: 除法，结果是浮点数，比如`2.0`而不是`2`
`//` ：整除，取值向下取整

```python
print("0:", 10/5) # 0: 2.0 （需留意）

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
但精度不准，整体位长到16位开始精度开始不准

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

## 字符串

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

因为 print 默认以 \n  结尾，涉及到 print 语法知识。

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

翻倍输出的前提，必须是 `>= 1` 的**正整数**

若是负数或零，则输出空

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
print(b"abc", "大家好efg".encode("UTF-8"))
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

`in` 是逐个匹配，但是完全匹配的；
比如：`"bc" in "abcd"`
》 先判断"abcd"是否存在 b
》 若不存在，则输出 False
》 若存在，则继续判断 字母 c 是否在 “abcd” 中

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
print(1 or 2) # 1
print(0 or 1) # 1
print(0 or []) # []
print(None or 'abc') # abc 
print('abc' or '123') # abc
```

若用于判断，就是熟悉的一真全真

```python
print(True or True) # True
print(False or True) # True
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

### 补充列表追加列表：list.append(\[1, 2, 3, 4])

    x = [10, 20, 30]
    x.append([1, 2, 3, 4])
    print([10, 20, 30, [1, 2, 3, 4]])



