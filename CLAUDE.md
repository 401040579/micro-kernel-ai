# MicroKernel AI - 开发规范

## 项目概述
语音/自然语言驱动的全栈软件生成平台，基于微内核架构。

## 技术栈
- 前端：React + TypeScript + Vite
- 跨平台：React Native (移动) + Tauri (桌面)
- 后端：Node.js / Edge Functions
- AI：Claude API
- 部署：GitHub Pages (PWA) → Vercel (生产)

## 开发规范
- 使用 TypeScript strict mode
- 组件使用函数式组件 + Hooks
- 状态管理：Zustand
- 样式：Tailwind CSS
- 测试：Vitest + React Testing Library
- 提交信息：Conventional Commits (中文描述)

## 目录结构
```
src/
  core/          # 微内核核心
  plugins/       # 插件系统
  ai/            # AI集成
  ui/            # 界面组件
  utils/         # 工具函数
docs/            # 文档
public/          # 静态资源
```
