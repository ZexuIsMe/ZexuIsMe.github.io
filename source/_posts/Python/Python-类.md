---
title: Python-类
date: 2025-09-08 14:56:51
tags: [Python, 类, class]
categories:
  - Python
  - 面向对象
---

类型首字母需大写；
若无继承类，无需书写括号；
类中的函数必带一个形参：self

------

`__init__()` 初始化实例，class类在实例化的时候，会自动调用该方法

`self` 表示实例，不是 class 类

    print(self)
    ## <__main__.Test object at 0x000001EFA7B96A50>
    print(self.__class__)
    ## <class '__main__.Test'>

其次，self 不是固定的关键字，可以是"abc"，也可以是"efg"，但不建议写 self 以外的

## 基本属性、私有属性

```python
class People:
    ## 定义基本属性
    name = ""
    age = 0
    
    ## 定义一个私有属性
    __weight = 0
    
    ## 初始化实例方法
    def __init__(self, n, a, w):
        self.name = n
        self.age = a
        self.__weight = w
```

> 私有属性：

该属性在类的外部无法直接进行访问

    p = People()
    print(p.__weight)
    ## AttributeError: 'People' object has no attribute '__weight'

如果你非要访问，可以：`print(p._People__weight)` 获取私有属性

私有属性的命名：
- 双下划线`__`构成的算私有属性，如上`__weight`；
- 注意：`__weight__` 不是私有属性，是常规变量

## 类属性，实例属性

    class People:
    ## 定义基本属性
    name = "123"
    age = 50
    ## 定义一个私有属性
    __weight = 10

    ## 初始化实例方法
    def __init__(self, **param):
        self.__weight = 600
        for key, value in param.items():
            self.__setattr__(key, value)
        print("1", self.__dict__)
        print("内部访问",  self.__weight) ## 600

    # 实例化类
    p = People(name='runoob', age=10, __weight=100)
    print("外部访问", p.__weight) ## 100

`name="123"`和`age=50`是类属性，`__weight=10`是私有类属性
`__init__()`初始化函数中定义的属于`实例属性`

类属性和实例属性可以同名，所以当同名时，
外部访问时，调用的是实例属性`__weight`；
内部访问时，调用的是类属性`__weight`

**注意**：这样的行为不是可取的

> `self.__dict__`

获取 self 中的变量；
需要注意的是，若初始化实例方法中没有通过`self.变量`赋值的话，该操作获取到的是`{}`


    def __init__(self, **param):
        print("1", self.__dict__)
    # 其他代码不变

你会发现打印出来的是`{}`，反之通过 `self.变量=值` 之后，能获取到一个字典结果，

另外通过`vars(p)`外部获取类的内部变量也是有同样的情况（这里的p是前面定义的变量`p = People...`）

## 动态赋值

    def __init__(self, **param):
        for key, value in param.items():
            self.__setattr__(key, value)

`**param` 返回的是一个字典类型`<class 'dict'>`
动态赋值时，需留意私有属性，避免出现**类属性**、**实例属性**同名的情况

## 继承

```python
class People:
    def __init__(self):
        pass
        
    def speak(self):
        print("People")

class Student(People):
    def __init__(self):
        super().__init__()
        pass
        
    def speak(self):
        print("Student")
        
s = Student()
s.speak() # Student
```

> 如何继承类？

`class Student(People):` 定义了一个 Student 类，
通过像函数传参一样，将继承目标以实参的方式写入括号中，表示该类继承自 People 类

> 注意事项

被继承的目标需要在初始化函数中书写：`super().__init__()` 表示接受传承；

接受传承时，若存在同名的函数，则以当前类为准；
接受传承时，若存在同名的变量，要留意书写顺序，书写顺序决定了变量是被夺舍还是顺利接受传承；

```python
class People:
    def __init__(self):
        self.name = "张三"
        pass
# ...

class Student(People):
    def __init__(self):
        self.name = "李四"
        super().__init__()

    def speak(self):
        print("Student")
# ...
```
    self.name = "李四"
    super().__init__()

调用 speak 函数时打印：“张三”，若更换一下顺序

    super().__init__()
    self.name = "李四"

调用 speak 函数时则会打印：“李四”
        
### 如果是多类继承呢？（继承多个类）
```python
## 接上面定义的类

class Speaker:
    def __init__(self):
        self.name = "Speaker"
        pass

    def speak(self):
        print("Speaker", self.name)

##class Sample(Speaker, Student):
    ##def __init__(self):
        ### super().__init__()
        ##Speaker.__init__(self)
        ##Student.__init__(self)

s = Sample()
s.speak()
```

**多类继承，若遇到同名，默认调用<mark>传参位置靠前</mark>的父类方法**

> `指定类名.__init__(self)`

    class Sample(Speaker, Student)
        def __init__(self):
        Speaker.__init__(self)
        Student.__init__(self)

`s.speak()`返回：Speaker Student

因为多类继承遇到同名方法默认调用传参位置靠前的父类方法，因此调用的是 Speaker 类的 speak 方法

因为书写顺序的原因，同名变量 name 被 Student 类的同名变量覆盖，所以打印结果为 Speaker Student

> `super().__init__()`

    class Sample(Speaker, Student)
        def __init__(self):
            super().__init__()

`s.speak()`返回：Speaker Speaker

    class Sample(Student, Speaker)
        def __init__(self):
            super().__init__()

`s.speak()`返回：Student Student

该语句可以理解为：

    class Sample(Speaker, Student)
        def __init__(self):
        Student.__init__(self)
        Speaker.__init__(self)



