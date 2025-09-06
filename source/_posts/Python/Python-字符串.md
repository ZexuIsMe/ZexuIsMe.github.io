---
title: Python-字符串
date: 2025-09-04 09:07:15
tags: [Python, 字符串]
categories:
  - Python
  - 数据类型
---

基础信息翻阅：Python-基本语法

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

## 方法

**字符串的所有方法都是不影响源内容的，基本都是返回一个新的字符串**

lower(): 全部小写
upper(): 全部大写
capitalize()：首字母大写，后续字母小写，若首位不是字母，则不管，接着小写后续全部字母
title(): 每个单词首字母大写
isalnum(): 是否字母（包括中文）或数字
isnumeric()：是否数字、不包括小数点
isalpha()：是否字母（包括中文）
isdigint(): 是否是整数

    "123.0".isdigit() "0100".isdigit()

isdecimal()：判断字符串是否只包含十进制数字字符，返回的是布尔

    "ab123".isdecimal() # False

strip、lstrip、rstrip: 去空格

    x = "\t\na b\t"
    print(x.strip()) # 去掉两端空格
    print(x.lstrip()) # 去掉左侧空格
    print(x.rstrip()) # 去掉右侧空格

replace: 替换

    x = "2025-09-05"
    x.replace('-', '/')
    print(x)

startswith(value)：是否以指定内容开始，返回 bool

    "abc".startswidth("a") # true

endsWidth(value)：是否以指定内容结尾，返回 bool


