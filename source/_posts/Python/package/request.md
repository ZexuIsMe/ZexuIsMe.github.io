---
title: request
date: 2025-10-15 10:10:23
tags: [Python, package, request]
categories:
  - Python
  - package
---

查看requests源码，可以看到requests中的各请求方法内调用request函数，request函数调用Session类对象的request方法。

session.request(self,**kwargs)函数中可以传递的主要参数和作用：

## method

【描述】 表示请求方法，requests内实现了get,post,delete,head,options,put,patch这几个请求方法。

## url

【描述】 表示请求的网址

## params

【描述】 表示请求的URL中传递的参数。
【类型】 字典型。

比如get请求url: 

    http://localhost/goods.php?id=24&spec=244

则

    requests.get('http://localhost/goods.php', params={"id":24,"spec":244})
    requests.get('http://localhost/goods.php?id=24&spec=244')

请求效果完全相同

## data

【描述】 表示post等请求的body中的参数，且body中传参方式是`x-www-form-urlencoded`(即参数名=参数值的传参方式)。
【描述】 字典型

比如post请求登录，url:
    
    http://localhost/user.php，body中是username=zhangsan&password=123456

则
    
    requests.post('http://localhost/user.php', data={'username':'zhangsan','password':'123456'})

比如post请求商品搜索，url: 

    http://localhost/search.php，body

中是web表单格式传参，参数名是json，参数值是内容为

    {"keywords":"P806","pagination":{"count":10,"number":1}}

的字符串,则

    requests.post('http://localhost/user.php', data={'json':'{"keywords":"P806","pagination":{"count":10,"number":1}}'})

## json

【描述】 表示post等请求的body中的参数，且body中传参方式是`application/json`(即body中是一个json数据)

比如post请求商品搜索，url: 

    http://localhost/search.php，body中是json格式传参，json数据是{"keywords":"P806","pagination":{"count":10,"number":1}}

则

    requests.post('http://localhost/search.php', json={"keywords":"P806","pagination":{"count":10,"number":1}})

## headers

【描述】 表示请求头部
【描述】 字典

比如get请求查看资料库，url: 

    https://cloud.seafile.com/api2/repos

头部需要`Authorization: Token xxxxx`(token值已经保存为python变量token)，则

    requests.get('https://cloud.seafile.com/api2/repos', headers={'Authorization':f'Token {token}'})

## cookies

【描述】 表示请求中带有的cookie
【类型】 字典

比如访问首页`http://localhost/时带有jsessionid和csd的cookie` 值为xxxxx和yyyyy，则

    requests.get('http://localhost/', cookies={'jsessionid':'xxxxx', 'csd':'yyyyy'})

## files

【描述】 上传文件的请求时，`body`中以`form-data`方式上传的文件
【类型】 字典

比如post上传文件请求，url: 
    
    https://cloud.seafile.com/api2/upload

上传文件参数file表示上传的文件，当前请求上传a.txt，参数parent_dir表示上传文件的路径，则

    requests.post('https://cloud.seafile.com/api2/upload', files={'file': open('./a.txt','rb'), 'parent_dir':'/abc'})

## auth

【描述】 表示请求所需通过的网关鉴权，是一个字典型，大多是
【格式】 `{'username':'鉴权账号名','password':'鉴权账号密码'}`

## timeout

【描述】 表示相应的最大超时时间。

【类型】 
① 可以是一个数字，浮点型，表示最大响应时间，单位秒；
② 可以是元组(连接超时数字，读取超时数字)。

## proxies

proxies: 表示请求所用的代理。

【类型】 字典。
【格式】 `{'代理协议名':'IP:port'}`

比如一个请求需要被fiddler抓包，fiddler所在电脑ip是127.0.0.1，端口是8888，抓取的请求协议包括http和https，则

    requests.get('https://cloud.seafile.com/api2/',proxies={"http":"127.0.0.1:8888","https":"127.0.0.1:8888"})

## allow_redirects

【描述】 表示是否需要自动跟随重定向。
【类型】 布尔，默认为True

如果响应不需要跟随重定向，则传递该参数`allow_redirects=False`

请求返回响应是Response类型对象，有以下属性和方法：
- status_code，响应状态码
- text，响应的Body中的文字
- cookies.get('cookie名')，响应的set-cookie的cookie值
- headers('头部名')，响应的指定头部
- json()，表示将响应的Body中的json格式文字转为字典对象

将响应中内容进行提取的方法：
1. 提取指定头部值：headers('头部名')
2. 将响应内容转json后用jsonpath进行提取，使用jsonpath包，jsonpath表达式如：$.data[?(@.goods_name=="P806")].goods_id
3. 如果响应内容不是json格式数据，则通常用re包中的正则表达式进行提取