---
title: AutoTest-selenium-css-selector
date: 2025-09-30 11:00:17
tags: [AutoTest, 软件测试, 定位, CSS_SELECTOR]
categories:
  - AutoTest
  - 定位
---


| 无需[]  | 描述       |                                |
|-------|----------|--------------------------------|
| 元素标签名 | 直接写标签名   | `By.CSS_SELECTOR, 'div'`       |
| 类名    | 用 `.` 前缀 | `By.CSS_SELECTOR, '.btn'`      |
| ID    | 用 `#` 前缀 | `By.CSS_SELECTOR, '#username'` |
| 层级关系  |          | `By.CSS_SELECTOR, 'div p'`     |

---

| 需要[]    | 描述             |                                                       |
|---------|----------------|-------------------------------------------------------|
| 属性名筛选   | 比如\[name]      | `By.CSS_SELECTOR, 'div[name]'`                        |
| 属性值精确筛选 | 比如\[name="xx"] | `By.CSS_SELECTOR, 'div[name='123']'`                  |
| 属性值部分筛选 | 开头（^）          | `By.CSS_SELECTOR, 'div[class^="btn-"]'`               |
| 多属性组合   | 同时满足多个条件的属性    | `By.CSS_SELECTOR, 'input[type="txt"][class^="btn-"]'` |







 