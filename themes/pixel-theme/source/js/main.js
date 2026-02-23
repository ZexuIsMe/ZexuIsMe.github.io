/**
 * 主脚本文件
 * 包含博客的核心功能组件和交互逻辑
 */

(function() {
    const THEME_KEY = 'pixel-theme-preference';
    const DARK_THEME = 'dark';
    const LIGHT_THEME = 'light';

    function getPreferredTheme() {
        const savedTheme = localStorage.getItem(THEME_KEY);
        if (savedTheme) {
            return savedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK_THEME : LIGHT_THEME;
    }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_KEY, theme);
        updateThemeButton(theme);
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || LIGHT_THEME;
        const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
        setTheme(newTheme);
    }

    function updateThemeButton(theme) {
        const themeButton = document.getElementById('theme-toggle');
        const themeIcon = themeButton ? themeButton.querySelector('i') : null;
        if (themeIcon) {
            if (theme === DARK_THEME) {
                themeIcon.className = 'fas fa-sun text-xl';
            } else {
                themeIcon.className = 'fas fa-moon text-xl';
            }
        }
    }

    function initTheme() {
        const theme = getPreferredTheme();
        setTheme(theme);

        const themeButton = document.getElementById('theme-toggle');
        if (themeButton) {
            themeButton.addEventListener('click', toggleTheme);
        }

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem(THEME_KEY)) {
                setTheme(e.matches ? DARK_THEME : LIGHT_THEME);
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }
})();