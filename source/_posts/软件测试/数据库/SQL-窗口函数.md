---
title: SQL-窗口函数
date: 2025-08-08 17:57:28
tags: [SQL, 窗口函数]
categories:
- SQL
- 窗口函数
---

**使用场景**
1. 窗口函数的核心优势是 **“不聚合原始数据，同时实现复杂分析”**，因此特别适合：
2. 既要保留明细数据，又要展示分析结果（如报表中的 “原始值 + 排名 + 占比”）
3. 需在分组内进行精细计算（如 “组内排名”“组内累计”）
4. 时间序列的趋势分析（如移动平均、累计增长）
相比传统的GROUP BY聚合或子查询，窗口函数能更简洁、高效地实现这些场景

<!--more-->

## 一、定义

窗口函数（Window Function）是 SQL 中一种强大的分析型函数，能在一组与当前行相关的数据行上执行计算，且不改变原始数据的行数。与聚合函数不同，它不会将多行数据合并为一行，而是为每行数据返回一个计算结果。

## 二、基本语法

```SQL
窗口函数名(表达式) OVER (

   [PARTITION BY 列名]  -- 可选：将数据分组

   [ORDER BY 列名 [ASC|DESC]]  -- 可选：对分组内的数据排序

   [ROWS/RANGE 窗口范围]  -- 可选：定义窗口大小

)
```

## 三、核心组成部分

1.  **窗口函数名**：如`ROW_NUMBER()`、`RANK()`、`DENSE_RANK()`、`SUM()`、`AVG()`等。

2.  **OVER 子句**：定义 “窗口” 范围，包含三个可选部分：

*   `PARTITION BY`：类似`GROUP BY`，将数据划分为不同组（窗口）。

*   `ORDER BY`：对每个分组内的数据进行排序。

*   窗口范围：定义当前行前后需要包含的行数（如`ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING`）。

## 四、常用窗口函数分类

1.  **排序函数**：

*   `ROW_NUMBER()`<sup class="text-primary">使用次数频繁等级：2</sup> 为每行分配唯一序号，即使值相同也不重复。

*   `RANK()`<sup class="text-primary">使用次数频繁等级：0</sup> 排名可能有间隔（如 1,2,2,4...）。

*   `DENSE_RANK()`<sup class="text-primary">使用次数频繁等级：3</sup> 排名无间隔（如 1,2,2,3...）。

1.  **聚合函数作为窗口函数**<sup class="text-primary">使用次数频繁等级：1</sup>

*   `SUM(列) OVER(...)`：计算窗口内的总和。

*   `AVG(列) OVER(...)`：计算窗口内的平均值。

*   `COUNT(列) OVER(...)`：计算窗口内的行数。

1.  **分布函数**：

*   `PERCENT_RANK()`：计算百分比排名。

*   `CUME_DIST()`：计算累积分布值。

## 五、关键子句解析

1.  **PARTITION BY**：用于将数据分组，在每个分组内分别应用窗口函数。若没有该子句，则整个表作为一个分组。

2.  **ORDER BY**：确定分组内数据的排序规则，会影响窗口范围的划定和函数计算结果。

3.  **窗口范围**：

*   `ROWS`：按 “物理行数” 划定范围。

*   `RANGE`：按值范围划定范围。

*   常见范围定义：

    *   `UNBOUNDED PRECEDING`：从当前分区的第一行开始。

    *   `CURRENT ROW`：包含当前行。

    *   `1 PRECEDING`：当前行的前一行。

    *   `1 FOLLOWING`：当前行的后一行。

## 六、实战示例

![窗口函数-习题01](
https://fdc-four.oss-cn-beijing.aliyuncs.com/images/SQL/SQL-%E7%AA%97%E5%8F%A3%E5%87%BD%E6%95%B0-%E4%B9%A0%E9%A2%98-01.png?Expires=1754838335&OSSAccessKeyId=TMP.3Ksgkf6kGuT2T6TbNB1FnE38j6hUscNg1omqkjZYj9Nj4UKxqAeTNNqcmSLYaMqisNhAJzHvekfCHVWVaY8N8anmqk4YHc&Signature=V3HOLwFdK%2FHMkk58g1n3Zq%2BLgsk%3D)

```sql
WITH w01 AS (
    SELECT emp_no, DENSE_RANK() OVER(ORDER BY salary DESC) AS ranking FROM salaries
)
SELECT emp_no, salary
FROM salaries
INNER JOIN w01 USING(emp_no)
WHERE ranking=2
;

# 窗口函数的第二种用法
SELECT emp_no, salary
FROM (SELECT emp_no, salary, DENSE_RANK() OVER(ORDER BY salary DESC) AS ranking FROM salaries) AS s1
WHERE ranking=2
;
## FROM 的嵌套子查询需要用AS添加别名
```
另外一种解法，使用LIMIT取出第二名
```sql
select emp_no, salary
from salaries
where salary = (
    select salary from salaries
    group by salary
    order by salary desc limit 1,1
    )
```
> Q: 窗口函数和LIMIT孰优孰劣，在这个情景中？

A：先说结论，若数据量很大，推荐使用`LIMIT`，因为窗口函数需要扫描全表，间接增加了查询时间，且窗口函数需要 MySQL 8.0+、PostgreSQL、Oracle、SQL Server 2012+ 这些版本的支持，
反观 LIMIT 则没有这方的烦恼，主流数据库都支持，所以若数据量大，推荐LIMIT。

- 窗口函数更具可读性，能否直观的覆盖排名第二多的情况；
- LIMIT兼容性好，但不能很好的表达排名情况，需要配合 DISTINCT 或者 GROUP BY 完成去重操作，保证排名的无并列情况

## 七、优势

1.  可在不聚合数据的情况下进行复杂计算。

2.  能够同时查看原始数据和分析结果。

3.  支持灵活的窗口定义，适应各种分析场景。

4.  避免了使用子查询或自连接来实现类似功能。

## 八、理解顺序

对于窗口函数语句，可按照从内到外、从函数到范围的顺序理解：



1.  先确定计算逻辑（如`SUM(销售额)`）：明确要做什么计算。

2.  再确定数据顺序（如`ORDER BY 销售额`）：按什么顺序处理数据。

3.  最后确定计算范围（如`ROWS ...`）：每行计算时包含哪些行。

4.  逐行应用上述规则，得到最终结果。

> （注：文档由 AI 总结生成）