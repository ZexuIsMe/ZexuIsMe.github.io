---
title: JMeter-JSR223
date: 2025-10-11 14:07:43
tags: [JMeter, JSR223, 断言]
categories:
  - JMeter
---

## 变量的设置

> 获取

【局部变量】 vars.get("变量名")
【全局变量】 props.get("全局变量名")

> 设置

【局部变量】 vars.put("变量名"， "value")
【全局变量】 props.put("全局变量名", "value")

## JSR223 断言

| AssertResult              | 描述                       |
|---------------------------|--------------------------|
| setFailure(bool)          | true 表示断言失败，false 表示断言成功 |
| setFailureMessage("text") | text 表示断言失败时输出的信息        |




