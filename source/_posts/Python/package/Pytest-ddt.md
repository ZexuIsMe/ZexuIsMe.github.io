---
title: Pytest-数据驱动ddt
date: 2025-10-17 16:37:16
tags: [Python, package, Pytest, ddt, 重要掌握]
categories:
  - Python
  - package
  - Pytest
  - ddt
---

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
