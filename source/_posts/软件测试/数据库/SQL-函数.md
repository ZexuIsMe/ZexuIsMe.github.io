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

1. 日期：2021-01-01 ≠ 2021-01-01这一天中的任何一个时间段

<!--more-->

## INSTR：字符串是否存在

- 检查字符串中是否包含某个子串（如 WHERE INSTR(name, '张') > 0 表示名字中含 “张”）。
- 提取字符串的部分内容（结合 SUBSTR() 使用）。
- 数据清洗（如过滤包含特定字符的记录）。

1. MySQL 中的 INSTR()
语法：
   INSTR(目标字符串, 子字符串)
说明：
   从目标字符串中查找子字符串，返回第一次出现的位置（位置从 1 开始计数）。
   若子字符串不存在，返回 0。
```sql
##### MYSQL
SELECT INSTR('Hello World', 'World');  -- 返回 7（'World' 从第7个字符开始）
SELECT INSTR('Hello World', 'x');      -- 返回 0（未找到）
SELECT INSTR('abcabc', 'a');           -- 返回 1（第一个 'a' 的位置）
```

2. Oracle 中的 INSTR()
语法：
   INSTR(目标字符串, 子字符串, [起始位置], [出现次数])
说明：
   比 MySQL 多两个可选参数：
   起始位置：从第几个字符开始查找（默认 1，正数表示从左到右，负数表示从右到左）。
   出现次数：查找第几次出现的位置（默认 1）。
```sql
### ORACLE
-- 从第1位开始，找第1次出现的 'o'
SELECT INSTR('Hello World', 'o') FROM DUAL;  -- 返回 5

-- 从第6位开始，找第1次出现的 'o'
SELECT INSTR('Hello World', 'o', 6) FROM DUAL;  -- 返回 8

-- 从右向左找第1次出现的 'o'（等价于从左数第8位）
SELECT INSTR('Hello World', 'o', -1) FROM DUAL;  -- 返回 8
```

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

| 函数语法（原描述）                       | 功能说明                            | MySQL 支持情况                        | Oracle 支持情况                        | SQL Server 支持情况                       | PostgreSQL 支持情况                               |
|---------------------------------|---------------------------------|-----------------------------------|------------------------------------|---------------------------------------|-----------------------------------------------|
| locate(substr, str)             | 返回子串在字符串中首次出现的位置（无则0）           | √                                 | ×，需用 `INSTR(str, substr)`          | ×，需用 `CHARINDEX(substr, str)`（参数顺序相同） | √                                             |
| position(substr IN str)         | 同LOCATE功能                       | √                                 | ×，需用 `INSTR(str, substr)`          | ×，需用 `CHARINDEX(substr, str)`         | √                                             |
| left(str, length)               | 从左侧截取指定长度字符串                    | √                                 | √                                  | √                                     | √                                             |
| right(str, length)              | 从右侧截取指定长度字符串                    | √                                 | √                                  | √                                     | √                                             |
| substring_index(str, substr, n) | 返回子串第n次出现前的字符串                  | √                                 | ×，需用 `INSTR+SUBSTR` 组合实现           | ×，需用 `CHARINDEX+SUBSTRING` 组合实现       | ×，需用 `STRPOS+SUBSTRING` 组合实现                  |
| substring(str, n, m)            | 从第n位截取m长度字符串（n为起始位置）            | 支持，n可等于0（视为1）                     | 支持 `SUBSTR(str, n, m)`（语法相同，n不能为0） | √（n不能为0）                              | 支持 `SUBSTRING(str FROM n FOR m)`（语法不同，参数含义相同） |
| replace(str, old, new)          | 将字符串中的n替换为m（原描述参数名有误，应为old、new） | 支持 `REPLACE(str, old, new)`（语法一致） | 支持 `REPLACE(str, old, new)`（语法一致）  | 支持 `REPLACE(str, old, new)`（语法一致）     | 支持 `REPLACE(str, old, new)`（语法一致）             |
| length(str)                     | 计算字符串长度                         | 返回**字节数**（受编码影响）                  | 返回**字符数**                          | ×，需用 `LEN(str)`（返回字符数）                | 支持，返回字符数（可用 `OCTET_LENGTH` 返字节数）              |

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
- HAVING子句只接受聚合函数

### 聚合函数：COUNT

- `COUNT(*)`：统计行数；
- `COUNT(字段)`：只统计非空的；
- `COUNT(DISTINCT 字段)`：字段去重后再统计，还是会排空，空不算在统计范围内
- `COUNT(DISTINCT device_id, date)`：多列数据的统计，约等于`GROUP BY device_id, date`查出数据，前端获取数据，然后data.length获取长度的操作

注意：
1. COUNT函数会过滤NULL或者0，不纳入统计范围
2. COUNT函数不接受逻辑运算，因为逻辑运算中否会被认定为0，而0会被过滤，如果一定要做那么可以考虑`IF`或者`CASE`
  `SUM(IF(column='', 1, 0))`，`CASE`语句同理  
3. **若目标字段为NULL，会将其认为参数为零**这很重要，要记牢

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

## 聚合函数：CROUP_CONCAT(字符串聚合)

```sql
SELECT
    category,
    GROUP_CONCAT(product_name SEPARATOR ', ') AS products
FROM products
GROUP BY category;
```

- SEPARATOR: 指定分割符，默认为逗号
- 可配合 DISTINCT 去重：`GROUP_CONCAT(DISTINCT product_name)`

不同数据库的字符串聚合函数也是不同的

例子：[点击前往](https://www.nowcoder.com/share/jump/1571640021754926849096)

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

- EXISTS 运算符用于判断查询子句是否有记录，如果有一条或多条记录存在，则返回TRUE，否则返回FALSE。
- EXISTS 只接受子查询

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

Eg: 查找未分配具体部门的员工的所有信息
```sql
SELECT * FROM employees
LEFT JOIN dept_emp USING(emp_no)
WHERE NOT EXISTS(
    SELECT 1 
    FROM dept_emp 
    WHERE dept_emp.emp_no = employees.emp_no
)
;
```
题目来源：[点击前往：牛客](https://www.nowcoder.com/share/jump/1571640021754969995339)

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

## Date

- 特殊值：9999-01-01，一般会用到如合同到期，遇到这样的，会判断

## Date：TIMESTAMPDIFF

时间差值：`TIMESTAMPDIFF(时间单位, 开始时间, 结束时间)`

```sql

-- 相差多少天
SELECT TIMESTAMPDIFF(DAY, '2023-10-01 08:00:00', '2023-10-03 10:30:00'); -- 结果：2（天）

-- 相差多少小时
SELECT TIMESTAMPDIFF(HOUR, '2023-10-01 08:00:00', '2023-10-03 10:30:00'); -- 结果：50（小时）

-- 相差多少分钟
SELECT TIMESTAMPDIFF(MINUTE, '2023-10-01 08:00:00', '2023-10-03 10:30:00'); -- 结果：3030（分钟）
```