---
title: Python-运行windows命令
date: 2025-09-24 14:32:56
tags: [Python, 自动化测试, 模拟点击]
categories:
  - Python
  - 自动化测试
---

【Python】中通过 `os.system` 去执行如CMD的命令

> 准备工作

    import os
    import time

> 比如：移动端的点击操作

    os.system('adb shell input tap x,y')

`x,y`：表示移动端上的坐标

**Q：那么坐标哪里来的呢？**

移动端设置界面进入【开发者模式】
》 开启【指针位置】

> 比如：移动端的输入文本

    os.system('adb shell input text xxx')

`xxx`：表示键入的文本


