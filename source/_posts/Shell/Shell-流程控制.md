---
title: Shell-流程控制
date: 2025-09-01 09:02:46
tags: [Shell, if语句, for循环, case语句]
categories:
  - Shell
  - 流程控制
---

## if

```bash
a=10
b=20

if [ $a -eq $-b] then
  # command
fi 
# 若在命令行中，可写作一行内容
# if [ $(ps -ef | grep -c "ssh") -gt 1 ]; then echo "true"; fi
```
这里没有 `else if`，只有 `elif`
```bash
if [ $a -eq $-b] then
  echo "相等"
elfi [ $a -gt $-b] then
  echo ">"
else 
  echo "<或其他情况"
fi 
```

若是高级运算符：`(())`,大小与，可直接使用符号形式
```bash
if (( a > b )) then
  # command
fi
```

## for

> 格式：
for 变量 in item1 item2 ... itemN
do
\# command
done

写成一行：
`for var in item1 item2 ... itemN; do command1; command2… done;`

```bash
for loop in 1 2 3 4 5
do
    echo "The value is: $loop"
done
```
The value is: 1
The value is: 2
The value is: 3
The value is: 4
The value is: 5

补充：
```bash
#!/bin/bash
for (( i=1; i<=5; i++)); 
do
    echo "这是第 $i 次调用";
done;
```

## while

> 格式： 
while 条件 do
    # command
done

```bash
#!/bin/bash
int=1
while(( $int<=5 ))
do
    echo $int
    let "int++"
done
```
    # 打印结果
    1
    2
    3
    4
    5

```bash
echo '按下 <CTRL-D> 退出'
echo -n '输入你最喜欢的网站名: '
while read FILM
do
    echo "是的！$FILM 是一个好网站"
done
```
    # 打印结果：
    按下 <CTRL-D> 退出
    输入你最喜欢的网站名:菜鸟教程
    是的！菜鸟教程 是一个好网站

### 无限循环操作

方案一：
    
    while :
    do
        # command
    done
    
方案二：

    while true
    do
        # command
    done

方案三：

    for (( ; ; )) 

## until

    格式：
    until 条件
    do
        # command
    done

条件为 true 时停止；
与 while 循环在处理上刚好相反，
**while 是条件为真继续执行，until 是条件为假时执行**
while 循环优先于 until 循环

```bash
#!/bin/bash

a=0

until [ ! $a -lt 10 ]
do
   echo $a
   a=`expr $a + 1`
done
```

    # 输出结果
    0
    1
    2
    3
    4
    5
    6
    7
    8
    9

## case ... esac

    # 格式：
    case 值 in
        参数1) # command
        ;;
        参数2）# command
        ;;
        *） # command
        ;;
    esac

```bash
echo '输入 1 到 4 之间的数字:'
echo '你输入的数字为:'
read aNum
case $aNum in
    1)  echo '你选择了 1'
    ;;
    2)  echo '你选择了 2'
    ;;
    3)  echo '你选择了 3'
    ;;
    4)  echo '你选择了 4'
    ;;
    *)  echo '你没有输入 1 到 4 之间的数字'
    ;;
esac
```

    输入 1 到 4 之间的数字:
    你输入的数字为:
    3
    你选择了 3


> 字符串匹配

```bash
#!/bin/sh

site="runoob"

case "$site" in
   "runoob") echo "菜鸟教程" 
   ;;
   "google") echo "Google 搜索" 
   ;;
   "taobao") echo "淘宝网" 
   ;;
esac
```

若执行结果雷同可做合并操作
```bash
#!/bin/bash
while :
do
    echo -n "输入 1 到 5 之间的数字:"
    read aNum
    case $aNum in
        1|2|3|4|5) echo "你输入的数字为 $aNum!"
        ;;
        *) echo "你输入的数字不是 1 到 5 之间的! 游戏结束"
            break
        ;;
    esac
done
```

## 跳出循环

【break】：跳出当前循环，并中止循环；
【continue】：跳出当前循环，前往下一个循环；





## 补充