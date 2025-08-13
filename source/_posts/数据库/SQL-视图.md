---
title: SQL-视图
date: 2025-08-05 17:07:21
tags: [SQL, 视图]
categories:
  - SQL
  - 视图
---

所谓的SQL视图，用于简化编写提高编写速度的，如果使用频率很高，那么可以考虑使用视图

类似于CLASS类封装或者变量的声明，在需要用到的地方进行使用，或者理解为一种API接口

- 视图占虚拟内存，不占物理内存
- **SQL视图的数据是事实的**，表更新，视图也更新，但一般不操作视图进行更新。
- 视图可以嵌套
- 提高编写速度
- 单表、多表、聚合都可用

## 创建视图

语法：`CREATE VIEW view_students AS SELECT * FROM students;`

```sql
CREATE VIEW view_students AS SELECT * FROM students WHERE 班级=1;

# EG：查询学生表1班学生分数高于400的学生信息
SELECT * FROM view_students WHERE 分数>400;

# EG：查询学生表1班学生数学小于90的学生信息
SELECT * FROM view_students WHERE 数学<90;
```
两个SELECT语句等同于
- `SELECT * FROM students WHERE 班级=1 AND 分数>400;`
- `SELECT * FROM students WHERE 班级=1 AND 数学<90;`

这样语句明了，可读性增加，提高了编写速度。

## 删除视图

语法：`DROP VIEW [IF EXISTS] view_name;`
