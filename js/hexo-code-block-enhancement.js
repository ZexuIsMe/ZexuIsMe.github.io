document.addEventListener('DOMContentLoaded', function() {
    enhanceCodeBlocks();
});

/**
 * 增强页面上的所有代码块，添加语言标签和复制功能
 */
function enhanceCodeBlocks() {
    // 支持多种常见的代码块容器选择器
    const codeBlockSelectors = [
        'figure[class*="highlight"]',
        'pre[class*="language-"]',
        'div[class*="codehilite"]'
    ];

    document.querySelectorAll(codeBlockSelectors.join(',')).forEach(block => {
        const language = detectLanguage(block);
        const header = createCodeBlockHeader(language, block);
        block.insertBefore(header, block.firstChild);
    });
}

/**
 * 检测代码块的编程语言
 * @param {HTMLElement} block - 代码块元素
 * @returns {string} - 检测到的语言名称
 */
function detectLanguage(block) {
    // 尝试从类名中提取语言信息
    let language = null;

    // 检查highlight-*类
    let match = block.className.match(/highlight (\w+)/);
    if (match) return formatLanguageName(match[1]);

    // 检查language-*类
    match = block.className.match(/\blanguage (\w+)/);
    if (match) return formatLanguageName(match[1]);

    // 检查代码元素的类
    const codeElement = block.querySelector('code');
    if (codeElement) {
        match = codeElement.className.match(/\blanguage-(\w+)/);
        if (match) return formatLanguageName(match[1]);
    }

    return 'Code';
}

/**
 * 格式化语言名称，使其更友好
 * @param {string} language - 原始语言名称
 * @returns {string} - 格式化后的语言名称
 */
function formatLanguageName(language) {
    const languageMap = {
        'js': 'JavaScript',
        'py': 'Python',
        'html': 'HTML',
        'css': 'CSS',
        'ts': 'TypeScript',
        'json': 'JSON',
        'bash': 'Bash',
        'java': 'Java',
        'csharp': 'C#',
        'cpp': 'C++'
    };

    return languageMap[language] ||
        language.charAt(0).toUpperCase() + language.slice(1);
}

/**
 * 创建代码块头部，包含语言标签和复制按钮
 * @param {string} language - 语言名称
 * @param {HTMLElement} codeBlock - 代码块元素
 * @returns {HTMLElement} - 创建的头部元素
 */
function createCodeBlockHeader(language, codeBlock) {
    const header = document.createElement('div');
    header.className = 'code-block-header';

    // 创建语言标签
    const langTag = document.createElement('div');
    langTag.className = 'code-lang-tag';
    langTag.textContent = language;
    header.appendChild(langTag);

    // 创建复制按钮
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.innerHTML = '<i class="fa fa-copy"></i>';
    copyButton.title = '复制代码';
    copyButton.addEventListener('click', async () => {
        await handleCopy(codeBlock, copyButton);
    });
    header.appendChild(copyButton);

    return header;
}

/**
 * 处理代码复制功能
 * @param {HTMLElement} codeBlock - 代码块元素
 * @param {HTMLElement} button - 复制按钮元素
 */
async function handleCopy(codeBlock, button) {
    // 回退到旧方法
    try {
        const success = fallbackCopyTextToClipboard(codeBlock);
        if (success) {
            showCopyFeedback(button, '✓');
        } else {
            showCopyFeedback(button, '✗', true);
        }
    } catch (err) {
        showCopyFeedback(button, '✗', true);
        console.error('无法复制代码:', err);
    }
}

/**
 * 从代码块中提取纯文本代码
 * @param {HTMLElement} codeBlock - 代码块元素
 * @returns {object} - 提取的代码文本
 */
function extractCodeFromBlock(codeBlock) {
    const codeElement = codeBlock.querySelector('pre code') ||
        codeBlock.querySelector('code') ||
        codeBlock.querySelector('pre') ||
        codeBlock;

    // 创建临时可编辑元素
    const tempContainer = document.createElement('div');
    tempContainer.contentEditable = true;
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.whiteSpace = 'pre';
    tempContainer.style.fontFamily = 'monospace';

    // 复制代码内容并保留格式
    tempContainer.innerHTML = codeElement.innerHTML;
    return { 'tempContainer': tempContainer }
}

/**
 * 旧版复制方法，使用document.execCommand
 * @param {HTMLElement} codeBlock - 代码块元素
 * @returns {boolean} - 复制是否成功
 */
function fallbackCopyTextToClipboard(codeBlock) {
    const { tempContainer } = extractCodeFromBlock(codeBlock);

    document.body.appendChild(tempContainer);
    // 选中文本
    const range = document.createRange();
    range.selectNodeContents(tempContainer);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    // 执行复制命令
    const successful = document.execCommand('copy');
    // 清理
    selection.removeAllRanges();
    document.body.removeChild(tempContainer);
    return successful;
}

/**
 * 显示复制操作的反馈
 * @param {HTMLElement} button - 按钮元素
 * @param {string} icon - 显示的图标
 * @param {boolean} isError - 是否为错误状态
 */
function showCopyFeedback(button, icon, isError = false) {
    const originalContent = button.innerHTML;
    button.innerHTML = `<i class="fa ${isError ? 'fa-times' : 'fa-check'}"></i>`;

    if (isError) {
        button.classList.add('copy-error');
    } else {
        button.classList.add('copy-success');
    }

    setTimeout(() => {
        button.innerHTML = originalContent;
        button.classList.remove('copy-success', 'copy-error');
    }, 1500);
}
