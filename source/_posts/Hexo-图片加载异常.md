---
title: Hexo-图片加载异常
date: 2025-06-04 17:27:01
tags: [Hexo, 内嵌图片]
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