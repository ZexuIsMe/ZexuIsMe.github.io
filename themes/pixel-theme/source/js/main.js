/**
 * 主脚本文件
 * 包含博客的核心功能组件和交互逻辑
 */

// 导入 React 的 createElement 方法并简化为 e
const { createElement: e } = React;

/**
 * 特色内容组件
 * 用于显示博客首页的特色图片
 * @returns {React.ReactElement} 特色图片元素
 */
function FeaturedComponent() {
  return e('img', {
    src: 'https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/super_tool/045d52041e0640dbba5b55b00bcffd70~tplv-a9rns2rl98-image.image?lk3s=8e244e95&rcl=20260202192528FF625BE2146F4D36E478&rrcfp=f06b921b&x-expires=1772623642&x-signature=tTj5R5wpKcuVun%2BC4uGNbeXo1bc%3D',
    alt: 'Featured',
    className: 'w-full h-auto pixel-art'
  });
}

/**
 * 联系表单组件
 * 提供用户与博主联系的表单界面
 * @returns {React.ReactElement} 联系表单元素
 */
function ContactForm() {
  // 使用 React useState 钩子管理表单数据
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: ''
  });

  /**
   * 处理表单输入变化
   * @param {Event} e 输入事件对象
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /**
   * 处理表单提交
   * @param {Event} e 提交事件对象
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('消息已发送！我会尽快回复你。');
    // 重置表单数据
    setFormData({ name: '', email: '', message: '' });
  };

  // 构建表单元素结构
  return e('form', { onSubmit: handleSubmit },
    // 姓名输入字段
    e('div', { className: 'mb-4' },
      e('label', { htmlFor: 'name', className: 'block mb-2 text-pixel-blue' }, '姓名'),
      e('input', {
        type: 'text',
        id: 'name',
        name: 'name',
        value: formData.name,
        onChange: handleChange,
        className: 'w-full px-4 py-2 bg-dark border-2 border-pixel-blue text-white',
        required: true
      })
    ),
    // 邮箱输入字段
    e('div', { className: 'mb-4' },
      e('label', { htmlFor: 'email', className: 'block mb-2 text-pixel-blue' }, '邮箱'),
      e('input', {
        type: 'email',
        id: 'email',
        name: 'email',
        value: formData.email,
        onChange: handleChange,
        className: 'w-full px-4 py-2 bg-dark border-2 border-pixel-blue text-white',
        required: true
      })
    ),
    // 留言输入字段
    e('div', { className: 'mb-6' },
      e('label', { htmlFor: 'message', className: 'block mb-2 text-pixel-blue' }, '留言'),
      e('textarea', {
        id: 'message',
        name: 'message',
        rows: 4,
        value: formData.message,
        onChange: handleChange,
        className: 'w-full px-4 py-2 bg-dark border-2 border-pixel-blue text-white',
        required: true
      })
    ),
    // 提交按钮
    e('button', { type: 'submit', className: 'pixel-button w-full' }, '发送消息')
  );
}

/**
 * DOM 加载完成后执行的初始化代码
 * 负责渲染组件和绑定事件监听器
 */
document.addEventListener('DOMContentLoaded', () => {
  // 渲染特色内容组件
  const featuredComponent = document.getElementById('featured-component');
  if (featuredComponent) {
    ReactDOM.render(e(FeaturedComponent), featuredComponent);
  }

  // 渲染联系表单组件
  const contactFormContainer = document.getElementById('contact-form-container');
  if (contactFormContainer) {
    ReactDOM.render(e(ContactForm), contactFormContainer);
  }

  // 处理移动菜单的显示/隐藏
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // 处理文章筛选功能
  const articleFilters = document.querySelectorAll('.article-filter');
  const articleItems = document.querySelectorAll('.article-item');
  if (articleFilters.length > 0 && articleItems.length > 0) {
    articleFilters.forEach(filter => {
      filter.addEventListener('click', () => {
        // 移除所有筛选按钮的活跃状态
        articleFilters.forEach(btn => btn.classList.remove('active'));
        // 添加当前筛选按钮的活跃状态
        filter.classList.add('active');
        // 获取筛选值
        const filterValue = filter.getAttribute('data-filter');
        // 根据筛选值显示或隐藏文章项
        articleItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // 处理文章搜索功能
  const articleSearch = document.getElementById('article-search');
  if (articleSearch && articleItems.length > 0) {
    articleSearch.addEventListener('input', () => {
      // 获取搜索值并转换为小写
      const searchValue = articleSearch.value.toLowerCase();
      // 根据搜索值显示或隐藏文章项
      articleItems.forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        const content = item.querySelector('p').textContent.toLowerCase();
        if (title.includes(searchValue) || content.includes(searchValue)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
});