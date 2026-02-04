/**
 * 导航菜单状态管理工具
 * 用于更新导航菜单的激活状态并同步到本地存储
 */

/**
 * 更新导航菜单的激活状态
 * @param {string} targetPath - 目标页面的路径
 * @description 该函数会找到与目标路径匹配的导航链接，设置其为激活状态，并同步到本地存储
 */
function updateNavActiveState(targetPath) {
    // 存储键名
    const STORAGE_KEY = 'activeNavLink';
    
    // 获取导航链接元素
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileLinks = document.querySelectorAll('#mobile-menu a');
    
    // 检查是否找到导航链接
    if (!navLinks.length && !mobileLinks.length) {
        console.warn('未找到导航链接元素，无法更新导航菜单状态');
        return;
    }
    
    // 设置桌面端导航链接的激活状态
    if (navLinks.length) {
        navLinks.forEach(function(link) {
            if (link.getAttribute('href') === targetPath) {
                // 移除所有链接的激活状态
                navLinks.forEach(function(l) { l.classList.remove('active'); });
                // 添加当前链接的激活状态
                link.classList.add('active');
            }
        });
    }
    
    // 设置移动端导航链接的激活状态
    if (mobileLinks.length) {
        mobileLinks.forEach(function(link) {
            if (link.getAttribute('href') === targetPath) {
                // 移除所有链接的激活状态
                mobileLinks.forEach(function(l) { l.classList.remove('active'); });
                // 添加当前链接的激活状态
                link.classList.add('active');
            }
        });
    }
    
    // 同步到本地存储
    localStorage.setItem(STORAGE_KEY, targetPath);
    console.log('导航菜单状态已更新:', targetPath);
}

/**
 * 检查并更新当前页面的导航菜单状态
 * @param {string} currentPath - 当前页面的路径
 * @param {string} pagePath - 页面的标准路径（如归档页面的路径）
 * @description 该函数会检查当前路径是否与页面路径匹配，如果匹配则更新导航菜单状态
 */
function checkAndUpdateNavState(currentPath, pagePath) {
    // 比较路径，考虑到可能的尾部斜杠差异
    const isMatch = currentPath === pagePath || currentPath === pagePath + '/';
    
    if (isMatch) {
        updateNavActiveState(pagePath);
    }
}

// 导出函数，以便在其他脚本中使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        updateNavActiveState,
        checkAndUpdateNavState
    };
} else if (typeof window !== 'undefined') {
    // 在浏览器环境中，将函数挂载到全局对象
    window.updateNavActiveState = updateNavActiveState;
    window.checkAndUpdateNavState = checkAndUpdateNavState;
}