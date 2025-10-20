---
title: Appium-元素定位
date: 2025-10-20 15:29:03
tags: [Appium]
categories:
  - Appium
  - Appium元素定位
---

## 使用模拟器时的注意事项

如果输入框没有搜索按钮，那么不建议用模拟器做，建议使用真机

## 登录操作

```python
import time
from appium import webdriver
from appium.options.android import UiAutomator2Options
from appium.options.common import AppiumOptions
from selenium.webdriver.common.by import By

url='http://127.0.0.1:4723/wd/hub'
opts = UiAutomator2Options()
opts.platform_name = 'Android'  #appium运行的设备是安卓，另一个值'iOS'
opts.automation_name = 'UiAutomator2'  #appium运行引擎是UiAutomator2
opts.app_package = 'com.insthub.ecmobile'   #appium运行应用程序的包名
opts.app_activity = '.activity.EcmobileMainActivity'  #appium启动应用程序的活动名
driver = webdriver.Remote(url, options=opts)


driver.implicitly_wait(10)
# 点击页面底部的导航栏用户图标
driver.find_element(By.ID, "toolbar_tabfour").click()
# 点击页面的用户图标
driver.find_element(By.ID, "profile_head_photo").click()
# 输入账号
driver.find_element(By.ID, "login_name").send_keys("ecshop")
# 输入密码
driver.find_element(By.ID, "login_password").send_keys("ecshop")
# 点击登录
driver.find_element(By.ID, "login_login").click()
# 断言用户信息
user = driver.find_element(By.ID, "profile_head_name")
assert user.text == "ecshop1", user.text
# 等待10秒
time.sleep(10)
# 退出操作
driver.quit()
```

## 按键

回车：driver.key_press(66)