---
title: CSS-悬浮气泡
date: 2025-06-28 07:11:21
tags: [CSS, 气泡（Tooltip）]
---

> tooltip 气泡的核心是对 hover 的操作

  <h1 class="title is-3 mb-6">Bulma悬浮气泡(Tooltip)示例</h1>

  <div class="content">
    <p>
      下面是几种不同位置的悬浮气泡示例：
    </p>
    <div class="columns mt-6">
      <div class="column is-one-fifth d-flex justify-center">
        <div class="tooltip tooltip-top" data-tooltip="顶部气泡">
          <button class="button is-primary">
            <i class="fa fa-arrow-up mr-2"></i>顶部
          </button>
        </div>
      </div>
      <div class="column is-one-fifth d-flex justify-center">
        <div class="tooltip tooltip-right" data-tooltip="右侧气泡">
          <button class="button is-info">
            <i class="fa fa-arrow-right mr-2"></i>右侧
          </button>
        </div>
      </div>
      <div class="column is-one-fifth d-flex justify-center">
        <div class="tooltip tooltip-bottom" data-tooltip="底部气泡">
          <button class="button is-success">
            <i class="fa fa-arrow-down mr-2"></i>底部
          </button>
        </div>
      </div>
      <div class="column is-one-fifth d-flex justify-center">
        <div class="tooltip tooltip-left" data-tooltip="左侧气泡">
          <button class="button is-warning">
            <i class="fa fa-arrow-left mr-2"></i>左侧
          </button>
        </div>
      </div>
      <div class="column is-one-fifth d-flex justify-center">
        <div class="tooltip tooltip-top" data-tooltip="抖音图标">
          <button class="button is-dark">
            <i class="fab fa-tiktok"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="mt-8">
      <h3 class="subtitle is-4">如何使用</h3>
      <p>
        要创建悬浮气泡，只需在元素上添加 <code>tooltip</code> 类和 <code>data-tooltip</code> 属性，并根据需要添加方向类（如 <code>tooltip-top</code>）：
      </p>
    </div>
  </div>

```html
        <div class="tooltip tooltip-top" data-tooltip="抖音图标">
          <!-- button is-dark 为 bulma 的样式 -->
          <button class="button is-dark">
            <i class="fab fa-tiktok"></i>
          </button>
        </div>
```

```css
@layer utilities {
      .tooltip {
        position: relative;
        width: fit-content;
      }
      
      .tooltip::before {
        content: attr(data-tooltip);
        position: absolute;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.2s, transform 0.2s;
        transform: translateY(5px);
        background-color: #363636;
        color: white;
        padding: 0.5rem;
        border-radius: 4px;
        font-size: 0.75rem;
        white-space: nowrap;
        z-index: 10;
      }
      
      .tooltip:hover::before {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }
      
      /* 气泡位置变体 */
      .tooltip-top::before {
        bottom: 100%;
        left: 50%;
        transform: translate(-50%, 5px);
        margin-bottom: 0.5rem;
      }
      
      .tooltip-top:hover::before {
        transform: translate(-50%, 0);
      }
      
      .tooltip-bottom::before {
        top: 100%;
        left: 50%;
        transform: translate(-50%, -5px);
        margin-top: 0.5rem;
      }
      
      .tooltip-bottom:hover::before {
        transform: translate(-50%, 0);
      }
      
      .tooltip-left::before {
        right: 100%;
        top: 50%;
        transform: translate(5px, -50%);
        margin-right: 0.5rem;
      }
      
      .tooltip-left:hover::before {
        transform: translate(0, -50%);
      }
      
      .tooltip-right::before {
        left: 100%;
        top: 50%;
        transform: translate(-5px, -50%);
        margin-left: 0.5rem;
      }
      
      .tooltip-right:hover::before {
        transform: translate(0, -50%);
      }
    }
```

## 气泡中显示图片

<div class="p-8">
    <div class="d-flex justify-center flex-wrap gap-8">
        <div class="tooltip-image">
            <div class="text-center">
                <div><i class="far fa-thumbs-up" style="font-size: 48px"></i></div>
                <div class="mt-3">默认情况下</div>
            </div>
            <figure class="mbl box">
                <img src="https://picsum.photos/600/300" alt="随机图片，加载失败，F5刷新，重新加载" class="skeleton"/>
            </figure>
        </div>
        <div class="tooltip-image tooltip-image-top">
            <div class="text-center">
                <div><i class="fas fa-angle-up" style="font-size: 48px"></i></div>
                <div class="mt-3">上（Top）</div>
            </div>
            <figure class="mbl box">
                <img src="https://picsum.photos/600/300" alt="随机图片，加载失败，F5刷新，重新加载" class="skeleton"/>
            </figure>
        </div>
        <div class="tooltip-image tooltip-image-bottom">
            <div class="text-center">
                <div><i class="fas fa-angle-down" style="font-size: 48px"></i></div>
                <div class="mt-3">下（Bottom）</div>
            </div>
            <figure class="mbl box">
                <img src="https://picsum.photos/600/300" alt="随机图片，加载失败，F5刷新，重新加载" class="skeleton"/>
            </figure>
        </div>
        <div class="tooltip-image tooltip-image-right">
            <div class="text-center">
                <div><i class="fas fa-angle-right" style="font-size: 48px"></i></div>
                <div class="mt-3">右（Right）</div>
            </div>
            <figure class="mbl box">
                <img src="https://picsum.photos/600/300" alt="随机图片，加载失败，F5刷新，重新加载" class="skeleton"/>
            </figure>
        </div>
        <div class="tooltip-image tooltip-image-left">
            <div class="text-center">
                <div><i class="fas fa-angle-left" style="font-size: 48px"></i></div>
                <div class="mt-3">左（Left）</div>
            </div>
            <figure class="mbl box">
                <img src="https://picsum.photos/600/300" alt="随机图片，加载失败，F5刷新，重新加载" class="skeleton"/>
            </figure>
        </div>
    </div>

</div>

- 出自：https://ZeXuIsMe.github.io/2025/06/28/CSS-我的自定义全局样式/
  - d-flex
  - justify-center
  - flex-wrap
  - gap-8
  - align-center
  - text-center
  - mt-3
- box：出自 bulma
- mbl：出自 https://ZeXuIsMe.github.io/2025/06/26/CSS-毛玻璃/
- skeleton：出自 https://ZeXuIsMe.github.io/2025/06/27/CSS-骨架/