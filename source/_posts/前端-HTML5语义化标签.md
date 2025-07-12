---
title: 前端-HTML5语义化标签
date: 2025-07-02 11:13:02
tags: [HTML5语义化标签]
categories:
  - 前端
  - 康复训练计划表
  - HTML5语义化标签
---

Q：什么是语义化标签？
A：语义化标签是能够用于解释文档结构内容的标签就是语义化标签，比如 article 出现的位置就可能是文章或新闻的内容

Q: 为什么要用语义化标签？
A: 一是提高SEO效率；二是能让人相对直观的知道包裹的内容是什么。

Q：能说几个吗？
1. header: 用于呈现页面或章节的介绍性内容，比如title标签，meta关键词定义等等 
2. main: 表示文档的核心内容，具有唯一性，比如说文档的编码格式 
3. aside: 用于描述与内容相关的东西，比如侧边栏，用作目录展示 
4. section: 用于内容的分节，比如一个DIV中做板块切割，A块表示主营业务，B块表示合作伙伴，
5. figure: 用作独立内容，比如图片、代码块、视频、图表等等；`figcaption` 为它添加说明文字 
6. footer: 用于页面或章节底部，如网页版权信息，相关链接等等 
7. time: 用于表示具体的日期或时间，并且可以通过 datetime 属性提供机器可读的格式 
8. nav: 专门用于导航操作，如导航链接、分页导航
9. article: 用作表示独立的、可自成一体的内容，比如博客文章、论坛帖子等等
10. h1~h6: 标题标签，确定内容的层级结构
11. <mark>address</mark>：用作标记联系信息，比如地址、电话、邮件等联系方式
12. <mark>mark</mark>: 用于被标记或高亮的文本，比如引用或参考
    <mark>HTML5</mark>
13. <mark>data</mark>: 将人类可读的内容与机器可读的形式关联，适用于产品编号、分类等
    <data value="394">产品 #394</data>
14. <mark>audio</mark>: 音频标签
15. <mark>video</mark>: 视频标签
16. <mark>source</mark>：一般情况用于video、audio 中表示链接
17. <mark>datalist</mark>: 用于 input 标签，提供预选项
    ```html
    <input list="browsers">
    <datalist id="browsers">
      <option value="Chrome">
      <option value="Firefox">
      <option value="Safari">
    </datalist>
    ```
    <input list="browsers">
    <datalist id="browsers">
      <option value="Chrome">
      <option value="Firefox">
      <option value="Safari">
    </datalist>
18. ruby、rt、rp：标记东亚文字的注音
<ruby>
  漢 <rt>hàn</rt>
  字 <rt>zì</rt>
</ruby>