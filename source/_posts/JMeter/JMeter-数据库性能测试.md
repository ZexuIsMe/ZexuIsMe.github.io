---
title: JMeter-数据库性能测试
date: 2025-10-09 19:16:15
tags: [JMeter, 数据库性能测试, SQL语句性能测试]
categories:
  - JMeter
---

## JMeter：数据库的性能测试

【测试方式】 JDBC

【准备工作】 
- 收集好测试目标，以便按计划进行测试工作
- CSV 数据集
- 线程组调出"调试取样器"（右击"线程组" > 添加 > 取样器 > Debug Sampler）
- 线程组调出"查看结果树"（右击"线程组" > 添加 > 监听器 > 查看结果树）

## JDBC：数据库连接配置

【调出】 右击"线程组" > 添加 > 取样器 > Debug Sampler

【配置操作】
\-> 填写 `Variable Name for created pool`，参数为 `ecshop`
（表示创建一个名为 `ecshop` 的连接池）
（后续 JDBC 请求组件将通过该名称引用此连接池）

\-> 填写 `Database URL`，参数为 `jdbc:mysql://127.0.0.1:3306/ecshop`
（表示链接JDBC要连接该地址上的 `ecshop` 库）

\-> 填写 `JDBC Driver class`，参数为 `com.mysql.cj.jdbc.Driver`
（是一个下拉选框，但不明白 cj 是怎么来的，选框中并没有该参数）
（待确认）

\-> 填写 `Username`，参数为 `root`
（参数为 `ecshop` 数据库的用户名）

\-> 填写 `Password`， 参数为 `******`
（参数为 `ecshop` 数据库的密码）

## JDBC Request

\-> 右击目标 > 添加 > 取样器 > JDBC Request

\-> 填写 `Variable Name of Pool declared in JDBC Connection Configuration`，参数为 `ecshop`
（注意，此处的 `ecshop` 是前面`Variable Name for created pool`定义的名为 ecshop 的连接池）

\-> Query Type 选择 `Prepared Select Statement`
（翻译：已准备的选择语句）
（将目标SQL语句贴入其中，余下操作，阅读本页【JDBC：关于传参】）

## JDBC：关于传参

    select user_id from ecs_users Where user_name="${yh}"
    select user_id from ecs_users Where user_name=?

两种传参方式的区别是？
【共同点】
都是预编译阶段将参数并传入到语句中

【不同点】 写入方式
前者：使用 JMeter 中的变量引用写入，另外还需注意变量类型，比如，如果是字符串，则需要双引号（`where user_name="${yongHu}"`）
后者：以占位符的方式写入

【不同点】 SQL 注入风险
前者：有被SQL注入的风险，若变量 yh 的值被恶意构造（如 `test" or "1"="1`），替换后会变成：`select user_id from ecs_users Where user_name="test" or "1"="1"`，可能导致查询出所有用户数据，存在安全隐患。
后者：是数据库会将传递的参数**视为纯数据**，不会解析为 SQL 命令的一部分。即使参数是恶意值（如 `test" or "1"="1`），也只会被当作普通字符串匹配，不会改变 SQL 逻辑。

> 关于占位传参：? 

|                             | 翻译                                 |
|-----------------------------|------------------------------------|
| Parameter values            | 用于表示占位符的参数，也就是 `?`（英文状态下的问号）       |
|                             | Eg: `${yh}` 填入后表示获取名为 yh 的变量参数信息   |
| Parameter types             | 表示参数的类型                            |
|                             | 比如 ${yh} 是一个字符，那么其参数就是 `char`      |
| Variable names              | 定义变量名称                             |
| Variable names              | 可以理解为 Postman 中定义一个集合变量            |
| Result variable name        |                                    |
| Query timeout (s)           |                                    |
| Limit ResultSet             | 取值                                 |
|                             | 若填入`1`，可以理解为 MYSQL 中 limit 1，取一条数据 |
| Handle ResultSet:           | 处理结果集，默认选项为`Store as String`       |

> 关于 Handle ResultSet 的选项：**Store as String**

结果将以字符串的形式存储，无论是数值、日期还是其他类型，统统转为字符串类型来保存或是后续的处理。

该选项**通用性强，避免类型不匹配的问题**。不过成也萧何，败也萧何，**若后续需要基于数值计算或是日期比较等类型进行数据的处理，需要额外的类型转换操作**。

> 关于 Handle ResultSet 的选项：**Store as Object**

结果将以 Java 对象 Object 的形式存储，更准确的来说，会尽量匹配数据库字段的数据类型，比如数值类型字段转为 Integer 或是 Double，日期型转为 Date

该选项**能最大程度的保留数据的原始数据类型**，方便后续基于类型的业务逻辑处理，但**需要确保代码或工具能正确识别和转换数据库字段类型**，否则可能出现类型转换异常

> 关于 Handle ResultSet 的选项：**Count Records**

统计结果集的记录数，即查询结果有多少行数据，主要用来快速获取结果集的规模信息


## Question：根据结果保存的参数明明是数值，为什么使用的时候会是字符串?

检查 Handle ResultSet 选项是否为 `Store as String`，因为该选项会想结果统一处理成字符串，如需原始类型，可将选项更改为 `Store as Object`










