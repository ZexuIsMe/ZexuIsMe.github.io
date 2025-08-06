---
title: 额外补充-SQL习题
date: 2025-08-06 09:04:13
tags: [额外补充, SQL习题]
categories:
  - 额外补充
  - SQL习题
---

> **现在运营想要了解2021年8月份所有练习过题目的总用户数和练习过题目的总次数，请取出相应结果**

| id | device_id | question_id | result | date       |
|----|-----------|-------------|--------|------------|
| 1  | 2138      | 111         | wrong  | 2021-05-03 |
| 2  | 3214      | 112         | wrong  | 2021-05-09 |
| 3  | 3214      | 113         | wrong  | 2021-06-15 |
| 4  | 6543      | 111         | right  | 2021-08-13 |
| 5  | 2315      | 115         | right  | 2021-08-13 |
| 6  | 2315      | 116         | right  | 2021-08-14 |
| 7  | 2315      | 117         | wrong  | 2021-08-15 |

根据的示例，你的查询应返回以下结果：

| did_cnt | question_cnt |
|---------|--------------|
| 3       | 12           |

```sql
SELECT
    COUNT(DISTINCT device_id) AS did_nct,
    COUNT(question_id) AS question_cnt
FROM question_practice_detail AS qpd
WHERE qpd.date BETWEEN '2021-08-01' AND '2021-08-30'; 
```

- 聚合函数的去重：`COUNT(DISTINCT device_id)`，在函数内部使用；
- `qpd.date BETWEEN '2021-08-01' AND '2021-08-30'; `：还可以进一步得到简化
`qpd.date LIKE '2021-08-%'` 但是这是有风险的，基于数据基本不会出现天数之外的数

----

> **在一张contacts表中，存储了用户的联系信息。请查询出所有符合以下条件的电话号码，并按id升序输出所有字段**

电话号码必须是 10 位数字。
电话号码的第一位不能以 0 开头。
电话号码的格式可以是连续的 10 位数字，或以-分隔的格式（如123-456-7890）。

表：contacts
| id | name    | phone_number |
|----|---------|--------------|
| 1  | Alice   | 1234567890   |
| 2  | Bob     | 0123456789   |
| 3  | Charlie | 123-456-7890 |
| 4  | David   | 123-4567-890 |
| 5  | Eve     | 9876543210   |

```sql
drop table if exists contacts;
CREATE TABLE `contacts` (
  `id`           INT         NOT NULL,
  `name`         VARCHAR(50) NOT NULL,
  `phone_number` VARCHAR(20) NOT NULL
);
INSERT INTO contacts VALUES
(1, 'Alice', '1234567890'),
(2, 'Bob', '0123456789'),
(3, 'Charlie', '123-456-7890'),
(4, 'David', '123-4567-890'),
(5, 'Eve', '9876543210');
```

根据的示例，你的查询应返回以下结果：

| id | name    | phone_number |
|----|---------|--------------|
| 1  | Alice   | 1234567890   |
| 3  | Charlie | 123-456-7890 |
| 5  | Eve     | 9876543210   |

```sql
SELECT * FROM contacts
WHERE
    phone_number REGEXP '^[1-9][0-9]{9}$'
OR  phone_number REGEXP '^[1-9][0-9]{2}-[0-9]{3}-[0-9]{4}$'
ORDER BY id ASC;
```

注意：MYSQL 中 \d 是无效的。

另外判断部分还可简化：`^[1-9][0-9]{2}-?[0-9]{3}-?[0-9]{4}` 

- `?`:前面的内容匹配0次或1次，匹配的内容是问号前的一个元素

-----------

> 运营想要计算一些参加了答题的不同学校、不同难度的用户平均答题量，请你写SQL取出相应数据

三表语句，直接复制创建相关数据表和数据；
```
drop table if exists `user_profile`;
drop table if  exists `question_practice_detail`;
drop table if  exists `question_detail`;
CREATE TABLE `user_profile` (
`id` int NOT NULL,
`device_id` int NOT NULL,
`gender` varchar(14) NOT NULL,
`age` int ,
`university` varchar(32) NOT NULL,
`gpa` float,
`active_days_within_30` int ,
`question_cnt` int ,
`answer_cnt` int 
);
CREATE TABLE `question_practice_detail` (
`id` int NOT NULL,
`device_id` int NOT NULL,
`question_id`int NOT NULL,
`result` varchar(32) NOT NULL
);
CREATE TABLE `question_detail` (
`id` int NOT NULL,
`question_id`int NOT NULL,
`difficult_level` varchar(32) NOT NULL
);

INSERT INTO user_profile VALUES(1,2138,'male',21,'北京大学',3.4,7,2,12);
INSERT INTO user_profile VALUES(2,3214,'male',null,'复旦大学',4.0,15,5,25);
INSERT INTO user_profile VALUES(3,6543,'female',20,'北京大学',3.2,12,3,30);
INSERT INTO user_profile VALUES(4,2315,'female',23,'浙江大学',3.6,5,1,2);
INSERT INTO user_profile VALUES(5,5432,'male',25,'山东大学',3.8,20,15,70);
INSERT INTO user_profile VALUES(6,2131,'male',28,'山东大学',3.3,15,7,13);
INSERT INTO user_profile VALUES(7,4321,'male',28,'复旦大学',3.6,9,6,52);
INSERT INTO question_practice_detail VALUES(1,2138,111,'wrong');
INSERT INTO question_practice_detail VALUES(2,3214,112,'wrong');
INSERT INTO question_practice_detail VALUES(3,3214,113,'wrong');
INSERT INTO question_practice_detail VALUES(4,6543,111,'right');
INSERT INTO question_practice_detail VALUES(5,2315,115,'right');
INSERT INTO question_practice_detail VALUES(6,2315,116,'right');
INSERT INTO question_practice_detail VALUES(7,2315,117,'wrong');
INSERT INTO question_practice_detail VALUES(8,5432,117,'wrong');
INSERT INTO question_practice_detail VALUES(9,5432,112,'wrong');
INSERT INTO question_practice_detail VALUES(10,2131,113,'right');
INSERT INTO question_practice_detail VALUES(11,5432,113,'wrong');
INSERT INTO question_practice_detail VALUES(12,2315,115,'right');
INSERT INTO question_practice_detail VALUES(13,2315,116,'right');
INSERT INTO question_practice_detail VALUES(14,2315,117,'wrong');
INSERT INTO question_practice_detail VALUES(15,5432,117,'wrong');
INSERT INTO question_practice_detail VALUES(16,5432,112,'wrong');
INSERT INTO question_practice_detail VALUES(17,2131,113,'right');
INSERT INTO question_practice_detail VALUES(18,5432,113,'wrong');
INSERT INTO question_practice_detail VALUES(19,2315,117,'wrong');
INSERT INTO question_practice_detail VALUES(20,5432,117,'wrong');
INSERT INTO question_practice_detail VALUES(21,5432,112,'wrong');
INSERT INTO question_practice_detail VALUES(22,2131,113,'right');
INSERT INTO question_practice_detail VALUES(23,5432,113,'wrong');
INSERT INTO question_detail VALUES(1,111,'hard');
INSERT INTO question_detail VALUES(2,112,'medium');
INSERT INTO question_detail VALUES(3,113,'easy');
INSERT INTO question_detail VALUES(4,115,'easy');
INSERT INTO question_detail VALUES(5,116,'medium');
INSERT INTO question_detail VALUES(6,117,'easy');
```
| university | difficult_level | avg_answer_cnt |
|------------|-----------------|----------------|
| 北京大学       | hard            | 1.0000         |
| 复旦大学       | easy            | 1.0000         |
| 复旦大学       | medium          | 1.0000         |
| 山东大学       | easy            | 4.5000         |
| 山东大学       | medium          | 3.0000         |
| 浙江大学       | easy            | 5.0000         |
| 浙江大学       | medium          | 2.0000         |

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

- **使用隐性联结**
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

- **USING**
```sql
SELECT
    up.university
,   qe.difficult_level
,   ROUND(
       COUNT(qe.difficult_level) / COUNT(DISTINCT up.device_id)
    , 4) AS avg_answer_cnt
FROM user_profile AS up
INNER JOIN question_practice_detail AS qpd
    USING(device_id)
INNER JOIN question_detail AS qe
    USING(question_id)
GROUP BY
    up.university
,   qe.difficult_level
;
```
- **WITH**
```sql
WITH with_table AS(
    SELECT t1.university, t3.difficult_level, t1.device_id
    FROM
        user_profile as t1
    INNER JOIN   question_practice_detail as t2 ON t1.device_id = t2.device_id
    INNER JOIN   question_detail as t3 ON t2.question_id = t3.question_id
)
SELECT
    university
,   difficult_level
,   ROUND(
       COUNT(difficult_level) / COUNT(DISTINCT device_id)
    , 4) AS avg_answer_cnt
FROM with_table
GROUP BY
    university
,   difficult_level
;
```
多表联查注意事项：
- 别名的使用一定不要搞错了
- 字段均要给出表的出处
- 联表时，ON子句的连接桥梁一定是越全数据越正确
```sql
WITH With_2 AS(
    SELECT
        学生表.班级编号, 学生表.学号, 学生表.姓名
    ,   课程表.课程编号, 课程表.课程名
    ,   成绩表.成绩
    FROM 学生表, 成绩表, 课程表
    WHERE
        学生表.班级编号 = 成绩表.班级编号
    AND 学生表.学号 = 成绩表.学号
    AND 成绩表.课程编号 = 课程表.课程编号
)
SELECT * FROM With_2 WHERE 课程名 IN('QTP', 'Linux') AND 姓名='吴丹' AND 班级编号 = 101;
```
![img_1.png](../../images/51testing/join_on_02.png)

比如该查询，如果没有`学生表.学号 = 成绩表.学号`就会出现，如下图所示内容，一个学生一门课会有N次成绩，这显然是错误的
![img.png](../../images/51testing/join_on_01.png)
因此，在联表查询的时候，桥梁越详细，查询出来的信息才会越准确，能够避免联表产生的无效数据行。

> **现在运营想要分别查看学校为山东大学或者性别为男性的用户的device_id、gender、age和gpa数据，请取出相应结果，结果不去重。**

考察点：UNION、OR关于去重的知识点

| id | device_id | gender | age | university | gpa | active_days_within_30 | question_cnt | answer_cnt |
|----|-----------|--------|-----|------------|-----|-----------------------|--------------|------------|
| 1  | 2138      | male   | 21  | 北京大学       | 3.4 | 7                     | 2            | 12         |
| 2  | 3214      | male   |     | 复旦大学       | 4   | 15                    | 5            | 25         |
| 3  | 6543      | female | 20  | 北京大学       | 3.2 | 12                    | 3            | 30         |
| 4  | 2315      | female | 23  | 浙江大学       | 3.6 | 5                     | 1            | 2          |
| 5  | 5432      | male   | 25  | 山东大学       | 3.8 | 20                    | 15           | 70         |
| 6  | 2131      | male   | 28  | 山东大学       | 3.3 | 15                    | 7            | 13         |
| 7  | 4321      | male   | 28  | 复旦大学       | 3.6 | 9                     | 6            | 52         |

- 数据不去重
- 要求先输出山东大学数据，再输出性别为男的数据

此时，你想到了 `OR`，但是你知道吗？OR是自动完成去重操作的。
此时，你又想到了 `UNION`。可是UNION也会做去重操作，所以要用就用`UNION ALL` 这样就不考虑去重了

```sql
SELECT device_id,	gender,	age,	gpa FROM user_profile WHERE university = '山东大学'
UNION ALL
SELECT device_id,	gender,	age,	gpa FROM user_profile WHERE gender = 'male'
;
```

> **现在运营想要将用户划分为25岁以下和25岁及以上两个年龄段，分别查看这两个年龄段用户数量**

考察点：IF条件语句、CASE语句、UNION、COUNT

- COUNT：不会统计NULL值

表：user_profile

| id | device_id | gender | age | university | gpa | active_days_within_30 | question_cnt | answer_cnt |
|----|-----------|--------|-----|------------|-----|-----------------------|--------------|------------|
| 1  | 2138      | male   | 21  | 北京大学       | 3.4 | 7                     | 2            | 12         |
| 2  | 3214      | male   |     | 复旦大学       | 4   | 15                    | 5            | 25         |
| 3  | 6543      | female | 20  | 北京大学       | 3.2 | 12                    | 3            | 30         |
| 4  | 2315      | female | 23  | 浙江大学       | 3.6 | 5                     | 1            | 2          |
| 5  | 5432      | male   | 25  | 山东大学       | 3.8 | 20                    | 15           | 70         |
| 6  | 2131      | male   | 28  | 山东大学       | 3.3 | 15                    | 7            | 13         |
| 7  | 4321      | male   | 26  | 复旦大学       | 3.6 | 9                     | 6            | 52         |

预期的查询结果：

| age_cut | number |
|---------|--------|
| 25岁以下   | 4      |
| 25岁及以上  | 3      |

**方案一: CASE**
```sql
SELECT
    CASE 
        WHEN age<25 OR age IS NULL OR age='' THEN '25岁以下'  
        ELSE '25岁及以上'
    END AS 'age_cut'
,   COUNT(device_id)
FROM user_profile
GROUP BY age_cut;
```

**方案二: IF**
```sql
SELECT
    IF(age>=25, '25岁及以上', '25岁以下') AS age_cut,
    COUNT(*) AS number
FROM user_profile
GROUP BY age_cut;
```

**方案三：UNION**
```sql
SELECT
    '25岁以下' AS age_cut,
    COUNT(device_id) AS number
FROM
    user_profile
WHERE
    age < 25 OR age IS NULL OR age=''
UNION
SELECT
    '25岁及以上' AS age_cut,
    COUNT(device_id) AS number
FROM
    user_profile
WHERE
    age >= 25
;
```




