# 9·3 大阅兵主题酷炫展示网站

## 🎯 项目概述

这是一个基于 Next.js 14 构建的「9·3 大阅兵」主题交互式展示网站，面向海外华人、军事爱好者和国际媒体，通过现代前端技术展现中国军事力量和历史传承。

## ✨ 核心特性

- **史诗级首屏**：视差滚动 + 背景视频 + 打字机动画
- **3D 装备展示**：基于 React-Three-Fiber 的交互式军用装备模型
- **历史时间轴**：75年军事阅兵发展历程可视化
- **高清图片画廊**：响应式瀑布流布局
- **多语言支持**：中英文双语界面
- **SEO 优化**：完整的元数据、结构化数据、sitemap
- **性能优化**：ISR、代码分割、CDN 加速

## 🛠️ 技术栈

### 核心框架
- **Next.js 14** - React 全栈框架（App Router）
- **TypeScript** - 类型安全
- **TailwindCSS** - 原子化样式

### 动画与交互
- **Framer Motion** - 流畅动画效果
- **React-Three-Fiber** - 3D 场景渲染
- **React-Three-Drei** - 3D 工具库

### 部署与优化
- **Vercel** - 全球边缘节点部署
- **Cloudinary** - 图片/视频 CDN 优化
- **ISR** - 增量静态再生

## 🚀 快速开始

### 环境要求
- Node.js 18.17+ 
- npm 或 yarn
- Git

### 安装步骤

1. **安装依赖**
```bash
npm install
```

2. **开发模式运行**
```bash
npm run dev
```

3. **访问应用**
```
http://localhost:3000
```

### 生产构建

```bash
# 构建
npm run build

# 本地预览
npm run start
```

## 📁 项目结构

```
93-parade-showcase/
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── page.tsx            # 首页
│   │   ├── layout.tsx          # 根布局（SEO配置）
│   │   ├── equipment/          # 装备展示页面
│   │   ├── timeline/           # 历史时间轴
│   │   ├── gallery/            # 图片画廊
│   │   └── api/                # API 路由
│   └── components/             # 可复用组件
│       ├── HeroParallax.tsx    # 首屏视差组件
│       ├── Model3D.tsx         # 3D模型展示
│       ├── CountUp.tsx         # 数字动画
│       └── VideoShowcase.tsx   # 视频播放器
├── public/                     # 静态资源
│   ├── models/                 # 3D 模型文件
│   ├── videos/                 # 背景视频
│   └── images/                 # 图片资源
├── next.config.ts              # Next.js 配置
├── vercel.json                 # Vercel 部署配置
└── package.json
```

## 🎨 页面功能

### 首页 (/)
- 全屏背景视频 + 视差滚动
- 打字机效果标题动画
- 统计数据计数器
- 功能导航卡片

### 装备展示 (/equipment)
- 3D 模型交互查看
- 装备技术参数详情
- 多角度旋转控制
- 规格说明面板

### 历史时间轴 (/timeline)
- 交互式时间轴设计
- 历年阅兵重点事件
- 动态详情展示
- 统计数据可视化

### 图片画廊 (/gallery)
- 响应式网格布局
- 分类筛选功能
- 灯箱模态查看
- 延迟加载优化

## ⚡ 性能优化

### 加载优化
- Next.js 自动代码分割
- 3D 模型懒加载
- 图片 WebP/AVIF 格式
- CDN 全球分发

### Lighthouse 得分目标
- Performance: 95+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

## 🌐 SEO 与国际化

### SEO 配置
- 完整 metadata 设置
- OpenGraph / Twitter Card
- 结构化数据（JSON-LD）
- XML Sitemap 自动生成
- robots.txt 配置

### 多语言支持
- 中英文双语界面
- hreflang 标签配置
- 本地化路由设置
- 字体优化加载

## 📊 部署配置

### Vercel 部署
```bash
# 一键部署到 Vercel
vercel --prod
```

### 环境变量
```bash
# .env.local
REVALIDATION_SECRET=your-secret-key
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 📞 联系方式

- 项目维护：Military Heritage Digital Archive
- 官网：https://china-victory-parade.vercel.app

---

**Made with ❤️ for preserving and showcasing China's military heritage**
