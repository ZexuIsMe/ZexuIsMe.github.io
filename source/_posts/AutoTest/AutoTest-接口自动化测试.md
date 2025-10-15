---
title: AutoTest-接口自动化测试
date: 2025-10-12 17:50:52
tags: [AutoTest, 接口测试]
categories:
  - AutoTest
---

## 库

【Requests】 Python 发出接口访问请求的库
【Pytest】 以数据驱动的方式测试用例
【logging】 日志库
【Pymysql】 用 Python 读取 mysql 中的数据

## Question：测试开发？

它不做功能开发，一般情况下也不做测试工作，介于测试和开发之间的角色，测试开发是编写工具给测试人员，打通他们之间的技术壁垒，提高对方的工作效率，在一定程度上降低沟通成本

## 流程

![接口自动化测试流程](https://origin.picgo.net/2025/10/15/570c854b8cbc5d82624211252751b87dab845be452825869.png)

## 接口自动化

① case_list  用例表
② case_config 用例配置表
③ case_result 用例执行结果表

> ① case_list  用例表

**内容可以是灵活的，比如 ${} 的方式包裹内容，做到动态替换**

```sql
CREATE TABLE `jwtest_case_list` (
    # 测试用例的编号，不为空，自增长
    `id` int(0)  PRIMARY KEY AUTO_INCREMENT ,

    # 项目名称
    `web` varchar(255) DEFAULT NULL,

    # 项目模块
    `module` varchar(255) DEFAULT NULL,

    # 测试用例的标题
    `title` varchar(255) DEFAULT NULL,

    # 接口地址的路径
    `url` varchar(255) DEFAULT NULL, 
    
    # 请求方法
    `method` varchar(255) DEFAULT NULL,
    
    # 请求头
    ## {"Content-Type": "application/x-www-form-urlencoded"}
    `headers` varchar(255) DEFAULT NULL,
    
    # cookies 秘钥
    `cookies` varchar(1000) DEFAULT NULL,
    
    # 请求主体信息
    ## { "pwd": '123' }
    `request_body` varchar(1000) DEFAULT NULL,
    
    # 请求主体的数据类型
    ## json 还是 data 或是其他的类型
    `request_type` varchar(255) DEFAULT NULL,
    
    # 关联
    `relation` varchar(255) DEFAULT NULL,
    
    # 预期业务状态码
    `expected_code` varchar(255) DEFAULT NULL COMMENT '作为断言标准 ',

    # 测试用例是否可运行
    `isdel` int(0) NULL DEFAULT 1 COMMENT '0 为删除， 1 为正常'
);
```

> ② case_config 用例配置表

```sql
CREATE TABLE `jwtest_config` (
    # 配置信息序号
    `id` int PRIMARY key,
    # 项目名称
    `web` varchar(255) DEFAULT NULL,
    # 环境信息字段
    ## Eg: url_api
    `key1` varchar(255) DEFAULT NULL,
    # 环境信息的值
    ## Eg: http://127.0.0.1:6088
    `value` varchar(255) DEFAULT NULL
);
```

> ③ case_result 用例执行结果表

```sql
CREATE TABLE `jwtest_result_record` (
    # 执行结果记录的序号，不为空，自增长
    `id` int   PRIMARY KEY  AUTO_INCREMENT,
    # 被执行测试用例的 id
    `case_id` varchar(255) DEFAULT NULL,
    # 执行的时间
    `times` varchar(255) DEFAULT NULL,
    # 程序运行的实际结果
    `response` varchar(1000) DEFAULT NULL COMMENT '实际结果',
    # 用例执行是否通过
    `result` varchar(255) DEFAULT NULL
) ;
```

### 可复用的通用模块

```python
# 导入PyMySQL库
import pymysql

# 设置数据库工具类的名称
class MysqlUtil:
    def __init__(self):
         self.db = pymysql.connect(
            host="127.0.0.1",
            user="root",
            password="123456",
            database="jwtest1",
            port=3306,
            charset="utf8"
         )
        # 读取配置文件，初始化pymysql数据库连接
        self.db = pymysql.connect(**DB_CONFIG)
        # 创建数据库游标  返回字典类型的数据
        self.cursor = self.db.cursor(cursor=pymysql.cursors.DictCursor)
        
    # 获取单条数据
    def get_fetchone(self, sql):
        # 执行sql
        self.cursor.execute(sql)
        # 查询单条数据，结果返回
        return self.cursor.fetchone()
        
    # 获取多条数据
    def get_fetchall(self, sql):
        # 执行sql
        self.cursor.execute(sql)
        # 查询多条数据，结果返回
        return self.cursor.fetchall()
        
    # 执行更新类sql
    def sql_execute(self, sql):
        try:
            # db对象和指针对象同时存在
            if self.db and self.cursor:
                # 执行sql
                print("sql是",sql)
                self.cursor.execute(sql)
                # 提交执行sql到数据库，完成insert或者update相关命令操作，非查询时使用
                self.db.commit()
                print("sql执行成功～！")
        except Exception as e:
            # 出现异常时，数据库回滚
            self.db.rollback()
            # 返回结果为失败
            return False

    # 关闭对象，staticmethod静态方法，可以直接使用类名.静态方法。
    @staticmethod
    def close(self):
        # 判断游标对象是否存在
        if self.cursor is not None:
            # 存在则关闭指针
            self.cursor.close()
        # 判断数据库对象是否存在
        if self.db is not None:
            # 存在则关闭数据库对象
            self.db.close()

# 测试代码
if __name__ == '__main__':
    # 验证编写的方法
    mysql = MysqlUtil()
    
    res1=mysql.get_fetchone("select * from jwtest_case_list")
    print(res1)
    
    res2 = mysql.get_fetchall("select * from jwtest_case_list")
    print(res2)
    
    res3=mysql.sql_execute("insert into jwtest_result_record (case_id,result) values ('9999','测试通过');")
    print(res3)
```

在使用这个时候，突然想到游标和数据库都有关闭，那么他们关闭的时机是？

经过一番请教后，得知可使用 with 上下文管理来控制游标关闭的时机

> 优化后的代码

```python
import pymysql

class MysqlUtil:
    def __init__(self):
        ## config 抽离出成一份py文件，通过导入的方式引入与代码进行分离
        config = {
            'host': '127.0.0.0.1',
            'port': 3306,
            'user': 'root',
            'password': '123456',
            'database': 'student',
            'charset': 'utf8'
        }
        # 初始化数据库连接（只创建连接，不预先创建游标）
        self.db = pymysql.connect(**config)
    
    def get_fetchone(self, sql):
        # 使用with语句创建游标，自动关闭
        with self.db.cursor(cursor=pymysql.cursors.DictCursor) as cursor:
            cursor.execute(sql)
            return cursor.fetchone()
    
    def get_fetchall(self, sql):
        with self.db.cursor(cursor=pymysql.cursors.DictCursor) as cursor:
            cursor.execute(sql)
            return cursor.fetchall()
    
    def sql_execute(self, sql):
        try:
            with self.db.cursor(cursor=pymysql.cursors.DictCursor) as cursor:
                cursor.execute(sql)
                self.db.commit()
                print("sql执行成功～！")
                return True  # 增加成功返回值
        except Exception as e:
            self.db.rollback()
            print(f"执行失败: {str(e)}")
            return False
    
    # 移除staticmethod装饰器，作为实例方法关闭连接
    def close(self):
        if self.db and self.db.open:  # 检查连接是否打开
            self.db.close()

# 测试代码
if __name__ == '__main__':
    mysql = MysqlUtil()
    try:
        res1 = mysql.get_fetchone("select * from jwtest_case_list")
        print(res1)
        
        res2 = mysql.get_fetchall("select * from jwtest_case_list")
        print(res2)
        
        res3 = mysql.sql_execute("insert into jwtest_result_record (case_id,result) values ('9999','测试通过');")
        print(res3)
    finally:
        # 最后关闭数据库连接
        mysql.close()

```

① with 的使用前提是对象同时具有 `__enter__` 和 `__exit__` 两个方法方可使用。
② pymysql.cursors.DictCursor 可将其存起来 `self.dc = pymysql.cursors.DictCursor`




