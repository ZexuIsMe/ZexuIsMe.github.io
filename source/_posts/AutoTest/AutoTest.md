---
title: 自动化测试
date: 2025-09-15 09:50:27
tags: [自动化测试, 软件测试]
categories:
  - 自动化测试
---

## 自动化测试的分类：

1. 单元自动化测试：unittest、Pytest、Junit
2. 接口自动化：postman、soupui、JMeter
3. UI/WEB自动化测试：Selenium、Appium

## 自动化测试一般流程

1. 测试计划方案（选取工具）
2. 测试设计（编写测试脚本）
3. 测试执行（有一部分的测试用例，通过运行测试脚本的方式完成）
4. 测试总结

## 时间等待

智能等待-隐式等待

    browser = webdriver.Edge()
    browser.implicitly_wait()

有了它就没有必要设定 `sleep()`

超时抛出异常

智能等待-显示等待

> 引入模块

    from selenium.webdriver.support.wait import WebDriverWait
    from selenium.webdriver.support import expected_conditions as ec

> 创建 WebDriverWait 对象

```python
target = WebDriverWait(
    driver=browser,  # driver:WebDriver对象，表示浏览器实例。
    timeout=5  # timeout:超时的总时长。
)
```

> 针对预期的定位元素，启用条件类 ec, 等待其出现

```python
target.until(ec.presence_of_element_located(
    locator=(By.ID,"ww")  # locator=(元素定位) 》 元素定位：(定位方法,对应的取值)
))
```