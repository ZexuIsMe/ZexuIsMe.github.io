---
title: Github：快搭博客
date: 2025-06-04 13:48:43
tags: [Hexo]
categories:
   - Github SSH
---

1. 想要一个属于自己的个人网站
2. 不想弄服务器
3. Hexo 就很适合

## 0. Github

创建一个新的项目，名字为 <code>Username.github.io</code>

比如我的名字 ZexuIsMe，那么我的这个仓库命就是<code>ZexuIsMe.github.io</code>

<!-- more --> 

## 1. Node.js

下载并安装它

## 2. Git

下载并安装它

## 3. SSH

<b>注意：</b>如果有用加速器，比如 Steam++，则关掉加速器

### 3.1 生成 SSH

桌面右击，弹窗中选择：“Git Bash Here”

``` bash
ssh-keygen -t rsa -C "你的邮箱地址"
```
接着敲4下键盘，一般不会出意外

### 3.2 使用 SSH

1. C盘 > 用户(User) > MSI（我的电脑名字叫MSI） > .ssh > id_rsa.pub
2. 用记事本打开它并复制里面的内容
3. 进入你的 Github 账号
4. 点击你的头像 > 点击 “Setting” > 页面左侧目录处找到<code>SSH and GPG keys</code>
5. 点击 SSH Keys 出的 “New SSH key”
6. title 名称任意填写
7. 把前面复制的 SSH 粘贴到 <code>Key</code>的输入框中，点击 <code>Add SSH key</code>
8. 进入终端输入命令，检测是否连通
   （注意：如果有用加速器，比如 Steam++，则关掉加速器） 
   （操作完毕后，等待一段时间，给 Github 一些处理的时间）

``` bash
ssh -T git@github.com
```

> 出现以下内容，表示通过
> 
> Hi XXX! You've successfully authenticated, but GitHub does not provide shell access


## 4. Hexo

找一个Hexo创建点，比如在 D盘根目录下，使用任意一种编辑器或者直接操作终端

### 4.1 安装 hexo
``` bash
npm install -g hexo-cli
```

### 4.2 初始化 hexo

``` bash
hexo init Blog
```
Blog是你的项目名

进入项目，运行 npm install，并运行

``` bash
hexo cl; hexo g; hexo s
```
点击终端给出的链接，即可查看当前操作是否正确

### 4.3 安装部署插件

- 一键部署官方文档：https://hexo.io/zh-cn/docs/one-command-deployment

``` bash
npm install hexo-deployer-git --save
```

### 4.4 修改配置信息

进入 <code>_config.yml</code> ，翻到最后替换一下内容

```
deploy:
    type: git
    repository: git@github.com:Username/Username.github.io.git
    branch: main
```

- <code>type</code>：类型设置为 git
- <code>repository</code>，复制 Github 上的 SSH 码即可 
- <code>branch</code>：表示分支为 main

### 4.5 部署

- <b>注意：</b>如果有用加速器，比如 Steam++，则关掉加速器

``` bash
hexo cl; hexo g; hexo d
```

部署完毕后，等待几分钟，输入 “你的Github Username + .github.io” 访问即可，比如：https://ZexuIsMe.github.io

可能会遇到无法访问的问题
1. 换一个浏览器，比如 Edge、夸克
2. 或者关掉你的加速器
3. 或者搭梯子

> Q：为什么仓库中代码只有一点点，只有 public 中的内容 ?

> A：因为 <code>hexo d</code> 的缘故，只传静态资源，也就是 <code>hexo g</code> 生成的 public 文件的内容