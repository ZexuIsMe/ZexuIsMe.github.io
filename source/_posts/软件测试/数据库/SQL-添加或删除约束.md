---
title: SQL-添加或删除约束
date: 2025-08-11 18:37:53
tags: [SQL, 约束, 添加, 删除]
categories:
  - SQL
  - 约束
---

## ADD：外键约束

```sql
ALTER TABLE 子表名
ADD CONSTRAINT 约束名
FOREIGN KEY (子表中的外键列)
REFERENCES 主表名 (主表中的主键列)
[ON DELETE 操作]
[ON UPDATE 操作];
```
- `ADD CONSTRAINT 约束名`：自定义的约束名称（通常建议包含 fk_ 前缀以便识别: fk_tableName_columnName）
- 子表中的外键列：需要作为外键的字段（通常与主表主键类型一致）
- 主表名 (主表中的主键列)：被引用的主表及其主键
- \[ON DELETE 操作]（可选）：主表记录删除时的处理规则，如 CASCADE（级联删除）、SET NULL（设为 NULL）等
- \[ON UPDATE 操作]（可选）：主表主键更新时的处理规则

题目来源：[点击前往](https://www.nowcoder.com/share/jump/1571640021754908301294)

## ADD：主键约束，唯一约束，CHECK

    ALTER TABLE table_name
    ADD CONSTRAINT fk_tableName_columnName
    PRIMARY KEY (column1[, column2, column3]) -- 可包含多个（复合键）
    UNIQUE(column1[, column2, column3]) --可多字段组合唯一
    CHECK(条件表达式)
    ;

一个 ADD CONSTRAINT 只能设置一个约束

## ADD: 非空约束

    ALTER TABLE table_name
    ALTER COLUMN column
    SET NOT NULL;


## 删除约束

    ALTER TABLE table_name DROP CONSTRAINT 约束名;