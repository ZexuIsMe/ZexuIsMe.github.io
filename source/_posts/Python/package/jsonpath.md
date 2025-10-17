---
title: jsonpath
date: 2025-10-17 14:54:11
tags: [Python, package, jsonpath]
categories:
  - Python
  - package
---

【安装】

    pip install -U jsonpath

【使用场景】
① 接口数据处理
② 日志分析
③ 配置文件解析
④ 数据过滤与转换
⑤ 测试与断言
⑥ 前端数据提取

## 举例

    jsonpath(obj, expr)

【返回类型】 list
【参数 1】 可以是 JSON，可以是字典
【参数 2】 jsonp 语法

```python
from jsonpath import jsonpath


def fetch_one(obj, expr):
    res = jsonpath(obj, expr)
    if res:
        return res[0]
    else:
        return None


if __name__ == '__main__':
    print(fetch_one({'abc': 123}, '$.abc'))
```

## JSONP 语法

这里的 jsonp 就是指 jsonpath。

① `$.order_info` 获取 json 中的 order_info
② `$..city` 从JSON中获取 city，使用前提 city 在本次的JSON中是**唯一的**
③ `$..items[?(@.quantity==1)].product_name` 从 order_info.product_list.items 中获取产品名称
④ 若多个条件：`$..items[?(@.quantity==1 && @.product_id=="P2025020045")].product_name`
⑤ 若是以P2025开头的呢：`$..items[?(@.product_id=~/^P2025/)].product_name`
（jsonpath 本身无法实现：`$..items[*]` 获取全部，通过循环做正则表达式作二次获取）

```json
{
  "order_info": {
    "order_id": "ORD20250001001",
    "order_time": "2025-10-17 14:30:25",
    "total_amount": 899.00,
    "user_details": {
      "user_id": "U2025000567",
      "user_name": "张三",
      "contact": {
        "phone": "138****1234",
        "address": {
          "province": "浙江省",
          "city": "杭州市",
          "detail": "西湖区XX街道XX小区3栋501室"
        }
      }
    },
    "product_list": { 
      "product_count": 2,
      "items": [
        {
          "product_id": "P2025010023",
          "product_name": "无线蓝牙耳机",
          "price": 399.00,
          "quantity": 1
        },
        {
          "product_id": "P2025020045",
          "product_name": "便携式充电宝（20000mAh）",
          "price": 500.00,
          "quantity": 1
        }
      ]
    }
  }
}
```

## 封装

```python
from jsonpath import jsonpath

# TESTJSON = JSONP语法中的json

def fetch_one(obj, expr):
    res = jsonpath(obj, expr)
    return res[0] if res else None


def fetch_all(obj, expr):
    res = jsonpath(obj, expr)
    return res if res else []

## 调试
if __name__ == '__main__':
    # 获取 city
    print(fetch_one(TESTJSON, '$..city'))
    # 获取质量品质为1的产品，获取他们的名字
    print(fetch_all(TESTJSON, '$..item[?(@.quantity==1)].product_name'))
```

## 使用场景

>  ① 接口数据处理

接口返回的JSON响应内容，避免手动逐层解析 JSON 结构。

例如，从复杂的接口响应中提取用户 ID、订单状态等关键信息。

>  ② 日志分析

很多系统的日志以 JSON 格式存储（如 ELK 栈中的日志），使用 JSONPath 可从海量日志中筛选符合条件的记录。

例如，查询某段时间内 “错误级别为 ERROR 且模块为 payment” 的日志条目。

>  ③ 配置文件解析

若配置文件采用 JSON 格式（如复杂的应用配置），JSONPath 可快速读取深层嵌套的配置项。

例如，从多层嵌套的配置中提取数据库连接的端口号。

>  ④ **数据过滤与转换**

在处理 JSON 数组时，可通过 JSONPath 筛选符合条件的元素（如筛选出价格大于 100 的商品），或提取多个元素组成新的数据集，**简化数据清洗和转换过程**。

>  ⑤ 测试与断言

在自动化测试中，对接口返回的 JSON 响应进行断言时，可使用 JSONPath 定位预期字段并验证其值是否符合预期。

例如，验证登录接口返回的 token 是否存在且不为空。

>  ⑥ 前端数据提取

前端处理后端返回的复杂 JSON 数据时，若只需展示部分内容，可通过 JSONPath 快速提取所需字段，减少冗余数据处理逻辑。

