---
title: 数据库-组合查询
date: 2025-08-03 20:22:40
tags: [软件测试, SQL, 组合查询, JOIN]
categories:
  - 软件测试
  - SQL
  - 组合查询
---

## 组合查询：Union

- 会自动做去重操作
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

