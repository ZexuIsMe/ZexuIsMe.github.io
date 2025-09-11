---
title: linux
date: 2025-08-25 11:12:25
tags: [linux,命令]
categories:
  - Linux
---

- 小火车
```
wget -O /etc/yum.repos.d/epel.repo http://mirrors.aliyun.com/repo/epel-7.repo
yum install -y sl
sl
```
- 猫咪：`yum install oneko` 》 `oneke`
- 文字效果：`yum install figlet` 》 `figlet Hello World!`

> 分割线

- `pwd`：打印当前工作目录
- `clear`：清空终端内容
- `tree`：查看当前目录结构
  ![linux tree](https://origin.picgo.net/2025/08/25/linux_treef813edd5786807ef.png)
- `rmdir`：删除目录，且必须是空目录
    `rmdir d5/d5.1/d5.1.1`: 删除 d5.1.1 文件夹
    `rmdir -p d5/d5.1/d5.1.1`：连删，若d5.1.1是空目录，删除；若d5.1是空目录，删除；若d5是空目录，删除
- `cp`：复制 `cp a.txt File_Document`, 把a.txt复制一份到 File_Document 文件夹中

##  ls：获取当前目录信息

- `-h`: 没有隐藏文件的`-a`
- `-R`: 显示目录路径且显示目录下的内容，约等于显示路径且在该路径下执行了`-h`

![linux ls R](https://origin.picgo.net/2025/08/26/linux_ls_R3e866d153dcb07dc.png)

> drwxr-xr-x. 2 root root   18 Aug 26 11:04 20250806

d: 表示当前对象是一个目录

| 首字符 | 描述                |
|-----|-------------------|
| -   | 表示当前对象是**文件**     |
| d   | 表示当前对象是**目录**     |
| l   | 表示当前对象是**符号链接**   |
| b   | **块设备**文件：硬盘      |
| c   | **字符设备**文件：键盘、鼠标等 |
| s   | 套接子文件（socket）     |

后续9位，三三一组：
`rwx`：表示 **所有者** 拥有读（r）写（w）和执行（x）的权限
`r-x`：表示 **所属组（g）** 拥有读（r）和执行（x）的权限
`r-x`：表示 **其他用户（o）** 拥有读（r）和执行（x）的权限

> `ls -all` 和 `ls --all` **不是**⼀个意思。

`-all`：等同于 `-a -l -l`，结尾处的`-l`是错误的，但在系统的允许范围内;
`--all`：等同于 `-a`

- ls file.txt 表示：查找目录是否存在该文件
- `ls file.txt -l`: 查看该文件的的详细信息
- `ls *.txt`：列出该目录中的txt文件
- `ls /root/aistudy/*.txt`：列出该目录中的txt文件，显示的时候会将路径信息带上
  - 比如：`/root/aistudy/file1.txt`; 
  - 比如：`/root/aistudy/file2.txt`; 
  - 比如：`/root/aistudy/file3.txt`; 

> **Q：如何在不前往目标目录的情况下就通过`ls`查看到该目录的内容呢？**
> `ls /root/aistudy -lS`：以长文本格式显示，且降序排序
> 大写字母 S：表示降序
> 小写字母 s：表示升序

## cd：前往

通过输入指令`cd dev` 前往 dev 文件夹，可通过 `Tab` 键补全后续文本
若同目录下存在多个类似文件，如`dev1 dev2 dev3`，多按几次`Tab`键会将这些 dev 开头的文件夹都列出来

## mkdir：创建文件夹

- `mkdir /root/learn`: 若文件夹存在，会提示文件夹已存在
  **若是两级以上的层级创建，需保证中间目录是存在的**，否则会无法顺序执行
- `mkdir -p 文件路径`：创建文件夹，若文件夹存在则不做处理

## rmdir: 删除文件夹

只针对**空目录**

- `rmdir 目录路径`：若对方是空目录，则删除
- `rmdir -p d1/d1.1/d1.1.1`：
  1. 若 d1.1.1 是空目录，则删除
  2. 若 d1.1 是空目录，则删除
  3. 若 d1 是空目录，则删除

## rm：删除

`-f`: 强制删除
`-r`：目录删除
`-i`：删除确认

`rm -rf *`：删除当前目录所有内容且不会有提示
`rm -rf * -i`：删除当前目录所有内容且有提示，会逐个提示你某某是否要进行删除

## vm：编辑模式

语法：`vi 目标文件`

1. 输入完指令后，回车进入编辑状态
2. 若文件不存在，进入编辑状态会主动创建目标文件
3. vm 操作属于对内容的追加，与`cat`的录入即覆盖正好相反（一般而言的情况，也就是单个见头晕）

**编辑模式下：**
`i`：按下字母`i`进入插入模式，`ESC`退出编辑模式；
`s`：按下字母`s`进入插入模式，`ESC`退出编辑模式；
`R`：按下字母`R`进入替换模式，`ESC`退出编辑模式
`:wq`：保存并退出编辑；
`:q!`：不保存且退出编辑；
`dd`：删除当前行
`df`：连续删除
- `4df`: 表示从光标处开始连续删除4行，
- `1:10df`: 与光标无关，表示移除从第一行到第十行的内容
`u`: 撤销

### vm: 显示行号
`:set nu`：显示行号
`:set nonu`：不显示行号

### vm: 另存为
`:w filename`：将当前内容另存为指定路径下的文件
- `:w /root/aistudy/practice_backup.txt`将⽂件另存为 practice_backup.txt

### vm：检索（查询）

编辑模式下输入：`/abc`，意为向下搜寻`abc`

**从光标位置处开始向下**寻找最近的一处`abc`文本所在位置，并定位到该位置
- n：向下寻找
- N：向上寻找

编辑模式下输入：`?abc`，意为向上搜寻`abc`
**从光标位置处开始向上**寻找最近的一处`abc`文本所在位置，并定位到该位置
- n：向上寻找
- N：向下寻找

### yy: 复制

进入编辑模式即可操作，

按两下 `yy` 进入复制模式，以当前光标所在位置为准，复制该行内容，按键`p`执行粘贴操作

## vim：替换文本

|               |                          |
|---------------|--------------------------|
| :s/old/new    | 替换**当前行第一个**“old”为“new”  |
| :s/old/new/g  | 替换**当前行所有**“old”为“new”   |
| :%s/old/new/g | 替换**整个文件所有的**“old”为“new” |

## cat：显示文件内容

语法：`cat file.txt`

1. 多文件输出显示：`cat abc.txt efg.txt`，可以理解为SQL中的`UNION`
2. 若目标文件不存在则会主动帮忙创建文件
3. EOF为写入标记，可自定义内容
4. **对该文件做二次写入会覆盖原内容，且和标记没有关系**（务必记住）
    若你希望是追加写入，那么`cat >> file.txt << EOF ... EOF`

> 参数

`-b`：为内容分配行号，但排除空行，空行没有行号
`-n`：为内容分配行号，有教无类

> 为文件写入内容

```bash
cat > Documents/file.txt << EOF
1. 123
2. 456
3. 789

EOF
```

- EOF为写入标记，可自定义内容
- 对文件进行二次写入会覆盖原有内容，且和标记没有关系

> Q：同为录入：`cat > abc.txt` 通过 `ctrl+d` 保存与前面用标记录入方式什么不同吗？

```
cat > abc.txt
123
456

（ctrl + D，保存输入） 
```
都是覆盖性的文件录入，不同的地方在于使用场景不一样
快捷键的方式适用于少量的文本录入，但在脚本中几乎不用，因为在脚本中无法手动执行快捷键
标记的方式适用于大量的文本录入

> cat -n ./file.txt | head 正确输出前10行内容
>
> cat -n ./file.txt | head 10，错误写法，head异常
>
> cat -n ./file.txt | head +10, 错误写法，head异常
>
> cat -n ./file.txt | head -10, 可以，正确输出前10行
>
> cat -n ./file.txt | head -n -10, 输出倒数10行开始往上的所有行
>
> cat -n ./file.txt | head -n +10, 正确输出前10行

## grep：查找文件内容

参数：
- `-i`：无视大小写，`grep -i "ERROR" file.txt`
- `-n`：分配行号，`grep -n "ERROR" file.txt`
- `-v`：排除掉关键字所在行的其他行，`grep -v "ERROR" file.txt`
- `-C num`：检索目标行且根据数字显示指定行数的上下行，`grep -C 1 "ERROR" file.txt`
- `-A num`：检索目标行且根据数字**往下**显示指定行数的行，`grep -A 1 "ERROR" file.txt`
- `-B num`：检索目标行且根据数字**往上**显示指定行数的行，`grep -B 1 "ERROR" file.txt`
- `-r`：检索目录及其子目录，`grep -r "INFO" dir`

`cat abc.txt | grep "梦想"`： 查询“梦想”，并返回查询结果
`cat abc.txt | head -20`： 显示前20行内容

若要显示行号：`cat abc.txt -b/-n | grep "梦想"`，
注意`|`分隔，你可以尝试一下`cat abc.txt | grep "梦想" -b`
`|`：是管道的意思，查看 abc.txt 的内容且过滤出含“梦想”的词

**`ls -l | grep "^-.* 0 "`**：检索文件且文件大小为0的文件

## head：查看文件头部的内容

语法：`head 文件名 -n`

参数`-num`: 指定显示多少行，从上往下数，默认参数10，即显示10行，第一行到第十行的内容，

`head abc.txt`：显示abc.txt的前10行内容
```bash
[root@localhost aistudy]# head abc.txt
⼈⽣的每⼀步都算数，今天的积累是明天的基⽯。
别让未来的你，讨厌现在不努⼒的⾃⼰。
困难像弹簧，你弱它就强，你强它就弱。
成功的秘诀，在于对⽬标的执着追求。
每⼀个不曾起舞的⽇⼦，都是对⽣命的辜负。
梦想是照亮前⾏道路的灯塔，只要不放弃，终会抵达彼岸。
你若盛开，蝴蝶⾃来；你若精彩，天⾃安排。
抱怨⾝处⿊暗，不如提灯前⾏。
⽣命不是要超越别⼈，⽽是要超越⾃⼰。
再⻓的路，⼀步步也能⾛完；再短的路，不迈开双脚也⽆法到达。
```

## `|`：管道符

**将前一个的输出作为后一个的输入**

前面 head 部分有说到 head 指定若不指定参数默认过滤出前10条记录，那么

> **Q：如何确认是否真的是前10行呢？**
> A：`head abc.txt | cat -n`
（翻译：显示abc.txt文件的前10行内容且标注行号）

```bash
[root@localhost aistudy]# head abc.txt | cat -n
     1	⼈⽣的每⼀步都算数，今天的积累是明天的基⽯。
     2	别让未来的你，讨厌现在不努⼒的⾃⼰。
     3	困难像弹簧，你弱它就强，你强它就弱。
     4	成功的秘诀，在于对⽬标的执着追求。
     5	每⼀个不曾起舞的⽇⼦，都是对⽣命的辜负。
     6	梦想是照亮前⾏道路的灯塔，只要不放弃，终会抵达彼岸。
     7	你若盛开，蝴蝶⾃来；你若精彩，天⾃安排。
     8	抱怨⾝处⿊暗，不如提灯前⾏。
     9	⽣命不是要超越别⼈，⽽是要超越⾃⼰。
    10	再⻓的路，⼀步步也能⾛完；再短的路，不迈开双脚也⽆法到达。
```

注意：
- 管道的使用，需要留意只有一个目标，切勿多个目标
    如：`head abc.txt | cat abc.txt -n`，执行时不会出问题，但也不会有预期结果
- **目标文件需在最前面**使用，因为管道是将前一个的输出作为后一个的输入
    `head | cat abc.txt -n`：<span style="color: var(--error); font-size: 1rem; font-weight: bold">×</span>
    `head abc.txt | cat -n`：<span style="color: var(--success); font-size: 1rem; font-weight: bold">√</span> 

## find

语法：`find 路径 参数 文件名`

在当前目录下寻找 file 开头的文件：`find ./ -name 'file*'`

都是可选参数
`-iname`: 忽略文件大小写字母
`-name`: 
- `-size`: 按大小进行检索，单位：b、k、M、G
    `find ./ -size 0`：查找当前目录大小为0的文件
- `-type f`：（type file）文件类型，`find /home/media_project/ -type f \( -name "*.jpg" -o -name "*.png" \)`
- `-type d`：（type dir）目录类型
- `-mtime -7`：（modify time）7天内修改
- `-mtime +7`：（modify time）7天前修改
- `-empty`：查空，空内容的文件，没有内容的目录，`find ./ -empty`

## 符号链接

> 语法：ln -s 目标文件/目录 符号链接名称

```bash
ln -s /path/to/target target_link  # 绝对路径指向
ln -s ../relative/path target_link  # 相对路径指向（相对当前目录）
```

举例

```bash
# 创建指向文件的符号链接
echo "test" > file.txt
ln -s file.txt file_link  # 创建 file_link 指向 file.txt

# 创建指向目录的符号链接
mkdir docs
ln -s docs docs_link  # 创建 docs_link 指向 docs 目录
```

> 符号链接：**删除** 》 rm 符号链接名称
> 直接使用 rm 命令删除符号链接（注意不要加 /，否则可能误删目标目录）

## chmod：权限操作

1. 只有文件所有者或root用户可以修改文件权限
2. 修改目标权限是要特别小心，错误的权限可能导致系统安全问题
3. 执行权限（x）对目录尤为重要，没有它无法进入该目录

语法：`chmod [选项] 权限 文件/目录`

`R`：递归修改目录及其字内容的权限
`chmod -R 755 /path/to/directory`

### chmod：数字表示法
```
# 所有者: rwx(7), 所属组: r-x(5), 其他: r-x(5)
chmod 755 file.txt  

# 所有者: rw-(6), 所属组: r--(4), 其他: r--(4)
chmod 644 document.pdf  
```
常见组合：
777：读写+执行（rwx、rwx、rwx）
755：常用于可执行文件或目录（rwx、r-x、r-x）
644：常用于普通文件（rw-、r--、r--）

### chmod：符号表示法
通过符号精确指定权限的变更
```bash
# 给所有者添加执行权限
chmod u+x script.sh  

# 移除组的写权限和其他人的读权限
chmod g-w,o-r file.txt  

# 给所有用户设置读写执行权限
chmod a=rwx file.txt  

# 为当前文件的所有权限组添加执行权限
#chmod +x file.txt(该写作有问题)
```
用户符号：u（所有者）、g（所属组）、o（其他）、a（所有）
操作符号：+（添加）、-（移除）、=（设置）

### 修改所有者、分组

> 修改所有者：chown

`chown user2 file.txt`: 更改 file.txt 的所有者为 user2

> 修改所属组：chgrp

`chgrp abc file.txt`：更改 file.txt 的组为 abc

> 特别的 chown user2:abc file.txt

`user2:abc` 同时修改 file.txt 的所有者与组，所有者更改为user2，组更改abc
`user:` 或者`:abc`，两者都是正确的

注意：
1. 只有 root 用户或文件的当前所有者可以使用 chown 或 chgrp
2. 修改所有者时，普通用户只能将文件转让给 root，不能转让给其他用户，而 root 可以转让给任何用户
3. 若要同时修改所有者和所属组：`chown user2:abc file.txt`是更简洁的方式，无需单独使用 chgrp
4. useradd user1 添加用户 user1
5. groupadd g1 添加组 g1

## cp：复制操作

- 参数：`-r`，目录复制 》 `cp aistudy efg -r`
    `cp aistudy abc`：<span style="color: var(--error); font-size: 1rem; font-weight: bold">×</span>
- 参数：`-i`：覆盖：若目标文件已存在则提示是否覆盖
  `cp -i file.txt backup/ # 若backup/file.txt存在，会询问是否覆盖`
- 参数：`-v`：显示复制过程，详细输出
- 参数：`-a`：归档模式，常用用于份（保留文件权限、时间戳等所有属性且递归复制目录）
  `cp -a data/ data_backup`：将data备份一份到 `data_backup` 中，若 `data/*`，则表示将 `data` 目录下的所有文件备份一份到 `data_backup` 中
    若重复执行，会提醒是否覆盖
- 参数：`-u`：仅复制源文件比目标文件新或目标文件不存在的情况，更新复制（翻译：通过-u 复制的内容会跳过没有变动的文件，即目标目录中永远是最新的内容）
  1. `cp -u *.doc docs/`
  2. `cp -ur ./dir ./tem_dir`: 将目录备份一份到tem_dir目录中
- `cp file.text file2.txt`：在当前目录中复制一份`file.txt`并重命名为`file2.txt`
  -  `cp file1.txt /home/user/dir123456789`：dir123456789目录是不存在的，若运行，则会将dir123456789当做是文件，而非目录

- `cp aistudy/* ./abc`
  将`aistudy`的所有内容复制一份至当前文件的`abc`目录中
  若`abc`不存在，则会主动创建

- 复制文件又复制目录：`cp -r file.txt ./dir ./temp_dir` 

## wc：统计

`ls *.txt | wc -l`：统计当前目录中text文件有多少个

## tail：查看文件尾部内容

`-n/num 数字`：查看指定行数
`-f`：动态查看内容
`-F`：循环读取，ctrl + z/c 退出循环读取状态，常用于监控系统的运行日志，会实时更新显示

`tail -n 5/-5 file.log` 显示文件倒数5行的内容
`tail -n +5 file.log` 显示文件第五行以后的内容

## tar: 压缩

压缩命令：`tar -czvf ./test.tar.gz ./tar_practice/*`
压缩文件名：`./test.tar.gz`
被压缩的目标：`tar_practice` 目录下的所有内容

解压命令：`tar -xzvf test.tar.gz -C test_tar/`
`-C 路径`：成对出现，表示指定解压后文件所在目录，若没有则在当前目录

## zip：压缩

压缩：`zip file.zip file.txt file2.txt`
解压：`unzip file.zip -d test_dir`

压缩目录：`zip -r file.zip ./dir`

## date：日期

```bash
# 返回当前日期
date
# Wed Aug 27 17:46:41 CST 2025
# 依次表⽰星期⼏、⽉份、⽇期、时间、时区和年份。

```

## 重启

- `shutdown -r now`：立即重启计算机，命令需要管理员权限才能执行
- `reboot`：重启计算机

## alias 别名

## more：查看大型文件时的分页

## less：分页

more、less 区别？

## 额外补充

- `uname -r`：查看系统内核版本
- `uname -a`：查看系统信息，包括内核版本、发行版信息等等信息
- `mount`: 挂载，将存储设备，如硬盘分区、u盘或远程共享资源挂载到系统指定目录
- `umount`: 用于卸载已挂载的文件系统
- `export`：用于设置或导出系统环境变量
- `env`：查看当前系统已有的环境变量
- `ifconfig`、`ip addr`：网络接口信息
- `lscpu`、`cat /proc/cpuinfo`：CPU信息
- `free -h`：显示内存使用情况

### 创建文件

1. touch
2. vim
3. echo
4. dd
5. cat

**`echo "content" > file.txt`**：
将内容输入到 file.txt，若目标文件不存在，则主动创建；
是覆盖性的写入，不是追加写入
如果希望追加写入，则是`>>`

**dd if=/dev/zero of=/var/test/abc.img bs=1M count=150**

### 重命名

**mv file.txt file2.txt**
**cp file.txt file2.txt**，然后删除 file.txt
**rename file.txt file2.txt \*.txt**：批量修改，详细请百度
**:w 文件名**：在编辑模式下

> 执行可执行文件怎么执行：`./可执行文件`
> python 文件： python abc.py，如果 python 不存在，则 yum install python

### 查看系统中运行的进程可以使用的命令是
- `ps aux`
- `top`
- `htop`

### 可以显示命令的帮助信息
- `<command> --help`：比如：ls --help
- `man <command>`：比如：man ls
- `help <command>`：针对的是 shell 内置，比如 help cd

### 操作：符合条件的批量操作

> 输出内容：> 重定向

`find / -type f -name "host" > ./temp_host`
翻译：寻找系统目录下所有名字是 host 的文件，并将找到的路径信息输入到当前目录下的 temp_host 文件中

> 批量复制：xargs -I {}

`find ./ -type f -size +500k | xargs -I {} cp {} ./target_dir`
翻译：在当前目录下寻找500KB以上的文件并复制到`target_dir`目录中

如果文件名本身含空格或换行符，后续命令，如`xargs`会错误的将其解析为多个文件，`-print0`让find用空字符分割文件名，而空字符在unix文件名中是不允许出现的，因此能准确区分不同文件。
此外，xargs -0 与 -print0 是配套使用的：`find / -type f -name "*.log" -print0 | xargs -0 du -ch`

> 批量复制：`find ./ -type f -size +500k -exec cp {} ./target_dir \`;

`（空格）\;`是必须的

### whoami、who、users

> whoami：直接输出当前登录的用户名，他获取的是当前Shell环境中有效的用户身份

> who：输出当前登录到系统的所有用户的详细信息，

会列出
- 用户名
- 终端设备：用户通过哪个终端或远程连接登录
- 登录时间
- 从何处登录：如果是远程登录，会显示远程主机地址
- who命令读取的是`var/run/utmp`文件，该文件记录了当前登录用户的详细信息

```bash
user1  pts/0        2025-08-28 15:10 (192.168.1.100)
user2  pts/1        2025-08-28 15:15 (192.168.1.101)
```
user1 通过 pts/0 终端在 2025 年 8 月 28 日 15:10 从 192.168.1.100 远程登录，
user2 通过 pts/1 终端在 2025 年 8 月 28 日 15:15 从 192.168.1.101 远程登录

> users：直接输出单签登录到系统的所有用户的用户名列表，没有其他的额外输出


### 修改文件时间

### su、sudo区别？

### 关机

### 重启

### 替换文本

`sed 's/old/newg' file`：替换文本，输出被替换后的样子且不影响原文本

### 创建指定大小的文件

    dd if=/div/zero of="文件路径/文件名.扩展名" bs=1M count=150

