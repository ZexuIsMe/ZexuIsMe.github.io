---
title: AutoTest-unittest-断言
date: 2025-09-16 18:16:40
tags: [软件测试, 自动化测试, 断言, assert, unittest]
categories:
  - 自动化测试
  - 断言
---

【适用场景】
- 检查函数参数的有效性
- 验证程序内部状态的正确性
- 作为开发文档，明确表达代码的假设条件
- 调试时快速定位问题

断言是提高代码可靠性的有效工具，但要注意它不能替代 proper（恰当的、合适的、规范的）错误处理机制，比如 `try except`，参数校验函数等等。

但是话又说回来，对测试来说就是 proper（恰当的、合适的、规范的）错误处理机制

> 语法格式

    assert expression

等价于

    if not expression:
        raise AssertionError
举例:

    assert True # 条件为 True 正常执行
    assert False # 条件为 False 触发异常

也可以紧跟参数

    assert expression [, arguments]

等价于

    if not expression:
        raise AssertionError(arguments)

举例：

    y = -5
    assert y > 0, 'y 必须是正整数'

y > 0 结果为 False，触发异常，抛出异常 `AssertionError：y 必须是正整数`

![python 断言 带参断言](https://origin.picgo.net/2025/09/16/python__d4f201a2655530a8.png)

-----

## 检查两个值是否相等：self.assertEqual()
    
【语法】 `self.assertEqual(a, b, msg=None)`
【描述】 检查两个值是否相等，不匹配则抛出 `msg`参数传入的异常信息

```python
def test_equal(self):
    self.assertEqual(10, 10)  # 成功
    self.assertEqual("hello", "hello")  # 成功
    self.assertEqual(1 + 2, 3)  # 成功
    self.assertEqual([1, 2], [1, 2])  # 成功
```

## 检查两个值是否不相等：self.assertNotEqual()

【语法】 `self.assertNotEqual(a, b, msg=None)`
【描述】 检查两个值是否不相等，不匹配则抛出 `msg`参数传入的异常信息

```python
def test_not_equal(self):
    self.assertNotEqual(10, 20)  # 成功
    self.assertNotEqual("hello", "world")  # 成功
```

## 比较（ < ）：self.assertLess()

【语法】 `self.assertLess(a, b, msg=None)`
【描述】 判断 a 是否小于 b，不匹配则抛出 `msg`参数传入的异常信息

```python
def test_less(self):
    self.assertLess(5, 10)  # 成功（5 < 10）
    self.assertLess("apple", "banana")  # 成功（字符串按字典序比较）
```

## 比较（ > ）：self.assertGreater()

【语法】 `self.assertGreater(a, b, msg=None)`
【描述】 判断 a 是否大于 b，不匹配则抛出 `msg`参数传入的异常信息

```python
def test_greater(self):
    self.assertGreater(10, 5)  # 成功（10 > 5）
    self.assertGreater(len([1,2,3]), 2)  # 成功（3 > 2）
```

## 布尔（Bool 为 True）: self.assertTrue()

【语法】 `self.assertTrue(a, b, msg=None)`
【描述】 判断返回的布尔值是否为真（True），不匹配则抛出 `msg`参数传入的异常信息

```python
def test_true(self):
    self.assertTrue(5 > 3)  # 成功
    self.assertTrue(bool("hello"))  # 成功（非空字符串为 True）
    self.assertTrue(1)  # 成功（非 0 数字为 True）
```

## 布尔（Bool 为 True）: self.assertFalse()

【语法】 `self.assertFalse(a, b, msg=None)`
【描述】 判断返回的布尔值是否为假（False），不匹配则抛出 `msg`参数传入的异常信息

```python
def test_false(self):
    self.assertFalse(5 < 3)  # 成功
    self.assertFalse(bool(""))  # 成功（空字符串为 False）
    self.assertFalse(0)  # 成功（0 为 False）
```

## 判断后者是否包含前者：self.assertIn()

【语法】 `self.assertIn(a, b, msg=None)`
【描述】 判断 a 是否在 b 中，不匹配则抛出 `msg`参数传入的异常信息
【适用场景】 字符串、列表、元组、字典（检查键是否存在）等可迭代对象
    
```python
def test_in(self):
    self.assertIn(2, [1, 2, 3])  # 成功（2 在列表中）
    self.assertIn("ell", "hello")  # 成功（子字符串在字符串中）
    self.assertIn("name", {"name": "Alice", "age": 30})  # 成功（键在字典中）
```

-------

**断言铁律**：

1. 断言不是用于处理运行时错误的，它主要用于调试阶段检查程序的内部一致性；
2. **生产环境**中可能被禁用，当 Python 解释器使用 `-o` 优化选项运行时，所有断言都会被忽略；
3. 不要用断言验证用户输入，应该使用常规的异常处理 `try-except`
4. 断言错误不应该被捕获，如果断言失败，说明程序存在 bug，应该修复而不是忽略；
5. 对于测试人员来说不存在以上铁律


