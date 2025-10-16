---
title: logging
date: 2025-10-13 13:44:29
tags: [Python, package, logging]
categories:
  - Python
  - package
---

## logging


> 是什么

Python 自带的日志库，用于产出日志信息

> 为什么选择

1. 对日志信息分级别
2. 对格式有一定要求
3. 实时日志、离线日志

> 怎么用

自定义工具类，封装API

## 日志级别

| 级别       | 描述     | 优先级 |
|:---------|:-------|-----|
| debug    | 输出调试信息 | 1   |
| info     | 输出常规信息 | 2   |
| warning  | 警告信息   | 3   |
| error    | 错误信息   | 4   | 
| critical | 严重错误   | 5   |

级别高于或者等于日志级别的日志才会被输出，低于该等级的日志将会被丢弃；
上表【优先级】中，值越大，对应的级别优先级越高；

> 那么，如何设置输出等级？

    logging.basicConfig(level=logging.INFO)

> 设置输出格式

    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(filename)s[line:%(lineno)d] - %(levelname)s: %(message)s'
    )

| format（常用）      | 描述   |
|-----------------|------|
| `%(asctime)s`   | 时间戳  |
| `%(filename)s`  | 文件名  |
| `%(lineno)d`    | 行号   |
| `%(levalname)s` | 日志级别 |
| `%(message)s`   | 日志消息 |

![logging format](https://origin.picgo.net/2025/10/13/logging_formata61db84ff86c051f.png)

## 日志输出到控制台和文件

| API                     | 描述                                 |
|-------------------------|------------------------------------|
| logging.getLogger()     | 创建一个日志对象                           |
|                         | 这个对象设置日志等级 + setLevel 设置总开关        |
| logging,StreamHandler() | 创建控制台实例                            |
| logging.FileHandler()   | 创建文件实例                             |
|                         | 通过该方法可以创建N个自定义级别的日志文件，用于分发给不同的用户查看 |
|                         | 文件模式默认为**追加**模式                    |

> 写法：1

```python
# 导入 logging 库
import logging

# 统一设置日志的输出格式
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')

# 创建 logger 对象
logger = logging.getLogger('test_logger')
# 设置日志输出等级总开关
logger.setLevel(logging.DEBUG)

# 创建控制台实例
sh = logging.StreamHandler()
# 设置控制台输出的日志级别
sh.setLevel(logging.INFO)
# 设置向控制台输出的日志格式
sh.setFormatter(formatter)
# 加载控制台实例到 logger 对象中
logger.addHandler(sh)

'''
创建一个文件实例，

如果 api.log 文件不存在，就会自动创建；
（如果没有指定地址，那么会以当前执行文件所在位置完成自动创建的操作）

【mode】     参数设置为追加；另外为防止乱码，
【encoding】 参数设置为 utf-8 编码格式
'''
fh = logging.FileHandler('api.log',mode='a',encoding='utf-8')
# 设置向文件输出的日志级别
fh.setLevel(logging.INFO)
# 设置向文件输出的日志格式
fh.setFormatter(formatter)
# 加载文件实例到 logger 对象中
logger.addHandler(fh)

if __name__ == "__main__":
    logger.debug('----- 调试信息 [debug]-----')
    logger.info('----- 有用的信息 [info]-----')
    logger.warning('----- 警告信息 [warning]-----')
    logger.error('----- 错误信息 [error]-----')
    logger.critical('----- 严重错误信息 [critical]-----')
```

> 写法：2，简化写法1

```python
import logging

# 配置日志的基本设置
logging.basicConfig(
    level=logging.DEBUG,  # 设置日志级别为DEBUG，可显示DEBUG及以上级别的日志
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',  # 日志格式
    datefmt='%Y-%m-%d %H:%M:%S',  # 时间格式
    handlers=[
        logging.FileHandler('app.log', encoding='utf-8'),  # 输出到文件，指定编码防止中文乱码
        logging.StreamHandler()  # 输出到控制台
    ]
)

logger = logging.getLogger(__name__)  # 获取一个logger实例，__name__为当前模块名

# 记录不同级别的日志
logger.debug('这是一条DEBUG级别的日志')
logger.info('这是一条INFO级别的日志')
logger.warning('这是一条WARNING级别的日志')
logger.error('这是一条ERROR级别的日志')
logger.critical('这是一条CRITICAL级别的日志')
```

> 写法：3，封装为一个工具类

```python
import logging
from datetime import datetime
from config.setting import get_log_path


class LogUntil:
    def __init__(self):
        # 创建日志对象
        self.logger = logging.getLogger("坤坤")
        # 总级别
        self.logger.setLevel(logging.DEBUG)

        # 防止重复添加
        if not self.logger.handlers:
            # 子级别，是控制台的，是实时日志
            sh=logging.StreamHandler()
            sh.setLevel(logging.INFO)  # 子级别的等级不能低于总级别
            sh.setFormatter(logging.Formatter("%(asctime)s - %(levelname)s - %(message)s"))

            # 日志文件
            fh_name = "fh_{}.log".format(datetime.now().strftime("%Y-%m-%d"))
            fh = logging.FileHandler(get_log_path(fh_name), encoding="utf-8")
            fh.setLevel(logging.INFO)
            fh.setFormatter(logging.Formatter("%(asctime)s - %(filename)s - %(lineno)d - %(levelname)s - %(message)s"))

            # 添加
            self.logger.addHandler(sh)
            self.logger.addHandler(fh)

    def log(self):
        return self.logger

# 日志
# 代替 print 完成日志终端的分发
# 日志级别的划分
# 日志支持离线
if __name__ == "__main__":
    logger = LogUntil().log()
    logger.debug('----- 调试信息 [debug]-----')
    logger.info('----- 有用的信息 [info]-----')
    logger.warning('----- 警告信息 [warning]-----')
    logger.error('----- 错误信息 [error]-----')
    logger.critical('----- 严重错误信息 [critical]-----')

```

其中文件名字，可以通过 datetime 标记日志文件名字

```python
from datetime import datetime

now_time = datetime.now.strftime(""%Y-%m-%d")

file_name = nowtime + '_tl.log'
```

语句：`if not self.logger.handlers:` 用于防止重复添加，若不添加，容易出现如下情况

```python
2025-10-16 11:34:22,268 - test_run.py - 21 - INFO - --------------------------------------------------
2025-10-16 11:34:22,268 - test_run.py - 21 - INFO - --------------------------------------------------
2025-10-16 11:34:22,269 - test_run.py - 22 - INFO - 正在执行：密码错误用例
2025-10-16 11:34:22,269 - test_run.py - 22 - INFO - 正在执行：密码错误用例
```

