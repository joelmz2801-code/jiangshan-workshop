# KLB工坊官网

基于设计稿还原的工艺修补工作室展示型官网，采用 Vite + React + TypeScript + TailwindCSS 构建，支持亮/暗主题、多端适配，并预配置 GitHub Pages 与 Cloudflare Pages 双部署方案。

## 技术栈

| 层级 | 技术 |
|------|------|
| 构建工具 | Vite 6 |
| 框架 | React 18 + TypeScript |
| 样式 | TailwindCSS 3（与设计稿 CDN 版本对齐） |
| 动效 | Framer Motion 11 |
| 图标 | Lucide React |
| 字体 | Fraunces（Google Fonts） |

## 本地开发

```bash
npm install      # 安装依赖
npm run dev      # 启动开发服务器 http://localhost:5173
npm run build    # 生产构建，产物输出至 dist/
npm run preview  # 本地预览构建产物
npm run check    # TypeScript 类型检查
```

## 项目结构

```
src/
├── components/      # 通用组件（导航、页脚、主题切换、返回顶部等）
├── sections/        # 页面区块（Hero、Services、Materials、Contact）
├── hooks/           # 自定义 Hook（useTheme）
├── data/            # 站点内容常量（文案、服务、材质数据）
├── lib/             # 工具（cn、motion 动画预设）
└── pages/           # 页面（Home）
```

## 内容修改

所有可配置文案集中在 `src/data/content.ts`，修改后无需改动组件即可更新站点显示内容（包括服务描述、材质列表、联系方式等）。

## 部署

本项目同时支持两种部署方式，互不冲突。

### 方式一：GitHub Pages（自动）

已配置 `.github/workflows/deploy.yml`：

1. 将代码推送到 `main` 分支
2. GitHub Actions 自动执行：安装依赖 → 构建 → 部署到 GitHub Pages
3. 在仓库 **Settings → Pages** 中将 Source 设为 `GitHub Actions`

> 注：`vite.config.ts` 中已设置 `base: './'`，使用相对路径，适配 GitHub Pages 子路径部署。

### 方式二：Cloudflare Pages

**选项 A — Git 集成（推荐）**：

1. 登录 Cloudflare Dashboard → Pages → Create a project → Connect to Git
2. 选择本仓库
3. 配置：
   - 构建命令：`npm run build`
   - 输出目录：`dist`
   - 环境变量：无
4. 保存后每次 push 自动构建部署

**选项 B — wrangler 直传**：

```bash
npm run build
npx wrangler pages deploy dist --project-name=klb-workshop
```

`public/_headers` 已配置静态资源缓存策略与安全头。

## 多端适配

| 设备 | 断点 | 策略 |
|------|------|------|
| 桌面 | ≥ 1024px | 完整多列布局 |
| 平板 | 768-1023px | 双列保持、导航桌面菜单 |
| 手机 | < 768px | 单列、汉堡菜单、间距压缩 |

## 主题

- 跟随系统 `prefers-color-scheme` 自动识别
- 右下角浮动按钮手动切换
- 选择持久化到 `localStorage`
- 在 `<head>` 注入 inline 脚本避免 FOUC（主题闪烁）

## 可访问性

- 语义化 HTML5 标签
- ARIA 标签与键盘可达
- `prefers-reduced-motion` 支持
- 表单字段关联 label 与错误提示

## 设计稿来源

基于用户提供的「首页」设计稿 1:1 还原，所有图片资源位于 `public/assets/`。
