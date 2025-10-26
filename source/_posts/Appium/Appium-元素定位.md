---
title: Appium-元素定位
date: 2025-10-20 15:29:03
tags: [Appium, 定位, toast]
categories:
  - Appium
---

- **appium 元素定位不处理XPATH 的绝对定位，只处理 XPATH 的相对定位**
- 【模拟器】如果输入框没有搜索按钮，那么不建议用模拟器做，建议使用真机

> 一般情况下，元素的定位方式和处理方式与Selenium一般无二。

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

或许你已经注意到的了，里面用的是 Selenium 的定位方式，也就是 `By.ID`，这是被允许的。

比如：By.ID


> 那么 appium 中的定位是怎么样的呢？

```python
from appium.webdriver.common.appiumby import AppiumBy

# ...

driver.find_element(AppiumBy.XPATH, "//*[@text='用户名或密码错误']")

```


① 对应安卓应用的 `resource-id` 
② 对应苹果应用的 `accessibilityIdentifier`（需开发者预先设置）

需要留意的是，移动端元素的 resource-id 通常要包含前缀，完整的：com.ecshop.app:id/id值
（已验证，是该说法是正确的）

## 关于 吐司 toast 定位

翻译：页面上显示的提示信息
比如 “用户名或密码错误” 就是 toast

一般情况下这类消息提示都是一闪而过，该怎么捕捉它呢？

```python
from appium.webdriver.common.appiumby import AppiumBy

try:
    driver.find_element(AppiumBy.XPATH, '//*[@text="用户名或密码错误"]')
    print("成功")
excpet:
    print("失败")
```

## 按键

回车：driver.key_press(66)

| 类型       | 键名                   | 描述            | 键值  |
|----------|----------------------|---------------|-----|
| **电话按键** |
| 电话按键     | KEYCODE_CALL         | 拨号键           | 5   |
| 电话按键     | KEYCODE_ENDCALL      | 挂机键           | 6   |
| 电话按键     | KEYCODE_HOME         | 按键Home        | 3   |
| 电话按键     | KEYCODE_MENU         | 菜单键           | 82  |
| 电话按键     | KEYCODE_BACK         | 返回键           | 4   |
| 电话按键     | KEYCODE_SEARCH       | 搜索键           | 84  |
| 电话按键     | KEYCODE_CAMERA       | 拍照键           | 27  |
| 电话按键     | KEYCODE_FOCUS        | 拍照对焦键         | 80  |
| 电话按键     | KEYCODE_POWER        | 电源键           | 26  |
| 电话按键     | KEYCODE_NOTIFICATION | 通知键           | 83  |
| 电话按键     | KEYCODE_MUTE         | 话筒静音键         | 91  |
| 电话按键     | KEYCODE_VOLUME_MUTE  | 扬声器静音键        | 164 |
| 电话按键     | KEYCODE_VOLUME_UP    | 音量增加键         | 24  |
| 电话按键     | KEYCODE_VOLUME_DOWN  | 音量减小键         | 25  |
| **控制按键** |
| 控制按键     | KEYCODE_ENTER        | 回车键           | 66  |
| 控制按键     | KEYCODE_ESCAPE       | ESC键          | 111 |
| 控制按键     | KEYCODE_DPAD_CENTER  | 导航键确定键        | 23  |
| 控制按键     | KEYCODE_DPAD_UP      | 导航键向上         | 19  |
| 控制按键     | KEYCODE_DPAD_DOWN    | 导航键向下         | 20  |
| 控制按键     | KEYCODE_DPAD_LEFT    | 导航键向左         | 21  |
| 控制按键     | KEYCODE_DPAD_RIGHT   | 导航键向右         | 22  |
| 控制按键     | KEYCODE_MOVE_HOME    | 光标移动到开始键      | 122 |
| 控制按键     | KEYCODE_MOVE_END     | 光标移动到末尾键      | 123 |
| 控制按键     | KEYCODE_PAGE_UP      | 向上翻页键         | 92  |
| 控制按键     | KEYCODE_PAGE_DOWN    | 向下翻页键         | 93  |
| 控制按键     | KEYCODE_DEL          | 退格键           | 67  |
| 控制按键     | KEYCODE_FORWARD_DEL  | 删除键           | 112 |
| 控制按键     | KEYCODE_INSERT       | 插入键           | 124 |
| 控制按键     | KEYCODE_TAB          | Tab键          | 61  |
| 控制按键     | KEYCODE_NUM_LOCK     | 小键盘锁          | 143 |
| 控制按键     | KEYCODE_CAPS_LOCK    | 大写锁定键         | 115 |
| 控制按键     | KEYCODE_BREAK        | Break/Pause键  | 121 |
| 控制按键     | KEYCODE_SCROLL_LOCK  | 滚动锁定键         | 116 |
| 控制按键     | KEYCODE_ZOOM_IN      | 放大键           | 168 |
| 控制按键     | KEYCODE_ZOOM_OUT     | 缩小键           | 169 |
| **基本按键** |
| 基本按键     | KEYCODE_0            | 按键'0'         | 7   |
| 基本按键     | KEYCODE_1            | 按键'1'         | 8   |
| 基本按键     | KEYCODE_2            | 按键'2'         | 9   |
| 基本按键     | KEYCODE_3            | 按键'3'         | 10  |
| 基本按键     | KEYCODE_4            | 按键'4'         | 11  |
| 基本按键     | KEYCODE_5            | 按键'5'         | 12  |
| 基本按键     | KEYCODE_6            | 按键'6'         | 13  |
| 基本按键     | KEYCODE_7            | 按键'7'         | 14  |
| 基本按键     | KEYCODE_8            | 按键'8'         | 15  |
| 基本按键     | KEYCODE_9            | 按键'9'         | 16  |
| 基本按键     | KEYCODE_A            | 按键'A'         | 29  |
| 基本按键     | KEYCODE_B            | 按键'B'         | 30  |
| 基本按键     | KEYCODE_C            | 按键'C'         | 31  |
| 基本按键     | KEYCODE_D            | 按键'D'         | 32  |
| 基本按键     | KEYCODE_E            | 按键'E'         | 33  |
| 基本按键     | KEYCODE_F            | 按键'F'         | 34  |
| 基本按键     | KEYCODE_G            | 按键'G'         | 35  |
| 基本按键     | KEYCODE_H            | 按键'H'         | 36  |
| 基本按键     | KEYCODE_I            | 按键'I'         | 37  |
| 基本按键     | KEYCODE_J            | 按键'J'         | 38  |
| 基本按键     | KEYCODE_K            | 按键'K'         | 39  |
| 基本按键     | KEYCODE_L            | 按键'L'         | 40  |
| 基本按键     | KEYCODE_M            | 按键'M'         | 41  |
| 基本按键     | KEYCODE_N            | 按键'N'         | 42  |
| 基本按键     | KEYCODE_O            | 按键'O'         | 43  |
| 基本按键     | KEYCODE_P            | 按键'P'         | 44  |
| 基本按键     | KEYCODE_Q            | 按键'Q'         | 45  |
| 基本按键     | KEYCODE_R            | 按键'R'         | 46  |
| 基本按键     | KEYCODE_S            | 按键'S'         | 47  |
| 基本按键     | KEYCODE_T            | 按键'T'         | 48  |
| 基本按键     | KEYCODE_U            | 按键'U'         | 49  |
| 基本按键     | KEYCODE_V            | 按键'V'         | 50  |
| 基本按键     | KEYCODE_W            | 按键'W'         | 51  |
| 基本按键     | KEYCODE_X            | 按键'X'         | 52  |
| 基本按键     | KEYCODE_Y            | 按键'Y'         | 53  |
| 基本按键     | KEYCODE_Z            | 按键'Z'         | 54  |
| **组合键**  |
| 组合键      | KEYCODE_ALT_LEFT     | Alt+Left      |
| 组合键      | KEYCODE_ALT_RIGHT    | Alt+Right     |
| 组合键      | KEYCODE_CTRL_LEFT    | Control+Left  |
| 组合键      | KEYCODE_CTRL_RIGHT   | Control+Right |
| 组合键      | KEYCODE_SHIFT_LEFT   | Shift+Left    |
| 组合键      | KEYCODE_SHIFT_RIGHT  | Shift+Right   |
