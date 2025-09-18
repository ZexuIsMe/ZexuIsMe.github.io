---
title: Github-双重身份验证
date: 2025-09-18 11:12:33
tags: [Github, 双因素验证]
categories:
  - Github 
---

## 

    ssh -T git@github.com verify

运行 ssh -T git@github.com 命令的作用是验证本地 SSH 密钥与 GitHub 账户的关联状态，

并测试能否通过 SSH 协议成功连接到 GitHub 服务器

    Please provide the following verification token to GitHub Support.
    AMKIZU2F....

只要出现这段内容，表示你的本地 `SSH` 私钥（如 `id_rsa`）与 `GitHub` 账户中添加的公钥（`id_rsa.pub`）匹配
该密钥可用于后续的账户恢复验证

    
