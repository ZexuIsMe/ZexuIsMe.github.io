---
title: newman
date: 2025-09-19 18:59:15
tags: [Postman, newman, 软件测试, 自动化测试]
categories:
  - Postman
---

需要 **nodejs** 支持，安装后执行 `newman -v` 能看到版本信息则表示 `newman` 是正常的。

它是命令行形式的，意味着可以被自动化工具调用

-------

    newman run 脚本.json 

**此处的 `脚本.json` 是 Postman 导出的项目**

![newman run](https://origin.picgo.net/2025/09/19/newman_rundad4f05d2c5dd801.png)

可通过 shell 中的重定向箭头，将内容输入到指定文件中

    newman run 脚本.json > abc.txt

将执行结果当前目录下的 abc.txt，若文件不存在则自动创建

## newman：常用指令

| newman 指令              | 描述                                                  |
|------------------------|-----------------------------------------------------|
| `--verbose`            | 显示详细日志                                              |
| `--delay-request 3000` | 设置延迟，如3000，表示3秒后执行                                  |
| `-n 3`                 | 表示执行 3 轮                                            |
| `--folder 文件夹名字`       | 运行的指定目录下的接口                                         |
| `-g 文件路径`              | 加入全局变量，使用该路径上的文件导入变量<br/> 文件为 Postman 导出的全局变量json文件 |
| `-e 文件路径`              | 加入环境变量，使用该路径上的文件导入变量<br/> 文件为 Postman 导出的环境变量json文件 |
| `-d 文件路径`              | 加入环境变量，使用该路径上的文件导入参数变量                              |

## newman：输出报告

一般情况下，输出的是命令行形式的报告，同上图所示

    # 默认
    -r cli
    # html 形式的
    -r html
    # html，cli 都要
    # 表示既要 html 文件，也要 cli 输出的报告
    -r html,cli

不能指定路径且会在当前命令所在位置生成一个 `newman` 文件夹，生成的报告就在里面；
`html` 无法将输出指定到文件

```bash
# -r cli
C:\Users\admin>newman run C:\Users\admin\Desktop\aaa.json
# 输出重定向: 覆盖性写入
C:\Users\admin>newman run C:\Users\admin\Desktop\aaa.json > abc.txt
# 输出重定向: 追加性写入
C:\Users\admin>newman run C:\Users\admin\Desktop\aaa.json >> abc.txt

# html
C:\Users\admin>newman run -r html C:\Users\admin\Desktop\aaa.json

# html, cli
C:\Users\admin>newman run -r html,cli C:\Users\admin\Desktop\aaa.json
# html, cli 输出重定向: 覆盖性写入
## 既要又要，生成一份html报告，又将命令行执行的结果输出到 abc.txt 文档中
C:\Users\admin>newman run -r html,cli C:\Users\admin\Desktop\aaa.json > abc.txt
```


















