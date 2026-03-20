# MicroKernel AI - 开发规范

## 项目概述
语音/自然语言驱动的全栈软件生成平台，基于微内核架构。核心理念：用户说话描述需求，系统自动生成可运行的软件。

## 技术栈
- 前端：React 19 + TypeScript + Vite + Tailwind CSS
- 状态管理：Zustand
- 跨平台：React Native + Expo (移动) + Tauri 2.0 (桌面)
- 后端：Cloudflare Workers / Node.js Edge Functions
- AI：Claude API + OpenAI API（多模型策略）
- 数据库：Supabase (PostgreSQL)
- 部署：GitHub Pages (PWA) → Cloudflare Pages / Vercel (生产)
- 包管理：pnpm + Turborepo (Monorepo)

## 开发规范
- 使用 TypeScript strict mode
- 组件使用函数式组件 + Hooks
- 状态管理：Zustand
- 样式：Tailwind CSS
- 测试：Vitest + React Testing Library
- 提交信息：Conventional Commits (中文描述)
- 所有插件必须实现 Plugin 接口（见 docs/ARCHITECTURE.md）
- 生成的代码必须通过安全扫描（无eval、无innerHTML注入、无硬编码密钥）

## 项目结构（Monorepo）
```
apps/
  web/                 # Web PWA 前端
  mobile/              # React Native 移动端
  desktop/             # Tauri 桌面端
packages/
  kernel/              # 微内核核心（调度器、消息总线、插件管理）
  ai-engine/           # AI理解 & 代码生成引擎
  plugin-sdk/          # 插件开发SDK
  plugin-registry/     # 内置插件集合
  preview-sandbox/     # 预览沙箱
  ui-components/       # 共享UI组件库
  shared/              # 共享类型定义、工具函数
services/
  api-gateway/         # API网关
  code-gen-worker/     # 代码生成Worker
  deploy-worker/       # 部署Worker
plugins/               # 插件目录（ui/data/logic/deploy/integration）
docs/                  # 项目文档
```

## 关键文档
- docs/PRODUCT.md - 产品设计（用户画像、用户故事、功能规划）
- docs/ARCHITECTURE.md - 系统架构（微内核设计、API、数据流）
- docs/UX_DESIGN.md - 用户体验（页面设计、交互流程、设计系统）
- docs/COMPETITORS.md - 竞品分析
- docs/GROWTH.md - 增长策略
- docs/RISKS.md - 风险分析
- docs/ROADMAP.md - 开发路线图
- docs/TECH_STACK.md - 技术选型说明
