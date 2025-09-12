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


