---
title: Python-try
date: 2025-09-10 17:51:58
tags: [Python, 异常处理, try]
categories:
  - Python 
---

```python
try:
    # command
except 异常类1:
    # 异常时执行的语句
    print(str(e), ".....")
except 异常类2:
    # 异常时执行的语句
else:
    # 当尝试执行的语句没有出现任何异常时执行的语句
finally:
    # 无论成功与否，都会执行的语句
```

**异常类**：
不写，则表示所有异常；
如果写了，它可以有别名；