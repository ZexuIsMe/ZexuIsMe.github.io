---
title: Python-字符串
date: 2025-09-04 09:07:15
tags: [Python, 字符串]
categories:
  - Python
  - 数据类型
---

基础信息翻阅：Python-基本语法

## 方法

> **字符串的所有方法都是不影响源内容的，基本都是返回一个新的字符串**

`str.lower()` 字母全部小写

`str.upper()` 字母全部大写

`str.capitalize()` 首字母大写，后续字母小写，若首位不是字母，则不管，接着小写后续全部字母

`str.title()` 每个单词首字母大写

`str.strip/lstrip/rstrip()`  去空格

    x = "\t\na b\t"
    print(x.strip()) # 去掉两端空格
    print(x.lstrip()) # 去掉左侧空格
    print(x.rstrip()) # 去掉右侧空格

`str.replace()` 替换

    x = "2025-09-05"
    x.replace('-', '/')
    print(x)

> 字符串内容的判断

`str.isalnum()`  是否包含字母、数字、中文（符号除外，比如`.`）

`str.isalpha()` 字符串是否**只**包含字母、中文

`str.isnumeric()` 字符串是否是数字组成

`str.isdigint()` 字符串是否全部由`>=0`的整数组成

    "123.0".isdigit() # False
    "0100".isdigit() # True

> **Q：isnumeric、isdigint 两个都是判断是否只含数字，那么它们的区别是？**

`isdigint`：除了阿拉伯数字外，还有 Unicode 中的某些特殊数字，如上标数字 '⁰¹²³'
`isnumeric`：判断范围更广，除了阿拉伯数字，还包括 其他语言的数字、分数、罗马数字 等有 “数值意义” 的字符
除了阿拉伯数字外，还可是以汉字数字`"一二三"`，罗马数字`"ⅣⅤ"`，分数`"½`、`⅓"`等等；

两者虽然都支持阿拉伯数字，但不支持带有小数点的数，因为含有非数字字符`.`

--------------------------------

`str.isdecimal()` 判断字符串是否**只包含十进制数字字符**，返回的是布尔

    "ab123".isdecimal() # False

`str.startswith(value)` 是否以指定内容开始，返回 bool

    "abc".startswidth("a") # true

`str.endsWidth(value)` 是否以指定内容结尾，返回 bool

## 切片操作

> 将字符串从第2个字符开始到倒数第2个字符顺序翻转

```python
x = "string"
x_start = x[0:2]
x_end = x[-2:]
x_middle = x[2:-2][::-1]

print(x_start + x_middle + x_start)
```

    x[2:-2][::-1]
    或
    x[-2:2:-1]


```python
x = "string"
x_list=[]

for item in x:
    print(item)
    x_list.append(item)

x_middle=x_list.copy()[2:-1]
x_middle.reverse()

y=""
for item in x_list[0:2]+x_middle+x_list[-2:]:
    y+=item
print('y', y)
```

## 字符串拼接

> list 拼接：`"".join(str)`

```python
x = ['I', 'have', 'a', 'pen']
"".join(x)
## 按空格对元素进行拼接
```