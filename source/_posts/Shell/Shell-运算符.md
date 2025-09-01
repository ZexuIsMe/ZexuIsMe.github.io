---
title: Shell-运算符
date: 2025-08-31 20:46:04
tags: [Shell, 基本运算符, 关系运算符, 布尔运算符， test命令, 调试技巧]
categories:
  - Shell
  - 运算符
---

## 基本运算符

原生 bash 不支持简单的数学运算，但可通过 awk、expr 完成

expr：表达式计算工具

> 格式：expr 1 + 2

```bash
#!/bin/bash

val=`expr 2 + 2`
echo "两数之和为 : $val"
```

**完整的表达式要被反引号 <code>\` `</code> 包裹**；
**表达式和运算符之间要有空格**；

| 运算符 | 说明                             | 举例                            |
|:---:|--------------------------------|-------------------------------|
|  +  | 加法                             | <code>\`expr $b + $a`</code>  |
|  -  | 减法                             | <code>\`expr $b - $a`</code>  |
|  *  | 乘法<br/>乘法前比如加反斜杠（\）            | <code>\`expr $b \* $a`</code> |
|  /  | 除法                             | <code>\`expr $b / $a`</code>  |
|  %  | 取余                             | <code>\`expr $b % $a`</code>  |
|  =  | 赋值                             | a=$b                          |
| ==  | 相等。<br/>用于比较两个数字，相同则返回 true。   | \[ $a == $b ]，返回值：Boolean     |
|  =  | 不相等。<br/>用于比较两个数字，不相同则返回 true。 | \[ $a != $b ]，返回值：Boolean     |

## test 命令

**可以进行数字、字符、文件这个三方面**
常与 if 结合使用，是Shell 脚本中实现逻辑控制的基础

> 格式：test file 或者 \[ file ]

### test命令：文件测试操作

| 运算符 | 说明        | 举例               |
|:---:|-----------|------------------|
| -e  | 文件是否存在    | \[ -e file.txt ] |
| -f  | 是否是文件     | \[ -f file.txt ] |
| -d  | 是否是目录     | \[ -d file.txt ] |
| -r  | 是否可读      | \[ -r file.txt ] |
| -w  | 是否可写      | \[ -w file.txt ] |
| -x  | 是否可执行     | \[ -x file.txt ] |
| -s  | 文件大小是否大于0 | \[ -s file.txt ] |
| -l  | 是否是符号链接   | \[ -l file.txt ] |

```bash
#!/bin/bash

file="/etc/passwd"

if [ -e "$file" ]; then
    echo "$file 存在"
    if [ -r "$file" ]; then
        echo "并且可读"
    fi
else
    echo "$file 不存在"
fi
```

### test命令：关系运算符

| 运算符 | 说明                                   | 举例                        |
|:---:|--------------------------------------|---------------------------|
| -eq | 检测两个数是否<mark>相等</mark>，相等返回 true     | \[ $a -eq $b ]，返回 Boolean |
| -ne | 检测两个数是否<mark>不相等</mark>，不相等返回 ture   | \[ $a -ne $b ]，返回 Boolean |
| -gt | 检测左边参数是否<mark>大于</mark>右边，是，则返回 true | \[ $a gt $b ]，返回 Boolean  |
| -lt | 检测左边参数是否<mark>小于</mark>右边，...        | \[ $a -lt $b ]，返回 Boolean |
| -ge | 检测左边参数是否<mark>大于等于</mark>右边，...      | \[ $a -ge $b ]，返回 Boolean |
| -lt | 检测左边参数是否<mark>小于等于</mark>右边，...      | \[ $a -le $b ]，返回 Boolean |

```bash
#!/bin/bash
# author:菜鸟教程
# url:www.runoob.com

a=10
b=20

if [ $a -eq $b ]
then
   echo "$a -eq $b : a 等于 b"
else
   echo "$a -eq $b: a 不等于 b"
fi
```
```bash
# 打印结果
10 -eq 20: a 不等于 b
```

### test命令：布尔运算符

| 运算符 | 说明                           | 举例                                    |
|:---:|------------------------------|---------------------------------------|
|  !  | 非运算，同JS一样，参数取反               | \[ ! false ]，返回 true                  |
| -o  | 或运算，一真全真 <br/>等同于 JS 中的 \|\| | \[ $a -lt 20 -o $b -gt 100 ]，返回 true  |
| -a  | 与运算，一假全假 <br/>等同于 JS 中的 &&   | \[ $a -lt 20 -a $b -gt 100 ]，返回 false |

```bash
#!/bin/bash
# author:菜鸟教程
# url:www.runoob.com

a=10
b=20

if [ $a != $b ]
then
   echo "$a != $b : a 不等于 b"
else
   echo "$a == $b: a 等于 b"
fi

if [ $a -lt 100 -a $b -gt 15 ]
then
   echo "$a 小于 100 且 $b 大于 15 : 返回 true"
else
   echo "$a 小于 100 且 $b 大于 15 : 返回 false"
fi
```
```bash
10 != 20 : a 不等于 b
10 小于 100 且 20 大于 15 : 返回 true
```

### test命令：字符串比较

|     运算符      | 说明      | 举例                                 |
|:------------:|---------|------------------------------------|
|    -z str    | 字符串是否为空 | \[ -z “$val1” ]，返回 Boolean         |
|    -n str    | 字符串是否非空 | \[ -n “$val1” ]，返回 Boolean         |
| str1 = str2  | 字符串是否相等 | \[ “$val1” = "$val2" ]，返回 Boolean  |
| str1 != str2 | 字符串是否不等 | \[ “$val1” != "$val2" ]，返回 Boolean |

> **Q：`-z`、`-n` 区别？**

1. 他们都是判空的，判字符长度为零的字符，判是否是未定义的变量
2. 但他们两个正好是相反的，str="123"，
    -z 》 false
    -n 》 true

```bash
#!/bin/bash

read -p "输入用户名: " username

if [ -z "$username" ]; then
    echo "错误：用户名不能为空"
    exit 1
elif [ "$username" = "root" ]; then
    echo "警告：不建议使用root账户"
else
    echo "欢迎, $username"
fi
```

## 逻辑运算符

> 格式：\[\[$a -lt 20 -a $b -gt 100]]

| 运算符  | 说明      | 举例                                         |
|:----:|---------|--------------------------------------------|
|  &&  | 逻辑的 AND | \[\[ $a -lt 100 && $b -gt 100 ]] 返回 false  |
| \|\| | 逻辑的 OR  | \[\[ $a -lt 100 \|\| $b -gt 100 ]] 返回 true |

这里涉及到**高级用法**：`[[]]`，还有专门为数值比较设计的`(())`

## 高级用法：`[[]]`、`(())`

> 双中括号：`[[]]`

- **支持模式匹配**（==）：`[[ "$val1" == *.txt ]]`
- **支持正则表达式**（=\~）： <code>[[ "$val1" =~ ^[0-9]+$ ]]</code>
- 更安全的字符串处理

> 算数比较：`(())`

- 转为数值比较设计：`(( a > b ))`
- 可以不使用 `$` 符号
- 支持更复杂的算数表达式

```bash
# 翻译：判断 $file 变量是否是 txt 文件
if [[ "$file" == *.log ]]; then
    echo "这是日志文件"
fi

if (( $count > 10 )); then
    echo "数量超过10"
fi
```

## 额外：调试技巧

在脚本开头添加 set -x 开启调试模式，或使用 echo 打印测试表达式

```bash
echo "测试表达式: [ $a -eq $b ]"
[ "$a" -eq "$b" ] && echo "成立" || echo "不成立"
```
`"$a" -eq "$b"`
若为真，则输出成立
若为假，则 && 判断为 false，即 `false || echo "不成立"`，遂，输出不成立















