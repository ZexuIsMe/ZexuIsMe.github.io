---
title: Hexo Github Pages 部署
date: 2026-02-02 22:00:00
categories: [技术]
tags: [Hexo, GitHubPages]
---

提供手动部署和自动部署两种方案

<!--more-->

# Hexo Github Pages 部署

## 手动部署

1. 先安装 `hexo-deployer-git` 为 `hexo deploy` 做准备

    npm install hexo-deployer-git --save

2. 修改配置项
    ```yaml
    # URL
    ## Set your site url here. For example, if you use GitHub Page, set url as 'https://username.github.io/project'
    url: https://你的用户名.github.io/
   
   
    # Deployment
    ## Docs: https://hexo.io/docs/one-command-deployment
    deploy:
    type: git
    repository: 把你克隆仓库时用的SSH复制过来
    branch: main2
    ```

3. 使用命令
    ```bash
    npm clean
    npm generate
    npm deploy
    ```

## 自动部署

【Github王炸功能Pages,免费免服务器上线网站,详细教程】 https://www.bilibili.com/video/BV12H4y1N7Q4/?share_source=copy_web&vd_source=342a05120daf6918e5d3a908d53eaa00
