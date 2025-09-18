---
title: Postman
date: 2025-09-18 11:53:29
tags: [Postman, 软件测试, 接口测试]
categories:
  - Postman 
---

## 变量的使用

    # 用双花括号包裹变量
    {{定义的变量}}

## 变量设置

【前提】 用户已成功登录软件

> 方法一：为某项目统一设置（集合变量）

![postman 定义变量](https://origin.picgo.net/2025/09/18/postman_30197c68ee252ad5.png)

---
> 方法三：环境变量（全局变量）

![postman 全局变量](https://origin.picgo.net/2025/09/18/postman_c96bb4b50957a078.png)

Global 是统一的环境变量设置，可针对某一项目进行定制化的变量是设置

![postman 全局变量 调用](https://origin.picgo.net/2025/09/18/postman__f05b1173045efa42.png)

使用的时候会有 “G” 字样，表示 Global

## Cookie

postman 默认情况下会自动记录 Cookie 信息

![postman cookie](https://origin.picgo.net/2025/09/18/postman_cookie39ab119dbb5df9e7.png)

![postman cookie check](https://origin.picgo.net/2025/09/18/postman_cookie_check5d6c415f0e6d777e.png)
【1】 被记录的IP地址
【2】 被记录的 cookie 信息
【3】 点击可移除目标 cookie

## 脚本

![postman 定义变量 单独设置](https://origin.picgo.net/2025/09/18/postman__6bebddb1c4bb4ed5.png)

分两类脚本：
【前置】 Pre-request 该脚本在请求**执行前**执行
【后置】 Post-response 该脚本在请求**执行后**执行

-------

> 【设置变量】 pm.xxx.set(key, value)

```javascript
// 全局
pm.globals.set(key, value)
// 集合
pm.collectionVariables.set(key, value)
// 环境
pm.environment.set(key, value)
```

【key】 变量名
【value】 参数

修改定义的变量后，也就意味着若要用该变量，需留意参数是否是当前接口需要的参数内容；
若目标变量没有被设置，执行后会自动在对应的集合/环境/全局变量

------
> 【读取变量】 pm.xxx.get(key)

```javascript
// 全局
pm.globals.get(key)
// 集合
pm.collectionVariables.get(key)
// 环境
pm.environment.get(key)
```

------
> 【提取】 提取响应的内容

```javascript
// 以 JSON 文档的方式获取响应
pm.response.json()
// 以 text 文本的方式获取响应
pm.response.text()
```






