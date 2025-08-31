---
title: Linux-统计行
date: 2025-08-31 19:12:50
tags: [linux, 统计, 行]
categories:
  - linux
  - 统计
  - 行
---

```bash
# wc
wc -l *.txt

# awk
awk -F '\n' '{print NR}' *.txt

# grep
grep -c ""

# sed [选项] 目标文本 文件路径
sed -n '1p' *.txt
```