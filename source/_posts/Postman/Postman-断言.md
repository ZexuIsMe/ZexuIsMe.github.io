---
title: Postman-断言
date: 2025-10-11 14:02:50
tags: [Postman, 断言]
categories:
  - Postman
---

| ---        | ---                                              |
|------------|--------------------------------------------------|
| 状态码        | pm.response.to.have.status(状态码)                  |
| 响应时间       |                                                  |
| 头部         | pm.response.to.have.header("属性", "value")        |
| Body       | pm.expect(pm.response.json).to.have.body("返回结果") |
| JsonPath节点 |                                                  |

