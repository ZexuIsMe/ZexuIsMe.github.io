document.addEventListener('DOMContentLoaded', function() {
    // 找到.content类下的所有table元素
    // .content>table 表示找出 content这个类下的table子元素
    // .content table 表示找出 content这个类下的所有table子元素
    const tables = document.querySelectorAll('.content>table');
    const tables2 = document.querySelectorAll('.highlight table');

    // 遍历所有找到的table元素
    tables.forEach(table => {
        // 为每个table元素添加.test类
        // table.className = 'table is-striped'
        table.classList.add('table');
        table.classList.add('is-striped');

        MoveTableHtml(table)
    });
    document.querySelectorAll('.highlight table').forEach(table => {
        MoveTableHtml(table, { margin: 0 })
    });
});


function MoveTableHtml (table, style = {}) {
    // 创建新的div元素
    const wrapperDiv = document.createElement('div');
    if (Object.keys(style).length > 0) {
        Object.keys(style).forEach(key => {
            wrapperDiv.style[key] = style[key]
        })
    }
    // 1. 为div添加类名以便样式设置
    wrapperDiv.className = 'table-wrapper';
    // 2. 将div添加到 table 标签的前面
    table.parentNode.insertBefore(wrapperDiv, table);
    // 3. 将table插入到div中，appendChild 将 table 挪窝到 div 中
    wrapperDiv.appendChild(table);
    // 4. 2 和 3 的代码顺序不能乱，否则会导致table.parentNode操作失败
    // 原因是 table 已经不见了，在这个没有添加到页面的 DOM 上
}