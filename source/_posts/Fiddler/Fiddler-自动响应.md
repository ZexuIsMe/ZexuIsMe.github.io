---
title: Fiddler-自动响应
date: 2025-09-02 16:14:47
tags: [软件测试, Fiddler, 抓包]
categories:
  - Fiddler
---

> 协议：HTTP

1. **将结果保存下来**
![fiddler save response](https://origin.picgo.net/2025/09/02/fiddler_save_response24f718eddd58607e.png)

2. **通过编辑器修改响应内容**
    如下图所示，原文“2696” 》 被替换成了 “<script>alert('11111')</script>”
![fiddler modify response](https://origin.picgo.net/2025/09/02/fiddler_modify_response5c72247cb1e04783.png)
    如下图所示，“<script>alert('11111')</script>” 有28个字符，所以需要补充24个字符，
    因此：26639 + 24 = 26663，将26663替换掉原来的26639
    这一步是必须要做的，否则容易会露出马脚
![fiddler modify length](https://origin.picgo.net/2025/09/02/fiddler_modify_lengthb7c40e7e0f26ca6f.png)

3. **启动自动响应**
![fiddler auto response](https://origin.picgo.net/2025/09/02/fiddler_auto_response2a955d5a3a5b16aa.png)
    点击“Add Rule”时，需留意是否是目标链接，如果不是请修改
4. 选择 “Find a File”：找到之前修改后的响应文件，对其进行添加即可
5. 回到页面指定该链接的调用即可
















