# 全平台技术栈选型说明

## 为什么选 React + TypeScript + Vite

### 跨项目统一技术栈的理由
四个项目共享同一套前端技术栈，最大化代码复用和学习效率：

| 考虑因素 | React生态 | Vue生态 | Flutter | 选择 |
|----------|-----------|---------|---------|------|
| Web开发 | ★★★★★ | ★★★★★ | ★★★☆☆ | React |
| 移动端 | React Native ★★★★ | 无原生方案 | ★★★★★ | React Native |
| 桌面端 | Electron/Tauri ★★★★ | Electron ★★★ | ★★★☆☆ | Tauri |
| PWA支持 | ★★★★★ | ★★★★★ | ★★☆☆☆ | React |
| 生态系统 | ★★★★★ | ★★★★☆ | ★★★☆☆ | React |
| AI工具支持 | ★★★★★ | ★★★★☆ | ★★★☆☆ | React |
| 招聘市场 | ★★★★★ | ★★★★☆ | ★★★☆☆ | React |

### 为什么不选 Flutter
- Flutter 在Web端体验仍不够好（渲染方式不同）
- PWA场景下React+Vite更轻量
- AI代码生成工具对React支持最好
- 团队学习一套技术栈即可覆盖全平台

### 为什么用 Vite 不用 Next.js
- GitHub Pages 部署需要纯静态输出
- PWA 体验阶段不需要 SSR
- Vite 构建更快，配置更简单
- 后期如需 SSR 可以迁移到 Next.js

## PWA 技术方案

### GitHub Pages + PWA 的优势
1. **零成本部署** - 完全免费
2. **HTTPS默认** - GitHub Pages 自带
3. **CI/CD** - GitHub Actions 自动构建部署
4. **自定义域名** - 支持
5. **离线访问** - Service Worker 缓存

### PWA 关键配置
- `manifest.json` - 应用元数据、图标、启动画面
- `service-worker.js` - 离线缓存策略
- 响应式设计 - 适配所有屏幕尺寸
- App Shell 架构 - 快速首屏加载

## 状态管理：Zustand

| 方案 | 复杂度 | 包大小 | TypeScript | 选择 |
|------|--------|--------|------------|------|
| Zustand | 低 | 1KB | ★★★★★ | ✅ |
| Redux Toolkit | 中 | 11KB | ★★★★☆ | ❌ |
| Jotai | 低 | 2KB | ★★★★☆ | 备选 |
| MobX | 中 | 15KB | ★★★☆☆ | ❌ |

## CSS 方案：Tailwind CSS

- 原子化CSS，构建产物小
- 设计一致性好
- AI代码生成工具对Tailwind理解最好
- 开发效率高，不需要写单独的CSS文件
