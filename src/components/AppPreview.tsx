import { motion } from 'framer-motion'
import {
  Plus, ArrowUpRight, ArrowDownRight,
  CheckSquare, Clock, AlertCircle, Users, BarChart3,
  Home, User, Search,
  Dumbbell, Flame, TrendingUp, Trophy, Calendar,
  ChefHat, Heart, Star, Timer,
  Camera, MapPin, Bell,
  Plane, DollarSign, Image,
  BookOpen, Bookmark, Quote, Target,
  Share2, Moon, Sun,
  Wifi, Battery, Signal,
} from 'lucide-react'
import { useStore } from '../store/useStore'

/* ============ Shared Phone Chrome ============ */
function StatusBar({ dark = true }: { dark?: boolean }) {
  const textColor = dark ? 'text-white' : 'text-gray-800'
  return (
    <div className={`flex items-center justify-between px-4 py-1 text-[10px] ${textColor}`}>
      <span className="font-medium">9:41</span>
      <div className="flex items-center gap-1">
        <Signal className="w-3 h-3" />
        <Wifi className="w-3 h-3" />
        <Battery className="w-3.5 h-3.5" />
      </div>
    </div>
  )
}

function BottomTabBar({ tabs, activeTab = 0, dark = true }: {
  tabs: { icon: React.ComponentType<any>; label: string }[]
  activeTab?: number
  dark?: boolean
}) {
  const bgColor = dark ? 'bg-[#0a0f1e]/90 border-white/10' : 'bg-white/90 border-gray-200'
  return (
    <div className={`flex items-center justify-around py-1.5 border-t ${bgColor} backdrop-blur-sm`}>
      {tabs.map((tab, i) => {
        const Icon = tab.icon
        const isActive = i === activeTab
        return (
          <div key={tab.label} className="flex flex-col items-center gap-0.5">
            <Icon className={`w-4 h-4 ${isActive ? 'text-primary-light' : dark ? 'text-gray-500' : 'text-gray-400'}`} />
            <span className={`text-[9px] ${isActive ? 'text-primary-light' : dark ? 'text-gray-500' : 'text-gray-400'}`}>
              {tab.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

/* ============ Finance Preview ============ */
function FinancePreview() {
  const darkMode = useStore((s) => s.previewDarkMode)
  const bg = darkMode ? 'bg-[#0c1222] text-white' : 'bg-gray-50 text-gray-900'
  const cardBg = darkMode ? 'bg-white/5' : 'bg-white shadow-sm'
  const subText = darkMode ? 'text-gray-400' : 'text-gray-500'

  return (
    <div className={`h-full flex flex-col ${bg}`}>
      <StatusBar dark={darkMode} />
      <div className="px-3 py-2 flex items-center justify-between">
        <span className="text-sm font-semibold">记账助手</span>
        <div className="flex items-center gap-2">
          <Search className={`w-4 h-4 ${subText}`} />
          <Bell className={`w-4 h-4 ${subText}`} />
        </div>
      </div>
      <div className="flex-1 overflow-auto px-3 pb-1">
        <div className={`text-center mb-3 ${cardBg} rounded-xl p-3`}>
          <div className={`text-[10px] ${subText} mb-0.5`}>2026年3月</div>
          <div className="text-xl font-bold">-3,280.50</div>
          <div className="flex justify-center gap-4 mt-1.5 text-[10px]">
            <span className="flex items-center gap-1 text-green-400">
              <ArrowUpRight className="w-3 h-3" /> 收入 8,000
            </span>
            <span className="flex items-center gap-1 text-red-400">
              <ArrowDownRight className="w-3 h-3" /> 支出 11,280
            </span>
          </div>
        </div>

        <div className="flex justify-center gap-1 mb-3">
          {[40, 25, 20, 15].map((v, i) => (
            <div
              key={i}
              className="rounded-sm"
              style={{
                width: `${v}%`,
                height: 6,
                backgroundColor: ['#f97316', '#3b82f6', '#a855f7', '#10b981'][i],
              }}
            />
          ))}
        </div>

        <div className="space-y-1.5">
          {[
            { label: '午餐 - 麦当劳', cat: '餐饮', amount: '-45.00', icon: '🍔', color: 'text-red-400' },
            { label: '地铁充值', cat: '交通', amount: '-200.00', icon: '🚇', color: 'text-red-400' },
            { label: '工资', cat: '收入', amount: '+8,000.00', icon: '💰', color: 'text-green-400' },
            { label: '电费', cat: '生活', amount: '-156.80', icon: '💡', color: 'text-red-400' },
            { label: '超市购物', cat: '购物', amount: '-328.50', icon: '🛒', color: 'text-red-400' },
          ].map((item) => (
            <div
              key={item.label}
              className={`flex items-center justify-between ${cardBg} rounded-lg px-2.5 py-2`}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">{item.icon}</span>
                <div>
                  <div className="text-[11px] font-medium">{item.label}</div>
                  <div className={`text-[9px] ${subText}`}>{item.cat}</div>
                </div>
              </div>
              <span className={`text-[11px] font-medium ${item.color}`}>{item.amount}</span>
            </div>
          ))}
        </div>

        <button className="mt-2 w-full py-2 bg-primary rounded-lg text-xs font-medium flex items-center justify-center gap-1 border-0 text-white cursor-pointer">
          <Plus className="w-3.5 h-3.5" /> 记一笔
        </button>
      </div>
      <BottomTabBar
        dark={darkMode}
        tabs={[
          { icon: Home, label: '首页' },
          { icon: BarChart3, label: '报表' },
          { icon: Plus, label: '记账' },
          { icon: Calendar, label: '账单' },
          { icon: User, label: '我的' },
        ]}
      />
    </div>
  )
}

/* ============ Todo Preview ============ */
function TodoPreview() {
  const darkMode = useStore((s) => s.previewDarkMode)
  const bg = darkMode ? 'bg-[#0c1222] text-white' : 'bg-gray-50 text-gray-900'
  const cardBg = darkMode ? 'bg-white/5' : 'bg-white shadow-sm'
  const subText = darkMode ? 'text-gray-400' : 'text-gray-500'

  return (
    <div className={`h-full flex flex-col ${bg}`}>
      <StatusBar dark={darkMode} />
      <div className="px-3 py-2 flex items-center justify-between">
        <span className="text-sm font-semibold">团队任务</span>
        <div className="flex items-center gap-1 text-[10px]">
          <Clock className={`w-3 h-3 ${subText}`} />
          <span className={subText}>今天</span>
        </div>
      </div>
      <div className="flex-1 overflow-auto px-3 pb-1">
        <div className="flex gap-1.5 mb-3 text-[10px]">
          {[
            { label: '待办', count: 3, color: 'bg-yellow-500/20 text-yellow-400' },
            { label: '进行中', count: 2, color: 'bg-blue-500/20 text-blue-400' },
            { label: '已完成', count: 5, color: 'bg-green-500/20 text-green-400' },
          ].map((s) => (
            <div key={s.label} className={`px-2 py-1 rounded-md ${s.color}`}>
              {s.label} ({s.count})
            </div>
          ))}
        </div>

        <div className="space-y-1.5">
          {[
            { title: '设计登录页面', priority: '高', assignee: 'Alice', color: 'border-red-500' },
            { title: '编写API文档', priority: '中', assignee: 'Bob', color: 'border-yellow-500' },
            { title: '修复支付Bug', priority: '高', assignee: 'Charlie', color: 'border-red-500' },
            { title: '用户反馈整理', priority: '低', assignee: 'Diana', color: 'border-green-500' },
            { title: '数据库优化', priority: '中', assignee: 'Eve', color: 'border-yellow-500' },
          ].map((task) => (
            <div
              key={task.title}
              className={`${cardBg} rounded-lg px-2.5 py-2 border-l-2 ${task.color}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-1.5">
                  <CheckSquare className={`w-3 h-3 ${subText} mt-0.5 shrink-0`} />
                  <div>
                    <div className="text-[11px] font-medium">{task.title}</div>
                    <div className={`text-[9px] ${subText} mt-0.5`}>
                      {task.assignee} · 优先级: {task.priority}
                    </div>
                  </div>
                </div>
                {task.priority === '高' && <AlertCircle className="w-3 h-3 text-red-400 shrink-0" />}
              </div>
            </div>
          ))}
        </div>

        <button className="mt-2 w-full py-2 bg-primary rounded-lg text-xs font-medium flex items-center justify-center gap-1 border-0 text-white cursor-pointer">
          <Plus className="w-3.5 h-3.5" /> 新建任务
        </button>
      </div>
      <BottomTabBar
        dark={darkMode}
        tabs={[
          { icon: Home, label: '任务' },
          { icon: Users, label: '团队' },
          { icon: Calendar, label: '日历' },
          { icon: User, label: '我的' },
        ]}
      />
    </div>
  )
}

/* ============ CRM Preview ============ */
function CRMPreview() {
  const darkMode = useStore((s) => s.previewDarkMode)
  const bg = darkMode ? 'bg-[#0c1222] text-white' : 'bg-gray-50 text-gray-900'
  const cardBg = darkMode ? 'bg-white/5' : 'bg-white shadow-sm'
  const subText = darkMode ? 'text-gray-400' : 'text-gray-500'

  return (
    <div className={`h-full flex flex-col ${bg}`}>
      <StatusBar dark={darkMode} />
      <div className="px-3 py-2 flex items-center justify-between">
        <span className="text-sm font-semibold">客户管理</span>
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-primary-light" />
          <Users className={`w-4 h-4 ${subText}`} />
        </div>
      </div>
      <div className="flex-1 overflow-auto px-3 pb-1">
        <div className="grid grid-cols-2 gap-1.5 mb-3">
          {[
            { label: '总客户', value: '128', trend: '+12%', color: 'text-green-400' },
            { label: '本月新增', value: '23', trend: '+8%', color: 'text-green-400' },
            { label: '成交额', value: '¥48万', trend: '+15%', color: 'text-green-400' },
            { label: '转化率', value: '32%', trend: '-2%', color: 'text-red-400' },
          ].map((stat) => (
            <div key={stat.label} className={`${cardBg} rounded-lg p-2`}>
              <div className={`text-[9px] ${subText}`}>{stat.label}</div>
              <div className="text-sm font-bold">{stat.value}</div>
              <div className={`text-[9px] ${stat.color}`}>{stat.trend}</div>
            </div>
          ))}
        </div>

        <div className={`text-[10px] font-medium mb-1.5 ${subText}`}>最近客户</div>
        <div className="space-y-1.5">
          {[
            { name: '张先生', company: '科技有限公司', status: '意向客户' },
            { name: '李总', company: '餐饮集团', status: '已成交' },
            { name: '王女士', company: '教育机构', status: '跟进中' },
            { name: '赵经理', company: '零售连锁', status: '意向客户' },
          ].map((client) => (
            <div key={client.name} className={`${cardBg} rounded-lg px-2.5 py-2 flex items-center justify-between`}>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[9px] font-medium text-primary-light">
                  {client.name[0]}
                </div>
                <div>
                  <div className="text-[11px] font-medium">{client.name}</div>
                  <div className={`text-[9px] ${subText}`}>{client.company}</div>
                </div>
              </div>
              <span className={`text-[9px] px-1.5 py-0.5 rounded ${
                client.status === '已成交' ? 'bg-green-500/20 text-green-400' :
                client.status === '跟进中' ? 'bg-blue-500/20 text-blue-400' :
                'bg-yellow-500/20 text-yellow-400'
              }`}>
                {client.status}
              </span>
            </div>
          ))}
        </div>

        <button className="mt-2 w-full py-2 bg-primary rounded-lg text-xs font-medium flex items-center justify-center gap-1 border-0 text-white cursor-pointer">
          <Plus className="w-3.5 h-3.5" /> 添加客户
        </button>
      </div>
      <BottomTabBar
        dark={darkMode}
        tabs={[
          { icon: Home, label: '概览' },
          { icon: Users, label: '客户' },
          { icon: BarChart3, label: '报表' },
          { icon: User, label: '我的' },
        ]}
      />
    </div>
  )
}

/* ============ Fitness Preview ============ */
function FitnessPreview() {
  const darkMode = useStore((s) => s.previewDarkMode)
  const bg = darkMode ? 'bg-[#0c1222] text-white' : 'bg-gray-50 text-gray-900'
  const cardBg = darkMode ? 'bg-white/5' : 'bg-white shadow-sm'
  const subText = darkMode ? 'text-gray-400' : 'text-gray-500'

  const weekDays = ['一', '二', '三', '四', '五', '六', '日']
  const checkedDays = [true, true, false, true, true, false, false]

  return (
    <div className={`h-full flex flex-col ${bg}`}>
      <StatusBar dark={darkMode} />
      <div className="px-3 py-2 flex items-center justify-between">
        <span className="text-sm font-semibold">健身打卡</span>
        <Trophy className="w-4 h-4 text-yellow-400" />
      </div>
      <div className="flex-1 overflow-auto px-3 pb-1">
        {/* Weekly calendar */}
        <div className={`${cardBg} rounded-xl p-2.5 mb-2.5`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-medium">本周打卡</span>
            <span className="text-[10px] text-primary-light">4/7天</span>
          </div>
          <div className="flex justify-between">
            {weekDays.map((d, i) => (
              <div key={d} className="flex flex-col items-center gap-1">
                <span className={`text-[9px] ${subText}`}>{d}</span>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] ${
                  checkedDays[i]
                    ? 'bg-green-500 text-white'
                    : darkMode ? 'bg-white/10 text-gray-500' : 'bg-gray-200 text-gray-400'
                }`}>
                  {checkedDays[i] ? '✓' : ''}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-1.5 mb-2.5">
          {[
            { icon: Flame, label: '卡路里', value: '486', unit: 'kcal', color: 'text-orange-400' },
            { icon: Clock, label: '时长', value: '45', unit: 'min', color: 'text-blue-400' },
            { icon: TrendingUp, label: '连续', value: '12', unit: '天', color: 'text-green-400' },
          ].map((stat) => (
            <div key={stat.label} className={`${cardBg} rounded-lg p-2 text-center`}>
              <stat.icon className={`w-3.5 h-3.5 mx-auto mb-0.5 ${stat.color}`} />
              <div className="text-sm font-bold">{stat.value}</div>
              <div className={`text-[9px] ${subText}`}>{stat.unit}</div>
            </div>
          ))}
        </div>

        {/* Weight trend */}
        <div className={`${cardBg} rounded-xl p-2.5 mb-2.5`}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-medium">体重趋势</span>
            <span className={`text-[9px] ${subText}`}>近30天</span>
          </div>
          <div className="flex items-end gap-1 h-10">
            {[72, 71.8, 71.5, 72.1, 71.3, 71, 70.8, 70.5, 70.2, 70, 69.8, 69.5].map((v, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm bg-gradient-to-t from-primary to-purple-400"
                style={{ height: `${((v - 69) / 3.5) * 100}%`, minHeight: 2 }}
              />
            ))}
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-[9px] text-green-400">-2.5kg</span>
            <span className={`text-[9px] ${subText}`}>当前 69.5kg</span>
          </div>
        </div>

        {/* Today's exercises */}
        <div className={`text-[10px] font-medium mb-1.5 ${subText}`}>今日训练</div>
        <div className="space-y-1.5">
          {[
            { name: '跑步 5km', duration: '28分钟', cal: '320 kcal', icon: '🏃' },
            { name: '哑铃卧推 4组', duration: '12分钟', cal: '96 kcal', icon: '💪' },
            { name: '平板支撑', duration: '5分钟', cal: '70 kcal', icon: '🧘' },
          ].map((ex) => (
            <div key={ex.name} className={`${cardBg} rounded-lg px-2.5 py-2 flex items-center justify-between`}>
              <div className="flex items-center gap-2">
                <span className="text-sm">{ex.icon}</span>
                <div>
                  <div className="text-[11px] font-medium">{ex.name}</div>
                  <div className={`text-[9px] ${subText}`}>{ex.duration}</div>
                </div>
              </div>
              <span className="text-[10px] text-orange-400">{ex.cal}</span>
            </div>
          ))}
        </div>
      </div>
      <BottomTabBar
        dark={darkMode}
        tabs={[
          { icon: Home, label: '首页' },
          { icon: Dumbbell, label: '训练' },
          { icon: TrendingUp, label: '数据' },
          { icon: Trophy, label: '成就' },
          { icon: User, label: '我的' },
        ]}
      />
    </div>
  )
}

/* ============ Recipe Preview ============ */
function RecipePreview() {
  const darkMode = useStore((s) => s.previewDarkMode)
  const bg = darkMode ? 'bg-[#0c1222] text-white' : 'bg-gray-50 text-gray-900'
  const cardBg = darkMode ? 'bg-white/5' : 'bg-white shadow-sm'
  const subText = darkMode ? 'text-gray-400' : 'text-gray-500'

  return (
    <div className={`h-full flex flex-col ${bg}`}>
      <StatusBar dark={darkMode} />
      <div className="px-3 py-2 flex items-center justify-between">
        <span className="text-sm font-semibold">家庭菜谱</span>
        <Search className={`w-4 h-4 ${subText}`} />
      </div>
      <div className="flex-1 overflow-auto px-3 pb-1">
        {/* Search bar */}
        <div className={`${cardBg} rounded-lg px-2.5 py-1.5 mb-2.5 flex items-center gap-2`}>
          <Search className={`w-3 h-3 ${subText}`} />
          <span className={`text-[10px] ${subText}`}>搜索菜谱或食材...</span>
        </div>

        {/* Tags */}
        <div className="flex gap-1.5 mb-2.5 overflow-x-auto">
          {['全部', '家常菜', '快手菜', '汤品', '甜品', '凉菜'].map((tag, i) => (
            <span
              key={tag}
              className={`text-[9px] px-2 py-0.5 rounded-full whitespace-nowrap ${
                i === 0 ? 'bg-primary/20 text-primary-light' : darkMode ? 'bg-white/10 text-gray-400' : 'bg-gray-200 text-gray-600'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Recipe cards */}
        <div className="space-y-2">
          {[
            {
              name: '红烧排骨',
              time: '45分钟',
              diff: '中等',
              tags: ['猪肉', '酱油'],
              emoji: '🍖',
              color: 'from-orange-500/20 to-red-500/20',
              rating: 4.8,
            },
            {
              name: '番茄炒蛋',
              time: '15分钟',
              diff: '简单',
              tags: ['番茄', '鸡蛋'],
              emoji: '🍳',
              color: 'from-yellow-500/20 to-orange-500/20',
              rating: 4.9,
            },
            {
              name: '清蒸鲈鱼',
              time: '25分钟',
              diff: '中等',
              tags: ['鲈鱼', '葱姜'],
              emoji: '🐟',
              color: 'from-blue-500/20 to-cyan-500/20',
              rating: 4.7,
            },
            {
              name: '麻婆豆腐',
              time: '20分钟',
              diff: '简单',
              tags: ['豆腐', '辣椒'],
              emoji: '🌶️',
              color: 'from-red-500/20 to-pink-500/20',
              rating: 4.6,
            },
          ].map((recipe) => (
            <div key={recipe.name} className={`${cardBg} rounded-xl overflow-hidden`}>
              <div className={`bg-gradient-to-r ${recipe.color} px-3 py-3 flex items-center gap-2`}>
                <span className="text-2xl">{recipe.emoji}</span>
                <div className="flex-1">
                  <div className="text-[11px] font-semibold">{recipe.name}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-[9px] ${subText} flex items-center gap-0.5`}>
                      <Timer className="w-2.5 h-2.5" /> {recipe.time}
                    </span>
                    <span className={`text-[9px] ${subText}`}>{recipe.diff}</span>
                    <span className="text-[9px] text-yellow-400 flex items-center gap-0.5">
                      <Star className="w-2.5 h-2.5 fill-yellow-400" /> {recipe.rating}
                    </span>
                  </div>
                </div>
                <Heart className={`w-3.5 h-3.5 ${subText}`} />
              </div>
              <div className="px-3 py-1.5 flex gap-1">
                {recipe.tags.map((tag) => (
                  <span key={tag} className={`text-[9px] px-1.5 py-0.5 rounded ${darkMode ? 'bg-white/10' : 'bg-gray-100'}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomTabBar
        dark={darkMode}
        tabs={[
          { icon: Home, label: '菜谱' },
          { icon: Search, label: '发现' },
          { icon: ChefHat, label: '做菜' },
          { icon: Heart, label: '收藏' },
          { icon: User, label: '我的' },
        ]}
      />
    </div>
  )
}

/* ============ Pet Preview ============ */
function PetPreview() {
  const darkMode = useStore((s) => s.previewDarkMode)
  const bg = darkMode ? 'bg-[#0c1222] text-white' : 'bg-gray-50 text-gray-900'
  const cardBg = darkMode ? 'bg-white/5' : 'bg-white shadow-sm'
  const subText = darkMode ? 'text-gray-400' : 'text-gray-500'

  return (
    <div className={`h-full flex flex-col ${bg}`}>
      <StatusBar dark={darkMode} />
      <div className="px-3 py-2 flex items-center justify-between">
        <span className="text-sm font-semibold">宠物管家</span>
        <Bell className={`w-4 h-4 ${subText}`} />
      </div>
      <div className="flex-1 overflow-auto px-3 pb-1">
        {/* Pet profile card */}
        <div className={`${cardBg} rounded-xl p-3 mb-2.5 flex items-center gap-3`}>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-amber-300 flex items-center justify-center text-2xl">
            🐱
          </div>
          <div className="flex-1">
            <div className="text-[12px] font-semibold">团子</div>
            <div className={`text-[9px] ${subText}`}>英短蓝猫 · 2岁3个月 · 4.2kg</div>
            <div className="flex gap-1 mt-1">
              <span className="text-[8px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400">已绝育</span>
              <span className="text-[8px] px-1.5 py-0.5 rounded bg-green-500/20 text-green-400">疫苗已完成</span>
            </div>
          </div>
          <Camera className={`w-4 h-4 ${subText}`} />
        </div>

        {/* Today's reminders */}
        <div className={`text-[10px] font-medium mb-1.5`}>今日提醒</div>
        <div className="space-y-1.5 mb-2.5">
          {[
            { time: '08:00', task: '早餐喂食', icon: '🍽️', done: true },
            { time: '10:00', task: '吃驱虫药', icon: '💊', done: true },
            { time: '18:00', task: '晚餐喂食', icon: '🍽️', done: false },
            { time: '21:00', task: '清理猫砂', icon: '🧹', done: false },
          ].map((item) => (
            <div key={item.task} className={`${cardBg} rounded-lg px-2.5 py-2 flex items-center gap-2`}>
              <span className="text-sm">{item.icon}</span>
              <div className="flex-1">
                <div className={`text-[11px] font-medium ${item.done ? 'line-through opacity-50' : ''}`}>
                  {item.task}
                </div>
                <div className={`text-[9px] ${subText}`}>{item.time}</div>
              </div>
              <div className={`w-4 h-4 rounded-full border ${
                item.done ? 'bg-green-500 border-green-500' : darkMode ? 'border-gray-600' : 'border-gray-300'
              } flex items-center justify-center`}>
                {item.done && <span className="text-white text-[8px]">✓</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Vaccine timeline */}
        <div className={`text-[10px] font-medium mb-1.5`}>疫苗记录</div>
        <div className={`${cardBg} rounded-xl p-2.5 mb-2.5`}>
          {[
            { name: '猫三联', date: '2025-01-15', status: '已完成' },
            { name: '狂犬疫苗', date: '2025-03-20', status: '已完成' },
            { name: '猫三联(加强)', date: '2026-01-15', status: '已完成' },
            { name: '体内驱虫', date: '2026-04-01', status: '待进行' },
          ].map((v, i) => (
            <div key={v.name} className={`flex items-center gap-2 ${i > 0 ? 'mt-1.5 pt-1.5 border-t border-white/5' : ''}`}>
              <div className={`w-2 h-2 rounded-full ${v.status === '已完成' ? 'bg-green-500' : 'bg-yellow-500'}`} />
              <div className="flex-1">
                <div className="text-[10px] font-medium">{v.name}</div>
                <div className={`text-[9px] ${subText}`}>{v.date}</div>
              </div>
              <span className={`text-[9px] ${v.status === '已完成' ? 'text-green-400' : 'text-yellow-400'}`}>
                {v.status}
              </span>
            </div>
          ))}
        </div>

        {/* Photo gallery hint */}
        <div className={`text-[10px] font-medium mb-1.5`}>萌宠相册</div>
        <div className="grid grid-cols-3 gap-1 mb-2">
          {['😸', '😺', '😻', '🐱', '😽', '😹'].map((e, i) => (
            <div key={i} className={`aspect-square ${cardBg} rounded-lg flex items-center justify-center text-xl`}>
              {e}
            </div>
          ))}
        </div>
      </div>
      <BottomTabBar
        dark={darkMode}
        tabs={[
          { icon: Home, label: '首页' },
          { icon: Calendar, label: '日程' },
          { icon: Camera, label: '相册' },
          { icon: MapPin, label: '服务' },
          { icon: User, label: '我的' },
        ]}
      />
    </div>
  )
}

/* ============ Travel Preview ============ */
function TravelPreview() {
  const darkMode = useStore((s) => s.previewDarkMode)
  const bg = darkMode ? 'bg-[#0c1222] text-white' : 'bg-gray-50 text-gray-900'
  const cardBg = darkMode ? 'bg-white/5' : 'bg-white shadow-sm'
  const subText = darkMode ? 'text-gray-400' : 'text-gray-500'

  return (
    <div className={`h-full flex flex-col ${bg}`}>
      <StatusBar dark={darkMode} />
      <div className="px-3 py-2 flex items-center justify-between">
        <span className="text-sm font-semibold">旅行日记</span>
        <div className="flex items-center gap-2">
          <Share2 className={`w-4 h-4 ${subText}`} />
          <Plus className={`w-4 h-4 ${subText}`} />
        </div>
      </div>
      <div className="flex-1 overflow-auto px-3 pb-1">
        {/* Map placeholder */}
        <div className={`${cardBg} rounded-xl p-2.5 mb-2.5 relative overflow-hidden`}>
          <div className={`h-20 rounded-lg ${darkMode ? 'bg-indigo-900/30' : 'bg-blue-100'} flex items-center justify-center relative`}>
            <div className="absolute inset-0 opacity-30">
              <div className={`h-full w-full ${darkMode ? 'bg-gradient-to-br from-blue-900 to-purple-900' : 'bg-gradient-to-br from-blue-200 to-green-200'}`} />
            </div>
            {/* Map dots */}
            <div className="absolute top-3 left-6 w-2 h-2 rounded-full bg-red-500 shadow-lg shadow-red-500/50" />
            <div className="absolute top-6 left-14 w-2 h-2 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50" />
            <div className="absolute bottom-4 right-8 w-2 h-2 rounded-full bg-green-500 shadow-lg shadow-green-500/50" />
            <div className="absolute bottom-6 left-10 w-2 h-2 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50" />
            <div className="absolute top-8 right-12 w-2 h-2 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50" />
            <MapPin className="w-5 h-5 text-primary-light z-10" />
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-[10px] font-medium">去过 5 个城市</span>
            <span className="text-[9px] text-primary-light">查看地图 &rarr;</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-1.5 mb-2.5">
          {[
            { label: '旅行次数', value: '8', icon: Plane, color: 'text-blue-400' },
            { label: '总开销', value: '¥2.4万', icon: DollarSign, color: 'text-green-400' },
            { label: '照片', value: '326', icon: Image, color: 'text-pink-400' },
          ].map((stat) => (
            <div key={stat.label} className={`${cardBg} rounded-lg p-2 text-center`}>
              <stat.icon className={`w-3.5 h-3.5 mx-auto mb-0.5 ${stat.color}`} />
              <div className="text-sm font-bold">{stat.value}</div>
              <div className={`text-[9px] ${subText}`}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className={`text-[10px] font-medium mb-1.5`}>最近旅行</div>
        <div className="space-y-2">
          {[
            { dest: '杭州·西湖之旅', date: '2026.03.01 - 03.04', cost: '¥3,280', emoji: '🏞️', days: 4 },
            { dest: '成都·美食之旅', date: '2026.01.20 - 01.25', cost: '¥5,120', emoji: '🐼', days: 6 },
            { dest: '厦门·海岛休闲', date: '2025.10.01 - 10.05', cost: '¥4,650', emoji: '🏖️', days: 5 },
          ].map((trip) => (
            <div key={trip.dest} className={`${cardBg} rounded-xl p-2.5`}>
              <div className="flex items-center gap-2">
                <span className="text-lg">{trip.emoji}</span>
                <div className="flex-1">
                  <div className="text-[11px] font-semibold">{trip.dest}</div>
                  <div className={`text-[9px] ${subText} mt-0.5`}>{trip.date}</div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-1.5">
                <span className={`text-[9px] ${subText}`}>{trip.days}天</span>
                <span className="text-[10px] text-primary-light">{trip.cost}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomTabBar
        dark={darkMode}
        tabs={[
          { icon: Home, label: '首页' },
          { icon: MapPin, label: '足迹' },
          { icon: Camera, label: '相册' },
          { icon: DollarSign, label: '开销' },
          { icon: User, label: '我的' },
        ]}
      />
    </div>
  )
}

/* ============ Reading Preview ============ */
function ReadingPreview() {
  const darkMode = useStore((s) => s.previewDarkMode)
  const bg = darkMode ? 'bg-[#0c1222] text-white' : 'bg-gray-50 text-gray-900'
  const cardBg = darkMode ? 'bg-white/5' : 'bg-white shadow-sm'
  const subText = darkMode ? 'text-gray-400' : 'text-gray-500'

  return (
    <div className={`h-full flex flex-col ${bg}`}>
      <StatusBar dark={darkMode} />
      <div className="px-3 py-2 flex items-center justify-between">
        <span className="text-sm font-semibold">读书笔记</span>
        <div className="flex items-center gap-2">
          {darkMode ? (
            <Sun className={`w-4 h-4 ${subText}`} />
          ) : (
            <Moon className={`w-4 h-4 ${subText}`} />
          )}
          <Search className={`w-4 h-4 ${subText}`} />
        </div>
      </div>
      <div className="flex-1 overflow-auto px-3 pb-1">
        {/* Reading stats */}
        <div className={`${cardBg} rounded-xl p-2.5 mb-2.5`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-medium">2026年阅读目标</span>
            <span className="text-[10px] text-primary-light">24/50本</span>
          </div>
          <div className={`h-1.5 ${darkMode ? 'bg-white/10' : 'bg-gray-200'} rounded-full overflow-hidden`}>
            <div className="h-full bg-gradient-to-r from-primary to-purple-400 rounded-full" style={{ width: '48%' }} />
          </div>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {[
              { label: '已读', value: '24' },
              { label: '在读', value: '3' },
              { label: '想读', value: '15' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-sm font-bold">{s.value}</div>
                <div className={`text-[9px] ${subText}`}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Currently reading */}
        <div className={`text-[10px] font-medium mb-1.5`}>正在阅读</div>
        <div className="space-y-1.5 mb-2.5">
          {[
            { title: '人类简史', author: '尤瓦尔·赫拉利', progress: 72, color: 'from-blue-500 to-indigo-500', emoji: '🌍' },
            { title: '原则', author: '瑞·达利欧', progress: 35, color: 'from-orange-500 to-red-500', emoji: '📐' },
            { title: '被讨厌的勇气', author: '岸见一郎', progress: 89, color: 'from-pink-500 to-purple-500', emoji: '💪' },
          ].map((book) => (
            <div key={book.title} className={`${cardBg} rounded-xl p-2.5 flex gap-2.5`}>
              <div className={`w-10 h-14 rounded-md bg-gradient-to-br ${book.color} flex items-center justify-center text-lg shrink-0`}>
                {book.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-semibold truncate">{book.title}</div>
                <div className={`text-[9px] ${subText}`}>{book.author}</div>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <div className={`flex-1 h-1 ${darkMode ? 'bg-white/10' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                    <div
                      className="h-full bg-gradient-to-r from-primary to-purple-400 rounded-full"
                      style={{ width: `${book.progress}%` }}
                    />
                  </div>
                  <span className="text-[9px] text-primary-light">{book.progress}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quotes */}
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-medium">金句收藏</span>
          <span className="text-[9px] text-primary-light">查看全部</span>
        </div>
        <div className={`${cardBg} rounded-xl p-2.5`}>
          <Quote className="w-3.5 h-3.5 text-primary-light mb-1" />
          <div className="text-[10px] leading-relaxed italic">
            "知识的获得不是增加信息，而是改变你观察世界的方式。"
          </div>
          <div className={`text-[9px] ${subText} mt-1 flex items-center justify-between`}>
            <span>-- 《人类简史》</span>
            <Bookmark className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          </div>
        </div>
      </div>
      <BottomTabBar
        dark={darkMode}
        tabs={[
          { icon: Home, label: '首页' },
          { icon: BookOpen, label: '书架' },
          { icon: Quote, label: '金句' },
          { icon: Target, label: '目标' },
          { icon: User, label: '我的' },
        ]}
      />
    </div>
  )
}

/* ============ Preview Router ============ */
const previews: Record<string, React.ComponentType> = {
  finance: FinancePreview,
  todo: TodoPreview,
  crm: CRMPreview,
  fitness: FitnessPreview,
  recipe: RecipePreview,
  pet: PetPreview,
  travel: TravelPreview,
  reading: ReadingPreview,
}

export default function AppPreview({ type }: { type: string }) {
  const Preview = previews[type]
  if (!Preview) return null

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Preview />
    </motion.div>
  )
}
