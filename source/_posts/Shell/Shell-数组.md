---
title: Shell-数组
date: 2025-08-31 20:15:29
tags: [Shell, 数组]
categories:
  - Shell
  - 数组
---

Shell 数组可以存放多个值；
**只支持一维数组**；
初始化时不需要定义数组大小；
有下标，默认0开始；
**数组参数之间用空格隔开**；
**变量可作为参数写入数组**

> 格式：`array_name=(value1 value2 ... valuen)`

<!--more-->

```bash
#!/bin/bash
# author:菜鸟教程
# url:www.runoob.com

my_array=(A B "C" D)

echo "第一个元素为: ${my_array[0]}"
echo "第二个元素为: ${my_array[1]}"
echo "第三个元素为: ${my_array[2]}"
echo "第四个元素为: ${my_array[3]}"
```

```bash
$ chmod +x test.sh 
$ ./test.sh

第一个元素为: A
第二个元素为: B
第三个元素为: C
第四个元素为: D
```

## 关联数组：declare -A array_name

> 格式：`declare -A array_name=([key1]=value1 [key2]=value2 ... [keyn]=valueN`

```bash
#!/bin/bash

declare -A site=(["google"]="www.google.com" ["runoob"]="www.runoob.com" ["taobao"]="www.taobao.com")

# 遍历所有键值对（待验证）
for key in "${!site[@]}"; do
  echo "$key: ${site[$key]}"
done
```

> 赋值

```bash
declare -A site
site["google"]="www.google.com"
site["runoob"]="www.runoob.com"
site["taobao"]="www.taobao.com"

echo ${site["runoob"]}
```

## 获取参数

> 格式：`${array_name[index]}`

1. 下标（index）：通过下标获取指定位置的参数
2. 星号（*）：将所有值合并为一个字符串
3. 艾特（@）：获取数组 array_name 中所有的值（value），

Q：array_name\[*] 和 array_name\[@] 区别？

@：它能更好地保持每个元素的独立性，尤其在处理包含空格的值时

```bash
declare -A site
site["google"]="www.google.com"
site["runoob"]="www.runoob.com"
site["taobao"]="www.taobao.com"

echo "数组的元素为: ${site[*]}"
echo "数组的元素为: ${site[@]}"
```
```bash
$ chmod +x test.sh 
$ ./test.sh
数组的元素为: www.google.com www.runoob.com www.taobao.com
数组的元素为: www.google.com www.runoob.com www.taobao.com
```

> 获取数组的 key

在数组前加一个感叹号 `!` 可以获取数组的所有键

```bash
declare -A site
site["google"]="www.google.com"
site["runoob"]="www.runoob.com"
site["taobao"]="www.taobao.com"

echo "数组的键为: ${!site[*]}"
echo "数组的键为: ${!site[@]}"
```

```bash
数组的键为: google runoob taobao
数组的键为: google runoob taobao
```

反推，`${!site[0]}` 》 google

> 获取数组长度：#

```bash
#!/bin/bash
# author:菜鸟教程
# url:www.runoob.com

my_array[0]=A
my_array[1]=B
my_array[2]=C
my_array[3]=D

echo "数组元素个数为: ${#my_array[*]}"
echo "数组元素个数为: ${#my_array[@]}"
```
```bash
$ chmod +x test.sh 
$ ./test.sh
数组元素个数为: 4
数组元素个数为: 4
```

## 变量写入数组

```bash
A=1
my_array=($A B C D)
echo "第一个元素为: ${my_array[0]}"
echo "第二个元素为: ${my_array[1]}"
echo "第三个元素为: ${my_array[2]}"
echo "第四个元素为: ${my_array[3]}"

### 打印结果
第一个元素为: 1
第二个元素为: B
第三个元素为: c
第四个元素为: D
```












