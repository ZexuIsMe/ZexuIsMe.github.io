---
title: 自动化测试-Selenium
date: 2025-09-15 16:34:28
tags: [软件测试, 自动化测试，AutoTest]
categories:
  - 软件测试
  - 自动化测试
---

专门为Web应用系统编写的一个验收测试工具。

- 兼容测试：...是否可以很好的工作在不同浏览器和操作系统上
- 功能测试：可以测试Web应用程序的功能，创建回归测试检验软件的功能和用户需求

<!--more-->

【Selenium Gird】很厉害，能实现不同浏览器，不同操作系统同时运行

### Selenium WebDriver

是一个基于 Web 的自动化测试框架，可以测试在各种 Web 浏览器和各种操作系统上的网页。

【安装指令】`pip install selenium`

## Selenium 基本过程

1. 导入需要用到的模块
2. 创建浏览器对象，作用：打开浏览器
3. 打开被测网址
4. 找到要操作的元素
5. 操作这些元素
6. 元素一系列操作，构成了一个业务流程（选作）
7. 作一些关键点的验证（选作）
8. 设置还原点 -- 关闭浏览器

```python
## 创建浏览器对象，作用：打开浏览器

browser = webdriver.Chrome()
browser = webdriver.Firefox()
browser = webdriver.Edge()
```

## 拿到元素后，如何操作元素

| 如何操作元素           | 描述    |
|------------------|-------|
| 元素.text          | 获取文本  |
| 元素.send_keys(内容) | 输入    |
| 元素.click()       | 点击    |
| 元素.clear()       | 清空输入框 |

## 定位模块

    from selenium.webdriver.common.by import By

## 定位方法

【常用的元素定位方法】

1. `By.ID, 'id 值'`
2. `By.NAME, '属性name的值'`
3. `By.CLASS_NAME, '属性class的值'`
4. `By.TAG_NAME, '标签名'`：比如 a, h1 这样的
5. `By.LINK_TEXT, '链接的显示文本'`：以 value 值寻找链接标签，比对标签文本是否一致，是**完全**匹配
6. `By.PARTIAL_LINK_TEXT, '链接处的显示文本（的局部）'` 以 value 值寻找链接标签，是**模糊**匹配
7. `By.XPATH, '路径'`
8. `By.CSS_SELECTOR, '选择器(组合)'`

## 单查找：find_element

【描述】单独查找符合条件的目标元素，若目标不存在，会有异常出现
【返回值】返回页面上符合特征的第一个元素;
【书写】

    变量名 = browser.find_element(By.元素定位特征, 特征的值)

## 批量查找：find_elements

【描述】批量查找符合条件的目标元素，即便目标元素都不存在，也会返回一个空列表
【返回值】以列表的形式返回
【书写】

    列表名=browser.find_elements(By.元素定位特征,"特征的值")

## 3. `By.CLASS_NAME, '属性class的值'`

类名重复率极高，因此选用 `find_elements`

    find_elements(By,CLASS_NAME, value)

其中 value 的值是单个类，即

    find_elements(By.CLASS_NAME, "class_1")

若需是多个类，需是这样编写，可以更加精准的定位目标元素

    find_elements(By.CLASS_NAME, "class_1.class_2.class_3")

注意：**类名与类名之间不要用空格隔开，务必牢记**

## 7. `By.XPATH, '路径'`

运用 xpath语言的路径 定位元素

根据元素的 xpath 表达式来完成定位，可以准确定位任何元素，但需要手链掌握 xpath 语法；

【取巧获取的步骤】可通过开发者工具，然后右击目标DOM 》 复制（Copy） 》 复制（Copy）》
1. 复制 selector（适用于`By.CSS_SELECTOR, '选择器(组合)'`）
2. 复制（Copy） xpath
3. 复制完整的 xpath

【基本语法：绝对路径】 绝对路径起始于 `/`， 每一层都被 `/` 所分割；

    /html/body/div[2]/div[1]/table/tbody/tr/td[2]/table/tbody/tr/td[1]/div/span[1]/input

易获取；
路径信息完全固定，页面稍有变动，若印象到该元素，那么该地址基本上是作废了；

【基本语法：相对路径（推荐）】 路径起始于 `//`，表示任意元素节点层级

    //input[@id='kw' and @class='s_ipt']

【补充】
`*` 匹配任意节点
`/*` 表示根部下的所有节点
`//*` 表示任意位置的所有节点
`父节点/子节点[序号]` 从 1 开始，表示父节点下的第几个字节点

注意：@class='s_ipt'，class 必须是完全匹配的，否则可能会找不到目标元素

## 测试版

    https://seleniumbase.io/demo_page
