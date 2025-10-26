---
title: Appium-环境搭建
date: 2025-10-26 18:35:44
tags: [Appium, 环境搭建]
categories:
  - Appium
---

> ① JDK
> ② Python
> ③ Android SDK

![环境搭建.jpg](https://s21.ax1x.com/2025/10/26/pVvohlR.jpg)

## JDK（windows）

下载地址（JDK8）：https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html

![选包](https://s21.ax1x.com/2025/10/26/pVvoom6.png)

- 本地双击执行 exe 文件，进行安装
- 本机环境变量中配置 JAVA_HOME

![环境变量](https://s21.ax1x.com/2025/10/26/pVvo7TO.png)

- 环境变量 path 中，设置 JDK 和 JRE 的 bin 路径
  
![环境变量](https://s21.ax1x.com/2025/10/26/pVvoj1A.png)

## Android SDK

到 https://www.androiddevtools.cn 下载最新版的SDK tools，下载exe版本

![环境变量](https://s21.ax1x.com/2025/10/26/pVvov6I.png)

> 进入安装后的 SDK 目录，双击 `SDK Manager.exe` 文件，在弹出的界面中选择需要安装的内容

![01](https://s21.ax1x.com/2025/10/26/pVvTSnP.png)


![02](https://s21.ax1x.com/2025/10/26/pVvT978.png)

> 选中后点击右下方的安装按钮进行安装，此步骤耗时相对比较长，如下图：

![03](https://s21.ax1x.com/2025/10/26/pVvTPAS.png)

> 环境变量

![SDK 环境变量](https://pic1.imgdb.cn/item/68fe033e3203f7be00a0a37e.png)

在环境变量path中增加三项：

    %ANDROID_HOME%\platform-tools
    
    %ANDROID_HOME%\build-tools\29.0.3
    
    %ANDROID_HOME%\tools

![](https://pic1.imgdb.cn/item/68fe03b33203f7be00a0a3ba.png)

## 安装 Appium 服务端

进入appium官网：http://appium.io/

![](https://pic1.imgdb.cn/item/68fe040d3203f7be00a0a3cb.png)

> 在下载页面中，点击exe文件的下载链接，下载安装包

![](https://pic1.imgdb.cn/item/68fe04343203f7be00a0a3dd.png)

双击执行exe文件进行安装

> 在cmd命令行中执行以下语句：

```bash
pip install selenium

pip install Appium-Python-Client
```

> 其他软件：yaml

```bash
pip install pyyaml
```
