---
title: JavaScript-音乐播放器
date: 2025-07-01 08:20:57
tags: [DOM, 音乐播放器（Music Player）, 自定义进度条]
categories:
  - 前端
  - JavaScript
  - 播放器
---

通过该标签去实现音乐播放器的操作，目前的难度在于没有解决选择定位的问题(2025-07-09 23:19分，已解决该问题)，其他的基本没啥问题了，网页已实装音乐播放器，诸君可自行体验~

<!--more-->

> 标签： audio

1. 浏览器基本上不允许自动播放
2. 浏览器允许静音播放
3. 可通过其他DOM触发自动播放

## 参数：duration

- 该参数记录着你的音频时长，以秒为单位；
- 那么该如何获得到它呢？

有效方式为：`onloadedmetadata`，通过该方法去获取音频的第一手信息；
建议直接放在标签上处理，不建议通过监听的方式，因为你需要做移除监听的操作；

```javascript
class MusicPlayer {
    constructor(props) {
        super(props);
    }
    
    // ...

    onloadedmetadata (event) {
        const { duration } = event.target
    }
    
    // ...
}
```

拿到时间后，需要对时间做显示的格式化，更换为 `分钟：秒` 的形式

```javascript
onloadedmetadata (event) {
    const { duration } = event.target
    console.log('总时长', this.handleFormatTime(duration))
}
// 时间格式化
handleFormatTime () {
    // 取整，得到分钟数
    const minute = Math.floor(duration / 60)
    // 取余：得到剩余秒数
    const second = Math.floor(duration % 60)
    // 如果 < 10，显示以 0 开头，比如 03:59 的格式
    return `${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}`
}
```

## 参数：currentTime

该参数表示的当前播放进度，**可通过该参数设置播放进度**，那么如果获取到播放进度呢？

- `ontimeupdate`: 该方法一秒钟触发4次，实时更新音频状态信息

```javascript
ontimeupdate (event) {
    const { currentTime } = event.target
    console.log('当前播放进度', this.handleFormatTime(currentTime))
}
```

## 参数：volume

该参数表示音频音量的大小，在哪里获取呢

- 获取 audio 本身的音量，第一手音量信息可在 `onloadedmetadata` 中获取
- volume 参数可更改，且参数范围在 0 ~ 1

```javascript
    const { duration, volume } = event.target
    console.log('audio 本身音量', volume)
    // 设置默认音量
    event.target.volume = 0.3
```

## 自定义进度条

如果不想用原本的音量条或者进度条

- 方案1：`input type="range"` 简单快捷
- 方案2：自定义

<style>
.music-volume-progress {
    position: relative;
    width: 100px;
    height: 50px;
    overflow: hidden;
}

.music-volume-progress>div {
    border-radius: 10px;
    width: 100%;
}

.music-volume-bg {
    height: 5px;
}
.music-current-volume {
    height: 5px;
    background: linear-gradient(to left, var(--info), var(--error));
    position: absolute;
    top: 50%;
    left: -100%;
    transform: translateY(-50%);
    z-index: 2;
    transition: left 0.3s linear;
}
.music-volume-mask {
    height: 100%;
    background: transparent;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    cursor: pointer;
}
</style>

<div class="d-flex align-center gap-3">
    <div><i class="fas fa-volume-down" style="font-size: 48px"></i></div>
    <div class="music-volume-progress d-flex align-center">
        <div class="music-volume-bg bg-grey-400"></div>
        <div class="music-current-volume"></div>
        <div class="music-volume-mask" onclick="musicPlayerPost.onclickModifyVolume(event)"></div>
    </div>
</div>

<script>
class MusicPlayerPost {
    constructor() {
        // ...
    }

    onclickModifyVolume (event) {
        const { clientWidth } = event.target
        const { offsetX } = event
        // 获取百分比距离
        const result = offsetX / clientWidth * 100
        // 调整音量条的位置
        const currentVolumeDOM = document.querySelector('.music-current-volume');
        currentVolumeDOM.style.left = -100 + result + '%'
    }
}
const musicPlayerPost = new MusicPlayerPost()
</script>

```html
<style>
    .music-volume-progress {
        position: relative;
        width: 100px;
        height: 50px;
        overflow: hidden;
    }
    
    .music-volume-progress>div {
        border-radius: 10px;
        width: 100%;
    }
    
    .music-volume-bg {
        height: 5px;
    }
    .music-current-volume {
        height: 5px;
        background: linear-gradient(to left, var(--info), var(--error));
        position: absolute;
        top: 50%;
        left: -100%;
        transform: translateY(-50%);
        z-index: 2;
        transition: left 0.3s linear;
    }
    .music-volume-mask {
        height: 100%;
        background: transparent;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 3;
        cursor: pointer;
    }
</style>

<div class="d-flex align-center gap-3">
    <div><i class="fas fa-volume-down" style="font-size: 48px"></i></div>
    <div class="music-volume-progress d-flex align-center">
        <div class="music-volume-bg bg-grey-400"></div>
        <div class="music-current-volume"></div>
        <div class="music-volume-mask" onclick="musicPlayerPost.onclickModifyVolume(event)"></div>
    </div>
</div>

<script>
class MusicPlayerPost {
    constructor() {
        // ...
    }

    onclickModifyVolume (event) {
        const { clientWidth } = event.target
        const { offsetX } = event
        // 获取百分比距离
        const result = offsetX / clientWidth * 100
        // 调整音量条的位置
        const currentVolumeDOM = document.querySelector('.music-current-volume');
        currentVolumeDOM.style.left = -100 + result + '%'
    }
}
const musicPlayerPost = new MusicPlayerPost()
</script>
```
- d-flex、align-center、gap-3、--info、--error 均来自：https://ZeXuIsMe.github.io/2025/06/28/CSS-我的自定义全局样式/
- 核心在于三层DOM
  - 最底层为背景条
  - 中间层为音量条
  - 最上层为遮罩层
  - Q：为什么要遮罩层？把点击事件放在父级不可以吗？
    A：可以，但是你需要解决事件冒泡的问题，会让进度条的控制变得不好控制，什么情况呢，就是希望调小音量时，此时你必定会点击到音量调DOM，而事件冒泡会干扰我们`onclickModifyVolume`的正常工作，需要额外的代码去解决，所以放在平级的兄弟元素上，这样以来就不存这样的问题了
- Q：为什么要给 music-volume-progress 添加高度
  A：因为高度只有 5 px，不好点击，在实际操作过程中，我个人体验不是很好，故增加可点击范围，已达到较好的操作体验