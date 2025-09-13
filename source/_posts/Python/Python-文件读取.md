---
title: Python-文件读取
date: 2025-09-12 13:39:49
tags: [Python, 文件读取, open, with]
categories:
  - Python 
---

    f = open(f"文件路径", encoding="utf-8")

标准的读取文件的操作过程：

    while True:
        x = f.readline()
        if x:
            print(x.strip())
        else:
            break
    f.close

```python
file_1 = r"D:\py_work\PythonProject\pythonProject1\data\a.txt"

f = open(file_1, "r", encoding="utf-8")

x = f.readline()
if x:
    title=x.strip().split(',')
    while True:
        x=f.readline()
        if not x:
            break
        data = x.strip().split(',')
        print(f'{title[0]}:{data[0]},\t'
              f'{title[1]}:{data[1]},\t\t'
              f'{title[2]}:{data[2]}')
f.close()
```

## 文件路径

    --test
    ----data
    ------b.xls
    ----Day5
    ------__init__.py
    ------test001.py

```python
import os

# __file__: 为当前 test001.py 的绝对路径，
file_path=os.path.dirname(__file__) + "/" + "../data/b.xls"
print(file_path) # "D:test\Day5/../data/b.xls"

# fpx file_path_xls
fpx=os.path.abspath(file_path)
print(fpx) # 修正后：D:test\data\b.xls
```

或者

```python
import os

current_dir = os.path.dirname(__file__)
file_path = os.path.abspath(
    os.path.join(current_dir, '../data/a.csv')
)
print(current_dir)
print(file_path)
```

## 读取文件：一次性读取全部内容

**读取大文件要防止一次性读取全部内容的操作**

> f.read()

一次性读取所有内容为单个字符串
整个文件内容被存入一个字符串，内容占用等于文件大小

```python
with open("file.txt", "r") as f:
    content = f.read()  # 一次性读取所有内容为单个字符串
```

> f.readlines()

一次性读取所有行，返回包含每行的列表；
列表中每个元素是一行内容，整个文件仍被完整加载到内存

```python
with open("file.txt", "r") as f:
    lines = f.readlines()  # 一次性读取所有行，返回包含每行的列表
```

## 读取文件：逐行读取（适合大文件，内存友好）

它们每次只读取一行或一小块内容，内存中始终只保留当前处理的数据。

> 逐行读取方案一：直接迭代文件对象（推荐）

因为文件对象本身就是一个可迭代对象，用 for 或者 next() 访问都可

```python
with open("file.txt", "r") as f:
    for line in f:  # 每次迭代只读取一行，自动处理换行符
        print(i)  # 需留意内容可能自带有换行
```

> 逐行读取方案二：enumerate()

它不改变文件的逐行读取特性，仅额外记录索引

```python
with open("file.txt", "r") as f:
    for line_num, line in enumerate(f, start=1):  # 逐行读取+行号
        print(line_num, line)
```

```bash
1 姓名,年龄,联系电话

2 张三,20,13812345678

3 李四,,139123456789

4 王五,25,
```

> 逐行读取方案三：readline() 手动控制

【适用场景】：需要手动控读取节奏（如条件中断）时使用。

```python
with open("file.txt", "r") as f:
    while 1:
        content = f.readline()  # 手动读取一行，返回空字符串表示结束
        if not content:
            break
        print(content)
```

> 逐行读取方案四：指定 read() 的缓存区大小

【思路】：对文件进行切块处理，每次只读取指定大小的内容
【适用场景】：适合非文本文件（如**二进制文件**）。如图片、视频等二进制大文件，用 read(size) 分块读取更合适

```python
with open("file.txt", "r") as f:
    while 1:
        chunk = f.read(1024)  # 每次读取1024字节（可自定义大小）
        if not chunk:
            break
        print(chunk)
```
