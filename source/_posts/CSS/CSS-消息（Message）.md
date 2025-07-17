---
title: CSS-消息（Message）
date: 2025-06-28 22:35:09
tags: [CSS, 消息（Message）, 复制（Copy）]
categories:
  - 前端
  - CSS
---

<script>
class CSSMessagePost extends Blog {}

const cssMessagePost = new CSSMessagePost()
</script>

<a id="css-message-test" href="https://ZeXuIsMe.github.io">https://ZeXuIsMe.github.io</a>

<button class="button is-info" onclick="cssMessagePost.onclickCopy('#css-message-test')">
    <i class="fas fa-copy mr-3"></i>点我查看效果
</button>

<!--more-->


```javascript
class Blog {
    constructor() {
        this.messageMap = new Map();
        this.messageMap.set("info", "has-background-info-light");
        this.messageMap.set("success", "has-background-success-light");
        this.messageMap.set("warning", "has-background-warning-light");
        this.messageMap.set("error", "has-background-danger-light");
    }

    /**
     *
     * @param url 图片链接
     * @param id 你给 loading.ejs 添加的 id
     */
    imagesHideLoading (url, id) {
        const img = new Image()
        img.src = url

        img.onload = () => {
            document.getElementById(id).classList.add('c-hide-loading')
        }
    }

    getMessageParent () {
        let DOMParent = document.getElementById('blog-message')
        if (!DOMParent) {
            DOMParent = document.createElement('div')
            DOMParent.id = 'blog-message'
            DOMParent.classList.add('d-flex')
            DOMParent.classList.add('align-center')
            DOMParent.classList.add('flex-column')
            Object.assign(DOMParent.style, {
                width: '100%',
                height: 'auto',
                position: 'fixed',
                top: '7.5rem',
                left: 0,
                zIndex: 999999999999999999,
                transition: 'height 0.3s ease'
            })

            document.body.appendChild(DOMParent)
        }
        return DOMParent
    }

    showMessage ({
        type = 'info', // info、success、warning、error
        message = '还没有投放文本呢~~',
    }) {
        const parentDOM = this.getMessageParent()

        const DOM = document.createElement('div')
        DOM.classList.add('py-2')
        DOM.classList.add('px-4')
        DOM.classList.add('box')
        DOM.classList.add(this.messageMap.get(type))
        Object.assign(DOM.style, {
            width: 'fit-content',
            opacity: '0',
            visibility: 'hidden',
            transition: 'opacity 0.3s ease, transform 0.3s ease, visibility 0.3s'
        })

        DOM.innerHTML = message
        DOM.style.opacity = '1'
        DOM.style.visibility = 'visible'
        parentDOM.appendChild(DOM)

        setTimeout(() => {
            DOM.style.opacity = '0'
            DOM.style.visibility = 'hidden'
            setTimeout(() => {
                parentDOM.removeChild(DOM)
            }, 500)
        }, 1500)
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
            this.showMessage({ type: 'success', message: '复制成功' });
        } else {
            throw new Error('复制失败')
        }
    }
}
class CSSMessagePost extends Blog {}

const cssMessagePost = new CSSMessagePost()
```

```html
<a id="css-message-test" href="https://ZeXuIsMe.github.io">https://ZeXuIsMe.github.io</a>

<button class="button is-info" onclick="cssMessagePost.onclickCopy('#css-message-test')">
    <i class="fas fa-copy mr-3"></i>点我查看效果
</button>
```

- button is-info 均出自 bulma
- mr-3 出自 https://ZeXuIsMe.github.io/2025/06/28/CSS-我的自定义全局样式/