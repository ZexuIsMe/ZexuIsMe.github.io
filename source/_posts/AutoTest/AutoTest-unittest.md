---
title: Auto-test-unittest
date: 2025-09-16 15:27:50
tags: [自动化测试, unittest, 断言]
categories:
  - 自动化测试
  - unittest
---

一个页面一个测试类；
类命名以 Test 开头；
类必须继承 `unittest.TestCase`；
类中定义的方法必须以 `test_`开头；
如果类中没有一个 `test_` 开头的函数，则终端显示**这是一个空套件**，

```python
## 这样的如果运行会被认为是 空套件
class TestGoogleSearch(unittest.TestCase):

    def setUp(self):
        pass

if __name__ == "__main__":
    unittest.main()
```

其次，若是普通函数，他们会被跳过，可以利用这一特性将复用函数写入其中或通过类继承到其中

## 基本结构

```python
import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By

class TestGoogleSearch(unittest.TestCase):
    # 类级：在整个 TestCase 启动前，以及结束时
    ## 两个方法被自动调用
    @classmethod
    def setUpClass(cls):
        # 如加载或是打开浏览器，设置全局隐士等待时间
        print('测试即将开始！')

    @classmethod
    def tearDownClass(cls):
        # 如关闭浏览器
        print('所有测试结束！')

    # 对象级：类中每个 test_xxx 方法启动前，以及结束时
    ## 两个方法被自动调用
    
    ## test_xxx 启动器前调用
    def setUp(self):
        # 如打开固定的入口地址（或昨晚登录，预置为登录状态）
        print('开始测试')

    ## test_xx 结束时调用
    def tearDown(self):
        # 如退出登录，或清理数据库中的测试数据
        print('结束测试')

if __name__ == "__main__":
    unittest.main()
```

## 执行顺序

![Python unittest 执行顺序](https://origin.picgo.net/2025/09/16/Python_unittest_cbd6c4cd0557e047.md.jpg)

## 模板

```python
# 导入 webdriver
from selenium import webdriver
# 导入 unittest
import unittest

class TestGoogleSearch(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # 定义一个变量接受浏览器,并打开
        browser = webdriver.Edge()
        cls.browser = browser
        # 设置隐式等待，等待时间为10S
        cls.wait = WebDriverWait(browser, 10)
    
    ## test_xxx 启动器前调用
    def setUp(self):
        # 如打开固定的入口地址（或昨晚登录，预置为登录状态）
        self.browser.get('http://172.xxx.111/selenium/myForm.html')
        print('开始测试')
        
    def test_xxx_01(self):
        print('开始测试：test_xxx_01')
        
    def test_xxx_02(self):
        print('开始测试：test_xxx_01')

    ## test_xx 结束时调用
    def tearDown(self):
        # 如退出登录，或清理数据库中的测试数据
        print('结束测试')

    @classmethod
    def tearDownClass(cls):
        # 关闭浏览器
        cls.browser.close()
        print('所有测试结束！')

if __name__ == "__main__":
    unittest.main()
```

## 设置等待

> 导入模块

    # 带入等待模块
    from selenium.webdriver.support.ui import WebDriverWait
    from selenium.webdriver.support import expected_conditions as EC

> setUpClass 中定义 隐式等待

```python
    # ...
    @classmethod
    def setUpClass(cls):
        # 定义一个变量接受浏览器,并打开
        browser = webdriver.Edge()
        cls.browser = browser
        # 设置隐式等待，等待时间为10S
        cls.wait = WebDriverWait(browser, 10)
    # ...
```

> 使用隐式等待

    self.wait.until(EC.title_is('百度一下，你就知道'))

```python
# ...
    # 为 Get 表单提交生成测试方法
    def test_get_form(self):
        # 点击 GET 表单提交后，期望结果去到百度页面

        # 点击 id="id_sub1" 按钮
        self.browser.find_element(By.ID, id).click()

        # 等待标题变为 百度一下，你就知道
        self.wait.until(EC.title_is('百度一下，你就知道'))

        # 期望结果是去到百度页面
        # self.assertEqual(browser.current_url, 'https://www.baidu.com/')
        self.assertEqual(self.browser.title, '百度一下，你就知道')
# ...
```

> **Q：为什么不用 sleep ？**

因为它是强制等待设置的时长，时长没到不会走下去，若使用频繁，会导致测试时间时长增加的很明显。

## 断言

移步：https://zexuisme.github.io/2025/09/16/AutoTest/AutoTest-断言/

## 生成报告

> 准备工作

```python
import os
import unittest
import time
from HTMLTestRunner import HTMLTestRunner   

# 设置测试目标路径
target_dir = os.path.abspath("auto_test/test_xxx")

suite = unittest.defaultTestLoader.discover(
    start_dir=target_dir,
    pattern="test*.py"
)

timestamp = time.strftime("%Y-%m-%d %H_%M_%S")
```

`start_dir`: 运行指定目录下
`pattern`：指定目标文件

> 生成报告

```python
report_file_path = os.path.abspath(f"auto_test/report/我的回归测试报告_{timestamp}.html")
with open(
    file=report_file_path, 
    mode="wb"
) as report_file:
    runner = HTMLTestRunner(
        report_file, 
        verbosity=2, 
        title="测试报告", 
        description="测试结果" 
    )
    runner.run(suite)
print(time.strftime("%Y-%m-%d %H_%M_%S"))
```
