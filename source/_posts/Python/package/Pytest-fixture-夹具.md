---
title: Pytest-fixture_夹具
date: 2025-10-20 09:50:01
tags: [Python, package, Pytest, fixture（夹具）]
categories:
  - Python
  - package
  - Pytest
  - fixture
---

前置后置，同 `unittest` 的前后置差不多， `fixture` 通过 `@pytest.fixture` 装饰器定义，在测试函数中通过参数名直接调用。

```python
import pytest

# 定义一个夹具：返回测试数据
@pytest.fixture
def test_data():
    return [1, 2, 3]

def test_sum(test_data):
    assert sum(test_data) == 6
```

执行测试时，`pytest` 会自动检测到测试函数需要 `test_data` 夹具，并执行夹具函数，再将结果传入测试函数。

## 夹具的作用范围（Scope）

夹具指定作用范围，控制资源的创建和销毁频率：

| --       | --                   |
|----------|----------------------|
| function | 每个测试函数执行一次           | 
| class    | 每个测试类执行一次            | 
| module   | 每个模块 .py 执行一次        | 
| package  | 每个包执行一次              | 
| session  | 整个测试会话（所有用例执行期间）执行一次 | 

### function：函数前后置（非装饰器情况下）

在函数用例执行前执行 `setup_function`；
在函数用例执行后执行 `teardown_function`;

```python
def setup_function():
    print("## 函数前置执行 ##")

def teardown_function():
    print("## 函数后置执行 ##")

def test_xxx():
    print('123')
```

运行结果如下：

    111.py::test_xxx ## 函数前置执行 ##
    PASSED  [100%]123
    ## 函数后置执行 ##

> 同理可得其他范围的使用

| 方法              | 调用时机      |
|-----------------|-----------|
| setup_class     | **类**执行前  |
| teardown_class  | **类**执行后  |
| setup_module    | **脚本**执行前 |
| teardown_module | **脚本**执行后 |
| setup_method    | **方法**执行前 |
| teardown_method | **方法**执行后 |

```python
import pytest

def setup_module():
    print('这个测试脚本开始执行')
def teardown_module():
    print('这个测试脚本执行结束')

class Test1:
    @classmethod
    def setup_class(cls):
        print('Test1类开始执行测试')
    @classmethod
    def teardown_class(cls):
        print('Test1类结束测试')
    def setup_method(self):
        print('测试方法开始')
    def teardown_method(self):
        print('测试方法结束')
    def test1(self):
        print('测试用例1')
        assert 1==1
    def test2(self):
        print('测试用例2')
        assert 1 == 1

def test3():
    print('测试用例3')
    assert 1 == 1
def test4():
    print('测试用例4')
    assert 1 == 1
```

### 夹具装饰器：@pytest.fixture

```python
@pytest.fixture(scope="session")
def def_connection():
    print('测试方法开始') # 前置
    yield 10 # 夹具的返回值
    print('测试方法结束') # 后置

def test_query(db_connection):
    assert db_connection == "模拟数据库连接"
```

> Q：yeild 的作用是？

`yeild` 关键字用于分隔前置操作和后置操作；

`yeild` 前的代码在测试前执行；

`yeild` 后的代码在测试结束后执行（类似于 `try...finally`）；

yeild 和 return 区别？ yeild 可反复使用，return 不行。

> Q：夹具怎么调用的？

以实参的形式去使用夹具，比如上面代码的夹具 `db_connection`

    def test_query(db_connection)：

当创建了夹具后，一定要塞进去，否则跟没有一样。

## 夹具：嵌套

```python
@pytest.fixture
def user():
    return {"name": "test", "age": 18}

# 依赖 user 夹具
@pytest.fixture
def user_profile(user):
    return f"用户信息：{user['name']}，{user['age']}岁"

def test_profile(user_profile):
    assert user_profile == "用户信息：test，18岁"
```

> 例子2:（有些长）

```python
# fixture夹具参数
# scope，参数作用是表示夹具的作用域，表示方法级function、类级class、模块级module、包级package和会话级session。
import pytest

@pytest.fixture(scope='module') #module级的夹具用于整个脚本，但依然由方法引用，表示由脚本中的第一个方法开始、最后1个方法结束只执行1次
def module_fixture():
    print('module_fixture 测试脚本开始')
    yield
    print('module_fixture 测试脚本结束')

@pytest.fixture(scope='class') #class级的夹具用于测试类，但依然由方法引用，表示由类中的第一个方法开始、最后1个方法结束只执行1次
def class_fixture(module_fixture):
    print('class_fixture 测试类开始')
    yield
    print('class_fixture 测试类结束')

@pytest.fixture(scope='function') #function级的夹具既用于函数，也用于方法，表示引用的每个函数或方法都执行
def method_fixture(class_fixture):
    print('method_fixture 测试用例开始')
    yield
    print('method_fixture 测试用例结束')

@pytest.fixture(scope='function') #function级的夹具既用于函数，也用于方法，表示引用的每个函数或方法都执行
def function_fixture(module_fixture):
    print('function_fixture 测试用例开始')
    yield
    print('function_fixture 测试用例结束')

class Test1:
    def test1(self, method_fixture):
        print('测试用例1')
        assert 1==1
    def test2(self, method_fixture):
        print('测试用例2')
        assert 1==1

def test3(function_fixture):
    print('测试用例3')
    assert 1==1
def test4(function_fixture):
    print('测试用例4')
    assert 1==1
```

![pytest fixture 嵌套](https://origin.picgo.net/2025/10/20/pytest_fixture_310de256c45db29f.png)

从打印结果来看，它和 HTML 十分类似结构

```html
<session>
    <module id="module_fixture">
        <class id="class_fixture">
            <function name="method_fixture">test1</function>
            <function name="method_fixture">test2</function>
        </class>
        
        <div class="function_fixture">test3</div>
        <div class="function_fixture">test4</div>
    </module>
</session>
```