---
title: linux-设置系统环境变量
date: 2025-08-28 16:10:01
tags: [linux, env, export]
categories:
  - Linux
---

```bash
# exports 设置环境变量
export TEST_VARIABLE=value

# 检查是否设置成功
echo $TEST_VARIABLE
## 若打印 value，则表示设置成功
## 或者 
env | grep TEST_VARIABLE
```