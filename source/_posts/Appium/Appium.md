---
title: Appium
date: 2025-10-18 16:30:28
tags: [Appium, 自动化测试, App]
categories:
  - Appium 
---

本质上可以说是 Selenium 的扩展，或者说是移动版的 Selenium

【Appium 文档】 https://www.kancloud.cn/testerhome/appium_docs_cn/3209426

## 怎么安装的

【前提】 需要 java 1.8

下载地址（阿里云盘）：https://www.alipan.com/s/ZLk5Fbf7h2D
提取码：ae45

安装后，打开软件（软件的打开速度有些慢，耐心等待一下）
》 点击 "Edit Configurations"
》 "Save and Restart"
》 "Restart Now"
》 执行后，软件不会重新运行，需要手动关闭软件（是整个软件关闭掉）

## 举例

```python
import time
from appium import webdriver
from appium.options.android import UiAutomator2Options
from appium.options.common import AppiumOptions

url='http://127.0.0.1:4723/wd/hub'
opts = UiAutomator2Options()
opts.platform_name = 'Android'  #appium运行的设备是安卓，另一个值'iOS'
opts.automation_name = 'UiAutomator2'  #appium运行引擎是UiAutomator2
opts.app_package = 'com.insthub.ecmobile'   #appium运行应用程序的包名
opts.app_activity = '.activity.EcmobileMainActivity'  #appium启动应用程序的活动名

# 该写法兼容性很高
# opts = AppiumOptions()
# opts.load_capabilities({
#     'platformName': 'Android',
#     'platformVersion': '7.1.2',
# })

driver = webdriver.Remote(url, options=opts)
time.sleep(10)
driver.quit()
```

> 这串代码完成了一件什么事儿？

① 规定了URL
② 设置设备为安卓
③ 设置引擎：UiAutomator2
④ 运行指定包
⑤ 打开指定的窗口组件
⑥ 退出

## 如何获取包名

    aapt dump badging apk路径

## abd 的抢占问题

因为 Appium 需要用到 adb 工具来帮助代码的运行

【解决方案】 关掉其他占用 adb 软件

## API

| appium.webdriver          | 返回       | 描述        |
|---------------------------|----------|-----------|
| `.Remote(字典)`             | appium对象 | 创建        |
| `.is_app_installed("包名")` | Bool     | 判断手机是否已安装 |
| `.remove_app("包名")`       | --       | 卸载安装包     |

### appium.webdriver.Remote(url, options=opts)

【参数类型】 字典

| opts            | 类型   | 描述                    |
|-----------------|------|-----------------------|
| platformName    | str  | 手机的操作系统，比如：Android    |
| platformVersion | str  | 手机操作系统的版本，比如：9        |
| deviceName      | str  | 手机或模拟器类型              |
| app             | str  | 安装包的绝对路径              |
| appPackage      | str  | 要运行的 android package  |
| appActivity     | str  | 要启动的 android activity |
| noReset         | bool | 是否首次启动，True，表示是       |

#### Question：关于 deviceName 如何获取的问题

    C:\Users\admin>adb devices
    List of devices attached
    127.0.0.1:59865 device

127.0.0.1:59865 就是你的 deviceName