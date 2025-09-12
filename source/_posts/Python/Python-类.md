---
title: Python-类
date: 2025-09-08 14:56:51
tags: [Python, 类, class, 类方法]
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

## 装饰器：类方法(@classmethod)

**类方法**，必须使用 `@classmethod`

```python
class Abc:
    @classmethod
    def func_1(cls, parameter):
        # command
        return "结果"
```
类方法的第一个参数名必须是`cls`
类方法中，如何调用其他类方法呢？》 `cls.类方法`
类方法中，如何调用或修改类属性呢？》 `cls.类属性`

```python
class Human:
    @classmethod
    def develop(cls):
        print('从猿类发展智人类、再发展到现代人类')
    def shopping(self):
        print('do shopping')

Human.develop() # 从猿类发展智人类、再发展到现代人类
# Human.shopping()  # 类无法运行实例方法
zs = Human()
zs.develop() # 从猿类发展智人类、再发展到现代人类
zs.shopping() # do shopping
```

<mark>类本身只能调用类方法，类属性，如下两段代码很好的证明了这一点</mark>

    Human.develop() # 从猿类发展智人类、再发展到现代人类
    # Human.shopping()  # 类无法运行实例方法

<mark>普通方法可以调用实例方法，实例属性，也可以调用类方法、类属性</mark>

## 装饰器：静态方法（@staticmethod）

```python
class People:
    @staticmethod
    def version(参数名, 参数名):
        print("地球人")
        return "123"
```

该方法可以由类调用，也可由对象调用；
没有强制的第一参数，比如 `cls`, `self` 这种；
**不能直接调用实例属性，实例方法，也不能调用类属性和类方法**（除非显示指定类名）；

因为静态方法本质上是一个独立函数，不属于实例也不属于类本身，不依赖类的状态，因此没有强制书写的第一参数`cls`, `self` 这种

## 私有属性

属性分：公开、受控、私有

受控的属性或方法，以单下划线开头；
因为受控和公开几乎一样，没有感觉到哪里被控制了，所以，很多时候都算作是公开的

```python
class People:
    ## 定义一个私有属性
    __weight = 0

    ## 初始化实例方法
    def __init__(self, n, a, w):
        self.name = n
        self.age = a
        self.__weight = w
```

该属性在类的外部无法直接进行访问

    p = People()
    print(p.__weight)
    ## AttributeError: 'People' object has no attribute '__weight'

如果你非要访问，可以：`print(p._People__weight)` 获取私有属性

私有属性的命名：
- 双下划线`__`构成的算私有属性，如上`__weight`；
- 函数起始以双下划线`def __func():`则是私有函数；
- 注意：`__weight__` 不是私有属性，是常规变量
- 一般情况下，**私有属性外部无法访问** 

## 类属性，实例属性

```python 
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
```

`name="123"`和`age=50`是类属性，`__weight=10`是私有类属性
`__init__()`初始化函数中定义的属于`实例属性`

类属性和实例属性可以同名，所以当同名时，
外部访问时，调用的是实例私有属性`__weight`100；
内部访问时，调用的是类私有属性`__weight`600

> **Q：为什么会这样？**

因为私有属性已经被修改为`_类名__属性名`了，当然访问不到，它把传过去的形参`__weight=100`当做了常规，没有算做属性

**注意**：这样的行为不是可取的

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

### 如何调用父类方法、变量

方法1：`super().父类变量/方法`

    # 调用父类的 __init__() 方法
    super().__init__()
    
方法2：`父类名字.父类变量/方法`

    # 直接使用形参
    class Student(People):
    def __init__(self):
        self.name = "李四"
        People.__init__()

注意：使用形参调用时，没有括号

<span style="font-size=36px; color: var(--error)">×</span>：`People().__init__()`
<span style="font-size=24px; color: var(--success)">√</span>：`People.__init__()`

### 多态

对象的多种形态，对象属于不同的类，但是运行同名方法，执行结果不同，这就是多态

文字描述可能有点抽象，可以结合下面的代码进行理解
```python
class Aaa:
    def func(self):
        print(111)
class Bbb:
    def func(self):
        print(222) 
        
x=Aaa().func()
y=Bbb().func()
```
举例：
```python
# 定义Human类，类中定义move方法，内容是输出"xxx两脚站立直立行走"
# 定义Animal类，类中定义move方法，内容是输出"xxx四脚着地爬着行走"
# 2个类都有构造方法，带有name参数，用于给同名属性赋值
# 提示用户张三是否喝酒，输入y或Y表示喝酒了，否则就是没喝酒，
# 实现如果喝酒了，就运行动物类的move方法，如果没喝酒就运行人类的move方法

class Human:
    def __init__(self, name):
        self.name = name
    def move(self):
        print(f'{self.name}两脚站立直立行走')
class Animal:
    def __init__(self, name):
        self.name = name
    def move(self):
        print(f'{self.name}四脚着地爬着行走')

drinked = input("张三是否喝酒，y或Y表示喝酒了：").lower()
if drinked == 'y':
    zs = Animal('张三')
else:
    zs = Human('张三')
zs.move()
```

## 如何查看类中定义了的变量？

一般情况下，定义一个类后，通过赋值变量的方式让它实例化了，可以通过 print 打印该变量得到确实一串

    <__main__.类 object at 0x000001AC623C6900>

那么我们如何知道类中定义了哪些变量呢？

> 方法一：`vars()`

在外部使用，比如上面的变量p

    p = People("张三", 18, 60)
    print(vars(p))

其打印结果就是 

    {'name': '张三', 'age': 18}

为什么没有私有变量`__weight`，规定是这样的，规定私有变量或方法，外部无法访问。

> 方法二：`object.__dict__`

```python
# ...
def __init__(self, n, a, w):
    self.name = n
    self.age = a
    self.__weight = w
    print(self.__dict__)
# ...
```

其打印结果是

    {'name': '张三', 'age': 18, '_People__weight': 60}

## 如何判断是否存在目标变量或方法呢？

有的时候拿到某些变量时，无法确认里面有没有需要的变量，为了防止出现错误导致代码无法执行，希望做出一些预先判断的操作，以保证后续操作

那么，如何判断是否存在目标变量或方法呢？？？

| 方法                | 使用场景                                               | 返回值            |
|-------------------|----------------------------------------------------|----------------|
| hasattr           | 专门用于检查属性是否存在，最直接                                   | 布尔             |
| getattr           | 适合处理获取属性时但不知道是否存在或发现属性不存在的情况，避免引发 `AttributeError` | 若目标不存在则返回默认值   |
| dir               | **适合批量查看属性**                                       |                |
| `object.__dict__` | **适合批量查看属性**，配合 in 判断属性是否存在于该对象                    | 返回一个关于该对象的字典列表 |
| inspect           | 适合复杂的反射场景                                          ||


> 方法一：`hasattr(obj, '变量名或方法名')`

是 Python 内置函数，用于**检查对象是否具有指定的属性（包括方法）**，返回布尔值 True 或 False。

    hasattr(p, "name")

判断变量p中是否存在 name, 虽然不知道是变量还是方法

    hasattr(p, "getName")

判断变量p中是否存在 getName, 虽然不知道是变量还是方法

对于类的私有变量（以 `__` 开头），由于 Python 的名称修饰机制，需要使用 `_类名__变量名` 的形式才能正确检测。
可以用于**动态判断对象是否具有某个属性**，**常用于避免访问不存在的属性时引发 `AttributeError`。**

那么如何判断是变量还是方法还是其他对象呢？用`type()`判断即可

> 方法二：`getattr`

判断目标是否存在，存在则返回该对象，否则则返回第二参数

    print(getattr(p, "name", None))
    # 输出: Alice（属性存在）

判断变量p中是否存在 name, 虽然不知道是变量还是方法

    print(getattr(p, "getName", None))
    # 输出: None（属性不存在，返回默认值）

判断变量p中是否存在 getName, 虽然不知道是变量还是方法，但是如果是方法

    <bound method People.getName of <__main__.People object at 0x0000025FE0F86900>>

会返回这样的打印结果，

> 方法三：dir()

返回该属性拥有的所有属性，包含私有属性

```
[
    '_People__age123', 
    '__class__', 
    '__delattr__', 
    '__dict__', 
    '__dir__', 
    ...
    '__str__',
    '__subclasshook__', 
    '__weakref__', 
    'age', 
    'getName', 
    'name'    
]
```
配合`in`可判断该对象是否拥有某属性

    print("name" in dir(p)) # True

> 方法四：`object.__dict__`

返回该对象拥有的所有属性，包含私有属性

    print(user.__dict__)
    # {'name': '张三', 'age': 18, '_People__age123': 18}

> 方法五：inspect

    ccc = inspect.getmembers(p)
    print(ccc)

`inspect.getmembers(p)` 该方法返回的是一个含有元组的列表

    [
        ('_People__age123', 18),
        ('__class__', <class '__main__.People'>),
        ....
        ('name', '张三')
    ]





