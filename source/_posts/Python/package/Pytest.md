---
title: Pytest
date: 2025-10-13 09:21:35
tags: [Python, AutoTest, package, Pytest]
categories:
  - Python
  - package
  - Pytest
---

`pytest` 以简洁的语法，强大的功能和灵活的扩展性而被广泛使用。

相比 Python 内置的 unittest 框架，pytest 编写测试用例更加简洁，支持更多的高级特性。

比如参数化测试、fixture依赖注入、插件扩展等等。

**相对于 unittest 而言，pytest 语法更简洁，无需使用特定类，自带报告，以数据驱动执行用例**，一个函数就是一个测试用例

## 安装库

    pip install pytest
    # 安装指定版本
    pip install pytest==版本号

官方文档：https://docs.pytest.org/en/stable/

## 特点

> 语法简洁

① 测试类必须以 `Test` 开头；
② 测试方法必须以 `test_` 开头；
③ 测试函数无需集成特定类，以 `test_` 开头即可被识别：

简洁的报告；

> 自动发现测试用例

递归查找当前目录及子目录中符合命名规范的测试文件

比如 `test_*.py` 或 `*_test.py`

> 丰富的断言

直接使原生断言（比如：`assert a == b, '不等于'`），pytest会自动优化错误提示

```python
## 当前文件为 jw55.py

import pytest

class TestLearn:
    def test_a(self):
        assert 1==1, '1'
    def test_b(self):
        assert 1==2, '不等'

if __name__ == "__main__":
    pytest.main(['jw55.py'])
```

![pytest report result](https://origin.picgo.net/2025/10/13/pytest_report_result3d7537861f3edc69.md.png)

> fixture 机制

用于管理测试依赖，如初始化资源、前置条件，比如 unittest 的 setup/teardown 更灵活

> <mark>参数化测试</mark>（ddt）

通过 `@pytest.mark.parametrize` 实现多组输入的测试，避免重复代码；
（用 pytest库 的核心需求：数据驱动，也就是 ddt）

> 插件生态

支持数百个插件，如 pytest-cov 生成覆盖率报告、pytest-xdist 并执行测试 

## 入门举例

创建一个名为 test_example.py

```python
def test_add():
    assert 1+2==3
def test_multiply():
    assert 3*4==12
```

运行测试
```bash
pytest test_example.py
# 或是直接 pytest 回车，
# 这样命令会自己在当前目录及其子目录中寻找所有以 test_ 开头的文件执行
```

## 测试类

```python
class TestLogin:
    def setup_class(cls):
        pass
    def setup_method(self):
        pass
```

pytest8以前无需 `method`，之后需要 `_method`;
`setup_class` 等同于 `unittest` 中的 `setUpClass`;
`setup_method` 等同于 `unittest` 中的 `setUp`;

## 如何运行 pytest 执行测试？

除了【入门举例】中的运行方式，还可以：

```python
import pytest

if __name__ == "__main__":
    ## 运行并输出报告
    pytest.main(["test_用例.py"])
```

这里可以用魔法变量操作：`pytest.main(['-s', __file__])`，这样操作也是可以的

### 指定运行测试用例

    pytest 文件::test_函数2 test_函数1

通过双冒号指定运行用例；
指定多个用例通过空格隔开；

> Q：如果是类呢？

    pytest 文件::用例类::用例类中的test_函数

### 常用选项

| option |             |
|:------:|-------------|
|   -v   | 显示详细输出      |
|   -s   | 支持输出测试日志信息  |
| --html | 输出一个报告到指定路径 |
|   -m   | 只运行满足条件的用例  |

`-vs` 强化输出，让输出的内容变得更详细
`--html` 输出一个报告到指定路径

> -m

`-m a and not b ` 表示只运行 a 标签，不会运行含有 b 的测试用例

标签？标签就是 `@pytest.mark.标签名`

```python
@pytest.mark.a
def test_1():
    print('123')
    
@pytest.mark.a
def test_2():
    print('456')
    
@pytest.mark.b
def test_3():
    print('789')
    
@pytest.mark.c
def test_4():
    print('+++')
```

终端中键入：

    pytest -vs test_1.py -m 'a and not b' 
    # 或者
    pytest -vsm 'a and not b' test_1.py


## pytest.ini

**文件名字必须是 pytest.ini**；
**该文件只能放在项目更目录下，不能在包文件下**；
pytest.ini 是用来声明要执行的用例，产出什么报告；
**文件中不能有注释**；

> 配置如何编写

testpath = 用例所在包
python_files = 用例所在文件
python_classes = 指定用例类所在位置
python_functions = 指定用例所在的位置
addopts = 执行报告的位置，比如将报告输出到 report 目录下

```ini
[pytest]
addopts = -s -v --html=report.html
testpath = learn
python_files = jw55.py
```
需要执行 `pip install pytest-html`

`--html=report.html` 报告输出的位置是但当前所在的位置，如下图所示，配置文件位于 learn目录，但是当前处于 Seafile项目目录下，因此生成的报告位于 Seafile 目录下

![pytest ini report](https://origin.picgo.net/2025/10/13/pytest_ini_report3963ceb6206060f2.png)

如果要位于 learn 目录下，则是按当前所在项目位置开始写路径：`./learn/report.html`