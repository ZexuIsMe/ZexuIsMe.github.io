tailwind.config = {
    corePlugins: {
        preflight: false
    },
    theme: {
        extend: {
            colors: {
                // Dark 模式（Trae风格）
                dark: {
                    // 主背景 - Trae深蓝色
                    bg: '#1A1A2E',
                    // 卡片/次背景 - 稍浅深蓝色
                    card: '#16213E',
                    // 主品牌色 - Trae蓝色
                    primary: '#5390D9',
                    // 次要强调色 - 浅蓝色
                    secondary: '#64B5F6',
                    // 功能强调色 - 深蓝色
                    success: '#48BFE3',
                    // 暖强调色 - 橙色
                    warning: '#FF9800',
                    // 活力强调色 - 黄色
                    warn: '#FFC107',
                    // 正文主色 - 浅灰色
                    text: '#E1E1E1',
                    // 次要文本 - 中灰色
                    note: '#ADB5BD',
                    // 分割线 / 边框 - 深蓝色
                    border: '#2A3F5F',
                    // 高亮背景 - 深蓝色
                    lightCode: '#0F3460'
                },
                // Light 模式（极简风格）
                light: {
                    // 主背景 - 白色
                    bg: '#FFFFFF',
                    // 卡片/次背景 - 极浅灰色
                    card: '#F8F9FA',
                    // 主品牌色 - 深灰色
                    primary: '#343A40',
                    // 次要强调色 - 中灰色
                    secondary: '#6C757D',
                    // 功能强调色 - 浅灰色
                    success: '#ADB5BD',
                    // 暖强调色 - 橙色
                    warning: '#FF9800',
                    // 活力强调色 - 黄色
                    warn: '#FFC107',
                    // 正文主色 - 深灰色
                    text: '#212529',
                    // 次要文本 - 中灰色
                    note: '#6C757D',
                    // 分割线 / 边框 - 浅灰色
                    border: '#DEE2E6',
                    // 高亮背景 - 浅灰色
                    lightCode: '#E9ECEF'
                },
                // 当前使用的颜色（默认使用dark模式）
                primary: '#5390D9',
                secondary: '#64B5F6',
                success: '#48BFE3',
                warning: '#FF9800',
                warn: '#FFC107',
                text: '#E1E1E1',
                note: '#ADB5BD',
                border: '#2A3F5F',
                lightCode: '#0F3460',
                pixel: {
                    blue: '#5390D9',
                    pink: '#FF4081',
                    purple: '#9C27B0',
                    green: '#4CAF50'
                }
            },
            fontFamily: {
                pixel: ['VT323', 'monospace', 'cursive'],
                wulin: ['字魂武林江湖体', 'cursive'],
            },
            animation: {
                'pixel-bounce': 'bounce 2s infinite',
                'pixel-pulse': 'pulse 3s infinite',
                'glitch': 'glitch 1s linear infinite',
                'scanline': 'scanline 6s linear infinite'
            },
            keyframes: {
                glitch: {
                    '0%, 100%': { transform: 'translate(0)' },
                    '20%': { transform: 'translate(-2px, 2px)' },
                    '40%': { transform: 'translate(-2px, -2px)' },
                    '60%': { transform: 'translate(2px, 2px)' },
                    '80%': { transform: 'translate(2px, -2px)' }
                },
                scanline: {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(100%)' }
                }
            }
        }
    }
}
