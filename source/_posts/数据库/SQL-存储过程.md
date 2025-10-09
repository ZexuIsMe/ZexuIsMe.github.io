---
title: SQL-存储过程
date: 2025-10-09 11:25:41
tags: [SQL, 存储过程]
categories:
  - SQL
  - 存储过程
---

```
CREATE PROCEDURE name (column_1, column_2) VALUES ('value1', 'value2'):
Begin:
    declare i int
    while i <= p
        # SQL 语句
        SET i = i + 1
    END WHILE
END
```

## 执行并发

|   options   | DESC                    |
|:-----------:|:------------------------|
|     -n      | 以命令行的形式执行JMeter         |
| -t file.jmx | 表示测试目标文件（.jmx）          |
|     -p      |                         |
| -l log.csv  | 将测试结果保存到指定的文件中          |
|             | 该文件可以是一个新的              |
|     -j      |                         |
|     -e      | 表示测试完成后生成测试报告           |
|     -o      | 不存在或空的目录，表示生成的测试报告存放的目录 |


    jmeter -n -t jmx文件 -l CSV文件 -e -o 报告地址

性能瓶颈怎么定位的？
根据报告内容分析错误信息，配合开发分析定位目标代码，
比如发现是数据库写入数据时的错误，
那么将相关的SQL语句以及业务流摘出来，进行二次性能测试；
再通过二次测试报告缩小排查范围。

一般在这几个方面
硬件性能不够；
代码冗余或是代码复杂度高；
过多的复杂查询，比如四五张表的联查；