---
title: JS-数据类型、原型链、作用域
date: 2025-07-05 16:30:21
tags: [数据类型, 原型链, 作用域, JS回收机制, 闭包, 内存泄漏]
categories:
  - 前端
  - 康复训练计划表
  - 数据类型、原型链、作用域
---

## 数据类型
<iframe src="https://segmentfault.com/a/1190000046369950" width="100%" height="512px"></iframe>

## 作用域
<iframe src="https://segmentfault.com/a/1190000046370062" width="100%" height="512px"></iframe>

> Q：何为暂时性死区？ 

A：

## 循环

- while: 先判断再执行
```javascript
let i = 1;
while (i <= 1) {
    i++;
    console.log('123', i)
}
```
- do...while: 至少执行一次
```javascript
let i = 1;
do {
    i++;
    console.log('123', i)
} while (i < 0)
```

### 流程控制关键字

- break: 立即退出整个循环或 switch
- continue: 跳出当前循环，前往下一个循环

> Q：break 和 return 有什么区别？

## 原始值与引用值行为差异

- 原始值（即基本数据类型）：直接存储在**栈内存**中，占用固定大小空间。例如一个数字或字符串直接保存它的实际值
- 引用值（即引用数据类型）：实际数据存储在**堆内存**中，变量保存的是指向堆内存的指针地址。
  简单的来讲引用数据类型再赋值后，如比 const obj = {}，这个空对象会创建一个存储空间，而obj就是打开这个存储空间的钥匙

> Q：为什么原始值可以调用方法？比如 let str = 'hello'; str.substring(1);

A: 当调用 substring(); JS引擎自动将 str 转换为临时的 new String('hello')，调用完毕后，临时对象销毁 

> Q：栈内存？堆内存？

A：

### 复制差异

- 基本数据类型是独立拷贝，互不干扰
- 引用数据类型是共享拷贝，互相干扰
如比 const obj = {}, const obj2 = obj, 那么该空对象的的空间钥匙就有两把，
如果不想互相干扰，可通过const obj2 = JSON.parse(JSON.toString(obj)) 方式做解绑引用。

### 动态属性操作差异

- 基本数据类型无法添加属性：const str = '123'; str.name = '456'; 不会报错，但没有意义
- 引用数据类型可动态增删改属性：const obj = { a: 123 }; obj.b = 456; delete obj.a

### 原始值与包装对象

- new String(): 字符串包装对象
- new Boolean(): 布尔值包装对象
- new Number(): 数字包装对象

```javascript
let str = '123'
let str_2 = new String(123)
console.log('str', typeof str)  // str string
console.log('str_2', typeof str_2) // str_2 object
console.log(str === str_2) // false
```

所以，原始值的包装对象需要注意一个逻辑上的陷阱，如上 str === str_2

如果不了解包装对象，那么可能下意识就会认为他们是类型相同值相同


## 作用域

> Q：什么是作用域链？

## 闭包

Q：什么是闭包？

简单的来说，闭包就是创建一个私有领域，私有领域内只有自己能用，外部访问不了。

闭包是有权访问另一个函数作用域中变量的函数，但是另一个函数，必须和它有关联才可访问，其次，既是函数执行完毕，作用域内的变量也不会被销毁，而是继续保留在内存中。

Q：闭包的特点？

- 私有化：闭包内的变量只有自己能访问，除非自己暴露接口，否则外部无法访问。
- 数据持久化：使用闭包后，如果没有销毁，那么闭包中的变量会一直存在于内存中，不会随着函数执行结束而销毁
- 封装：只暴露必要的东西

Q：闭包解决了什么问题？

解决了变量污染的问题

Q：闭包存在什么问题？如何解决？

因为私有化的缘故，导致内部声明很难被JS回收机制回收掉，闭包中的变量因为被引用而始终可达，使得闭包中的变量不会被回收，让内存消耗变大，导致内存泄漏的问题，所以在不需要的时候，尽可能的手动处理掉，比如赋值为 null

```javascript
function counter() {
  let count = 0;
  return {
    increment: () => count++,
    getValue: () => count
  };
}

const myCounter = counter();
myCounter.increment(); // count = 1
myCounter.getValue();  // 返回 1

// 该例子展示了如何实现数据封装和数据持久化
```

### JS回收机制

Q：JS会自动回收不再使用的内存，那么它是怎么个回收法呢？

通过**标记清除**或者**引用计数**这两个算法去完成回收操作

- 标记清除：从Window对象出发，标记所有可达对象，清除未被标记的对象，闭包中的变量因为被引用而始终可达，使得闭包中的变量不会被回收
- 引用计数：跟踪每个对象的引用次数，当引用为 0 时回收。

从我个人的理解角度来说，回收的目标就是不存在钥匙的内存空间，比如 let obj = {a: 123}，创造了一个 {a: 123} 的内存空间，之后 obj 被赋值了一个新的对象，原来的内存空间就失去了钥匙，那么它就是回收对象

### 内存泄漏

- 未及时清理的闭包：手动赋值为 null
- 全局变量：意外挂载到了window对象上，没有清除掉
- 定时器未清除：在页面销毁前调用 clearInterval
- 事件监听未移除：在页面销毁前调用 removeEventListener
- DOM引用未释放：
```javascript
const dom = document.getElementById('abc')
document.body.removeChild(dom)
// 元素虽然被移除了，但是变量仍在引用它

// 已验证，打印dom发现该DOM依然存在
```
使用 WeakMap 或者 WeakSet 做存储，他们是弱引用，不会阻止回收