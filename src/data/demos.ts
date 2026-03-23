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
  /** Multi-round follow-up conversations */
  followUps?: {
    userMessage: string
    aiResponse: string
    features?: { name: string; checked: boolean }[]
  }[]
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
      '分析需求...',
      '设计数据结构...',
      '生成页面布局...',
      '添加交互逻辑...',
      '优化性能...',
      '完成！',
    ],
    followUps: [
      {
        userMessage: '能不能加一个扫描发票自动记账的功能？',
        aiResponse: '好的，已为你添加发票扫描功能！现在支持拍照识别发票金额和类别，自动填入记录。',
        features: [
          { name: '拍照扫描发票', checked: true },
          { name: 'OCR金额自动识别', checked: true },
          { name: '智能分类匹配', checked: true },
        ],
      },
      {
        userMessage: '再加个家庭共享账本，让我和老婆一起记账',
        aiResponse: '已添加家庭共享功能！你和家人可以共用一个账本，各自记录，实时同步。',
      },
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
      '分析需求...',
      '设计数据结构...',
      '生成页面布局...',
      '添加交互逻辑...',
      '优化性能...',
      '完成！',
    ],
    followUps: [
      {
        userMessage: '加一个看板视图，像Trello那种拖拽的',
        aiResponse: '已添加看板视图！现在你可以在列表和看板之间切换，支持拖拽移动任务卡片。',
      },
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
      '分析需求...',
      '设计数据结构...',
      '生成页面布局...',
      '添加交互逻辑...',
      '优化性能...',
      '完成！',
    ],
    followUps: [
      {
        userMessage: '能加一个销售业绩排行榜吗？',
        aiResponse: '已添加销售排行榜功能！可以查看团队成员的月度/季度业绩排名，支持多维度筛选。',
      },
    ],
  },
  {
    id: 'fitness',
    name: '健身打卡',
    icon: 'dumbbell',
    description: '运动记录与健身追踪',
    userMessages: [
      '帮我做一个健身记录App，能记录每天的运动，看到进步曲线',
    ],
    aiResponses: [
      '收到！我来为你打造一个专业的健身记录应用，包含以下核心功能：',
    ],
    features: [
      { name: '每日运动记录（类型/时长/卡路里）', checked: true },
      { name: '运动日历打卡', checked: true },
      { name: '体重/体脂趋势图', checked: true },
      { name: '训练计划管理', checked: true },
      { name: '个人运动数据统计', checked: true },
      { name: '运动成就徽章', checked: true },
    ],
    previewType: 'fitness',
    generationSteps: [
      '分析需求...',
      '设计数据结构...',
      '生成页面布局...',
      '添加交互逻辑...',
      '生成运动图表组件...',
      '优化性能...',
      '完成！',
    ],
    followUps: [
      {
        userMessage: '能加一个训练计划模板吗？比如减脂、增肌计划',
        aiResponse: '已添加训练计划模板库！包含减脂、增肌、力量提升等预设计划，你也可以自定义训练计划。',
        features: [
          { name: '减脂训练计划', checked: true },
          { name: '增肌训练计划', checked: true },
          { name: '自定义计划创建', checked: true },
        ],
      },
      {
        userMessage: '再加个饮食记录，能算每天摄入热量',
        aiResponse: '好的，已添加饮食记录模块！支持搜索食物数据库，自动计算热量和营养素摄入。',
      },
      {
        userMessage: '加个暗色模式吧，晚上健身房用手机太亮了',
        aiResponse: '已切换到暗色模式！界面更柔和，适合在昏暗环境下使用。你可以随时在设置中切换主题。',
      },
    ],
  },
  {
    id: 'recipe',
    name: '家庭菜谱',
    icon: 'chef-hat',
    description: '菜谱管理与食材搜索',
    userMessages: [
      '做一个家庭菜谱应用，能保存菜谱，按食材搜索',
    ],
    aiResponses: [
      '好呀！我来帮你创建一个家庭菜谱应用，功能规划如下：',
    ],
    features: [
      { name: '菜谱卡片列表', checked: true },
      { name: '按食材/菜系搜索', checked: true },
      { name: '详细步骤展示（图文）', checked: true },
      { name: '食材清单与用量', checked: true },
      { name: '收藏与分类管理', checked: true },
      { name: '烹饪计时器', checked: true },
    ],
    previewType: 'recipe',
    generationSteps: [
      '分析需求...',
      '设计数据结构...',
      '生成页面布局...',
      '添加交互逻辑...',
      '生成菜谱卡片组件...',
      '优化性能...',
      '完成！',
    ],
    followUps: [
      {
        userMessage: '能根据冰箱里有的食材推荐菜谱吗？',
        aiResponse: '已添加智能推荐功能！输入你手边的食材，系统会匹配可以做的菜谱，优先推荐食材匹配度高的。',
        features: [
          { name: '食材匹配推荐', checked: true },
          { name: '缺少食材提示', checked: true },
          { name: '一键生成购物清单', checked: true },
        ],
      },
      {
        userMessage: '加个营养成分分析，让我知道每道菜的热量',
        aiResponse: '好的！已添加营养分析模块，每道菜谱会自动计算热量、蛋白质、碳水和脂肪含量。',
      },
      {
        userMessage: '能加个分享功能吗？想把菜谱分享给朋友',
        aiResponse: '已添加分享功能！你可以生成精美的菜谱卡片图片，一键分享到微信、朋友圈等社交平台。',
      },
    ],
  },
  {
    id: 'pet',
    name: '宠物管家',
    icon: 'heart',
    description: '宠物健康与生活管理',
    userMessages: [
      '帮我做一个宠物管理App，记录宠物的喂食、疫苗、体重，还能存萌照',
    ],
    aiResponses: [
      '太棒了！我来为你的毛孩子打造一个贴心的宠物管家应用：',
    ],
    features: [
      { name: '宠物档案卡（品种/年龄/照片）', checked: true },
      { name: '喂食记录与提醒', checked: true },
      { name: '疫苗接种时间线', checked: true },
      { name: '体重变化追踪', checked: true },
      { name: '萌宠相册', checked: true },
      { name: '日常护理提醒', checked: true },
    ],
    previewType: 'pet',
    generationSteps: [
      '分析需求...',
      '设计数据结构...',
      '生成页面布局...',
      '添加交互逻辑...',
      '生成宠物档案组件...',
      '优化性能...',
      '完成！',
    ],
    followUps: [
      {
        userMessage: '能加一个附近宠物医院和宠物店的地图吗？',
        aiResponse: '已添加周边服务地图！可以查看附近的宠物医院、宠物店、宠物公园，支持导航和电话联系。',
        features: [
          { name: '附近宠物医院', checked: true },
          { name: '宠物店搜索', checked: true },
          { name: '一键导航', checked: true },
        ],
      },
      {
        userMessage: '加个宠物社区，我想跟其他铲屎官交流',
        aiResponse: '已添加宠物社区功能！你可以分享萌照、交流养宠经验，还能参加同城宠物聚会活动。',
      },
    ],
  },
  {
    id: 'travel',
    name: '旅行日记',
    icon: 'map',
    description: '旅行足迹与开销记录',
    userMessages: [
      '想做一个旅行日记App，记录每次旅行的足迹、照片和开销',
    ],
    aiResponses: [
      '好主意！我来为你打造一个精美的旅行日记应用：',
    ],
    features: [
      { name: '旅行足迹地图', checked: true },
      { name: '照片时间线', checked: true },
      { name: '旅行开销统计', checked: true },
      { name: '行程规划', checked: true },
      { name: '旅行日记编辑', checked: true },
      { name: '旅行数据统计（去过的城市/国家）', checked: true },
    ],
    previewType: 'travel',
    generationSteps: [
      '分析需求...',
      '设计数据结构...',
      '生成页面布局...',
      '生成地图足迹组件...',
      '添加交互逻辑...',
      '优化性能...',
      '完成！',
    ],
    followUps: [
      {
        userMessage: '能自动识别照片的拍摄地点吗？',
        aiResponse: '已添加照片地理信息识别！上传照片后自动读取GPS信息，在地图上标记拍摄地点，生成旅行路线。',
        features: [
          { name: '照片GPS识别', checked: true },
          { name: '自动生成路线', checked: true },
          { name: '地点聚合展示', checked: true },
        ],
      },
      {
        userMessage: '加一个旅行预算规划，出发前就能算好要花多少钱',
        aiResponse: '已添加旅行预算规划！可以按交通、住宿、餐饮、门票等类目预估开销，旅途中实时对比预算和实际花费。',
      },
      {
        userMessage: '加个分享功能，想把游记分享给朋友看',
        aiResponse: '已添加游记分享！你可以把旅行日记生成精美的图文游记，一键分享到社交平台。',
      },
    ],
  },
  {
    id: 'reading',
    name: '读书笔记',
    icon: 'book-open',
    description: '阅读记录与笔记管理',
    userMessages: [
      '帮我做一个读书笔记App，记录读书进度、摘录好句子、写感想',
    ],
    aiResponses: [
      '很棒的想法！我来为你创建一个优雅的读书笔记应用：',
    ],
    features: [
      { name: '个人书架管理', checked: true },
      { name: '阅读进度追踪', checked: true },
      { name: '金句摘录收藏', checked: true },
      { name: '读书感想笔记', checked: true },
      { name: '阅读统计（本月/全年）', checked: true },
      { name: '书单推荐', checked: true },
    ],
    previewType: 'reading',
    generationSteps: [
      '分析需求...',
      '设计数据结构...',
      '生成页面布局...',
      '生成书架组件...',
      '添加交互逻辑...',
      '优化性能...',
      '完成！',
    ],
    followUps: [
      {
        userMessage: '能扫描ISBN自动获取书籍信息吗？',
        aiResponse: '已添加ISBN扫描功能！扫描条形码即可自动填入书名、作者、封面等信息，省去手动输入。',
        features: [
          { name: 'ISBN条形码扫描', checked: true },
          { name: '自动获取书籍信息', checked: true },
          { name: '封面自动加载', checked: true },
        ],
      },
      {
        userMessage: '加个阅读挑战，比如今年要读50本书',
        aiResponse: '已添加阅读挑战功能！你可以设定年度读书目标，系统会追踪进度，每完成一本书都有成就动画。',
      },
      {
        userMessage: '加个暗色模式，晚上看书记笔记方便',
        aiResponse: '已切换到暗色模式！深色背景保护视力，文字对比度优化，适合夜间使用。',
      },
    ],
  },
]
