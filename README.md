# MicroKernel AI - 微内核智能软件生成器

> 用嘴说，用手指，软件自动成型。

## 愿景

让每个人都能用自然语言创造软件。不需要写代码，不需要学框架，只需要说清楚你想要什么。5分钟内，从想法变成可运行的应用。

## 核心理念

**微内核架构**：系统本身极简，所有功能都是插件。用户每说一句话，系统就生成/组合一个能力模块，最终拼装成完整的软件。

## 产品定位

| 维度 | 描述 |
|------|------|
| 目标用户 | 有想法但不会编程的创业者、需要定制化工具的小微企业主、自由职业者 |
| 核心场景 | "我要一个记账App" → 5分钟内生成可用软件 |
| 技术壁垒 | 微内核插件架构 + LLM代码生成 + 实时预览 + 语音交互 |
| 商业模式 | 免费生成基础应用，Pro $19.99/月（全平台导出/无限生成） |

## 产品特色

1. **语音驱动** - 说话即开发，支持多轮对话迭代
2. **微内核架构** - 极小核心 + 无限插件扩展，生成代码模块化、低缺陷率
3. **实时预览** - 边说边看，所见即所得，30秒内首次预览
4. **全平台输出** - 一次描述，生成 Web/iOS/Android/桌面应用
5. **渐进式复杂度** - 从简单开始，用对话逐步增加功能

## 与竞品的关键差异

- **vs Cursor/Copilot**：不需要会编程，纯自然语言驱动
- **vs Bubble/Glide**：不需要拖拽，说话就行，零学习成本
- **vs v0/Bolt**：不止生成前端，生成完整可运行的全栈应用
- **vs Replit Agent**：微内核架构，模块可复用、可组合、可热插拔
- **vs Lovable**：语音优先 + 中文市场本地化 + 微内核生态

## 平台支持

- Web PWA (GitHub Pages / Vercel)
- iOS (React Native)
- Android (React Native)
- Desktop (Tauri)
- CLI

## 项目文档

| 文档 | 内容 |
|------|------|
| [产品设计](docs/PRODUCT.md) | 用户画像、用户故事、功能规划、商业模式、KPI |
| [系统架构](docs/ARCHITECTURE.md) | 微内核设计、插件API、数据流、安全与性能 |
| [用户体验](docs/UX_DESIGN.md) | 核心页面、交互流程、设计系统、移动端适配 |
| [竞品分析](docs/COMPETITORS.md) | 12个竞品详细对比、市场空白、定价策略 |
| [增长策略](docs/GROWTH.md) | PLG飞轮、获客渠道、留存策略、GTM计划 |
| [风险分析](docs/RISKS.md) | 9大风险评估、应对策略、失败场景分析 |
| [开发路线](docs/ROADMAP.md) | Phase 0-4 开发计划与里程碑 |
| [技术选型](docs/TECH_STACK.md) | React + TypeScript + Vite 技术栈说明 |
| [部署指南](docs/DEPLOY_GITHUB_PAGES.md) | GitHub Pages PWA 部署步骤 |

## 技术栈

| 层 | 技术 |
|----|------|
| 前端 | React 19 + TypeScript + Vite + Tailwind CSS |
| 移动端 | React Native + Expo |
| 桌面端 | Tauri 2.0 |
| 后端 | Cloudflare Workers / Node.js Edge Functions |
| AI引擎 | Claude API + OpenAI API（多模型策略） |
| 数据库 | Supabase (PostgreSQL) |
| 部署 | Cloudflare Pages / Vercel |

## 开发路线（概览）

```
Phase 0 (2周)   │ PWA体验原型 - 文字输入 → 生成Web应用预览
Phase 1 (6周)   │ 核心引擎 - 微内核调度器 + 插件系统 + AI代码生成
Phase 2 (4周)   │ 对话迭代 - 多轮对话 + 语音输入 + 热插拔修改
Phase 3 (6周)   │ 全平台输出 - iOS/Android/Desktop导出 + 一键部署
Phase 4 (持续)  │ 生态建设 - 插件市场 + 模板商城 + 开发者SDK
```

---

*项目状态：规划阶段*
