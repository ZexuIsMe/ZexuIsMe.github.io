---
title: Python-生成器
date: 2025-09-10 14:46:58
tags: [Python, 生成器]
categories:
  - Python
---

## next()

生成器对象可以被 next() 函数返回下一个值 或 for 循环

```python
x = (int(num) for num in "1 2 3".split(" "))

print(next(x)) # 1
print(next(x)) # 2
print(next(x)) # 4
print(tuple(x)) # ()
```

必须是被括号包裹的才能被 `next(x)` 函数执行；
生成器对象被 `next(x)` 函数执行时，会影响源对象，
如上代码，每次执行后x都会抽走一个元素，如果元素被抽空,

```bash
Traceback (most recent call last):
  File "D:\py_work\PythonProject\pythonProject1\Day5\test001.py", line 6, in <module>
    print(next(x)) # 4
          ~~~~^^^
StopIteration
```

## 生成器表达式

> \[int(num) for num in "1 2 3".split(" ")]

```python
x_list = [int(num) for num in "1 2 3".split(" ")]
print(x_list) # [1, 2, 3]

## 等价于

j = []
for num in "1 2 3".split(" "):
    j.append(int(num))
print(j)
```


## 生成器函数

yield 表示函数到此暂停，返回，后续还会回来继续

```python

```