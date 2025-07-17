---
title: CSS-样式分层
date: 2025-06-28 08:25:06
tags: [CSS, 样式分层]
categories:
  - 前端
  - CSS
---

可明确设定不同层级样式的优先级顺序。
比如定义 @layer base, components, utilities ，声明顺序决定优先级，后面定义的层（若样式冲突）能覆盖前面层 。
如先定义基础层 base 设按钮基础样式，再用 components 层写特定按钮组件样式，components 层样式优先级更高，可覆盖基础层部分样式，
让样式生效顺序更可控，避免因选择器权重复杂难维护。

<style>
    @layer utilities {
      .content-auto {
        content-visibility: auto;
      }
      .btn-hover-scale {
        @apply transition-transform duration-300;
      }
      .btn-hover-scale:hover {
        transform: scale(1.05);
      }
    }
  </style>
<style>
    /* 定义三个层：基础层、组件层、工具类层 */
    @layer base, components, utilities;
    
    /* 基础层：定义按钮的基本样式 */
    @layer base {
      button {
        border-radius: 0.25rem;
        padding: 0.5rem 1rem;
        font-weight: 500;
        transition: all 0.2s;
        cursor: pointer;
        border: 1px solid transparent;
      }
    }
    
    /* 组件层：基于 Bulma 自定义按钮组件 */
    @layer components {
      .custom-btn {
        @apply bg-primary text-white font-semibold py-2 px-4 rounded-lg shadow-md;
      }
      .custom-btn:hover {
        @apply bg-primary-dark;
      }
      .custom-btn:active {
        @apply transform scale-95;
      }
    }
    
    /* 工具类层：添加额外的工具类样式 */
    @layer utilities {
      .btn-shadow {
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      }
      .btn-shadow:hover {
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      }
      .btn-primary {
        @apply bg-blue-500 text-white;
      }
      .btn-primary:hover {
        @apply bg-blue-600;
      }
    }
</style>
<div class="container mx-auto p-6">
  <h1 class="title is-2 mb-6">CSS 层优先级示例</h1>

  <div class="columns">
    <!-- 示例 1：基础层按钮 -->
    <div class="column">
      <h2 class="subtitle is-4 mb-3">基础层按钮</h2>
      <button class="base-btn">
        基础按钮
      </button>
      <p class="mt-3 text-sm text-gray-600">
        只应用了 base 层的样式，使用原生 CSS 定义
      </p>
    </div>
    <!-- 示例 2：组件层按钮 -->
    <div class="column">
      <h2 class="subtitle is-4 mb-3">组件层按钮</h2>
      <button class="custom-btn">
        自定义按钮
      </button>
      <p class="mt-3 text-sm text-gray-600">
        应用了 components 层的样式，结合 Bulma 的类和自定义样式
      </p>
    </div>
    <!-- 示例 3：工具类层覆盖 -->
    <div class="column">
      <h2 class="subtitle is-4 mb-3">工具类覆盖按钮</h2>
      <button class="custom-btn btn-primary btn-shadow btn-hover-scale">
        工具类增强按钮
      </button>
      <p class="mt-3 text-sm text-gray-600">
        在 custom-btn 基础上，叠加 utilities 层的工具类，改变颜色和阴影
      </p>
    </div>
  </div>
  <div class="mt-8 bg-gray-100 rounded-lg">
    <h3 class="title is-4 mb-4">层优先级说明</h3>
    <ul class="list-disc pl-5 space-y-2">
      <li><code>base</code> 层定义最基础的样式，优先级最低</li>
      <li><code>components</code> 层定义组件级样式，会覆盖 base 层</li>
      <li><code>utilities</code> 层定义工具类，优先级最高，可以覆盖前两层</li>
      <li>使用 <code>@layer</code> 声明层的顺序决定优先级：后声明的层 > 先声明的层</li>
    </ul>
  </div>
</div>

```css
<style>
    @layer utilities {
      .content-auto {
        content-visibility: auto;
      }
      .btn-hover-scale {
        @apply transition-transform duration-300;
      }
      .btn-hover-scale:hover {
        transform: scale(1.05);
      }
    }
</style>
<style>
    /* 定义三个层：基础层、组件层、工具类层 */
    @layer base, components, utilities;
    
    /* 基础层：定义按钮的基本样式 */
    @layer base {
      button {
        border-radius: 0.25rem;
        padding: 0.5rem 1rem;
        font-weight: 500;
        transition: all 0.2s;
        cursor: pointer;
        border: 1px solid transparent;
      }
    }
    
    /* 组件层：基于 Bulma 自定义按钮组件 */
    @layer components {
      .custom-btn {
        @apply bg-primary text-white font-semibold py-2 px-4 rounded-lg shadow-md;
      }
      .custom-btn:hover {
        @apply bg-primary-dark;
      }
      .custom-btn:active {
        @apply transform scale-95;
      }
    }
    
    /* 工具类层：添加额外的工具类样式 */
    @layer utilities {
      .btn-shadow {
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      }
      .btn-shadow:hover {
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      }
      .btn-primary {
        @apply bg-blue-500 text-white;
      }
      .btn-primary:hover {
        @apply bg-blue-600;
      }
    }
</style>
```

```html
<div class="container mx-auto p-6">
    <h1 class="title is-2 mb-6">CSS 层优先级示例</h1>

    <div class="columns">
        <!-- 示例 1：基础层按钮 -->
        <div class="column">
            <h2 class="subtitle is-4 mb-3">基础层按钮</h2>
            <button class="base-btn">
                基础按钮
            </button>
            <p class="mt-3 text-sm text-gray-600">
                只应用了 base 层的样式，使用原生 CSS 定义
            </p>
        </div>
        <!-- 示例 2：组件层按钮 -->
        <div class="column">
            <h2 class="subtitle is-4 mb-3">组件层按钮</h2>
            <button class="custom-btn">
                自定义按钮
            </button>
            <p class="mt-3 text-sm text-gray-600">
                应用了 components 层的样式，结合 Bulma 的类和自定义样式
            </p>
        </div>
        <!-- 示例 3：工具类层覆盖 -->
        <div class="column">
            <h2 class="subtitle is-4 mb-3">工具类覆盖按钮</h2>
            <button class="custom-btn btn-primary btn-shadow btn-hover-scale">
                工具类增强按钮
            </button>
            <p class="mt-3 text-sm text-gray-600">
                在 custom-btn 基础上，叠加 utilities 层的工具类，改变颜色和阴影
            </p>
        </div>
    </div>
    <div class="mt-8 bg-gray-100 rounded-lg">
        <h3 class="title is-4 mb-4">层优先级说明</h3>
        <ul class="list-disc pl-5 space-y-2">
            <li><code>base</code> 层定义最基础的样式，优先级最低</li>
            <li><code>components</code> 层定义组件级样式，会覆盖 base 层</li>
            <li><code>utilities</code> 层定义工具类，优先级最高，可以覆盖前两层</li>
            <li>使用 <code>@layer</code> 声明层的顺序决定优先级：后声明的层 > 先声明的层</li>
        </ul>
    </div>
</div>
```

需要注意的是：
- 它只是可以做优先级操作，并不能隔离样式表
- 同级情况下
    - 如果存在两个同层名，那么会按加载顺序覆盖
    - 如果不同层名但是内部样式同名，那么惠安加载顺序覆盖