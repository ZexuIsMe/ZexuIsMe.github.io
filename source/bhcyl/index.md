---
title: '碧海苍云录'
date: '2025-06-20 12:29:56'
layout: 'bhcyl'
footer:
  version:
    - name: '当前版本'
      value: 'v0.19.1'
    - name: '更新时间'
      value: '2025-6-23 10:00'
  website:
    name: '游戏官网'
    url: 'https://www.taptap.cn/app/324395?os=android'
    icon: 'fa-gamepad'
  button:
    - name: 首页
      url: ''
      icon: 'fa-home'
    - name: '攻略'
      url: 'https://www.taptap.cn/app/324395/strategy?os=android'
      icon: 'fa-award'
    - name: '论坛'
      url: 'https://www.taptap.cn/app/324395/topic?os=android'
      icon: 'fa-fingerprint'
skill: [
    --,
    金系威力发挥,
    木系威力发挥,
    水系威力发挥,
    火系威力发挥,
    土系威力发挥,
    全五行威力发挥
]
form:
  - title: 基础属性
    formId: basic-form
    formName: basic
  - title: 各项威力
    formId: fep-form
    formName: fep
  - title: 各系伤害提高 + 神宝
    formId: powerUp-form
    formName: powerUp
  - title: 其他
    formId: OA-form
    formName: other
  - title: 功法
    formId: skill-form
    formName: skill
  - title: 器纹
    formId: runesVessels-form
    formName: runesVessels
  - title: 灵兽
    formId: pet-form
    formName: pet
  - title: 木桩
    formId: muZhuang-form
    formName: muZhuang
  - title: 操作台
    formId: operate-form
    formName: operate
ps:
  - name: 功法属性
    desc: 比如选择了水，那么计算时就会获得【水系伤害提高】加成
  - name: 灵力消耗率
    desc: 即灵力灌溉
  - name: 九曜
    desc: 勾选后，默认会心、压制
  - name: 鬼神
    desc: 勾选后，默认压制
  - name: 关于木桩
    desc: 如果未勾选木桩和则按金五行木桩算；若勾选多个木桩，比如五个木桩都勾选了，则按五行顺序，最终是按金木桩来算
  - name: 关于《各系伤害提高 + 神宝》一栏的默认参数
    desc: 默认主修、各五行威力相关的灵台、神宝为满级，他们和面板上的属于加算，比如面板剑伤提高20，剑修灵台有20%，那么剑修伤害提高就是40%
  - name: 误差率
    desc: (模拟值 - 实际伤害) / 实际伤害 * 100%；一般情况在 5% 左右
videos:
  - url: 'https://origin.picgo.net/2025/08/23/v2.0_db037efd24d2dbae.mp4'
    name: 'v2.0 契灵版本震撼来袭！！！'
    image: 'https://origin.picgo.net/2025/08/23/v2.0__ca8afb4c055f6105.md.webp'
    create_time: '2025-08-18'
  - url: 'https://origin.picgo.net/2025/08/24/v0.19___video833787972bd047e4.mp4'
    name: 'v0.19 渡劫期境界开放！！！'
    image: 'https://origin.picgo.net/2025/08/23/v2.0__ca8afb4c055f6105.md.webp'
    create_time: '2025-06-23'
banner:
  - sequence: 2
    tag: '官方'
    url: 'https://www.taptap.cn/moment/703935861460306020'
    img: 'https://origin.picgo.net/2025/08/23/v2.0__ca8afb4c055f6105.md.webp'
    title: '【全新契灵系统】《碧海苍云录》0.20版本即将到来！'
    createTime: '2025-08-18'
  - sequence: 1
    tag: '官方'
    url: 'https://www.taptap.cn/moment/683612950686075704'
    img: 'https://origin.picgo.net/2025/08/24/v0.19___video833787972bd047e4.md.jpeg'
    title: '渡劫、幻化、还有帅气皮肤！《碧海苍云录》v0.19版本来了！'
    createTime: '2025-06-23'
---

- fep: Five Element Power  五行威力发挥
- OA: other Attribute  其他
- onclickCalculate
  - collect：用于收集页面上的计算器范围内的所有表单数据
  - options：用于收集计算时所需要的信息
  - huiXianInfo：
    - 主要是为了让不直接参与公式的，而公式又用到的公式计算中的参数显示到页面上
    - 用于回显参与公式信息，比如你基础伤害有多少，灵兽给你提供了多少数值的增伤