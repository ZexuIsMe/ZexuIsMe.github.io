// scripts/helpers/cos-image.js
hexo.extend.helper.register('cosImage', function(path, options = {}) {
  const cosConfig = hexo.config.cos || {};
  const prefix = cosConfig.image_prefix + cosConfig.bucket_path;
  const imagePath = path.startsWith('/') ? path.slice(1) : path;
  
  // 支持图片处理参数（腾讯云 CI）
  const params = [];
//   ?imageMogr2/quality/10
  const str_text = 'imageMogr2'
  if (options.width) params.push(`${str_text}/width=${options.width}`);
  if (options.height) params.push(`${str_text}/height=${options.height}`);
  if (options.quality) params.push(`${str_text}/quality/${options.quality}`);
  
  let url = `${prefix}${imagePath}`;
  if (params.length > 0) {
    url += `?${params.join('&')}`;
  }
  
  return url;
});