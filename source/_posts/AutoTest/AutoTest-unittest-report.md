---
title: AutoTest-unittest-report
date: 2025-09-24 15:44:20
tags: [AutoTest, unittest, report]
categories:
  - AutoTest
  - unittest
---

> 准备工作

```python
import os
import unittest
import time
from HTMLTestRunner import HTMLTestRunner   

# 设置测试目标路径
target_dir = os.path.abspath("auto_test/test_xxx")

suite = unittest.defaultTestLoader.discover(
    start_dir=target_dir,
    pattern="test*.py"
)

timestamp = time.strftime("%Y-%m-%d %H_%M_%S")
```

`start_dir`: 运行指定目录下
`pattern`：指定目标文件

> 生成报告

```python
report_file_path = os.path.abspath(f"auto_test/report/我的回归测试报告_{timestamp}.html")
with open(
    file=report_file_path, 
    mode="wb"
) as report_file:
    runner = HTMLTestRunner(
        report_file, 
        verbosity=2, 
        title="测试报告", 
        description="测试结果" 
    )
    runner.run(suite)
print(time.strftime("%Y-%m-%d %H_%M_%S"))
```
