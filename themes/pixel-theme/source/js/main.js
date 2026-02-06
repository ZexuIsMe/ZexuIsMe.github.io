/**
 * 主脚本文件
 * 包含博客的核心功能组件和交互逻辑
 */

// 初始化 AOS 动画库
document.addEventListener('DOMContentLoaded', function() {
    // 配置 AOS 动画库
    AOS.init({
        duration: 800, // 动画持续时间（毫秒）
        easing: 'ease-in-out', // 动画缓动函数
        once: true, // 只执行一次动画
        mirror: false, // 不重复执行动画
        offset: 100 // 元素进入视窗多少像素后触发动画
    });
});