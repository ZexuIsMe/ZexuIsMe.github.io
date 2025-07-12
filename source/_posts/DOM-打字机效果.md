---
title: DOM-打字机效果
date: 2025-06-27 16:54:45
tags: [JavaScript, 打字机效果]
categories:
  - 前端
  - JavaScript
  - 打字机
---

<div style="height: 36px;">
    <div id="c-typewriter"></div>
</div>

<div class="button is-info is-light" onclick="daziji.typeWriter('c-typewriter', '实现打字机效果，也安排上了。', 100)">运行</div>

```javascript
    const str = `Hello, Hello, 啊，已经开始了吗？咳咳，\n
        大家好呀，我叫Tao，或者ZeXu，都是我，不过以前大家都喜欢叫我涛儿，虽然不知道为什么\n
        有的时候我在想，我是不是那种生活能够自理的智力障碍患者，因为实在是真的太像了~~~\n
        兜兜转转，快 7 年了，我的博客终于做出一版了，可喜可贺，期间想法很多，想要的也很多，删除了一版又一版。\n
        不过，从此刻开始，我不用再想这件事儿了，\n
        Emmm，也就是 2025.6-27 14:30 开始，虽然看上去很简陋就是了，但是我很喜欢，它很简洁。\n`
    function typeWriter(elementId, message, speed) {
        const element = document.getElementById(elementId);
        let i = 0; // 当前字符索引
        const interval = setInterval(() => {
            if (i < message.length) {
                element.textContent += message.charAt(i); // 逐字符添加文本
                i++;
            } else {
                clearInterval(interval); // 完成打字后停止间隔调用
            }
        }, speed); // 控制打字速度，例如50毫秒/字符
    }

    // 使用函数
    typeWriter('typewriter', str, 100); // 100毫秒/字符速度
```

```css
    #typewriter {
    width: 100%; /* 根据需要调整宽度 */
    white-space: pre-wrap;
    border-left: 2px solid; /* 打字机光标效果 */
    overflow: hidden; /* 隐藏溢出的文本 */
}
```

- 如果需要换行，<code>white-space: pre-wrap;</code> 和 <code>\n</code> 是必须的
- 另外，字符部分推荐用数组.reduce的方式操作

<script>
    class DaZiJi  {
        constructor() {
            // ...
        }
    
        typeWriter (elementId, message, speed) {
            const element = document.getElementById(elementId);
            element.textContent = ''
            // 当前字符索引
            let i = 0
            const interval = setInterval(() => {
                if (i < message.length) {
                    element.textContent += message.charAt(i); // 逐字符添加文本
                    i++;
                } else {
                    clearInterval(interval); // 完成打字后停止间隔调用
                }
            }, speed); // 控制打字速度，例如50毫秒/字符
        }
    }

    // 使用函数
    const daziji = new DaZiJi()
    daziji.typeWriter('c-typewriter', '实现打字机效果，也安排上了。', 100); // 100毫秒/字符速度
</script>

<style>
    #c-typewriter {
    width: 100%; /* 根据需要调整宽度 */
    white-space: pre-wrap;
    border-left: 2px solid; /* 打字机光标效果 */
    overflow: hidden; /* 隐藏溢出的文本 */
}
</style>