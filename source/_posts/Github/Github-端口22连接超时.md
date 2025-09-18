---
title: Github-端口22连接超时
date: 2025-08-28 15:26:55
tags: [Github, port22, timeout]
categories:
  - Github 
---

> ssh:connect to host github.com port 22: Connection timed out

1. 右击桌面：Git Bash here
输入：`ssh -T git@github.com `
2. 检查与Github的连接是否正常
得到：`ssh: connect to host github.com port 22: Connection timed out`
3. 进入：C:\Users\admin\.ssh
创建config文件，该文件没有后缀

```txt
Host github.com
User git
Hostname ssh.github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa
Port 443

Host gitlab.com
Hostname altssh.gitlab.com
User git
Port 443
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa
```
只需要第一段内容即可

4. 回到 Bash 界面，输入：`ssh -T git@github.com`
```bash
$ ssh -T git@github.com
Hi ZexuIsMe! You've successfully authenticated, but GitHub does not provide shell access.
```
5. 回到项目，尝试拉去代码



