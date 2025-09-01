---
title: Shell-awk
date: 2025-09-01 16:13:03
tags: [Shell, awk]
categories:
  - Shell
---

> 语法：awk \[options] 'pattern {action}' file

```bash
# 打印整行
awk '{ print }' file

# 打印特定列
awk '{ print $1, $2 }' file

# 使用分隔符指定列
awk -F '，' '{ print $1, $2 }' file

# 打印行数
awk '{ print NR, $0 }' file

# 计算列的总和
awk '{ sum += $1 } END { print sum } }' file

# 打印最大值
awk 'max < $1 { max = $1 } END { print max }' file

# 格式化输出
awk '{ printf "%-10s %-10s\n", $1, $2 }' file
```

    # Eg: log.txt
    2 this is a test
    3 Do you like awk
    This's a test
    10 There are orange,apple,mongo


## 设置变量：awk -v

```bash
awk -va= 1 '{ print $1, $1+a }' log.txt

echo "---------------"

awk -va= 1 -vb=s '{ print $1, $1+a, $1b }' log.txt
```
    2 3
    3 4
    This's 1
    10 11
    --------------
    2 3 2s
    3 4 3s
    This's 1 This'ss
    10 11 10s

## 运算符

| 运算符   | 描述   |
|-------|------|
| 空格    | 连接   |
| ^ *** | 求幂   |
| in    | 数组成员 |
| $     | 字段引用 |

过滤第一列大于2的行
```bash
$ awk '$1>2' log.txt    #命令
#输出
3 Do you like awk
This's a test
10 There are orange,apple,mongo
```
过滤第一列等于2的行
```bash
$ awk '$1==2 {print $1,$3}' log.txt    #命令
#输出
2 is
```









