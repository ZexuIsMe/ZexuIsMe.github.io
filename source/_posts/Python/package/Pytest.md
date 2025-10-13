---
title: Pytest
date: 2025-10-13 09:21:35
tags: [Python, AutoTest, package, Pytest]
categories:
  - Python
  - package
---

`pytest` 以简洁的语法，强大的功能和灵活的扩展性而被广泛使用。

相比 Python 内置的 unittest 框架，pytest 编写测试用例更加简洁，支持更多的高级特性。

比如参数化测试、fixture依赖注入、插件扩展等等。

**相对于 unittest 而言，pytest 语法更简洁，无需使用特定类，自带报告，以数据驱动执行用例**

## 安装库

    pip install pytest
    # 安装指定版本
    pip install pytest==版本号

官方文档：https://docs.pytest.org/en/stable/

## 特点

> 语法简洁

测试函数无需集成特定类，以 `test_` 开头即可被识别，测试类以 `Test` 开头，方法以 `test_` 开头。

简洁的报告；

> 自动发现测试用例

递归查找当前目录及子目录中符合命名规范的测试文件

比如 `test_*.py` 或 `*_test.py`

> 丰富的断言

直接使原生断言（比如：`assert a == b, '不等于'`），pytest会自动优化错误提示

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
```

## 测试套

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

```python
import pytest

if __name__ == "__main__":
    ## 运行并输出报告
    pytest.main(["test_用例.py"])
```

## 关于报告

pytest 默认是精简报告

| option |            |
|:------:|------------|
|   -v   | 显示详细输出     |
|   -s   | 支持输出测试日志信息 |

pytest.main(['-v', '-s', 'test__用例.py'])

> 关于报告的举例

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

## <mark>数据驱动（ddt）（核心掌握）</mark>

> 基本结构

```python
import pytest

@pytest.mark.parametrize("参数1, 参数2, ...", [(值1, 值2, ...), (值1, 值2, ...), ...])
def test_func(参数1, 参数2, ...):
    # assert ...
    pass
```

注意：
**参数装饰器中的参数要与函数的形参一致**;
**列表中的数据个数决定了用例的执行次数**;

> 关于如何获取其中参数，等同于如下操作：

```python
for param in ["张三", "李四", "王五"]:
    test_print_username(param)
```

如果没有理解到，请看【ddt：单个参数】的理解，可以加深理解

## ddt: 单个参数

> 常规1

```python
import pytest

@pytest.mark.parametrize("username", ["张三", "李四", "王五"])
def test_print_username(username):
    print(f"当前用户：{username}")

if __name__ == "__main__":
    pytest.main(['jw55.py'])
```
```bash
C:\Users\admin\AppData\Local\Programs\Python\Python313\python.exe C:/Users/admin/AppData/Local/Programs/PyCharm/plugins/python-ce/helpers/pycharm/_jb_pytest_runner.py --path D:\py_work\PythonProject\Seafile\learn\jw55.py 
Testing started at 10:36 ...
Launching pytest with arguments D:\py_work\PythonProject\Seafile\learn\jw55.py --no-header --no-summary -q in D:\py_work\PythonProject\Seafile

============================= test session starts =============================
collecting ... collected 3 items

learn/jw55.py::test_print_username[\u5f20\u4e09] PASSED                  [ 33%]当前用户：张三

learn/jw55.py::test_print_username[\u674e\u56db] PASSED                  [ 66%]当前用户：李四

learn/jw55.py::test_print_username[\u738b\u4e94] PASSED                  [100%]当前用户：王五


============================== 3 passed in 0.02s ==============================

进程已结束，退出代码为 0
```

> 常规2

```python
import pytest
@pytest.mark.parametrize("username, password, expect_res", [("zs@126.com", '123456', True)])
def test_login(username, password, expect_res):
    print(f"用户：{username}，密码：{password}，有效用户：{expect_res}")

if __name__ == "__main__":
    pytest.main(['jw55.py'])
```
```bash
C:\Users\admin\AppData\Local\Programs\Python\Python313\python.exe C:/Users/admin/AppData/Local/Programs/PyCharm/plugins/python-ce/helpers/pycharm/_jb_pytest_runner.py --path D:\py_work\PythonProject\Seafile\learn\jw55.py 
Testing started at 10:59 ...
Launching pytest with arguments D:\py_work\PythonProject\Seafile\learn\jw55.py --no-header --no-summary -q in D:\py_work\PythonProject\Seafile

============================= test session starts =============================
collecting ... collected 1 item

learn/jw55.py::test_login[zs@126.com-123456-True] PASSED                 [100%]用户：zs@126.com，密码：123456，有效用户：True


============================== 1 passed in 0.02s ==============================

进程已结束，退出代码为 0
```
    learn/jw55.py::test_login[zs@126.com-123456-True]

执行时会将用到的参数在输出出来，如上用例执行的是列表中`(zs@126.com,123456,True)`元素


> 常规3：标记参数

```python
import pytest
@pytest.mark.parametrize("num, expected", [
    pytest.param(2, True, id="positive_even"),
    pytest.param(3, False, id="positive_odd"),
    pytest.param(0, False, id="zero")
])
def test_is_even(num, expected):
    assert num == expected
if __name__ == "__main__":
    pytest.main(['jw55.py'])
```
运行时会携带ID，若未通过断言，则会输出参数对应的值，方便排查
```bash
C:\Users\admin\AppData\Local\Programs\Python\Python313\python.exe C:/Users/admin/AppData/Local/Programs/PyCharm/plugins/python-ce/helpers/pycharm/_jb_pytest_runner.py --path D:\py_work\PythonProject\Seafile\learn\jw55.py 
Testing started at 11:26 ...
Launching pytest with arguments D:\py_work\PythonProject\Seafile\learn\jw55.py --no-header --no-summary -q in D:\py_work\PythonProject\Seafile

============================= test session starts =============================
collecting ... collected 3 items

learn/jw55.py::test_is_even[positive_even] 
learn/jw55.py::test_is_even[positive_odd] 
learn/jw55.py::test_is_even[zero] 

========================= 2 failed, 1 passed in 0.14s =========================
FAILED                        [ 33%]
learn\jw55.py:1 (test_is_even[positive_even])
2 != True

预期:True
实际:2
<点击以查看差异>

num = 2, expected = True

    @pytest.mark.parametrize("num, expected", [
        pytest.param(2, True, id="positive_even"),
        pytest.param(3, False, id="positive_odd"),
        pytest.param(0, False, id="zero")
    ])
    def test_is_even(num, expected):
>       assert num == expected
E       assert 2 == True

learn\jw55.py:8: AssertionError
FAILED                         [ 66%]
learn\jw55.py:1 (test_is_even[positive_odd])
3 != False

预期:False
实际:3
<点击以查看差异>

num = 3, expected = False

    @pytest.mark.parametrize("num, expected", [
        pytest.param(2, True, id="positive_even"),
        pytest.param(3, False, id="positive_odd"),
        pytest.param(0, False, id="zero")
    ])
    def test_is_even(num, expected):
>       assert num == expected
E       assert 3 == False

learn\jw55.py:8: AssertionError
PASSED                                 [100%]
进程已结束，退出代码为 1

```

## ddt：多参数

```python
import pytest
@pytest.mark.parametrize("username", ["zs@126.com", "ls@126.com", "ww@126.com"])
@pytest.mark.parametrize("password", ['123', '123456', '123456789'])
@pytest.mark.parametrize("expect_res", [True, False, True])
def test_login(username, password, expect_res):
    print(f"用户：{username}，密码：{password}，有效用户：{expect_res}")

if __name__ == "__main__":
    pytest.main(['jw55.py'])
```

多参数时是笛卡尔积形式的执行，如上，有 3*3*3 合计 27 条用例

```bash
C:\Users\admin\AppData\Local\Programs\Python\Python313\python.exe C:/Users/admin/AppData/Local/Programs/PyCharm/plugins/python-ce/helpers/pycharm/_jb_pytest_runner.py --target learn/jw55.py::test_login 
Testing started at 11:03 ...
Launching pytest with arguments learn/jw55.py::test_login --no-header --no-summary -q in D:\py_work\PythonProject\Seafile

============================= test session starts =============================
collecting ... collected 27 items

learn/jw55.py::test_login[True0-123-zs@126.com] PASSED                   [  3%]用户：zs@126.com，密码：123，有效用户：True

learn/jw55.py::test_login[True0-123-ls@126.com] PASSED                   [  7%]用户：ls@126.com，密码：123，有效用户：True

learn/jw55.py::test_login[True0-123-ww@126.com] PASSED                   [ 11%]用户：ww@126.com，密码：123，有效用户：True

learn/jw55.py::test_login[True0-123456-zs@126.com] PASSED                [ 14%]用户：zs@126.com，密码：123456，有效用户：True

learn/jw55.py::test_login[True0-123456-ls@126.com] PASSED                [ 18%]用户：ls@126.com，密码：123456，有效用户：True

learn/jw55.py::test_login[True0-123456-ww@126.com] PASSED                [ 22%]用户：ww@126.com，密码：123456，有效用户：True

learn/jw55.py::test_login[True0-123456789-zs@126.com] PASSED             [ 25%]用户：zs@126.com，密码：123456789，有效用户：True

learn/jw55.py::test_login[True0-123456789-ls@126.com] PASSED             [ 29%]用户：ls@126.com，密码：123456789，有效用户：True

learn/jw55.py::test_login[True0-123456789-ww@126.com] PASSED             [ 33%]用户：ww@126.com，密码：123456789，有效用户：True

learn/jw55.py::test_login[False-123-zs@126.com] PASSED                   [ 37%]用户：zs@126.com，密码：123，有效用户：False

learn/jw55.py::test_login[False-123-ls@126.com] PASSED                   [ 40%]用户：ls@126.com，密码：123，有效用户：False

learn/jw55.py::test_login[False-123-ww@126.com] PASSED                   [ 44%]用户：ww@126.com，密码：123，有效用户：False

learn/jw55.py::test_login[False-123456-zs@126.com] PASSED                [ 48%]用户：zs@126.com，密码：123456，有效用户：False

learn/jw55.py::test_login[False-123456-ls@126.com] PASSED                [ 51%]用户：ls@126.com，密码：123456，有效用户：False

learn/jw55.py::test_login[False-123456-ww@126.com] PASSED                [ 55%]用户：ww@126.com，密码：123456，有效用户：False

learn/jw55.py::test_login[False-123456789-zs@126.com] PASSED             [ 59%]用户：zs@126.com，密码：123456789，有效用户：False

learn/jw55.py::test_login[False-123456789-ls@126.com] PASSED             [ 62%]用户：ls@126.com，密码：123456789，有效用户：False

learn/jw55.py::test_login[False-123456789-ww@126.com] PASSED             [ 66%]用户：ww@126.com，密码：123456789，有效用户：False

learn/jw55.py::test_login[True1-123-zs@126.com] PASSED                   [ 70%]用户：zs@126.com，密码：123，有效用户：True

learn/jw55.py::test_login[True1-123-ls@126.com] PASSED                   [ 74%]用户：ls@126.com，密码：123，有效用户：True

learn/jw55.py::test_login[True1-123-ww@126.com] PASSED                   [ 77%]用户：ww@126.com，密码：123，有效用户：True

learn/jw55.py::test_login[True1-123456-zs@126.com] PASSED                [ 81%]用户：zs@126.com，密码：123456，有效用户：True

learn/jw55.py::test_login[True1-123456-ls@126.com] PASSED                [ 85%]用户：ls@126.com，密码：123456，有效用户：True

learn/jw55.py::test_login[True1-123456-ww@126.com] PASSED                [ 88%]用户：ww@126.com，密码：123456，有效用户：True

learn/jw55.py::test_login[True1-123456789-zs@126.com] PASSED             [ 92%]用户：zs@126.com，密码：123456789，有效用户：True

learn/jw55.py::test_login[True1-123456789-ls@126.com] PASSED             [ 96%]用户：ls@126.com，密码：123456789，有效用户：True

learn/jw55.py::test_login[True1-123456789-ww@126.com] PASSED             [100%]用户：ww@126.com，密码：123456789，有效用户：True


============================= 27 passed in 0.09s ==============================

进程已结束，退出代码为 0

```





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