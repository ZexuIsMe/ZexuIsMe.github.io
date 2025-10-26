---
title: Appium-滑动
date: 2025-10-21 16:19:02
tags: [Appium, swipe, 滑动, 单双指滑动]
categories:
  - Appium 
  - swipe
---

> 语法

    driver.swipe(start_x, start_y, end_x, end_y, duration=None)

| --       | --       | 描述          |
|----------|----------|-------------|
| start_x  | 起始坐标（X轴） | 屏幕左上角为原点    |
| ...      | ...      | ...         |
| duration | 滑动时长     | 默认0，值越大滑动越慢 |

`duration` 过短可能导致滑动不生效（尤其在性能较差的设备上），建议设置 300-1000 毫秒。

```python
# 获取屏幕宽高
size = driver.get_window_size()

width = size["width"]
height = size["height"]
```

## 若需滑动到某个元素可见，可使用 scroll 方法（针对元素的滑动）

```python
# 从元素 A 滑动到元素 B（使 B 可见）
element_a = driver.find_element(By.ID, "xxx")
element_b = driver.find_element(By.ID, "yyy")
driver.scroll(element_a, element_b, duration=500)
```

> 滑动相关

## 向下滑动（从屏幕中间偏上滑到中间偏下）

```python
# 获取屏幕尺寸（宽、高）
size = driver.get_window_size()
width = size["width"]
height = size["height"]

# 起始点：屏幕中间偏上（X=宽的1/2，Y=高的1/4）
start_x = width / 2
start_y = height / 4

# 结束点：屏幕中间偏下（X=宽的1/2，Y=高的3/4）
end_x = width / 2
end_y = height * 3 / 4

# 滑动（时长 500 毫秒）
driver.swipe(start_x, start_y, end_x, end_y, 500)
```

## 向上滑动（与向下相反）

```python
start_x = width / 2
start_y = height * 3 / 4  # 起始点偏下
end_x = width / 2
end_y = height / 4        # 结束点偏上
driver.swipe(start_x, start_y, end_x, end_y, 500)
```

## 左滑（从右到左）

```python
start_x = width * 3 / 4   # 起始点偏右
start_y = height / 2
end_x = width / 4         # 结束点偏左
end_y = height / 2
driver.swipe(start_x, start_y, end_x, end_y, 500)
```

## 右滑（从左到右）

```python
start_x = width / 4       # 起始点偏左
start_y = height / 2
end_x = width * 3 / 4     # 结束点偏右
end_y = height / 2
driver.swipe(start_x, start_y, end_x, end_y, 500)
```

## 拖动操作-单点触控

滑动操作无法拐弯，拖动操作可以。

![appium drop signle](https://origin.picgo.net/2025/10/21/appium_drop_signlee257d2df422f02c8.png)

| TouchAction(webdriver) | -    |
|------------------------|------|
| press(x=x坐标，y=y坐标)     | 按下   | 
| longpress(坐标，时间)       | 长按   | 
| release()              | 松开   | 
| move_to(坐标)            | 移动   | 
| wait(毫秒)               | 等待时间 |    

以上API  形成运动轨迹，`perform()` 执行轨迹 

```python
from appium import webdriver
from appium.webdriver.common.touch_action import TouchAction

"""
九宫格
(x1, y1)   (x2, y1)   (x3, y1)
(x1, y2)   (x2, y2)   (x3, y2)
(x1, y3)   (x2, y3)   (x3, y3)
"""
x1 = 208
x2 = 360
x3 = 500
y1 = 290
y2 = 433
y3 = 580


(
    TouchAction(webdriver)
     .press(x=x1, y=y1).wait(2000)
     .move_to(x=x3, y=y1).wait(2000)
     .move_to(x=x3, y=y3).wait(2000)
     .move_to(x=x1, y=y3).wait(2000)
     .release()
     .perform()
)

```

【测试包】 随手记.apk

## 拖动操作-多点触控

![appium drop m](https://origin.picgo.net/2025/10/21/appium_drop_m194515cd04a4c187.png)
