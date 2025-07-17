---
title: CSS-遮罩
date: 2025-06-28 18:44:42
tags: [CSS, 遮罩（Mask）]
categories:
  - 前端
  - CSS
---

<style>
    @layer css-mask-1 {
        .css-mask-1 {
            position: relative;
            width: 100%;
            height: 256px;
        }

        .hover-mask {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 99;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s;
        }

        .css-mask-1:hover .hover-mask {
            opacity: 1;
            visibility: visible;
            backdrop-filter: blur(10px);
            background-color: transparent;
        }
    }

    @layer css-mask-2 {
        .css-fixed-mask {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 99999;
            opacity: 0;
            visibility: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s;
            backdrop-filter: blur(10px);
            background-color: transparent;
        }
    }
</style>
<script type="text/javascript">
class CSSMask2 {
    constructor(className) {
        this.className = className; 
    }

    getMask () {
        const target = document.querySelector(`.${this.className}`);
        
        if (!target) throw new Error('未找到遮罩');

        return target;
    }

    showMask () {
        const target = this.getMask();
        
        target.style.opacity = 1;
        target.style.visibility = 'visible'
    }
    
    hideMask () {
        const target = this.getMask();

        target.style.opacity = 0;
        target.style.visibility = 'hidden'
    }
}

const cssMask2 = new CSSMask2('css-fixed-mask')
</script>

<h1 class="subtitle">Hover 遮罩</h1>
<div class="css-mask-1">
    <figure>
        <img src="https://picsum.photos/1300/256" alt="随机图片获取失败，F5刷新，重新加载即可" class="skeleton">
    </figure>
    <div class="hover-mask"></div>
</div>

<!--more-->

```html
<div class="css-mask-1">
    <figure>
        <img src="https://picsum.photos/1300/256" alt="随机图片获取失败，F5刷新，重新加载即可" class="skeleton">
    </figure>
    <div class="hover-mask"></div>
</div>
```
```css
    @layer css-mask-1 {
        .css-mask-1 {
            position: relative;
            width: 100%;
            height: 256px;
        }

        .hover-mask {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 99;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s;
        }

        .css-mask-1:hover .hover-mask {
            opacity: 1;
            visibility: visible;
            backdrop-filter: blur(10px);
            background-color: transparent;
        }
    }
```

<h1 class="subtitle">弹窗遮罩</h1>  

<div class="css-fixed-mask" onclick="cssMask2.hideMask()">
    <div class="card" style="width: 300px; " onclick="event.stopPropagation();">
        <div class="card-header" style="display: flex; align-items: center; justify-content: space-between;">
            <div>标题</div>
            <div style="width: fit-content; cursor: pointer" onclick="cssMask2.hideMask()"><i class="far fa-window-close"></i></div>
        </div>
        <div style="height: 300px; width: 100%">卡片内容</div>
    </div>
</div>
<button class="button is-info is-light" onclick="cssMask2.showMask()">点击召唤遮罩</button>

```html
<div class="css-fixed-mask" onclick="cssMask2.hideMask()">
    <div class="card" style="width: 300px; " onclick="event.stopPropagation();">
        <div class="card-header" style="display: flex; align-items: center; justify-content: space-between;">
            <div>标题</div>
            <div style="width: fit-content; cursor: pointer" onclick="cssMask2.hideMask()"><i class="far fa-window-close"></i></div>
        </div>
        <div style="height: 300px; width: 100%">卡片内容</div>
    </div>
</div>
<button class="button is-info is-light" onclick="cssMask2.showMask()">点击召唤遮罩</button>
```
- <code>div class="card" style="width: 300px; " onclick="event.stopPropagation();“</code>
  - onclick="event.stopPropagation();" 是为了实现 css-fixed-mask 的点击关闭操作
  - 为了防止点击到卡片中也会触发它的点击事件，故为 card 添加 event.stopPropagation(); 阻止点击行为向上传递到 css-fixed-mask 中去
```javascript
class CSSMask2 {
    constructor(className) {
        this.className = className;
    }

    getMask () {
        const target = document.querySelector(`.${this.className}`);

        if (!target) throw new Error('未找到遮罩');

        return target;
    }

    showMask () {
        const target = this.getMask();

        target.style.opacity = 1;
        target.style.visibility = 'visible'
    }

    hideMask () {
        const target = this.getMask();

        target.style.opacity = 0;
        target.style.visibility = 'hidden'
    }
}

const cssMask2 = new CSSMask2('css-fixed-mask')
```
```css
@layer css-mask-2 {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99999;
    opacity: 0;
    visibility: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s;
    backdrop-filter: blur(10px);
    background-color: transparent;
}
```

> 依据这样的操作可以做一个 全局的 loading 遮罩