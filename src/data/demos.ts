export interface DemoScenario {
  id: string
  name: string
  icon: string
  description: string
  userMessages: string[]
  aiResponses: string[]
  features: { name: string; checked: boolean }[]
  previewType: string
  generationSteps: string[]
}

export const demoScenarios: DemoScenario[] = [
  {
    id: 'finance',
    name: '记账App',
    icon: 'wallet',
    description: '个人收支管理应用',
    userMessages: [
      '我想要一个记账App，能记录每天的收入支出，月底给我出报表',
    ],
    aiResponses: [
      '我理解你需要一个个人记账应用，包含以下功能：',
    ],
    features: [
      { name: '收入/支出快速记录', checked: true },
      { name: '自动分类（餐饮/交通/娱乐等）', checked: true },
      { name: '月度收支报表', checked: true },
      { name: '数据可视化图表（饼图/趋势图）', checked: true },
      { name: '预算提醒功能', checked: true },
    ],
    previewType: 'finance',
    generationSteps: [
      '解析需求结构',
      '设计数据模型',
      '生成页面组件',
      '添加交互逻辑',
      '优化和检查',
    ],
  },
  {
    id: 'todo',
    name: '待办App',
    icon: 'check-square',
    description: '团队任务管理应用',
    userMessages: [
      '帮我做一个团队待办清单，支持任务分配、优先级和进度追踪',
    ],
    aiResponses: [
      '好的，我来帮你创建一个团队待办管理应用：',
    ],
    features: [
      { name: '任务创建与编辑', checked: true },
      { name: '优先级标记（高/中/低）', checked: true },
      { name: '任务分配给成员', checked: true },
      { name: '进度追踪（待办/进行中/已完成）', checked: true },
      { name: '截止日期提醒', checked: true },
    ],
    previewType: 'todo',
    generationSteps: [
      '解析需求结构',
      '设计任务数据模型',
      '生成任务列表组件',
      '添加拖拽排序逻辑',
      '优化和检查',
    ],
  },
  {
    id: 'crm',
    name: '客户管理',
    icon: 'users',
    description: '客户关系管理系统',
    userMessages: [
      '我需要一个客户管理系统，记录客户信息、跟进记录和销售数据',
    ],
    aiResponses: [
      '明白了，我帮你创建一个CRM客户管理系统：',
    ],
    features: [
      { name: '客户信息录入与管理', checked: true },
      { name: '跟进记录时间线', checked: true },
      { name: '销售漏斗可视化', checked: true },
      { name: '客户标签与分类', checked: true },
      { name: '数据导出功能', checked: true },
    ],
    previewType: 'crm',
    generationSteps: [
      '解析需求结构',
      '设计客户数据模型',
      '生成管理面板组件',
      '添加数据统计逻辑',
      '优化和检查',
    ],
  },
]
