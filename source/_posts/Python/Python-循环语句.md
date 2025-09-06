---
title: Python-循环语句
date: 2025-09-04 16:01:07
tags: [Python, 循环语句, for, while]
categories:
  - Python
  - 循环语句
---


## while

    counter = 1
    while counter <= 10:
        counter += 1

累计，当条件为 False 时，终止循环

可以与 `else:` 配合使用

    counter = 1
    while counter <= 10:
        counter += 1    
    else:
        print("while 循环结束了")

## for 循环

for 循环也可以和 `else` 配合使用

    for <variable> in <sequence>:
        <statements>
    else:
        <statements>

一般情况下，支持切片的都能用 for 循环

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

## 跳转结构：break、continue

![for语句代码执行过程](https://www.runoob.com/wp-content/uploads/2014/05/break-continue-536.png)

break: 跳出循环，终止当前循环

break 会跳过循环的 else，跳过的是和循环同层级的else。
（翻译：循环都终止了，还执行什么 else）

```python
# for

for i in range(2):
    if i == 1:
        break
        print('111')
    print(i)
else:
    print("循环正常结束")  # 不会执行
print("1111111")  # 不会执行

# whiile

i = 1
while i <= 5:
    if i == 1:
        break
        print('111')
    print(i)
else:
    print("循环正常结束")  # 不会执行
print("1111111")  # 不会执行
```


continue：跳出当前循环，进入下一次循环

> continue：while 死循环

```python
i = 1
while i <= 10:
    print(i)
    if i == 6:
        continue
    i += 1
```

当 i = 6 时，会一直触发 i==6 的判断，不停的循环执行该步骤，无法结束循环

> Q：当一个恒为真的 while 循环，如何跳出循环

```python
i = 0
while True:
    i++
    if i == 10:
        break 

print("循环结束了")
```

## pass（空语句）

空语句，不做任何事情，保证代码的正常运行




































