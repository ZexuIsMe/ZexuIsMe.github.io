---
title: SQL-执行顺序
date: 2025-08-09 13:52:49
tags: [SQL, 执行顺序]
categories:
  - SQL
---

SQL 查询的逻辑执行顺序与我们书写 SQL 的顺序有所不同，理解这一点对于编写高效查询和排查问题非常重要。以下是 SQL 语句的典型逻辑执行步骤（从先到后）：

<!--more-->

1. **FROM/JOIN**  
   首先确定查询的数据来源，包括基础表、视图，以及通过 JOIN 连接的表。这一步会生成一个临时数据集，包含所有涉及表的列。

2. **WHERE**  
   对 FROM 阶段生成的数据集进行筛选，只保留满足条件的行。**WHERE 不能使用聚合函数**，因为此时聚合尚未执行。

3. **GROUP BY**  
   将 WHERE 筛选后的行按指定列分组。分组后，后续操作（如聚合）将基于每个分组进行。

4. **HAVING**  
   对 GROUP BY 后的分组结果进行筛选，**可以使用聚合函数**（如 `HAVING COUNT(*) > 10`）。

5. **SELECT**  
   选择需要返回的列（包括聚合函数计算的结果），并可能对列进行重命名（AS）。

6. **DISTINCT**  
   对 SELECT 结果去重，只保留唯一行。

7. **ORDER BY**  
   按指定列对结果集排序（升序 ASC 或降序 DESC）。**可以使用 SELECT 中定义的别名**。

8. **LIMIT/OFFSET**  
   限制返回的行数（如 `LIMIT 10`）或跳过指定行数（如 `OFFSET 5`），通常用于分页。

- **子查询不能写分号**
- **窗口函数只能在SELECT中使用**
- **别名AS的使用要跟着遵循执行顺序走**
- **SELECT中的非聚合函数别名不能在HAVING子句中使用，同样的SELECT中聚合函数的别名能在HAVING中使用，这是特别的，不比准寻执行顺序**
- **窗口函数只能在SELECT中使用**

## 示例说明

以下 SQL 语句的执行顺序对应上述步骤：

```sql
SELECT department, AVG(salary) AS avg_salary  -- 5. 选择列并命名
FROM employees                               -- 1. 确定数据源
WHERE hire_year > 2010                       -- 2. 筛选行
GROUP BY department                          -- 3. 按部门分组
HAVING AVG(salary) > 50000                   -- 4. 筛选分组
ORDER BY avg_salary DESC                     -- 7. 按平均工资排序
LIMIT 5;                                     -- 8. 限制返回5行