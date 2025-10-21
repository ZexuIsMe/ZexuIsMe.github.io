---
title: Appium-疲劳性测试
date: 2025-10-21 11:26:56
tags: [Appium, 疲劳性测试]
categories:
  - Appium
---

## Python 自动化安装且在被测app指定次数，比如3次

```python
import os.path

from appium import webdriver
from appium.options.common import AppiumOptions

appPackage = 'com.insthub.ecmobile'
apk_path = os.path.join(os.path.dirname(__file__), "ECMobile3.2.apk")

opts = AppiumOptions()
opts.load_capabilities({
    'platformName': 'Android',
    'platformVersion': '7.1.2',
    'deviceName': '127.0.0.1:59865',
    "app": apk_path,
    'appPackage': appPackage,
    'appActivity': '.activity.EcmobileMainActivity',
    'noRest': False
})

for i in range(1, 4):
    driver = webdriver.Remote('http://localhost:4723/wd/hub', options=opts)
    if driver.is_app_installed(appPackage):
        print(f"第{i}次，安装成功")
    else:
        print(f"第{i}次，安装失败")

    print("准备卸载")
    driver.remove_app(appPackage)
    print("卸载成功")
```

【appium】 5.1.2

> 这串代码完成了一件什么事儿？

① 从指定目录安装指定的apk文件，
② 安装完毕后，由于 noReset 设置为False，表示非首次启动，跳过首次启动。
③ 接着调用指定窗口的代码，让对应窗口出现在界面上。
④ 检测安装成功与否，并输出结果
⑤ 安装成功，执行删除