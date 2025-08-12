---
title: SQL-触发器
date: 2025-08-11 16:31:14
tags: [SQL, 触发器, 相对重要]
categories:
  - SQL
  - 触发器
---
SQL 触发器（Trigger）是一种特殊的存储过程，它不需要手动调用，而是在满足特定条件（如执行INSERT、UPDATE、DELETE操作）时自动触发执行。触发器通常用于维护数据完整性、实现业务规则或记录操作日志等场景。

<!--more-->

```sql
create trigger 触发器的名字
[before/after] [insert/alert/delete] ON table
for each row
begin
    SQL语句
end;
```

- 触发时机：`BEFORE`（操作执行前触发）或`AFTER`（操作执行后触发）。
- 触发事件：`INSERT`（插入时）、`UPDATE`（更新时）、`DELETE`（删除时）。
- `FOR EACH ROW`：表示对每一行受影响的数据都执行触发器逻辑（MySQL 只支持行级触发器）。

当某表执行`insert/alert/delete`中的任何一个SQL操作时，根据触发时机去执行`begin`中的SQL语句

Eg：当追加新的员工信息的时，也执行 audit 表的信息追加
```sql
CREATE TRIGGER audit_log
AFTER INSERT ON employees_test
FOR EACH ROW
BEGIN
    INSERT INTO audit(EMP_no, NAME) VALUES(NEW.ID, NEW.NAME);
END;
```

## 查看触发器

    SHOW TRIGGERS;  -- 查看所有触发器
    SHOW CREATE TRIGGER 触发器名称;  -- 查看指定触发器的创建语句

## 删除触发器

    DROP TRIGGER IF EXISTS 触发器名称;

## 注意事项

1. NEW（新数据）、OLD（旧数据）的使用
  - INSERT事件，只有 NEW
  - DELETE事件，只有 OLD
  - UPDATE事件，都可用
2. 性能影响
   触发器会在操作时自动执行，过多或复杂的触发器可能降低数据库性能（**尤其是批量操作时**）
3. 调试困难
   触发器在后台自动执行，出问题时排查难度比普通SQL大，**谨慎使用**
4. 权限控制
    创建触发器需要 TRIGGER 权限，且触发器的执行权限以来创建的权限。