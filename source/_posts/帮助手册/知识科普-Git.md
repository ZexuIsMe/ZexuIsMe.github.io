---
title: git
date: 2025-10-16 16:55:12
tags: [Git, 帮助手册, ssh]
categories:
  - 帮助手册 
---

```python
git init 初始化一个仓库

git add --all 项目全部添加进仓库

git commit -m 'jw1' 提交

git config --global user.email "you@example.com"

git config --global user.name "Your Name"

```

## SSH：生成私钥、公钥

    ssh-keygen

CMD 中键入 ssh-keygen 接着敲4下键盘，一般不会出意外

公钥和私钥按系统分别存放于
① linux：    /root/.ssh
② windows：  C:\Users\admin\.ssh

其中 .ssh
① id_rsa        私钥
② id_rsa.pub    公钥

## 设置公钥

① 如下图所示，在本地找到公钥文件（id_rsa.pub）复制文件其内容，
② 登录 gitee，进入设置界面，（Github 同样如此）
③ 找到 ssh 公钥

![接口自动化测试流程](https://cdn.atstudy.com/lab/manual/16453423549248651.png)

## 验证

① gitee    ssh -T git@gitee.com
② github   ssh -T git@github.com

    Hi XXX! You've successfully authenticated, but GitHub does not provide shell access

验证成功

## 提交仓库：首次提交

    git config --global user.name "你的用户名"
    git config --global user.email "你的邮箱名"

在 gitee 上创建一个仓库，复制其 ssh 代码，再回到命令行


在执行 git add . 之前，若有不需要提交的文件（如缓存、日志），可创建 .gitignore 文件排除

```python
# 添加所有文件到暂存区（. 表示当前目录所有文件）
git add .

# 提交到本地仓库（填写有意义的提交信息，如初始化项目）
git commit -m "init: 初始化项目，添加基础代码"

# 推送本地代码到远程仓库的 master 分支（首次推送加 -u 关联分支）
git push -u origin master
```

## 分支

远程仓库默认分支是 main（而非 master），希望推送时替换为 main的操作

```python
# 重命名本地分支（如果需要）
git branch -M main
# 推送至 main 分支
git push -u origin main
```