---
title: SQL-函数
date: 2025-08-05 23:00:28
tags: [SQL, 函数, Len]
categories:
  - SQL
  - 函数
---

- 向上取整：`CEIL(column_name)`
- 向下取整：`FLOOR(column_name)`
- 绝对值：`ABS(column_name)`

## LEN 长度

语法：`LEN()` 返回文本字段中参数的长度

MySQL：`LENGTH()`

```SQL
SELECT LENGTH(column_name) FROM table_name;
```

详细链接：https://www.runoob.com/sql/sql-func-len.html

## 截取字符：MID

语法：`MID(column_name[, start, length])`

- colum_name: 字段
- start: 起始位
- length: 截取的长度

从文本字段中提取字符

## 大小写：UCASE、LCASE

语法：`UCASE(column_name)` 字母转大写

SQL Server：`UPPER(column_name)`

语法：`LCASE(column_name)` 字母转小写

SQL Server：`LOWER(column_name)`

## 返回第一条记录：Fist()

| 数据库            | 使用方式                                                                   |
|----------------|------------------------------------------------------------------------|
| **MS Access**  | SELECT * **FIRST(column_name)** FROM table_name;                       |
| **SQL Server** | SELECT **TOP 1** column_name FROM table_name ORDER BY column_name ASC; |
| **MySQL**      | SELECT name FROM students ORDER BY id ASC **LIMIT 1**;                 |
| **Oracle**     | SELECT name FROM students WHERE **ROWNUM <=1** ORDER BY id ASC;        |

## 返回最后一条记录：Last()

| 数据库            | 使用方式                                                                        |
|----------------|-----------------------------------------------------------------------------|
| **MS Access**  | SELECT * **LAST(column_name)** FROM table_name;                             |
| **SQL Server** | SELECT **TOP 1** column_name FROM table_name ORDER BY column_name **DESC**; |
| **MySQL**      | SELECT name FROM students ORDER BY id **DESC** **LIMIT 1**;                 |
| **Oracle**     | SELECT name FROM students WHERE **ROWNUM <=1** ORDER BY id **DESC**;        |

## 聚合函数

- count(): 统计
- max(): 找出最大值
- avg(): 平均值

----

- 在没有分组情况下，查询的返回，始终只有一行数据。
- 聚合函数不会出现在WHERE子句中

### 聚合函数：COUNT

- `COUNT(*)`：统计行数；
- `COUNT(字段)`：只统计非空的；
- `COUNT(DISTINCT 字段)`：字段去重后再统计，还是会排空，空不算在统计范围内

### 聚合函数：MAX

Eg: 运营想要知道复旦大学学生gpa最高值是多少，请你取出相应数据

```sql
SELECT MAX(gpa) FROM user_profile WHERE university='复旦大学';

# 输出字段：MAX(gpa)
## 配合AS输出预期字段
SELECT MAX(gpa) AS gap FROM user_profile WHERE university='复旦大学';
```

### 聚合函数：AVG

- 求平均值
- **不会出现在 WHERE 中**，出现即为语法错误；
- **SELECT 中一旦使用过聚合函数后，该SELECT查询语句就不要再添加其他查询字段列，以及计算或函数计算。**
- 严格截断小数 `TRUNCATE(m, n)`; 不会四舍五入；
  如果需要四舍五入可以考虑：ROUND(m,n) 或者 FORMAT(m,n)
    - m: 浮点数
    - n: 小数位数

## 分组：GROUP BY
GROUP BY 语句用于结合聚合函数，根据一个或多个列对结果集进行分组。

- 按类别分组查询数据信息
- 会压缩记录，与聚合函数类似，所以，分组后就不要再添加其他查询字段列，以及计算或函数计算。
- 非要有表中字段，只能是GROUP BY的目标字段

```sql
-- 不统计信息就用去重分组
SELECT DISTINCT bm FROM t_yg;

-- 要统计某部门，比如最高薪资，最低薪资，部门有多少人等等操作
SELECT bm, COUNT(bm) AS 部门人数
FROM t_yg
GROUP BY bm;
```

> Q：如何多列排序呢？

A：ORDER BY 字段A ASC, 字段B DESC

### Having 子句

> Q：Having和Where的执行优先级？

A：Where子句 》 Having 子句

Having 子句是针对**分组后**的数据进行筛选过滤的

## EXISTS()

EXISTS 运算符用于判断查询子句是否有记录，如果有一条或多条记录存在，则返回TRUE，否则返回FALSE。

```SQL
SELECT Websites.name, Websites.url 
FROM Websites 
WHERE EXISTS (SELECT count FROM access_log WHERE Websites.id = access_log.site_id AND count > 200);
```
![菜鸟教程 EXISTS](https://www.runoob.com/wp-content/uploads/2020/01/4D0E05D2-8CCD-4F3E-97EE-FCAB9419FB27.jpg)
链接：https://www.runoob.com/wp-content/uploads/2020/01/4D0E05D2-8CCD-4F3E-97EE-FCAB9419FB27.jpg

或许你会奇怪，返回的是布尔值，为什么还能查询出正确的数据呢？

**因为SQL语句执行时是逐行比对（扫描全表）的一个过程**，凡是满足条件的，都会被纳入返回列表的数据中，

所以当EXISTS为真时，则表示该记录是符合条件的。

## 显示格式化：FORMAT()

`SELECT FORMAT(column_name, format) FROM table_name;`

- column_name: 必需，目标字段
- format: 必需，规定显示用的格式，比如Moment.js中的‘YYYY-MM-DD HH:mm:ss’ 这样的

```SQL
SELECT name, url, DATE_FORMAT(Now(),'%Y-%m-%d') AS date
FROM Websites;
```

![菜鸟教程 FORMAT](https://www.runoob.com/wp-content/uploads/2013/09/formate1.jpg)
链接：https://www.runoob.com/wp-content/uploads/2013/09/formate1.jpg