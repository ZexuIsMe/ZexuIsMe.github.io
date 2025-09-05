---
title: Python-dict
date: 2025-09-04 10:42:12
tags: [Python, dict, 基本数据类型, 字典]
categories:
  - Python
  - 基本数据类型
---

> Q：字典长什么样

字典，被花括号包裹的且是以键值对形式出现的就是字典

    { "name": "张三", "age": 20 }

`"name": "张三"` 就是键值对，`name` 叫 `key`，`张三` 叫 `value`
其中，**`key`，必须用引号包裹**，单双引号都可，键值对之间用逗号`,`隔开

--------------------

字典无法同字符、列表、元组一样做到翻倍输出，即：str * 2 这样的操作；
字符、列表、元组不能对空目标通过下标添加元素的操作，字典可以；
输出时，会自动去重；

--------------------

## 获取键（key）

方法：dict.keys()
返回值：dict_keys，是一个含有列表的元组

    x = { "name": "张三", "age": 20 }
    for item_key in x.keys():
        print("key：", item_key)
    
    print(x.keys(), type(x.keys()))

    ## 输出
    key： name
    key： age
    dict_keys(['name', 'age']) <class 'dict_keys'>

注意：key 不能重复，如果重复了呢？

    x = { "name": "张三", "name": 20 }
    print(x)
    
    ## 输出
    {'name': 20}

**如果重复**了，那么**后者覆盖前者**

        x = { "name": "张三", "age": 20 }
        for item in x:
            print("item：", item)

> Q：该断代码的打印结果是？

    item: name
    item: age

换言之，for in 循环时，dict.keys 或者 字典本身都可获得 key

## 获取值（value）

方法：dict.values()
返回值：dict_values，是一个含有列表的元组

    x = { "name": "张三", "age": 20 }
    for item_value in x.values():
        print("value：", item_value)
    
    print(x.values(), type(x.values()))

    ## 输出
    value： 张三
    value： 20
    dict_values(['张三', 20]) <class 'dict_values'>

## 同时获取 key, value

方法：dict.items()
返回值：dict_items, 

```python
    for item_key, item_value in x.items():
        print("key: ", item_key)
        print("value: ", item_value)
    
    print(x.items())
    ## [('name', 'runoob'), ('code', 1), ('site', 'www.runoob.com')]
    print(type(x.items())) ## <class 'dict_items'>
```

## 构造函数 dict()

```python
## [(key, value), (key_1, value)]
x=dict([('Runoob', 1), ('Google', 2), ('Taobao', 3)])
print("x：", x)

y=dict(Runoob=1, Google=2, Taobao=3)
print("y：", y)

x：{'Runoob': 1, 'Google': 2, 'Taobao': 3}
y：{'Runoob': 1, 'Google': 2, 'Taobao': 3}
```

x，通过列表元组的方式存放key, value，字典构造函数会对其进行处理，输出一份字典

用构造方法创建字典，若遇到重复key，是怎么处理的：

    z=dict([('Runoob', 1), ('Runoob', 2), ('Taobao', 3)])

正常输出一份字典，自动剔除重复的，以后者覆盖前者的方式
不一定拘泥于列表元组的形式，可以是
    
    字典元组
    {('a',1),('b',2),('c',3)}
    列表列表
    [['a',1],['b',2],['c',3]]
    元组元组
    (('a',1),('b',2),('c',3))

只要内部满足 key:value 即可

-------------------

    z=dict(Runoob=1, Runoob=2, Taobao=3)

运行时，终端报错

## 推导构造字典

```python
{ x: x**2 for x in (2, 4, 6) }

# { 2: 4, 4: 16, 6: 36 }
```

python 推导(https://www.runoob.com/python3/python-comprehensions.html)



## 添加、修改

    dict\[index] = value

既是添加也是修改

    dict.setdefault(key, value)

`setdefault`，若 key 不存在，则以键值对的形式添加进入字典，若存在则返回该 key 的 value

## 删除

`dict.pop(key)`：指定删除
`dict.popitem()`：随机删除


