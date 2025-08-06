---
title: SQL-组合查询
date: 2025-08-03 20:22:40
tags: [软件测试, SQL, 组合查询, JOIN, UNION, 合并]
categories:
  - 软件测试
  - SQL
  - 组合查询
---

## 表合并：Union

合并表的操作，又叫**垂直拼接**。

使用场景：数据很多，将表进行切分，比如1月的订单数据，2月的订单数据...，类似于分页操作

- **会自动做去重操作**
- **UNION等价于`OR`，`OR`也会自动去重**
- 输出字段按UNION左侧的字段输出
- 组合查询时，前后两表用于显示的字段数据类型必须一致
- 只看数据类型不看长度，比如varchar(10)和varchar(20);

Q：那你知道去重的是什么样的数据吗？和distinct有区别吗？

A：UNION是针对**行**的去重，去掉的是一模一样的行数据，distinct是针对**字段**的去重

| aid | aName |
|-----|-------|
| 1   | Alice |
| 2   | Simon |

| bid | bName |
|-----|-------|
| 1   | Alice |
| 2   | Bob   |

```sql
SELECT aid, aName FROM aaa
UNION
SELECT bid, bName FROM bbb;
```
因为 a、b 两表的 Alice 数据一模一样，会被去重；
若 A 表 Alice 的 aid 参数为 3，那么当执行 UNION 组合查询的时候，就不会被去重。

如果不希望主动去掉相同数据行，可使用 `UNION ALL`

> Q：INNER JOIN 和 JOIN 区别？

A：没有区别。他们是一样的，常见的数据库中他们的含义是一致的。

Q：组合查询中的ON和WHERE的区别？
A：ON子句用于定义连接条件；WHERE是用于过滤连接后的结果集

```sql
# 输出两行记录
SELECT 1 UNION SELECT 2;

# AS只认第一个，后续无效
SELECT 1 AS abc UNION SELECT 2 AS efg
```

## JOIN

![JOIN](https://www.runoob.com/wp-content/uploads/2019/01/sql-join.png)

| 类型              | 描述                               |
|-----------------|----------------------------------|
| inner join      | 返回两个表中满足连接条件的记录（交集）              |
| left join       | 返回左表中的所有记录，即使右表中没有匹配的记录（保留左表）    |
| right join      | 返回右表中的所有记录，即使左表中没有匹配的记录（保留右表）    |
| full outer join | 返回两个表的并集，包含匹配和不匹配的记录             |
| cross join      | 返回两个表的**笛卡尔积**，每条左表记录与每条右表记录进行组合 |
| self join       | 将一个表与自身连接                        |
| natural join    | 基于同名字段自动匹配连接的表                   |

如图所示，红色区域即为组合查询返回的结果

- 联表后是一张全新的大表，所以在查询时需要考虑是否去重等等问题。
- 只做联表查询是否，用于显示的字段别忘了写上出处
- JOIN系列是笛卡尔积绘制临时表

请看下面这段问题SQL语句，**你知道问题出在哪里吗？**
```sql
SELECT
    device_id,	question_id,	result
FROM question_practice_detail AS qpd
INNER JOIN user_profile AS up
    ON qpd.device_id = up.device_id
WHERE up.university = '浙江大学';
```

**用于显示的字段`device_id, question_id, result` 不知道出自`qpd`表还是`up`表，需要表示出处`qpd.device_id, qpd.question_id, qpd.result`**

### JOIN：USING
若连接条件的字段都一样，那么可以使用`USING`简化语句：

`ON qpd.device_id = up.device_id` 》 `USING(device_id)`

如果联表过程中发现是多个：`INNER JOIN user_profile AS up USING(device_id, column_name)`

### JOIN: 隐性联查

这是第一段三表联查的SQL语句：
```sql
SELECT
    up.university
,   qe.difficult_level
,   ROUND(
       COUNT(qe.difficult_level) / COUNT(DISTINCT up.device_id)
    , 4) AS avg_answer_cnt
FROM user_profile AS up
INNER JOIN question_practice_detail AS qpd
    ON up.device_id = qpd.device_id
INNER JOIN question_detail AS qe
    ON qpd.question_id = qe.question_id
GROUP BY
    up.university
,   qe.difficult_level
;
```

通过将联表关键作用于WHERE子句上，实现隐性联查

```sql
SELECT
    up.university
,   qe.difficult_level
,   ROUND(
       COUNT(qe.difficult_level) / COUNT(DISTINCT up.device_id)
    , 4) AS avg_answer_cnt
FROM
    user_profile AS up
,   question_practice_detail AS qpd
,   question_detail AS qe
WHERE
     up.device_id = qpd.device_id
 AND qpd.question_id = qe.question_id
GROUP BY
    up.university
,   qe.difficult_level
;
```

这样写可以在一定程度上让语句更加可读，唯一的理解成本就是需要先了解**隐性连接**相关操作

## WITH

语法：
```sql
WITH cte_name AS (
  SELECT ...  -- 子查询逻辑
)
SELECT ... FROM cte_name;  -- 仅在当前语句中使用cte_name
```

简化复杂逻辑，比如多表联查的联结过程用WITH代替，具体的操作则用常规的SQL查询即可

- **在完成操作前，没有With以及 WITH AS() 括号内的SELECT语句没有都不加`;`**

```sql
-- 2.1 查询101期吴丹同学修的QTP, Linux两门课程的成绩
WITH With_2 AS(
    SELECT
        学生表.班级编号, 学生表.学号, 学生表.姓名
    ,   课程表.课程编号, 课程表.课程名
    ,   成绩表.成绩
    FROM 学生表, 成绩表, 课程表
    WHERE
        学生表.班级编号 = 成绩表.班级编号
    AND 成绩表.课程编号 = 课程表.课程编号
)
SELECT * FROM With_2 WHERE 课程名 IN('QTP', 'Linux') AND 姓名='吴丹' AND 课程编号 = 101;
```

> Q：和SQL视图的区别？

共同点：都有封装效果，拆分复杂逻辑

不同点：with只在当前查询有效，SQL视图一般情况下如果不删除则是永久的有效



