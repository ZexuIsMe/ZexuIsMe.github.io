---
title: 额外补充-Python
date: 2025-09-10 11:11:02
tags: [Python, 额外补充, 四舍五入]
categories:
  - 额外补充
  - Python
---

## 保留小数位

    x = 3.14159

`print(round(x, 2))`：返回一个小数位数为 2 的浮点类型

`print(f"{x:.2f}")`：返回一个小数位数为 2 的字符串类型

`print("{0:.2f}".format(x))`：返回一个小数位数为 2 的字符串类型

运用这些方法，都有一个大前提，**必须是数字类型**

### round()

    round(x) # 四舍五入的取整
    round(x, 0) # 四舍五入的取整，但有一位小数
    round(x, 1) # 四舍五入，并保留一位小数

## ASCII 编解码

> 编码：ord

    print(ord('A')) # 65
    print(ord('a')) # 97

> 解码：chr

    print(chr(65)) # A
    print(chr(97)) # a

> 字符串 encode、decode

    print("Hello".encode("ascii"))
    # b'Hello'
    print("Hello".encode("ascii").decode("ascii"))
    # Hello

## 字符串：<mark>切割赋值</mark>

    a, b, c = "1 3 4".split(" ")
    print(a, b, c) # 1, 3, 4

分析：
`"1 3 4".split(" ")` 
》 通过空格切割后，返回一个列表 `[1, 3, 4]`
》 通过赋值`a, b, c = [1, 3, 4]`对列表进行**序列解包**，或叫**多重赋值**

## 字符串：join 拼接

join 拼接的目标必须是字符串

    x = [1, 2, 3]
    ",".join(x) # 报错
    y = ["1", "2", "3"]
    ",".join(y) # 1,2,3

## f-string：域宽

```python
# 为整数分配10个字符的域宽
num = 123
print(f"数值: {num:10}") # 输出：数值:        123（123前面补7个空格，共10位）

# 为字符串分配15个字符的域宽
text = "Hello"
print(f"文本: {text:15}") ## 输出：文本: Hello          （Hello后面补10个空格，共15位）
```

一般情况下：
填充物为空格；
数值类型，域宽默认是左填充；（如上代码所示）
字符串类型，域宽默认是右填充；（如上代码所示）

> 手动控制填充方向

```python
name = "Alice"
age = 25

# 左对齐（域宽10）
print(f"左对齐: {name:<10}") # 输出：左对齐: Alice     
# 右对齐（域宽10）
print(f"右对齐: {age:>10}")  # 输出：右对齐:         25
# 居中对齐（域宽10）
print(f"居中: {name:^10}")   # 输出：居中:   Alice    
``` 
| 方向   | 描述          | Eg                                               |
|------|-------------|--------------------------------------------------|
| 左对齐  | 内容左对齐，填充右侧  | f"{name: <mark><</mark>10}"<br/>内容左对齐，右侧填充10个空格  |
| 右对齐  | 内容右对齐，填充左侧  | f"{name: <mark>></mark>10}"<br/>内容右对齐，左侧填充10个空格  |
| 居中对齐 | 内容居中对齐，填充两侧 | f"{name: <mark>^</mark>10}"<br/>内容居中对齐，填充物平分填充两侧 |

手动控制的填充方向不受默认情况影响，比如字符串默认是填充右侧，通过手动控制后

    print(f"左对齐: {name:<10}")
    print(f"左对齐: {name:>10}")
    # 输出：左对齐: Alice    
    # 输出：左对齐:         Alice（这是手动控制）

> 更改填充物

```python
num = 456

# 用0填充，右对齐，域宽8
print(f"0填充: {num:0>8}")  # 输出：0填充: 00000456

# 用*填充，居中对齐，域宽10
print(f"*填充: {num:*^10}") # 输出：*填充: ***456****
```

> 混合运用

```python
text = "hello"
print(f"左对齐：{text:<10}end")  # 域宽10，左对齐：左对齐：hello     end
print(f"右对齐：{text:>10}end")  # 域宽10，右对齐：右对齐：     helloend
print(f"居中对齐：{text:^10}")   # 域宽10，居中对齐：居中对齐：  hello   
```

## f-string：进制转换

二进制、八进制、十六进制转十进制，使用`int(进制, 进制类型)`

进制类型参数为：2, 8, 16（分别表示二进制、八进制、十六进制）

Eg: 16进制转10进制

    x = "ABCDEF"
    print(int(x, 16))

> 方案二：字符串形式的进制转换

```python
n = 255
print(f"十进制：{n:d}")    # 十进制：255
print(f"二进制：{n:b}")    # 二进制：11111111
print(f"八进制：{n:o}")    # 八进制：377
print(f"十六进制小写：{n:x}")  # 十六进制小写：ff
print(f"十六进制大写：{n:X}")  # 十六进制大写：FF
```

    print(f"八进制：{n:o}")    # 八进制：377

是小写字母`o`

## f-string：千位分隔符

操作目标**必须是数值型**

```python
large_num = 123456789

print(f"带千位分隔符：{large_num:,}")  # 带千位分隔符：123,456,789

print(f"结合小数：{12345.6789:,.2f}")  # 结合小数：12,345.68
```

## f-string：格式化百分比

```python
rate = 0.7532
print(f"百分比：{rate:.1%}")  # 百分比：75.3%（保留1位小数）
```

## 生成器

```python
x = "2 7 5"
print([lambda x: x for i in x.split()])
```
这样写，只是创建了一个含有3个lambda函数的列表，并没有执行它，如果你要运行，可以这样

    print([(lambda x: x)(i) for i in x.split()])
    # 或者
    print(list(map(lambda x: x, x.split())))

## 位运算：移位运算

移位运算（Bit Shift Operators）是对整数的二进制位进行向左或向右移动的操作，包括左移（<<） 和右移（>>） 两种，直接作用于二进制层面，运算效率极高。

> 左移运算（<<）

    print(5 << 3)

该代码表示 5×2<sup>3</sup>

> 右移运算（>>）

    print(20 >> 3)

等价于数学运算：20 // 2<sup>3</sup>（20 除以 2 的 n 次方，**向下取整**）
