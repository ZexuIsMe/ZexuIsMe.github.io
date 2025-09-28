---
title: Postman-参数化测试
date: 2025-09-28 13:50:12
tags: [软件测试, Postman, 参数化测试]
categories:
  - Postman
  - 参数化测试
---

> 核心：以数据驱动测试，简化雷同用例的编写

流程：
》 准备数据集（CSV 或是 JSON）
》 编写前置脚本，获取目标数据，使用数据
》 编辑后置脚本，断言结果

【使用场景】 断言形式雷同，没有复杂的逻辑判断

举一个测试 token 的例子：

| id      | token     | expect_code | expect_response                               | 描述                          |
|---------|-----------|-------------|-----------------------------------------------|-----------------------------|
| token_1 |           | 403         | Authentication credentials were not provided. | Token 无参数                   |
| token_2 | abc       | 403         | Authentication credentials were not provided. | 无效参数                        |
| token_3 | tokenabc  | 403         | Authentication credentials were not provided. | 长得像token，但不符合定义的格式，且参数是无效参数 |
| token_4 | token abc | 401         | Invalid token                                 | 符合Token格式，但参数是无效参数          |

```javascript
// 后置脚本
const code = pm.variables.get(id)

pm.test(`状态码：${code}`, () => {
    pm.response.to.have.status(code)
})

pm.test('预期结果', () => {
    const res = pm.response.json()
    const expect_msg = pm.variables.get('expect_response')
    if (res?.detail) {
        pm.expect(res.detail).to.eql(expect_msg)
    } else if (res?.error_msg) {
        pm.expect(res.error_msg).to.eql(expect_msg)
    } else {
        pm.expect.fail('非预期结果！！！')
    }
})
```

第一个好处：因为 Token 的身份验证，几乎是每个接口都需要做的，所以为了避免重复劳作，通过这样的方式减少重复劳作，这是一个好处；
第二个好处：一旦操作成功，该**操作可复用**，以后再遇Token验证操作的接口操作，只需导入CSV或者JSON数据即可
第三个好处：**维护方面只需要做到做添加或删除即可**，即便再多数据，在上面的后置脚本的断言操作中都只是如法炮制
第四个好处：若遇到那种极端案例，又不希望写成用例，但又希望验证一下，其操作逻辑又不复杂的，此法正合适。若跑完后，是非预期结果，那么考虑考虑，验证验证，再做成用例也不迟。











