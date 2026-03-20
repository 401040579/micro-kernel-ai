# MicroKernel AI - 系统架构设计文档

## 1. 架构概述

MicroKernel AI 采用微内核（Microkernel）架构模式，也称插件架构（Plugin Architecture）。系统核心极简，仅包含插件管理、消息路由、生命周期管理等最小功能集。所有业务能力（UI组件、数据处理、逻辑编排、代码生成、部署）均以插件形式存在，可独立开发、测试、部署和替换。

### 为什么选择微内核架构

| 考量 | 微内核 | 单体架构 | 微服务 |
|------|--------|---------|--------|
| 可扩展性 | 高（热插拔插件） | 低 | 高（但复杂） |
| 开发复杂度 | 中 | 低 | 高 |
| 部署复杂度 | 低（单体+插件） | 低 | 高 |
| AI生成适配性 | 高（生成独立插件） | 低（改整个系统） | 中 |
| 社区贡献友好 | 高（只需开发插件） | 低 | 中 |
| 运行时性能 | 高（按需加载） | 中 | 中（网络开销） |

**核心优势**：AI生成的每个功能模块天然就是一个插件，无需理解整个系统，只需符合插件接口规范。这与LLM的代码生成能力完美匹配——生成小的、独立的、接口明确的模块远比生成大型耦合系统可靠。

---

## 2. 系统分层架构

```
┌─────────────────────────────────────────────────────────────┐
│                      客户端层 (Client Layer)                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Web PWA │  │  iOS App │  │ Android  │  │ Desktop  │   │
│  │ (React)  │  │  (RN)    │  │  (RN)    │  │ (Tauri)  │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘   │
│       └──────────────┴─────────────┴──────────────┘         │
│                           │                                  │
├───────────────────────────┼──────────────────────────────────┤
│                    API 网关层 (Gateway)                       │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  认证/鉴权 │ 限流 │ 路由 │ 日志 │ WebSocket管理      │    │
│  └─────────────────────────────────────────────────────┘    │
│                           │                                  │
├───────────────────────────┼──────────────────────────────────┤
│                    核心服务层 (Core Services)                 │
│                                                              │
│  ┌──────────────────┐  ┌──────────────────┐                 │
│  │   AI 理解引擎     │  │   微内核调度器    │                 │
│  │  ┌─────────────┐ │  │  ┌─────────────┐ │                 │
│  │  │ 意图识别    │ │  │  │ 插件注册表  │ │                 │
│  │  │ 需求分解    │ │  │  │ 依赖解析    │ │                 │
│  │  │ 上下文管理  │ │  │  │ 生命周期    │ │                 │
│  │  │ 多轮对话    │ │  │  │ 消息总线    │ │                 │
│  │  └─────────────┘ │  │  └─────────────┘ │                 │
│  └──────────────────┘  └──────────────────┘                 │
│                                                              │
│  ┌──────────────────┐  ┌──────────────────┐                 │
│  │   代码生成引擎    │  │   预览沙箱引擎    │                 │
│  │  ┌─────────────┐ │  │  ┌─────────────┐ │                 │
│  │  │ 模板引擎    │ │  │  │ iframe沙箱  │ │                 │
│  │  │ AI代码生成  │ │  │  │ 热模块替换  │ │                 │
│  │  │ 代码优化器  │ │  │  │ 状态快照    │ │                 │
│  │  │ 格式化/lint │ │  │  │ 错误隔离    │ │                 │
│  │  └─────────────┘ │  │  └─────────────┘ │                 │
│  └──────────────────┘  └──────────────────┘                 │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                     插件层 (Plugin Layer)                     │
│                                                              │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐   │
│  │UI 插件 │ │数据插件│ │逻辑插件│ │部署插件│ │集成插件│   │
│  │        │ │        │ │        │ │        │ │        │   │
│  │ Button │ │ CRUD   │ │ Auth   │ │ Vercel │ │ 支付   │   │
│  │ Form   │ │ Query  │ │ Route  │ │ CF     │ │ 地图   │   │
│  │ Table  │ │ Cache  │ │ State  │ │ GitHub │ │ 通知   │   │
│  │ Chart  │ │ File   │ │ Timer  │ │ Docker │ │ 社交   │   │
│  │ Nav    │ │ Sync   │ │ API    │ │ Native │ │ AI     │   │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘   │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                   基础设施层 (Infrastructure)                  │
│  ┌──────┐ ┌──────────┐ ┌────────┐ ┌──────┐ ┌───────────┐  │
│  │数据库│ │ 对象存储  │ │CDN     │ │ 队列 │ │ 监控/日志 │  │
│  │Supa  │ │ R2/S3    │ │CF/CDN  │ │Redis │ │ Sentry    │  │
│  └──────┘ └──────────┘ └────────┘ └──────┘ └───────────┘  │
└──────────────────────────────────────────────────────────────┘
```

---

## 3. 微内核详细设计

### 3.1 核心概念

```typescript
// 插件描述符
interface PluginDescriptor {
  id: string;                    // 唯一标识 "ui.button", "data.crud"
  name: string;                  // 显示名称
  version: string;               // 语义化版本 "1.0.0"
  category: PluginCategory;      // 'ui' | 'data' | 'logic' | 'deploy' | 'integration'
  description: string;           // 功能描述（供AI理解）
  dependencies: string[];        // 依赖的其他插件ID
  capabilities: string[];        // 提供的能力标签（供AI匹配）
  configSchema: JSONSchema;      // 配置项schema
}

// 插件接口（所有插件必须实现）
interface Plugin {
  descriptor: PluginDescriptor;

  // 生命周期
  install(kernel: Kernel): Promise<void>;    // 安装时调用
  activate(config: object): Promise<void>;   // 激活时调用
  deactivate(): Promise<void>;               // 停用时调用
  uninstall(): Promise<void>;                // 卸载时调用

  // 代码生成
  generateCode(context: GenerationContext): Promise<CodeFragment>;

  // 消息处理
  handleMessage(message: KernelMessage): Promise<any>;
}

// 微内核接口
interface Kernel {
  // 插件管理
  registerPlugin(plugin: Plugin): void;
  unregisterPlugin(pluginId: string): void;
  getPlugin(pluginId: string): Plugin | undefined;
  listPlugins(filter?: PluginFilter): Plugin[];

  // 消息总线
  emit(message: KernelMessage): void;
  on(messageType: string, handler: MessageHandler): void;
  off(messageType: string, handler: MessageHandler): void;

  // 依赖解析
  resolveDependencies(pluginId: string): Plugin[];

  // 应用组装
  assembleApp(plugins: Plugin[], config: AppConfig): Promise<GeneratedApp>;
}
```

### 3.2 插件注册与发现

```
插件加载流程：
1. 扫描插件目录 / 从插件市场下载
2. 解析 PluginDescriptor（验证必要字段）
3. 检查依赖是否满足
4. 注册到插件注册表
5. 按需激活（懒加载）

AI匹配流程：
1. 用户需求 → AI理解层分解为能力需求列表
   例：["数据录入", "列表展示", "图表统计", "用户认证"]
2. 微内核根据 capabilities 标签匹配插件
3. 解析依赖图，补充必要的依赖插件
4. 如果没有匹配的插件 → 调用AI代码生成引擎生成新插件
5. 返回完整的插件组合方案
```

### 3.3 消息总线设计

```typescript
// 消息类型
enum MessageType {
  // 用户交互
  USER_INPUT = 'user.input',
  USER_VOICE = 'user.voice',

  // AI处理
  AI_UNDERSTAND = 'ai.understand',
  AI_GENERATE = 'ai.generate',
  AI_SUGGEST = 'ai.suggest',

  // 插件生命周期
  PLUGIN_INSTALLED = 'plugin.installed',
  PLUGIN_ACTIVATED = 'plugin.activated',
  PLUGIN_ERROR = 'plugin.error',

  // 应用状态
  APP_PREVIEW_READY = 'app.preview.ready',
  APP_STATE_CHANGED = 'app.state.changed',
  APP_DEPLOY_START = 'app.deploy.start',
  APP_DEPLOY_DONE = 'app.deploy.done',
}

// 消息结构
interface KernelMessage {
  type: MessageType;
  payload: any;
  source: string;       // 发送者插件ID
  timestamp: number;
  correlationId: string; // 关联同一用户操作的所有消息
}
```

### 3.4 插件间通信

插件之间不直接调用，所有通信通过消息总线。这确保：
- 插件解耦：移除一个插件不影响其他插件
- 可测试性：可以mock消息测试单个插件
- 可追溯性：所有通信都经过总线，便于调试和回放

```
示例：用户说"加一个登录功能"

USER_INPUT("加一个登录功能")
  → AI_UNDERSTAND({ intent: "add_auth", features: ["login", "register"] })
    → PLUGIN_MATCH({ matched: ["auth.basic"], missing: [] })
      → PLUGIN_ACTIVATED("auth.basic")
        → AI_GENERATE({ plugin: "auth.basic", config: {...} })
          → APP_STATE_CHANGED({ added: ["login_page", "register_page"] })
            → APP_PREVIEW_READY({ url: "..." })
```

---

## 4. AI 理解引擎

### 4.1 需求理解管线 (Pipeline)

```
用户输入（语音/文字）
    │
    ▼
┌─────────────────────┐
│ 1. 语音转文字        │  Web Speech API / Whisper
│    (如果是语音输入)   │  过滤口语填充词
└─────────┬───────────┘
          ▼
┌─────────────────────┐
│ 2. 意图分类          │  判断：新建/修改/删除/查询/部署/其他
│                     │  使用轻量分类模型或LLM
└─────────┬───────────┘
          ▼
┌─────────────────────┐
│ 3. 需求结构化        │  提取：功能点、数据实体、页面、交互
│                     │  输出：RequirementSpec JSON
└─────────┬───────────┘
          ▼
┌─────────────────────┐
│ 4. 上下文融合        │  与历史对话、当前应用状态合并
│                     │  增量需求 vs 全量需求判断
└─────────┬───────────┘
          ▼
┌─────────────────────┐
│ 5. 澄清检查         │  是否有模糊/冲突/遗漏？
│                     │  是 → 生成澄清问题返回给用户
│                     │  否 → 进入生成流程
└─────────┬───────────┘
          ▼
    RequirementSpec
```

### 4.2 需求结构化输出

```typescript
interface RequirementSpec {
  // 应用基本信息
  appName: string;
  appDescription: string;
  appType: 'web' | 'mobile' | 'desktop' | 'all';

  // 功能模块
  features: Feature[];

  // 数据模型
  dataModels: DataModel[];

  // 页面/视图
  pages: Page[];

  // 交互流程
  flows: UserFlow[];

  // 非功能需求
  constraints: {
    performance?: string;
    security?: string;
    accessibility?: string;
  };
}

interface Feature {
  id: string;
  name: string;
  description: string;
  priority: 'must' | 'should' | 'nice-to-have';
  requiredPlugins: string[];  // 匹配到的插件ID
}

interface DataModel {
  name: string;
  fields: { name: string; type: string; required: boolean; }[];
  relationships: { target: string; type: '1:1' | '1:N' | 'N:N'; }[];
}
```

### 4.3 LLM 调用策略

| 场景 | 模型选择 | 原因 |
|------|---------|------|
| 意图分类 | Claude Haiku / GPT-4o-mini | 快速、低成本 |
| 需求结构化 | Claude Sonnet | 平衡速度和质量 |
| 代码生成 | Claude Opus / GPT-4o | 最高代码质量 |
| 代码Review | Claude Sonnet | 检查安全性和正确性 |

**成本优化**：90%的请求用轻量模型处理，仅核心代码生成使用旗舰模型。预估每个应用生成的AI成本 < $0.50。

---

## 5. 代码生成引擎

### 5.1 生成策略

采用 **模板 + AI 混合生成** 策略：

```
┌─────────────────────────────────────────┐
│              生成策略选择                 │
│                                         │
│  需求 ──→ 是否有完全匹配的模板？          │
│           │                             │
│           ├── 是 → 模板实例化（最快）      │
│           │                             │
│           ├── 部分匹配 → 模板 + AI补全    │
│           │                             │
│           └── 无匹配 → 纯AI生成          │
│                                         │
│  所有结果 → 代码优化器 → 安全检查 → 输出   │
└─────────────────────────────────────────┘
```

### 5.2 代码片段结构

```typescript
interface CodeFragment {
  pluginId: string;
  files: GeneratedFile[];
  dependencies: PackageDependency[];  // npm packages
  styles: StyleDefinition[];
  tests: TestFile[];
}

interface GeneratedFile {
  path: string;           // "src/components/LoginForm.tsx"
  content: string;        // 文件内容
  language: string;       // "typescript"
  hash: string;           // 内容哈希（用于增量更新）
}
```

### 5.3 应用组装流程

```
1. 收集所有插件的 CodeFragment
2. 解析依赖关系，确定文件组织结构
3. 生成入口文件（App.tsx, main.tsx）
4. 生成路由配置
5. 生成全局状态管理
6. 生成 package.json（合并所有依赖）
7. 注入样式（Tailwind配置 + 自定义样式）
8. 运行代码优化器（去重、格式化、Tree-shaking）
9. 输出完整项目
```

---

## 6. 预览沙箱引擎

### 6.1 沙箱架构

```
┌──────────────────────────┐
│      主应用 (Host)        │
│  ┌────────────────────┐  │
│  │  Preview Manager   │  │
│  │  - 状态管理        │  │
│  │  - 消息代理        │  │
│  │  - 错误处理        │  │
│  └────────┬───────────┘  │
│           │ postMessage   │
│  ┌────────▼───────────┐  │
│  │  iframe Sandbox     │  │
│  │  ┌──────────────┐  │  │
│  │  │ 生成的应用    │  │  │
│  │  │ (独立运行时)  │  │  │
│  │  └──────────────┘  │  │
│  │  sandbox="allow-   │  │
│  │  scripts"          │  │
│  └────────────────────┘  │
└──────────────────────────┘
```

**安全措施**：
- iframe sandbox属性限制权限
- CSP（Content Security Policy）防止恶意代码
- 通信仅通过postMessage，禁止直接DOM访问
- 生成代码在发送到沙箱前经过安全扫描

### 6.2 热模块替换 (HMR)

用户修改需求时，不重新生成整个应用，仅更新变化的模块：

```
用户："把列表改成卡片样式"
  → 仅重新生成 UI 插件的列表组件
  → 通过 postMessage 发送新的组件代码到沙箱
  → 沙箱内替换对应模块
  → 保持应用状态不丢失
```

---

## 7. 数据流设计

### 7.1 端到端数据流

```
用户语音/文字输入
    │
    ▼
[前端] 语音识别 / 文字处理
    │
    ▼ WebSocket
[API网关] 认证、限流、路由
    │
    ▼
[AI理解引擎] 意图识别 → 需求结构化
    │
    ▼ RequirementSpec
[微内核调度器] 插件匹配 → 依赖解析 → 组合方案
    │
    ├─→ [缓存] 检查是否有相似应用的缓存
    │
    ▼
[代码生成引擎] 模板/AI生成 → 代码优化 → 安全检查
    │
    ▼ GeneratedApp
[预览沙箱] 编译 → 渲染 → 返回预览URL
    │
    ▼ WebSocket (实时推送)
[前端] 展示预览 → 等待用户反馈
    │
    ▼ 用户确认满意
[部署引擎] 打包 → 优化 → 部署到目标平台
    │
    ▼
部署完成，返回访问URL
```

### 7.2 状态管理

```typescript
// 全局应用状态
interface AppState {
  // 会话状态
  session: {
    id: string;
    userId: string;
    conversationHistory: Message[];
    currentRequirementSpec: RequirementSpec | null;
  };

  // 生成状态
  generation: {
    status: 'idle' | 'understanding' | 'generating' | 'previewing' | 'deploying';
    progress: number;  // 0-100
    activePlugins: string[];
    generatedCode: CodeFragment[];
    errors: GenerationError[];
  };

  // 预览状态
  preview: {
    url: string | null;
    isReady: boolean;
    version: number;
    snapshots: StateSnapshot[];  // 支持撤销
  };

  // 项目状态
  project: {
    id: string;
    name: string;
    versions: ProjectVersion[];
    deployments: Deployment[];
  };
}
```

---

## 8. API 设计

### 8.1 核心API端点

```
POST   /api/v1/session              # 创建新会话
POST   /api/v1/session/:id/message  # 发送消息（文字/语音）
GET    /api/v1/session/:id/status   # 查询生成状态
WS     /api/v1/session/:id/stream   # WebSocket实时推送

GET    /api/v1/project              # 列出用户项目
POST   /api/v1/project              # 创建项目
GET    /api/v1/project/:id          # 获取项目详情
PUT    /api/v1/project/:id          # 更新项目
DELETE /api/v1/project/:id          # 删除项目
POST   /api/v1/project/:id/deploy   # 部署项目
GET    /api/v1/project/:id/export   # 导出源代码

GET    /api/v1/plugins              # 列出可用插件
GET    /api/v1/plugins/:id          # 插件详情
POST   /api/v1/plugins/search       # 搜索插件

GET    /api/v1/templates            # 列出模板
GET    /api/v1/templates/:id        # 模板详情
POST   /api/v1/templates/:id/use    # 使用模板创建项目
```

### 8.2 WebSocket 消息协议

```typescript
// 客户端 → 服务端
interface ClientMessage {
  type: 'text_input' | 'voice_data' | 'confirm' | 'undo' | 'deploy';
  payload: any;
  sessionId: string;
}

// 服务端 → 客户端
interface ServerMessage {
  type: 'understanding' | 'clarification' | 'generating' | 'progress'
      | 'preview_ready' | 'error' | 'deploy_status';
  payload: any;
  sessionId: string;
  timestamp: number;
}
```

---

## 9. 安全设计

### 9.1 安全威胁与对策

| 威胁 | 风险等级 | 对策 |
|------|---------|------|
| AI生成恶意代码 | 高 | 代码安全扫描 + 沙箱隔离 + CSP |
| 用户注入攻击 | 高 | 输入sanitize + Prompt注入防护 |
| 数据泄露 | 高 | 端到端加密 + 最小权限原则 |
| DDoS攻击 | 中 | Cloudflare防护 + 请求限流 |
| 插件恶意行为 | 中 | 插件审核 + 权限沙箱 + 签名验证 |
| AI成本攻击 | 中 | 用户配额 + 异常检测 |

### 9.2 生成代码安全检查

```
生成的代码必须通过以下检查：
1. 无 eval() / Function() 动态代码执行
2. 无直接 DOM innerHTML 注入
3. 无硬编码密钥/密码
4. SQL参数化查询（如涉及数据库）
5. XSS防护（输出转义）
6. CSRF Token（如涉及表单）
7. 依赖包无已知漏洞（npm audit）
```

---

## 10. 性能设计

### 10.1 性能目标

| 指标 | 目标值 | 策略 |
|------|-------|------|
| 首次预览时间 | < 30秒 | 模板缓存 + 并行生成 + 流式输出 |
| 增量更新时间 | < 5秒 | 仅重新生成变化的模块 |
| 语音识别延迟 | < 500ms | 使用Web Speech API本地识别 |
| API响应时间(P99) | < 200ms | Edge Functions + 全球CDN |
| 前端首屏加载 | < 2秒 | 代码分割 + 预加载 + Service Worker |

### 10.2 性能瓶颈分析

**瓶颈1：LLM调用延迟**
- 问题：LLM生成代码通常需要5-15秒
- 对策：流式输出（Server-Sent Events），让用户看到生成过程；并行调用多个轻量模型预处理

**瓶颈2：应用编译时间**
- 问题：生成的React应用需要编译才能预览
- 对策：使用ESBuild进行浏览器端编译（< 1秒）；或使用预编译的组件库避免运行时编译

**瓶颈3：大型应用状态管理**
- 问题：随着功能增加，应用状态变复杂
- 对策：模块化状态（每个插件管理自己的状态切片）；状态快照支持时间旅行调试

---

## 11. 可扩展性设计

### 11.1 水平扩展

```
                    ┌─── AI Worker 1 (代码生成)
用户 → API网关 ──── ├─── AI Worker 2 (代码生成)
                    ├─── AI Worker 3 (代码生成)
                    └─── Preview Worker (沙箱)
```

- API网关：Cloudflare Workers（自动扩展）
- AI Worker：Serverless Functions（按需扩展，支持并发）
- Preview：每个用户会话一个隔离沙箱
- 数据库：Supabase（PgBouncer连接池）

### 11.2 插件SDK设计（v2.0）

```typescript
// 第三方开发者创建插件
import { definePlugin } from '@microkernel-ai/sdk';

export default definePlugin({
  id: 'community.weather-widget',
  name: '天气组件',
  version: '1.0.0',
  category: 'ui',
  capabilities: ['天气', '天气预报', '气象'],

  configSchema: {
    city: { type: 'string', required: true },
    unit: { type: 'string', enum: ['celsius', 'fahrenheit'], default: 'celsius' },
  },

  async generateCode(context) {
    return {
      files: [{
        path: 'src/components/WeatherWidget.tsx',
        content: `// 天气组件代码...`,
        language: 'typescript',
      }],
      dependencies: [{ name: 'axios', version: '^1.0.0' }],
    };
  },
});
```

---

## 12. 技术栈总览

| 层 | 技术 | 部署环境 |
|----|------|---------|
| Web前端 | React 19 + TypeScript + Vite + Tailwind CSS | Cloudflare Pages |
| 移动端 | React Native + Expo | App Store / Google Play |
| 桌面端 | Tauri 2.0 | 各平台安装包 |
| API网关 | Cloudflare Workers / Hono | Cloudflare |
| AI引擎 | Claude API (Anthropic) + OpenAI API | 云端API |
| 数据库 | Supabase (PostgreSQL) | Supabase Cloud |
| 实时通信 | WebSocket (Cloudflare Durable Objects) | Cloudflare |
| 文件存储 | Cloudflare R2 | Cloudflare |
| 认证 | Supabase Auth | Supabase |
| 监控 | Sentry + Posthog | 云端SaaS |
| CI/CD | GitHub Actions | GitHub |
| 包管理 | pnpm + Turborepo (Monorepo) | - |

---

## 13. 开发环境与Monorepo结构

```
micro-kernel-ai/
├── apps/
│   ├── web/                 # Web PWA 前端
│   ├── mobile/              # React Native 移动端
│   └── desktop/             # Tauri 桌面端
├── packages/
│   ├── kernel/              # 微内核核心
│   ├── ai-engine/           # AI理解 & 代码生成引擎
│   ├── plugin-sdk/          # 插件开发SDK
│   ├── plugin-registry/     # 内置插件集合
│   ├── preview-sandbox/     # 预览沙箱
│   ├── ui-components/       # 共享UI组件库
│   └── shared/              # 共享类型定义、工具函数
├── services/
│   ├── api-gateway/         # API网关 (Cloudflare Workers)
│   ├── code-gen-worker/     # 代码生成Worker
│   └── deploy-worker/       # 部署Worker
├── plugins/
│   ├── ui/                  # UI类插件
│   ├── data/                # 数据类插件
│   ├── logic/               # 逻辑类插件
│   ├── deploy/              # 部署类插件
│   └── integration/         # 集成类插件
├── docs/                    # 文档
├── turbo.json               # Turborepo 配置
├── pnpm-workspace.yaml      # pnpm workspace
└── package.json
```
