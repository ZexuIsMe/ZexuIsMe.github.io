---
title: Pymysql
date: 2025-10-13 16:39:21
tags: [Python, package, Pymysql]
categories:
  - Python
  - package
---

Python 自带的库；
Pymysql 用于连接数据库，对数据进行SQL操作；

地址：https://pypi.com.cn/project/pymssql/

> 为什么用Pymysql

Excel 中的 SQL 语句，方便 Python 实现自动化；
微服务的接口太多，导致用例激增；

-------------------

## API

| API          | 描述               |
|--------------|------------------|
| connect      | 链接数据库            |
| fetchone()   | 提取一行数据           |
| fetchmany(n) | 获取指定行数的数据，n 表示行数 |
| fetchall()   | 获取所有行数           |
| commit()     | 提交保存和修改          |
| rollback()   | 回滚               |
| close()      | 关闭连接             |

```python
import pymysql

jwdd = pymsql.connect(
    host="127.0.0.1",
    port="3306",
    user="root",
    password="123456",
    charset="utf8",
    database="数据库名"    
)

## 创建游标
jwcursor = pymysql.cursor()
sql = "select * from user"
jwcursor.execute(sql)

## 获取一行数据
jwcursor.fechone()

## 关闭游标
jwcursor.close()

## 再关闭数据库
jwdd.close()
```

## 游标.fetchxx()

游标执行的SQL结果，通过 fetchxx() 获取数据需要留意，它只能从上往下获取，获取过的数据就无法再次获取，文字描述可能略显苍白，如下代码所示：

```python
jwcursor.fetchone()
jwcursor.fetchmany(2)
jwcursor.fetchone()
```
第二个 fetchone() 获取的数据是第四行的数据

> 那么怎么解决呢？

```python
data = jwcursor.fetchall()
print(data[2])
print(data[2])
```

游标不能重复操作，但是把他存起来不就好了，如上代码所示，这样就能反复获取第三行的数据；

需注意：
**游标查询结果默认是一个元组；**

## 字典游标（推荐）

```python
jwdd = pymysql.cursor(pymql.cursors.DictCursor)
```

推荐使用字典游标替代 pymysql.cursor()

