---
title: Shell-传递参数
date: 2025-08-31 19:48:45
tags: [Shell, 传递参数, 函数]
categories:
    - Shell
    - 传递参数
---

## 传递参数

| --     | 描述                                                                            |
|--------|-------------------------------------------------------------------------------|
| **$#** | 获取参数个数                                                                        |
| **$n** | 参数下标<br/>其中 `$0` 是 `./tesh.sh`                                                |
| $*     | 以一个单字符串显示所有向脚本传递的参数。<br/> 如"$*"用「"」括起来的情况、以"$1 $2 … $n"的形式输出所有参数。             |
| $@     | 与$*相同，但是使用时加引号，并在引号中返回每个参数。<br/> 如"$@"用「"」括起来的情况、以"$1" "$2" … "$n" 的形式输出所有参数。 |
| $$     | 脚本运行的当前进程ID号                                                                  |
| $!     | 后台运行的最后一个进程的ID号                                                               |
| $-     | 显示Shell使用的当前选项，与set命令功能相同。                                                    |
| $?     | 显示最后命令的退出状态。0表示没有错误，其他任何值表明有错误。<br/> 仅对该符号前的一个函数有效，若需要二次调用函数内容，需用变量收集         |

```bash
#!/bin/bash
# author:菜鸟教程
# url:www.runoob.com

echo "-- \$* 演示 ---"
for i in "$*"; do
    echo $i
done

echo "-- \$@ 演示 ---"
for i in "$@"; do
    echo $i
done
```

    $ chmod +x test.sh
    $ ./test.sh 1 2 3
    -- $* 演示 ---
    1 2 3
    -- $@ 演示 ---
    1
    2
    3


> \$* 与 $@ 区别：
- 相同点：都是引用所有参数。
- 不同点：只有在双引号中体现出来。假设在脚本运行时写了三个参数 1、2、3，则 " * " 等价于 "1 2 3"（传递了一个参数），而 "@" 等价于 "1" "2" "3"（传递了三个参数）。

> **$n 需特别留意参数个数**

```bash
#!/bin/bash
# author:菜鸟教程
# url:www.runoob.com

funWithParam(){
    echo "第一个参数为\$1： $1 !"
    echo "第二个参数为\$2：  $2 !"
    echo "第十个参数为\$10：  $10 !"
    echo "第十个参数为\${10}：  ${10} !"
    echo "第十一个参数为 ${11} !"
    echo "参数总数有 $# 个!"
    echo "作为一个字符串输出所有参数 $* !"
}
funWithParam 1 2 3 4 5 6 7 8 9 34 73
```

第 10 个及以后的参数必须用 ${10}, ${11} 这种形式，
否则 Shell 会解析为 $1 后面跟一个 0
（就像示例中的 $10 被解析为 $1 的值 "1" 加 "0"，变成了 "10"）

## 举例：1

```bash
#!/bin/bash 
# test.sh

echo "---------------with double quote ---------------"
echo "$1"
echo "$2"
echo "$3"
my_procedure() {
   echo "$1"
   echo "$2"
   echo "$3"
}
my_procedure "$@"

echo "---------------withtout double quote ---------------"
echo $1
echo $2
echo $3
my_procedure() {
   echo $1
   echo $2
   echo $3
}
my_procedure "$@"
echo "---------------withtout double quote by passing arguments---------------"
my_procedure $@
```
```bash
./test.sh "a b" "c d" "e f"

---------------with double quote ---------------
a b
c d
e f
a b
c d
e f
---------------without double quote ---------------
a
b
c
a
b
c
---------------without double quote by passing arguments---------------
a
b
c
```

with double quote：
函数调用 my_procedure "$@" ， 正确传递了所有参数，保持了原始的三个参数结构

without double quote：
函数调用 my_procedure "$@"，正确传递了所有参数，保持了原始的三个参数结构
但脚本内部`echo $1` 的 `$1` 没有被双引号包裹，将包含空格的参数分割成多个部分，

| $1 | $2 | $3 | $4 | $5 | $6 |
|:--:|:--:|:--:|:--:|:--:|:--:|
| a  | b  | c  | e  | f  | g  |

因此在 `$n` 获取对应下标的参数时

```
$1 a
$2 b
$3 c
```

without double quote by passing arguments
my_procedure $@ 没有被双引号包裹，因为空格的缘故，三个参数变成了6个参数，如下标所示
此时该脚本的参数是6个

| $1 | $2 | $3 | $4 | $5 | $6 |
|:--:|:--:|:--:|:--:|:--:|:--:|
| a  | b  | c  | e  | f  | g  |

## 举例：2

```bash
echo "Hello World !" | grep -e Hello
echo $?
echo "Hello World !" | grep -e Bye
echo $?
```
    Hello World !
    0
    1

很奇怪 `echo "Hello World !" | grep -e Bye` 的输出去哪里了？
因为没有匹配上，没有输出，接着 `echo $?` 输出1，表示命令执行失败，未找到匹配项








