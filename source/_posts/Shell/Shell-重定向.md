---
title: Shell-重定向
date: 2025-09-01 11:26:51
tags: [Shell, 重定向]
categories:
  - Shell
  - 重定向
---

| 重定向             | 描述                                                 |
|-----------------|----------------------------------------------------|
| command > file  | 将<mark>输出</mark>重定向到 file                          |
| command < file  | 将<mark>输入</mark>重定向到 file                          |
| command >> file | 以<mark>追加</mark>的方式将输出重定向到 file                    |
| << tag          | 将开始标记 tag 和结束标记 tag 之间的内容作为输入<br/>又叫 Here Document |
| n > file        | 将文件描述符为 n 的文件重定向到 file                             |
| n >> file       | 将文件描述符为 n 的文件以追加的方式重定向到 file                       |
| n >& m          | 将输出文件 m 和 n 合并                                     |
| n <& m          | 将输入文件 m 和 n 合并                                     |

> 文件描述符：

0：标准输入（STDIN）
1：标准输出（STDOUT）
2：标准错误输出（STDERR）
 

## 输出重定向

    who > users.txt && cat users.txt -n

调用who，将who的输出输入到user.txt文件中，若该文件不存在，则会主动创建

## 输入重定向

    wc -l < users.txt

将 users.txt 内容输出作为 wc -l 的执行内容

## Here Document

Here Document 是 Shell 中的一种特殊的重定向方式，用来将输入重定向到一个交互式 Shell 脚本或程序。

    # 格式：
    command << delimiter
        document
    delimiter

它的作用是将两个 delimiter 之间的内容作为输入传递给 command;

**结尾的 delimiter 一定要顶格写，前面不能有任何字符，后面也不能有任何字符，包括空格和 tab 缩进**；
**开始的 delimiter 前后的空格会被忽略掉**

```bash
wc -l << EOF
    欢迎来到
    菜鸟教程
    www.runoob.com
EOF

# 输出 3
```

```bash
cat << EOF
    欢迎来到
    菜鸟教程
    www.runoob.com
EOF

# 输出文本信息
```

## /dev/null文件

若希望执行某个命令后，有不希望在屏幕上显示输出结果，那么可以尝试将内容重定向到 /dev/null 中

    command > /dev/null

`/dev/null` 是一个特殊的文件，写入到它的内容都会被丢弃；
如果尝试从该文件读取内容，那么什么也读不到，会起到“禁止输出”的效果

如果希望屏蔽 stdout 和 stderr ,可以这样写

    command > /dev/null 2>&1

`2>&1`不存在空格，`2>`是一体的时候才表示错误输出
