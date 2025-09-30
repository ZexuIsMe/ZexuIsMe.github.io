---
title: 自动化测试-selenium
date: 2025-09-15 16:34:28
tags: [自动化测试, 软件测试, AutoTest]
categories:
  - 自动化测试
  - selenium
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

### 加载驱动器

> 安装驱动器

    pip install webdriver-manager

> 调用

```python
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chorme import ChormeDriverManager 

browser = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
```

## 拿到元素后，如何操作元素

| 获取             | 描述       |
|----------------|----------|
| 元素.text        | 获取文本     |
| 元素.title       | 获取标题     |
| 元素.current_url | 获取当前网址   |
| 元素.tag_name    | 获取元素的标签名 |


| 文本框操作            | 描述    |
|------------------|-------|
| 元素.send_keys(内容) | 输入    |
| 元素.click()       | 点击    |
| 元素.clear()       | 清空输入框 |


| 浏览器操作        | 描述     |
|--------------|--------|
| 元素.get()     | 打开目标网址 |
| 元素.back()    | 后退     |
| 元素.forward() | 前进     |
| 元素.refresh() | 刷新     |

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

## 单查找：find_element

| find_element | --                                             |
|--------------|------------------------------------------------|
| 描述           | 单独查找符合条件的目标元素，若目标不存在，会有异常出现                    |
| 返回值          | 返回页面上符合特征的第一个元素                                |
| 参数1          | By.元素定位特征；                                     |
| 参数2（str）     | value                                          |
| 书写           | ` 变量名 = browser.find_element(By.元素定位特征, 特征的值)` |

## 批量查找：find_elements

| find_elements | --                                            |
|---------------|-----------------------------------------------|
| 描述            | 批量查找符合条件的目标元素，即便目标元素都不存在，也会返回一个空列表            |
| 返回值           | 以列表的形式返回元素                                    |
| 参数1           | By.元素定位特征；                                    |
| 参数2（str）      | value                                         |
| 书写            | `列表名=browser.find_elements(By.元素定位特征,"特征的值")` |

## 截屏：get_screenshot_as_file

| get_screenshot_as_file | --                                             |
|------------------------|------------------------------------------------|
| 描述                     | 截屏操作，保存当前页面的截屏                                 |
| 返回值                    | --                                             |
| 参数1（str）               | "./id02.png"                                   |
| 书写                     | `browser.get_screenshot_as_file("./id02.png")` |

## 下拉表

```python
from selenium.webdriver.support.ui import Select

# 定位下拉列表元素
dropdown_element = driver.find_element(By.ID, "dropdown-id")

# 创建Select对象
select = Select(dropdown_element)

# 通过可见文本选择选项
select.select_by_visible_text("Option 1")

# 通过值选择选项
select.select_by_value("1")

# 通过索引选择选项
select.select_by_index(0)
```

## 单选框、复选框

【is_selected()】 返回布尔，表示是否选中 

```python
# 定位复选框元素
checkbox_element = driver.find_element(By.id, "checkbox-id")

# 如果复选框未被选中，则点击选中
if not checkbox_element.is_selected():
    checkbox_element.click()
```

## 弹窗：switch_to

```python
# 04. 找到目标元素
browser.find_element(By.ID, 'id_btn1').click()

# 切换到弹窗
x_alert = browser.switch_to.alert
# 获取弹窗内容
print(x_alert.text)
sleep(2)
# 点击弹窗的确认
x_alert.accept()
sleep(2)
# 点击弹窗的取消
# x_alert.dismiss()
# sleep(2)

```

## 清空 Cookie

    # 删除所有的cookie信息
    browser.delete_all_cookies()

> SessionStorage 和 LocalStorage 呢？ 没有相关的方法，但可以这样：

```python
# 清理 localStorage
driver.execute_script("window.localStorage.clear();")

# 清理 sessionStorage
driver.execute_script("window.sessionStorage.clear();")

# 验证清理结果
local_storage = driver.execute_script("return window.localStorage.length;")
session_storage = driver.execute_script("return window.sessionStorage.length;")
print(f"localStorage 剩余项数: {local_storage}")
print(f"sessionStorage 剩余项数: {session_storage}")
```

【execute_script】 运行JS脚本文件

## Selenium 练习地址

    https://seleniumbase.io/demo_page
