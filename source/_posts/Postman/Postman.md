---
title: Postman
date: 2025-09-18 11:53:29
tags: [Postman, 软件测试, 接口测试]
categories:
  - Postman 
---

## 变量设置

【前提】 用户已成功登录软件

> 方法一：为某项目统一设置（集合变量）

![postman 定义变量](https://origin.picgo.net/2025/09/18/postman_30197c68ee252ad5.png)

---
> 方法二：环境变量（全局变量）

![postman 全局变量](https://origin.picgo.net/2025/09/18/postman_c96bb4b50957a078.png)

Global 是统一的环境变量设置，可针对某一项目进行定制化的变量是设置

![postman 全局变量 调用](https://origin.picgo.net/2025/09/18/postman__f05b1173045efa42.png)

使用的时候会有 “G” 字样，表示 Global

---

> 方法三：局部变量

    a = pm.variables.get("xxx")
    // 写入
    pm.collectionVariables.set("subject1", a)

## 变量的使用

    # 用双花括号包裹变量
    {{定义的变量}}

### Q：若变量重命，用的是谁？

> 就近原则

准寻就近原则，全局变量最远，最近为局部变量

【4】 局部变量（最近）
【3】 集合变量
【2】 环境变量
【1】 全局变量（最远）

## Postman: Cookie

postman 默认情况下会自动记录 Cookie 信息

![postman cookie](https://origin.picgo.net/2025/09/18/postman_cookie39ab119dbb5df9e7.png)

![postman cookie check](https://origin.picgo.net/2025/09/18/postman_cookie_check5d6c415f0e6d777e.png)
【1】 被记录的IP地址
【2】 被记录的 cookie 信息
【3】 点击可移除目标 cookie

### 清空 cookie

> 方案一：针对指定IP地址

```python
// 清空当前域名下的所有 Cookie
pm.cookies.clear(pm.request.url.getHost());
```

> 方案二：针对所有

```python
// 可选：如果需要清空所有域的 Cookie（包括子域等），可以遍历所有 Cookie 并删除
const allCookies = pm.cookies.list();
allCookies.forEach(cookie => {
    pm.cookies.remove(cookie.domain, cookie.path, cookie.name);
});
```

## Postman：脚本

![postman 定义变量 单独设置](https://origin.picgo.net/2025/09/18/postman__6bebddb1c4bb4ed5.png)

分两类脚本：
【前置】 Pre-request 该脚本在请求**执行前**执行
【后置】 Post-response 该脚本在请求**执行后**执行；

断言一定是在后置脚本中出现

-------

> 【设置变量】 pm.xxx.set(key, value)

```javascript
// 全局
pm.globals.set(key, value)
// 集合
pm.collectionVariables.set(key, value)
// 环境
pm.environment.set(key, value)
```

【key】 变量名
【value】 参数

修改定义的变量后，也就意味着若要用该变量，需留意参数是否是当前接口需要的参数内容；
若目标变量没有被设置，执行后会自动在对应的集合/环境/全局变量

------
> 【读取变量】 pm.xxx.get(key)

```javascript
// 全局
pm.globals.get(key)
// 集合
pm.collectionVariables.get(key)
// 环境
pm.environment.get(key)
```

------
> 【提取】 提取响应的内容

```javascript
// 以 JSON 文档的方式获取响应
pm.response.json()
// 以 text 文本的方式获取响应
pm.response.text()
```

## Postman: 断言

```javascript
pm.test(name, () => {
    // 语句
})
```

- 执行的函数没有参数可进行接收
- 执行的函数可以是箭头函数

| 断言语句                        | ---                               |
|-----------------------------|-----------------------------------|
| `pm.response.to.have.xxx()` | 检查响应中是否存在 xxx <br/> 如响应状态码，实体，头部  |
| `pm.expect(实际).to.xxx(预期)`  | 检查预期和实际的比较（相等，不相等，大于还是小于还是存在等等情况） |

```javascript
pm.test('响应状态码', function () {
    // 检测返回的状态码是否是 200
    pm.response.to.have.status(200);
})

pm.test('响应内容', function () {
    // 检测返回的内容中是否存在文本：抱歉
    pm.expect(pm.response.text()).to.include('抱歉')
})
```

## Postman: 参数化

接收 CSV、JSON 文件

> CSV

用逗号分隔数据

```text
subject,message
11111111,22222222
111abc11,222efg22
111中文1,222汉字2
111----1,222@@@?2
```

> 使用：将文件引入postman

![postman 参数化 01](https://origin.picgo.net/2025/09/19/postman__0179e6bac6fa78bc01.png)
![postman 参数化 02](https://origin.picgo.net/2025/09/19/postman__023595b7864458150a.png)
![postman 参数化 02](https://origin.picgo.net/2025/09/19/postman__023595b7864458150a.png)

> 前置脚本

![postman 参数化 04](https://origin.picgo.net/2025/09/19/postman__04572cdf05c6575ae8.png)

通过 `pm.variables.get("xxx")` 获取标题，比如前面提到的 `subject`

## Postman：导出

> 导出：全局变量

![postman export global](https://origin.picgo.net/2025/09/19/postman_export_globalb3d46b60a9724df7.png)

**注意：** 第三步的操作是必须的，对需要用到的全局变量执行 `share` 操作，若不点击 `share` 导出后是变量的值是拿不到的。

> 导出：环境变量

![postman export environments](https://origin.picgo.net/2025/09/19/postman_export_environments28220ea80cd85979.png)

**注意：** 第三步的操作是必须的，对需要用到的全局变量执行 share 操作，若不点击 share 导出后是变量的值是拿不到的。

> 导出：项目

![postman export project](https://origin.picgo.net/2025/09/19/postman_export_project45be58b45f26c980.png)

导出时，选择 2.1；
