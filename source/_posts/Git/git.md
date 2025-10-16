---
title: git
date: 2025-10-16 16:55:12
tags: [Git, 帮助手册, ssh]
categories:
  - Git 
---

```python
git init 初始化一个仓库

git add --all 项目全部添加进仓库

git commit -m 'jw1' 提交

git config --global user.email "you@example.com"

git config --global user.name "Your Name"

```

## SSH 私钥、公钥

    ssh-keygen

CMD 中键入 ssh-keygen 接着敲4下键盘，一般不会出意外

公钥和私钥按系统分别存放于
① linux：    /root/.ssh
② windows：  C:\Users\admin\.ssh

其中 .ssh
① id_rsa        私钥
② id_rsa.pub    公钥

## 设置公钥

> linux + gitee

![接口自动化测试流程](https://cdn.atstudy.com/lab/manual/16453423549248651.png)
