---
title: Fiddler-模拟弱网
date: 2025-09-02 16:56:39
tags: [软件测试, Fiddler, 模拟弱网]
categories:
  - Fiddler
---

【Rules】菜单
》 Custmoize Rules
》 【Edit】
》 【find】
》 输入：request-trickle-delay
```javascript
if (m_SimulateModem) {
    // Delay sends by 300ms per KB uploaded.
    // 延迟发送每上传1KB数据需要300毫秒
    oSession["request-trickle-delay"] = "300"; 
    // Delay receives by 150ms per KB downloaded.
    // 每下载 1 千字节（KB）的数据，接收（数据）的过程就会延迟 150 毫秒（ms）
    oSession["response-trickle-delay"] = "150"; 
}
```
》 修改：`request-trickle-delay` 参数，1000表示1秒，呈现在页面上时，可能会花费2秒左右的时间
》 修改完毕， Ctrl + S 保存
》 回到 Fiddler 界面，点击【Rules】
![fiddler 弱网 start](https://origin.picgo.net/2025/09/02/fiddler__start5bc306d4fdf80456.png)
》 调用链接检查模拟是否生效

请注意：**每次修改都要重新执行一次上图操作**

## 如何验证呢？

> 正常情况下

![fiddler delay 300](https://origin.picgo.net/2025/09/02/fiddler_delay_30070224dafa94b851e.png)

加载完毕，消耗 51ms

> 延迟 1 秒

![fiddler delay 1000png](https://origin.picgo.net/2025/09/02/fiddler_delay_1000png883a5aaa4da62a7f.png)

加载完毕，消耗 5s






