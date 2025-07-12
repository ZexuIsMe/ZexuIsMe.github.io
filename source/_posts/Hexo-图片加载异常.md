---
title: Hexo-图片加载异常
date: 2025-06-04 17:27:01
tags: [Hexo, 图片加载异常]
categories:
  - 前端
  - Hexo
---

> 结论：页面缓存问题，Ctrl + F5 刷新页面

    ![xxx](文件夹/xxx.jpg)

总的来说，按官网文档描述的操作即可

最新的 Hexo-Cli 已有 <code>hexo-renderer-marked</code>，只需修改配置<code>_config.yml</code>即可

```yaml
post_asset_folder: true
marked:
  prependRoot: true
  postAsset: true
```

接着终端输入命令，重新启动项目

``` bash
hexo server
```

接着：Ctrl + F5 刷新页面，问题解决

---

- hexo-asset-image 
- hexo-asset-img
 
百度搜索的各类帖子中都有提到这两种插件，配合 typora 操作，效果不佳

另外，很好奇 hexo 为什么 typora 有什么直接关联，难道是方便迁移，据说两个格式差不多

