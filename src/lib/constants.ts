/** 站点全局配置 — 修改这里即可更新全站信息 */
export const SITE = {
  name: 'My Portfolio',
  title: '个人作品集',
  description: '欢迎来到我的个人网站，这里展示我的项目作品、技术博客和创意视频。',
  url: 'https://example.com', // TODO: 替换为你的域名
  author: 'Your Name',        // TODO: 替换为你的名字
  avatar: '/images/avatar.webp',
  roles: ['Full-Stack Developer', 'Creative Designer', 'Content Creator'], // Hero 打字效果循环的角色
} as const;

/** 社交链接 */
export const SOCIAL_LINKS = [
  { name: 'GitHub', url: 'https://github.com/yourname', icon: 'github' },
  { name: 'Bilibili', url: 'https://space.bilibili.com/youruid', icon: 'bilibili' },
  { name: 'Email', url: 'mailto:your@email.com', icon: 'email' },
  // 按需添加更多...
] as const;

/** 导航菜单项 */
export const NAV_ITEMS = [
  { label: '首页', href: '/' },
  { label: '关于', href: '/about' },
  { label: '项目', href: '/projects' },
  { label: '博客', href: '/blog' },
  { label: '视频', href: '/videos' },
  { label: '联系', href: '/contact' },
] as const;
