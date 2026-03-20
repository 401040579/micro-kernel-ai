# GitHub Pages PWA 部署指南

## 项目结构（PWA体验版）

```
micro-kernel-ai/
├── index.html          # 入口
├── manifest.json       # PWA 配置
├── sw.js               # Service Worker
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── components/
│   └── styles/
├── public/
│   ├── icons/          # App 图标 (各尺寸)
│   └── screenshots/    # 应用截图
├── vite.config.ts
└── package.json
```

## 部署步骤

### 1. 创建 GitHub 仓库
```bash
gh repo create micro-kernel-ai --public
git remote add origin https://github.com/USERNAME/micro-kernel-ai.git
```

### 2. 配置 GitHub Actions
创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - uses: actions/deploy-pages@v4
```

### 3. 启用 GitHub Pages
- 仓库 Settings → Pages → Source: GitHub Actions

### 4. PWA 关键文件

#### manifest.json
```json
{
  "name": "MicroKernel AI",
  "short_name": "MicroKernel",
  "start_url": "/micro-kernel-ai/",
  "display": "standalone",
  "background_color": "#000000",
  "theme_color": "#6366f1",
  "icons": [
    { "src": "icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

#### vite.config.ts
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/micro-kernel-ai/',  // GitHub Pages 子路径
})
```

## 自定义域名（可选）
1. 在 `public/` 下创建 `CNAME` 文件，写入域名
2. DNS 配置 CNAME 指向 `USERNAME.github.io`
3. 修改 `base` 为 `/`
