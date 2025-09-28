---
title: Postman-局域变量与数据集-踩坑
date: 2025-09-28 11:52:24
tags: [自动化测试, Postman, 局部变量, 数据集]
categories:
  - Postman 
---

![postman export csv](https://origin.picgo.net/2025/09/28/postman_export_csv354296fabd4f3e09.png)

如图所示，有那么些字段，在前置脚本中，准备需要用到的数据

![postman set 局部变量](https://origin.picgo.net/2025/09/28/postman_set_252ce6794f28123c.png)

```javascript
// 后置脚本中

pm.test(pm.variables.get('code_x'), function () {
    pm.response.to.have.status(pm.variables.get('code_x'))
})
console.log(pm.response.json())
console.log('id', pm.variables.get('id'))
console.log('id', pm.variables.get('post_token_id'))
console.log('token', pm.variables.get('temp_token_invalid'))
console.log('code_x', pm.variables.get('code_x'))
console.log('yu_qi', pm.variables.get('yu_qi'))
console.log('------------------------------')
```

![postman runner console](https://origin.picgo.net/2025/09/28/postman_runner_consolea92bfd82c7ead89f.png)

善于观察的你发现，两次 id 打印结果是一样的！！！

删除前置脚本中的 `pm.variables.set('id', pm.variables.get('id'))` 后，

```javascript
pm.variables.set('post_token_id', pm.variables.get('id'))
pm.variables.set('temp_token_invalid', pm.variables.get('token'))
```

再次执行，打印结果正常了

> 得出一个结论：
> 若数据集合中存在该变量，无需二次设置一个同名的局部变量，若设置了，该变量会被固化为一个行的数据的 id，无论后续有多少ID都是同一个ID

可以利用该固化特点，将参数固定。




