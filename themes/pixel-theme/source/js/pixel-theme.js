tailwind.config = {
    theme: {
        extend: {
            colors: {
                // Dark 模式（暖色调）
                dark: {
                    // 主背景 - 深棕色调
                    bg: '#2D1B00',
                    // 卡片/次背景 - 中棕色调
                    card: '#3D2500',
                    // 主品牌色 - 暖棕色
                    primary: '#D48E3B',
                    // 次要强调色 - 暖橙色
                    secondary: '#F4B466',
                    // 功能强调色 - 棕色
                    success: '#B87333',
                    // 暖强调色 - 橙色
                    warning: '#E6A045',
                    // 活力强调色 - 亮黄色
                    warn: '#FFC87C',
                    // 正文主色 - 暖白色
                    text: '#F7E6D0',
                    // 次要文本 - 浅棕色
                    note: '#D1B894',
                    // 分割线 / 边框 - 暗棕色
                    border: '#5D3A00',
                    // 高亮背景 - 深棕色
                    lightCode: '#4A3000'
                },
                // Light 模式（暖色调）
                light: {
                    // 主背景 - 暖白色
                    bg: '#FFF9F0',
                    // 卡片/次背景 - 浅米色
                    card: '#FFEEDD',
                    // 主品牌色 - 棕色
                    primary: '#B87333',
                    // 次要强调色 - 暖棕色
                    secondary: '#D48E3B',
                    // 功能强调色 - 棕橙色
                    success: '#C9843C',
                    // 暖强调色 - 橙色
                    warning: '#E6A045',
                    // 活力强调色 - 亮黄色
                    warn: '#FFC87C',
                    // 正文主色 - 深棕色
                    text: '#3D2500',
                    // 次要文本 - 暗棕色
                    note: '#5D3A00',
                    // 分割线 / 边框 - 浅棕色
                    border: '#E6D3B8',
                    // 高亮背景 - 浅米色
                    lightCode: '#FFF2E0'
                },
                // 当前使用的颜色（默认使用dark模式）
                primary: '#D48E3B',
                secondary: '#F4B466',
                success: '#B87333',
                warning: '#E6A045',
                warn: '#FFC87C',
                text: '#F7E6D0',
                note: '#D1B894',
                border: '#5D3A00',
                lightCode: '#4A3000',
                pixel: {
                    blue: '#D48E3B',
                    pink: '#F4B466',
                    purple: '#B87333',
                    green: '#C9843C'
                }
            },
            fontFamily: {
                pixel: ['VT323', 'monospace', 'cursive']
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
