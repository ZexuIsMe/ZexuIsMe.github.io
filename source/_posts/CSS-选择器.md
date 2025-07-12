---
title: CSS-选择器
date: 2025-06-28 13:08:38
tags: [CSS, 选择器]
categories:
  - 前端
  - CSS
---

## 基本选择器

### 元素选择器 - 通过标签名选择元素
```css
p { color: blue; } /* 选择所有<p>元素 */
```

<!--more-->

### 类选择器 - 通过 class 属性选择元素
```css
.warning { color: red; } /* 选择 class="warning" 的元素 */
```
### ID 选择器 - 通过 id 属性选择元素
```css
#header { background: gray; } /* 选择 id="header" 的元素 */
```

### 通配选择器 - 选择所有元素
```css
* { margin: 0; } /* 选择所有元素 */
```

## 组合选择器

### 后代选择器 (空格) - 选择指定元素内的所有后代元素
```css
div p { color: green; } /* 选择所有在<div>内的<p> */
```
### 子选择器 (>) - 选择直接子元素
```css
ul > li { list-style: none; } /* 选择<ul>的直接<li>子元素 */
```
### 相邻兄弟选择器 (+) - 选择紧接在另一元素后的元素
```css
h1 + p { font-size: 1.2em; } /* 选择紧接在<h1>后的<p> */
```
### 通用兄弟选择器 (~) - 选择所有在指定元素后的同级元素
```css
h2 ~ p { color: purple; } /* 选择所有与<h2>同级且在它后面的<p> */
```

## 属性选择器

### 存在属性选择器 ([attr])
```css
[disabled] { opacity: 0.5; } /* 选择所有有disabled属性的元素 */
```
### 精确属性值选择器 ([attr=value])
```css
[type="text"] { border: 1px solid #ccc; } /* 选择type="text"的元素 */
```
### 包含属性值选择器 ([attr*=value])
```css
[class*="btn"] { padding: 5px 10px; } /* 选择class包含"btn"的元素 */
```
### 开头属性值选择器 ([attr^=value])
```css
[href^="https"] { color: green; } /* 选择href以"https"开头的元素 */
```
### 结尾属性值选择器 ([attr$=value])
```css
[src$=".png"] { border: 1px solid #eee; } /* 选择src以".png"结尾的元素 */
```
### 空格分隔属性值选择器 ([attr~=value])
```css
[class~="active"] { font-weight: bold; } /* 选择class包含"active"词的元素 */
```
### 连字符属性值选择器 ([attr|=value])
```css
[lang|="en"] { quotes: '"' '"'; } /* 选择lang属性以"en"开头或en-开头的元素 */
```

## 伪类选择器

### 动态伪类
####  :link - 未访问的链接
  ```css
    /* 选取所有未被访问过的<a>元素 */
    a:link {
      color: purple;
    }
  ```
####  :visited - 已访问的链接
####  :hover - 鼠标悬停时
####  :active - 被激活时
####  :focus - 获得焦点时
```css
a:hover { text-decoration: underline; }
```
### 结构伪类
#### :first-child - 父元素的第一个子元素
#### :last-child - 父元素的最后一个子元素
#### :nth-child(n) - 父元素的第n个子元素
  ```css
      li:nth-child(odd) { background: #f5f5f5; } /* 奇数行列表项 */
  ```
#### :nth-last-child(n) - 从末尾计数的第n个子元素
#### :only-child - 父元素的唯一子元素
#### :first-of-type - 同类型中的第一个
#### :last-of-type - 同类型中的最后一个
  ```css
      p:last-of-type {
          color: red;
          font-weight: bold;
      }
      /* 选择 P 标签中的最后一个 */
      /* 不一定是标签，也可以是其他类，也可以是ID，也可以是其他 */
  ```
#### :nth-of-type(n) - 同类型中的第n个
#### :nth-last-of-type(n) - 从末尾计数的同类型第n个
#### :only-of-type - 同类型中的唯一一个

### 表单伪类
#### :checked - 被选中的单选/复选框
#### :disabled - 禁用的表单元素
  ```css
    /* 选取所有被禁用的input元素 */
    input:disabled {
      background-color: #f0f0f0;
    }
  ```
#### :enabled - 启用的表单元素
#### :valid - 有效输入
#### :invalid - 无效输入
#### :required - 必填字段
#### :optional - 可选字段
#### :in-range - 在范围内的输入
#### :out-of-range - 超出范围的输入

```css
input:focus:invalid { border-color: red; } /* 无效输入的焦点状态 */
```

### 其他伪类
#### :root - 文档根元素(html)
#### :empty - 没有子元素的元素
#### :target - 当前活动的目标元素
#### :not(selector) - 不匹配选择器的元素
#### :lang(language) - 指定语言的元素
```css
:not(.hidden) { display: block; } /* 不包含hidden类的元素 */
```

## 伪元素选择器

### ::before  在元素内容前插入内容
```css
.note::before { content: "Note: "; font-weight: bold; }
```
### ::after  在元素内容后插入内容
```css
a::after { content: " (" attr(href) ")"; }
```
### ::first-letter  选择元素内容的第一个字母
```css
p::first-letter { font-size: 2em; }
```
### ::first-line  选择元素内容的第一行
```css
/* 选取<p>元素的第一行 */
p::first-line { text-transform: uppercase; }
```
### ::section  用户选中的内容
```css
::selection { background: yellow; color: black; }
```
### ::placeholder  输入框的占位文本
```css
input::placeholder { color: #999; }
```

## 组合使用示例

```css
input[type="checkbox"]:checked + label {
  color: green; /* 复选框选中时，后面的label变绿 */
}

/* 选择表格中奇数行且不包含hidden类的单元格 */
table tr:nth-child(odd):not(.hidden) td {
  background-color: #f9f9f9;
}

/* 选择表单中无效的必填输入框 */
input:required:invalid {
  border-left: 3px solid red;
}
```

