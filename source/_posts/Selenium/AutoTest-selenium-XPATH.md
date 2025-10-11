---
title: AutoTest-selenium-XPATH
date: 2025-09-30 13:10:34
tags: [AutoTest, 软件测试, 定位,XPATH]
categories:
  - AutoTest
  - 定位
---

## 轴

### child::节点

`child::` 是可省略的
`前者/child::后者`：表示后者是前者的子节点，前者是后者的父节点

    /child::class/child::student

student 是 class 的子节点
class 是 根节点的子节点

## parent::节点

    //lesson[@name="语文"][@score="70"]/parent::scores

## 模拟定位

| 方法          | 描述                      |
|:------------|:------------------------|
| contains    | 模糊匹配定位元素                |
|             | 类似于：input[name*="user"] |
| starts-with | 匹配以 xx 开头的元素            |
|             | 类似于：input[name^="user"] |
| substr      | 匹配以 xx 结尾的元素            |
|             | 类似于：input[name$="user"] |

## 模糊定位：contains()

【描述】 字符串匹配函数
【作用】 检查一个字符串是否包含另一个子字符串
【语法】

    contains(源字符串, 要查找的子字符串)

```html
<div class="modal fade show" aria-modal="true" role="dialog" tabindex="-1" style="display: block;">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">新建资料库</h5>
                <button type="button" class="close seahub-modal-btn" data-dismiss="modal" aria-label="关闭" title="关闭">
                    <span class="seahub-modal-btn-inner">
                        <i class="sf3-font sf3-font-x-01" aria-hidden="true"></i>
                    </span>
                </button>
            </div>
            <div class="modal-body">
                <form class="">
                    <div class="mb-3">
                        <label for="repoName" class="form-label">名称</label>
                        <input id="repoName" name="repo-name" type="text" class="form-control" value="">
                    </div>
                    <div>
                        <div class="form-check">
                            <input id="encrypt" type="checkbox" class="form-check-input">
                            <label for="encrypt" class="form-label">加密</label>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary">取消</button>
                <button type="button" class="btn btn-primary disabled" disabled="">提交</button>
            </div>
        </div>
    </div>
</div>
```

> 如上HTML代码，要如何定位到【提交】按钮呢？

```python
position_x = '//div[contains(@class, ”modal-footer“)]//button[contains(@class, ”btn-primary“) adn text()="提交"]'
submit_btn = browser.find_element(By.XPATH, position_x)
```
【方案二】
```python
position_x = '//button[contains(@class, "btn-primary") and text()="提交"]'
submit_btn = browser.find_element(By.XPATH, position_x)
```
【方案三】
由于提交按钮只有在输入内容后才会让 disabled 消失，如果通过 sleep 定位，容易坏事儿
```python
try:
    position_x = '//button[contains(@class, "btn-primary") and text()="提交"]'
    submit_button = self.browser.wait.util(
        lambda d: d.find_element(By.XPATH, position_x) and (
            'disabled' not in d.find_element(By.XPATH, position_x).get_attribute('class')
        )
    )
except:
    print("提交按钮未在指定时间内变为可用状态")
```

显示等待，并通过匿名函数去操作

`前段`：是用于寻找该元素
`后段`：判断 disabled 是否存在于 class 中

两者结合在一起，就是为了满足 “提交按钮只有在输入内容后才会让 disabled 消失，才能进行点击” 的需求，

前半句满足前段需求：用于定位提交按钮
后半句用于满足后段需求：寻找到提交按钮，在显示等待时间内容等待 disabled 的消失

## 模拟定位：以 xx 开头 starts-with

## 模拟定位：以 xx 结尾 substr()








