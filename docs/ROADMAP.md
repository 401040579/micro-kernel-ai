# MicroKernel AI - 开发路线图

## Phase 0：体验原型 (PWA on GitHub Pages) — 2周

### 目标
让人用浏览器就能体验"说需求→看到应用"的感觉

### 交付物
- GitHub Pages 部署的 PWA
- 文字输入需求 → AI分析 → 展示UI预览（图片/静态HTML）
- 3个预设Demo场景（记账/待办/日记）
- 品牌视觉 & Landing Page

### 技术栈
- Vanilla HTML/CSS/JS 或 Vite + React
- Service Worker (离线缓存)
- manifest.json (PWA安装)
- Claude API (需求理解 + 代码生成)

---

## Phase 1：核心引擎 — 6周

### 目标
真正的微内核运行时，能生成可交互的简单应用

### 里程碑
- [ ] 微内核调度器 v1
- [ ] 基础插件系统（UI/数据/逻辑三类）
- [ ] AI需求→插件组合管线
- [ ] 实时预览沙箱
- [ ] 10个内置插件（按钮/输入框/列表/表单/图表等）

---

## Phase 2：对话迭代 — 4周

### 目标
多轮对话修改应用，热插拔新功能

### 里程碑
- [ ] 对话上下文管理
- [ ] 增量修改（不重新生成整个应用）
- [ ] 语音输入集成
- [ ] 修改历史 & 撤销

---

## Phase 3：全平台输出 — 6周

### 目标
一次描述，导出多平台应用

### 里程碑
- [ ] Web应用导出
- [ ] React Native 移动端导出
- [ ] Electron 桌面端导出
- [ ] 一键部署到 Vercel/Cloudflare

---

## Phase 4：生态建设 — 持续

### 目标
开放插件市场，社区驱动

### 里程碑
- [ ] 插件开发SDK
- [ ] 插件市场上线
- [ ] 模板商城
- [ ] API开放

---

## 总时间线

```
Month 1     │ Phase 0: PWA体验原型
Month 2-3   │ Phase 1: 核心引擎
Month 3-4   │ Phase 2: 对话迭代
Month 4-6   │ Phase 3: 全平台
Month 6+    │ Phase 4: 生态
```
