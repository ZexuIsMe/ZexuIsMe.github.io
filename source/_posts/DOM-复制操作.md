---
title: 复制操作
date: 2025-07-01 09:47:25
tags: [JavaScript, 复制（Copy）]
categories:
  - 前端
  - JavaScript
  - 复制（Copy）
---

复制操作一般分两种，一种是带格式复制，一种是不带格式的复制，先看第一种，不带格式的复制;

> **但是我体验下来好像没区别！！！**

<!--more-->

## 复制：不带格式

操作核心
- document.createRange：创建选区
- window.getSelection：选择内容
- document.execCommand('copy')：复制操作

```javascript
class DOMCopyPost {
    constructor() {
        // ...
    }

    onclickCopy (targetName) {
        const targetDOM = document.querySelector(targetName)
        if (!targetDOM) {
            throw new Error('复制的目标不存在！用的是 querySelector，可能是名字用错了呀~')
        }
        // 选中文本
        const range = document.createRange();
        range.selectNodeContents(targetDOM);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        // 执行复制命令
        const successful = document.execCommand('copy');
        // 清理
        selection.removeAllRanges();

        if (successful) {
            // this.showMessage({ type: 'success', message: '复制成功' });
        } else {
            throw new Error('复制失败')
        }
    }
}

const domCopyPost = new DOMCopyPost()
```
<script>
class DOMCopyPost extends Blog{
    constructor() {
        super();
    }
    extractCodeFromBlock (targetDOM) {
        // 创建临时可编辑元素
        const tempContainer = document.createElement('div');
        tempContainer.contentEditable = true;
        tempContainer.style.position = 'absolute';
        tempContainer.style.left = '-9999px';
        tempContainer.style.whiteSpace = 'pre';
        tempContainer.style.fontFamily = 'monospace';

        // 复制代码内容并保留格式
        tempContainer.innerHTML = targetDOM.innerHTML;
        return { 'tempContainer': tempContainer }
    
    }
    onclickExtractCopy (targetName) {
        const targetDOM = document.querySelector(targetName);
        if (!targetDOM) {
            throw new Error('复制的目标不存在！用的是 querySelector，可能是名字用错了呀~')
        }
        const { tempContainer } = this.extractCodeFromBlock(targetDOM);
        document.body.appendChild(tempContainer);
        // 选中文本
        const range = document.createRange();
        range.selectNodeContents(targetDOM);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        // 执行复制命令
        const successful = document.execCommand('copy');
        // 清理
        selection.removeAllRanges();

        document.body.removeChild(tempContainer);
        if (successful) {
            this.showMessage({ type: 'success', message: '复制成功' });
        } else {
            throw new Error('复制失败')
        }
    }
}

const domCopyPost = new DOMCopyPost()
</script>

<div
    class="dom-copy-post"
    onclick="domCopyPost.onclickCopy('.dom-copy-post')"
    style="cursor: pointer; font-weight: bold; color: red"
>点击我，无格式复制</div>

## 复制：带格式

操作核心：extractCodeFromBlock

```javascript
class DOMCopyPost{
    constructor() {
        super();
    }
    extractCodeFromBlock (targetDOM) {
        // 创建临时可编辑元素
        const tempContainer = document.createElement('div');
        tempContainer.contentEditable = true;
        tempContainer.style.position = 'absolute';
        tempContainer.style.left = '-9999px';
        tempContainer.style.whiteSpace = 'pre';
        tempContainer.style.fontFamily = 'monospace';

        // 复制代码内容并保留格式
        tempContainer.innerHTML = targetDOM.innerHTML;
        return { 'tempContainer': tempContainer }
    
    }
    onclickExtractCopy (targetName) {
        const targetDOM = document.querySelector(targetName);
        if (!targetDOM) {
            throw new Error('复制的目标不存在！用的是 querySelector，可能是名字用错了呀~')
        }
        const { tempContainer } = this.extractCodeFromBlock(targetDOM);
        document.body.appendChild(tempContainer);
        // 选中文本
        const range = document.createRange();
        range.selectNodeContents(targetDOM);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        // 执行复制命令
        const successful = document.execCommand('copy');
        // 清理
        selection.removeAllRanges();

        document.body.removeChild(tempContainer);
        if (successful) {
            // this.showMessage({ type: 'success', message: '复制成功' });
        } else {
            throw new Error('复制失败')
        }
    }
}
```

<div
    class="dom-copy-post"
    onclick="domCopyPost.onclickExtractCopy('.dom-copy-post')"
    style="cursor: pointer; font-weight: bold; color: red"
>点击我，带格式复制</div>