---
title: Python-生成器
date: 2025-09-10 14:46:58
tags: [Python, 生成器]
categories:
  - Python
---

1. 生成器对象是一个可迭代对象
2. **生成器创建后，如果不 next() 或 for in 或 list等操作，生成器中的函数不会被执行**。
3. <mark>直接获取生成器对象中的元素，每获取一次，长度 -1</mark>


    score = map(float, "85 90 100 60".split())
    print("1", tuple(score))  # (85, 90, 100, 60)
    print("2", tuple(score))  # 它已经是一个空对象了

score 已经被 操作 1 消耗掉了元素，导致 score 成了一个空对象，所以操作2打印出来是一个空对象

> **Q: 如何解决直接获取长度就少一的问题呢？**

可通过如`list()`、`tuple()`转换即可解决该问题

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