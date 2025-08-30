---
title: App-环境搭建和adb命令
date: 2025-08-30 09:34:19
tags: [app, 测试, 环境搭建, abd]
categories:
  - app
  - 测试
---

![app cs](https://origin.picgo.net/2025/08/30/app_cs56abcdefb01bbefa.png)

## 配置环境变量

扎到模拟器安装位置，进入`bin`文件
》复制 bin 所在文件路径
》复制操作执行完完毕后，在bin文件地址栏中，清空内容并输入cmd
》输入 adb 然后回车，检查执行文件
》接着进入系统设置界面
》搜索栏中：环境变量

<img src="https://origin.picgo.net/2025/08/30/app_adb_82a6d1da1b6d7132.png" alt="app adb 环境变量" border="0">

![app adb 环境变量 02](https://origin.picgo.net/2025/08/30/app_adb__02c9061a85e58573b5.png)

》进入环境变量，在任意位置处选择`path`并双击
》点击“新建”，粘贴
》点击“确认”，完成配置
》重新打开一个 cmd 界面，执行adb，检查是否执行成功

## 命令

| --                    | 描述                                    |
|-----------------------|---------------------------------------|
| adb devices           | 查看设备列表                                |
| adb connect ip:port   | Eg: adb connect 127.0.0.1:62001       |
| abd shell             | 从 windows 远程进入安卓系统                    |
|                       | 设备列表只有一个时可用                           |
|                       | 进入后，敲两下回车进入安卓系统                       |
| add -s ip:port shell  | 设备列表存在多个时可用                           |
|                       | 进入后，敲两下回车进入安卓系统                       |
| exit                  | 退出安卓系统                                |
| adb install 地址.apk    | 安装                                    |
| adb uninstall apk包名   | 卸载                                    |
|                       | apk 包名是安卓程序中的名字，位于：/data/data/ 目录下    |

`adb pull download_target download_saved`：下载文件，从app内部导出文件 
`adb push upload_target upload_saved`：上传文件，往app内部传输文件 

## 安卓的四大组件

activity：窗口，交互界面，活动组件

`dumpsys window | grep Focused`：查看当前页面信息
```bash
HWVOG:/ # dumpsys window | grep Focused
    mFocusedWindow=Window{740aa9a u0 com.android.settings/com.android.settings.Settings$DateTimeSettingsActivity}
    mFocusedApp=Token{1422619 ActivityRecord{a9aa160 u0 com.android.settings/.Settings$DateTimeSettingsActivity t3}}
  mFocusedApp=AppWindowToken{11c06de token=Token{1422619 ActivityRecord{a9aa160 u0 com.android.settings/.Settings$DateTimeSettingsActivity t3}}}
```
- `$DateTimeSettingsActivity`：表示当前处于【设置-日期时间】窗口

`am start 位置`：打开指定位置，如上方输出内容中的：`com.android.settings/com.android.settings.Settings`
```bash
HWVOG:/ # am start com.android.settings/com.android.settings.Settings

Starting: Intent { act=android.intent.action.MAIN cat=[android.intent.category.LAUNCHER] cmp=com.android.settings/.Settings }
Warning: Activity not started, its current task has been brought to the front
```
其中Warning信息，表达窗口是处于激活状态的

service：后台服务
`ps | grep -i 服务名`：查看服务
`kill -9 PID`：终止进程，若正好处于进程所在的交互界面，会关闭掉该界面
但，快捷进入方式任然存在，执行时 am start 再次进入不会有 waring 出现，说明界面确实是不存在的，这次执行的 start 是重新打开的新的界面
其实是PID更新了，是一个新的进程了

broadcast receiver：广播消息/通知接收器
比如，三大金刚键
比如：电量过低时的提示

content provider：内容提供者

## 安装 apk

win+R打开CMD
```bash
# abd install apk包路径
C:\Users\admin>adb install D:\apk\ECMobile_10.apk
## apk 可以通过拖拽到CMD界面，快捷输入 apk 路径信息
Success

# 进入安卓系统
C:\Users\admin>adb shell
7[r[999;999H[6n8HWVOG:/ #

# 查看包名
HWVOG:/ # ls /data/app
com.insthub.ecmobile-1  com.tal.kaoyan-1
## -1：防撞标志

# 查看该apk的目录信息
HWVOG:/ # ls /data/data/com.insthub.ecmobile/
cache  code_cache  lib
## 回到模拟器，点击软件运行，再次执行该命令，会发现多了许多文件 
```

> **Q：-1，这是什么意思？**

防撞标志，若安装第二次ecmobile，那么该包的文件名将会是：com.insthub.ecmobile-2
解析：
安装时，创建了一个目录：com.insthub.ecmobile-2
》将原本 -1 目录中的文件转移到 -2 中
》再将 -1 删除
》若再次安装其他版本，
》将原本 -2 目录中的文件转移到 -1 中
》再将 -2 删除


## 卸载 apk

```bash
# 若处于安卓系统中，输入 exit 退出系统
adb uninstall com.insthub.ecmobile
Success

# 进入安卓系统
adb shell
7[r[999;999H[6n8HWVOG:/ #

# 检查包是否还存在
HWVOG:/ # ls /data/app
com.tal.kaoyan-1
```

## 升级安装

adb install -r 更高版本.apk
```bash
C:\Users\admin>adb install -r D:\apk\ECMobile_10.apk
Success

C:\Users\admin>
```

## 上传、下载

adb pull 下载目标 下载保存点
`adb pull /data/data/com.insthub.ecmobile/shared_prefs/DB.xml ./`
- /data.../DB.xml，是下载目标
- ./是当前目录，是下载保存点，是windows所在的当前目录

adb push 上传目标 上传保存点
`adb push .\DB.xml /data/data/com.insthub.ecmobile/shared prefs/DB.xml`
- .\DB.xml，上传目标
- /data.../DB.xml，上传保存点


## logcat：查看日志

| --                    | 描述                                    |
|-----------------------|---------------------------------------|
| **adb logcat** \[选项\] | 不加选项，实时查看日志，ctrl+c 退出                 |
| 参数：-d                 | 查看并退出日志                               |
| 参数：-c                 | 清空日志                                  |
| 参数：-v time            | 带时间显示日志                               |
| 优先级：V（最高）             | 冗长的（）                                 |
| 优先级：D                 | 调试（）                                  |
| 优先级：I                 | 信息（Info）                              |
| 优先级：W                 | 警告（Warn）                              |
| 优先级：E                 | 错误（Error）                             |
| 优先级：F（最低）             | 致命（Fata）                              |
| 参数：-s 标签名：优先级         | -s *:W W级别以上的日志，即只输出 W,E,F            |
| （Shell）logcat \[选项\]  | 同 adb logcat，是Shell环境下使用的，也就是在安卓系统环境下 |

`abd logcat -d > D:\log.txt`: 导出，将日志输出到D盘下的log.txt文件中
`abd logcat | find "F"`: 输出含有“F”的日志行，
- `grep`是不支持的
- 若从windows远程进入安卓系统，执行 logcat，可使用`grep`，但不可用`find`

## 稳定性测试

add shell monkey [选项] 次数

-p：指定打开的包，若没有 -p 会随机打开包
--throttle 毫秒数：表示2个操作之间的间隔时间，若不设置，间隔为0
-v -v -v：日志详细程度，3个V最详细
**--ignore-xxx**：各种忽略异常，如果不忽略异常，容易在出现异常后就不在继续或其他特别的情况
- --ignore-crashes：出现崩溃性错误忽略继续测试
- --ignore-timeouts：出现超时性错误忽略
**--pct-xxx**：各种屏幕操作分布百分比
- --pct-touch
- --pct-motion

`adb shell monkey -v -v -v --throttle 1000 --pct-touch 50 --pct-motion 50 100`
`adb shell monkey -v -v -v --throttle 1000 --ignore-crashes 100`





