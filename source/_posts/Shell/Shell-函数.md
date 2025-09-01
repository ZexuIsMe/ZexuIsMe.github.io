---
title: Shell-函数
date: 2025-09-01 10:03:41
tags: [Shell, 函数]
categories:
  - Shell
  - 函数
---

    格式：
    [ function ] funname [()]
    {
        action;
        [return int;]
    }

注意：
1. function 可做省略
2. return 返回也可做省略，若做省略，则按最后一条命令运行结果作为返回值
   return 语句只能返回一个介于 0~255 之间的**整数**
3. `$?`：获取函数的返回值
    准确的说是，获取上一条命令执行的退出状态码

        #!/bin/bash
        function demoFun1(){
        echo "这是我的第一个 shell 函数!"
        return `expr 1 + 1`
        }
        demoFun1
        echo $? # 2 上一条命令的退出状态码为 2
        echo $? # 0 上一条命令没有退出状态码，故为 0

    Shell 中，数字零表示True，其他数字均为False
4. 所有函数在使用前必须定义，意味着必须将函数放在脚本开始部分，直到Shell解释器首次发现，才可使用
    翻译：Shell 脚本是从下往下逐行执行的，所以无论是变量还是函数，都应该在使用前完成定义赋值或定义函数

## 调用函数

```bash
#!/bin/bash
# author:菜鸟教程
# url:www.runoob.com

demoFun () {
    echo "这是我的第一个 shell 函数!"
}
echo "-----函数开始执行-----"
demoFun
echo "-----函数执行完毕-----"
```

    -----函数开始执行-----
    这是我的第一个 shell 函数!
    -----函数执行完毕-----

## 引用其他 sh 文件

> 格式：source sh文件路径

注意：
1. 每次调用都是重新开始的

> 创建 test_storage.sh
```bash
# test_storage.sh

# !/bin/bash

function temp_fun () {
	echo "input: $1"
}
```

> 创建 test_fun.sh
```bash
# test_run.sh

# !/bin/bash

source ./test_storage.sh

temp_fun 123
```

> 使用

    bash ./test_run.sh
    input: 123



