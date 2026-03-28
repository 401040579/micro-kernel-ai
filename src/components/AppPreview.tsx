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
import { useTranslations } from '../i18n'

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
  const tr = useTranslations()
  const p = tr.preview.finance
  const bg = darkMode ? 'bg-[#0c1222] text-white' : 'bg-gray-50 text-gray-900'
  const cardBg = darkMode ? 'bg-white/5' : 'bg-white shadow-sm'
  const subText = darkMode ? 'text-gray-400' : 'text-gray-500'

  const tabIcons = [Home, BarChart3, Plus, Calendar, User]

  return (
    <div className={`h-full flex flex-col ${bg}`}>
      <StatusBar dark={darkMode} />
      <div className="px-3 py-2 flex items-center justify-between">
        <span className="text-sm font-semibold">{p.title}</span>
        <div className="flex items-center gap-2">
          <Search className={`w-4 h-4 ${subText}`} />
          <Bell className={`w-4 h-4 ${subText}`} />
        </div>
      </div>
      <div className="flex-1 overflow-auto px-3 pb-1">
        <div className={`text-center mb-3 ${cardBg} rounded-xl p-3`}>
          <div className={`text-[10px] ${subText} mb-0.5`}>{p.monthLabel}</div>
          <div className="text-xl font-bold">-3,280.50</div>
          <div className="flex justify-center gap-4 mt-1.5 text-[10px]">
            <span className="flex items-center gap-1 text-green-400">
              <ArrowUpRight className="w-3 h-3" /> {p.income} 8,000
            </span>
            <span className="flex items-center gap-1 text-red-400">
              <ArrowDownRight className="w-3 h-3" /> {p.expense} 11,280
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
            { label: p.lunch, cat: p.lunchCat, amount: '-45.00', icon: '\uD83C\uDF54', color: 'text-red-400' },
            { label: p.subway, cat: p.subwayCat, amount: '-200.00', icon: '\uD83D\uDE87', color: 'text-red-400' },
            { label: p.salary, cat: p.salaryCat, amount: '+8,000.00', icon: '\uD83D\uDCB0', color: 'text-green-400' },
            { label: p.electric, cat: p.electricCat, amount: '-156.80', icon: '\uD83D\uDCA1', color: 'text-red-400' },
            { label: p.grocery, cat: p.groceryCat, amount: '-328.50', icon: '\uD83D\uDED2', color: 'text-red-400' },
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
          <Plus className="w-3.5 h-3.5" /> {p.addRecord}
        </button>
      </div>
      <BottomTabBar
        dark={darkMode}
        tabs={(p.tabs as string[]).map((label: string, i: number) => ({ icon: tabIcons[i], label }))}
      />
    </div>
  )
}

/* ============ Todo Preview ============ */
function TodoPreview() {
  const darkMode = useStore((s) => s.previewDarkMode)
  const tr = useTranslations()
  const p = tr.preview.todo
  const bg = darkMode ? 'bg-[#0c1222] text-white' : 'bg-gray-50 text-gray-900'
  const cardBg = darkMode ? 'bg-white/5' : 'bg-white shadow-sm'
  const subText = darkMode ? 'text-gray-400' : 'text-gray-500'

  const tabIcons = [Home, Users, Calendar, User]

  const statusColors = [
    'bg-yellow-500/20 text-yellow-400',
    'bg-blue-500/20 text-blue-400',
    'bg-green-500/20 text-green-400',
  ]

  const taskBorderColors = ['border-red-500', 'border-yellow-500', 'border-red-500', 'border-green-500', 'border-yellow-500']
  const highPriorityIndices = [0, 2]

  return (
    <div className={`h-full flex flex-col ${bg}`}>
      <StatusBar dark={darkMode} />
      <div className="px-3 py-2 flex items-center justify-between">
        <span className="text-sm font-semibold">{p.title}</span>
        <div className="flex items-center gap-1 text-[10px]">
          <Clock className={`w-3 h-3 ${subText}`} />
          <span className={subText}>{p.today}</span>
        </div>
      </div>
      <div className="flex-1 overflow-auto px-3 pb-1">
        <div className="flex gap-1.5 mb-3 text-[10px]">
          {(p.statuses as { label: string; count: number }[]).map((s: { label: string; count: number }, i: number) => (
            <div key={s.label} className={`px-2 py-1 rounded-md ${statusColors[i]}`}>
              {s.label} ({s.count})
            </div>
          ))}
        </div>

        <div className="space-y-1.5">
          {(p.tasks as { title: string; priority: string; assignee: string }[]).map((task: { title: string; priority: string; assignee: string }, i: number) => (
            <div
              key={task.title}
              className={`${cardBg} rounded-lg px-2.5 py-2 border-l-2 ${taskBorderColors[i]}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-1.5">
                  <CheckSquare className={`w-3 h-3 ${subText} mt-0.5 shrink-0`} />
                  <div>
                    <div className="text-[11px] font-medium">{task.title}</div>
                    <div className={`text-[9px] ${subText} mt-0.5`}>
                      {task.assignee} · {p.priorityLabel}: {task.priority}
                    </div>
                  </div>
                </div>
                {highPriorityIndices.includes(i) && <AlertCircle className="w-3 h-3 text-red-400 shrink-0" />}
              </div>
            </div>
          ))}
        </div>

        <button className="mt-2 w-full py-2 bg-primary rounded-lg text-xs font-medium flex items-center justify-center gap-1 border-0 text-white cursor-pointer">
          <Plus className="w-3.5 h-3.5" /> {p.addTask}
        </button>
      </div>
      <BottomTabBar
        dark={darkMode}
        tabs={(p.tabs as string[]).map((label: string, i: number) => ({ icon: tabIcons[i], label }))}
      />
    </div>
  )
}

/* ============ CRM Preview ============ */
function CRMPreview() {
  const darkMode = useStore((s) => s.previewDarkMode)
  const tr = useTranslations()
  const p = tr.preview.crm
  const bg = darkMode ? 'bg-[#0c1222] text-white' : 'bg-gray-50 text-gray-900'
  const cardBg = darkMode ? 'bg-white/5' : 'bg-white shadow-sm'
  const subText = darkMode ? 'text-gray-400' : 'text-gray-500'

  const tabIcons = [Home, Users, BarChart3, User]

  return (
    <div className={`h-full flex flex-col ${bg}`}>
      <StatusBar dark={darkMode} />
      <div className="px-3 py-2 flex items-center justify-between">
        <span className="text-sm font-semibold">{p.title}</span>
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-primary-light" />
          <Users className={`w-4 h-4 ${subText}`} />
        </div>
      </div>
      <div className="flex-1 overflow-auto px-3 pb-1">
        <div className="grid grid-cols-2 gap-1.5 mb-3">
          {(p.stats as { label: string; value: string; trend: string }[]).map((stat: { label: string; value: string; trend: string }) => (
            <div key={stat.label} className={`${cardBg} rounded-lg p-2`}>
              <div className={`text-[9px] ${subText}`}>{stat.label}</div>
              <div className="text-sm font-bold">{stat.value}</div>
              <div className={`text-[9px] ${stat.trend.startsWith('-') ? 'text-red-400' : 'text-green-400'}`}>{stat.trend}</div>
            </div>
          ))}
        </div>

        <div className={`text-[10px] font-medium mb-1.5 ${subText}`}>{p.recentClients}</div>
        <div className="space-y-1.5">
          {(p.clients as { name: string; company: string; status: string }[]).map((client: { name: string; company: string; status: string }) => {
            const closedStatus = (p.clients as { name: string; company: string; status: string }[])[1].status
            const followStatus = (p.clients as { name: string; company: string; status: string }[])[2].status
            return (
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
                  client.status === closedStatus ? 'bg-green-500/20 text-green-400' :
                  client.status === followStatus ? 'bg-blue-500/20 text-blue-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {client.status}
                </span>
              </div>
            )
          })}
        </div>

        <button className="mt-2 w-full py-2 bg-primary rounded-lg text-xs font-medium flex items-center justify-center gap-1 border-0 text-white cursor-pointer">
          <Plus className="w-3.5 h-3.5" /> {p.addClient}
        </button>
      </div>
      <BottomTabBar
        dark={darkMode}
        tabs={(p.tabs as string[]).map((label: string, i: number) => ({ icon: tabIcons[i], label }))}
      />
    </div>
  )
}

/* ============ Fitness Preview ============ */
function FitnessPreview() {
  const darkMode = useStore((s) => s.previewDarkMode)
  const tr = useTranslations()
  const p = tr.preview.fitness
  const bg = darkMode ? 'bg-[#0c1222] text-white' : 'bg-gray-50 text-gray-900'
  const cardBg = darkMode ? 'bg-white/5' : 'bg-white shadow-sm'
  const subText = darkMode ? 'text-gray-400' : 'text-gray-500'

  const tabIcons = [Home, Dumbbell, TrendingUp, Trophy, User]
  const checkedDays = [true, true, false, true, true, false, false]
  const statIcons = [Flame, Clock, TrendingUp]
  const statColors = ['text-orange-400', 'text-blue-400', 'text-green-400']

  return (
    <div className={`h-full flex flex-col ${bg}`}>
      <StatusBar dark={darkMode} />
      <div className="px-3 py-2 flex items-center justify-between">
        <span className="text-sm font-semibold">{p.title}</span>
        <Trophy className="w-4 h-4 text-yellow-400" />
      </div>
      <div className="flex-1 overflow-auto px-3 pb-1">
        {/* Weekly calendar */}
        <div className={`${cardBg} rounded-xl p-2.5 mb-2.5`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-medium">{p.weeklyCheckin}</span>
            <span className="text-[10px] text-primary-light">4/7</span>
          </div>
          <div className="flex justify-between">
            {(p.weekDays as string[]).map((d: string, i: number) => (
              <div key={d} className="flex flex-col items-center gap-1">
                <span className={`text-[9px] ${subText}`}>{d}</span>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] ${
                  checkedDays[i]
                    ? 'bg-green-500 text-white'
                    : darkMode ? 'bg-white/10 text-gray-500' : 'bg-gray-200 text-gray-400'
                }`}>
                  {checkedDays[i] ? '\u2713' : ''}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-1.5 mb-2.5">
          {(p.stats as { label: string; value: string; unit: string }[]).map((stat: { label: string; value: string; unit: string }, i: number) => {
            const Icon = statIcons[i]
            return (
              <div key={stat.label} className={`${cardBg} rounded-lg p-2 text-center`}>
                <Icon className={`w-3.5 h-3.5 mx-auto mb-0.5 ${statColors[i]}`} />
                <div className="text-sm font-bold">{stat.value}</div>
                <div className={`text-[9px] ${subText}`}>{stat.unit}</div>
              </div>
            )
          })}
        </div>

        {/* Weight trend */}
        <div className={`${cardBg} rounded-xl p-2.5 mb-2.5`}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-medium">{p.weightTrend}</span>
            <span className={`text-[9px] ${subText}`}>{p.last30Days}</span>
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
            <span className={`text-[9px] ${subText}`}>{p.currentWeight}</span>
          </div>
        </div>

        {/* Today's exercises */}
        <div className={`text-[10px] font-medium mb-1.5 ${subText}`}>{p.todayExercises}</div>
        <div className="space-y-1.5">
          {(p.exercises as { name: string; duration: string; cal: string }[]).map((ex: { name: string; duration: string; cal: string }, i: number) => {
            const emojis = ['\uD83C\uDFC3', '\uD83D\uDCAA', '\uD83E\uDDD8']
            return (
              <div key={ex.name} className={`${cardBg} rounded-lg px-2.5 py-2 flex items-center justify-between`}>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{emojis[i]}</span>
                  <div>
                    <div className="text-[11px] font-medium">{ex.name}</div>
                    <div className={`text-[9px] ${subText}`}>{ex.duration}</div>
                  </div>
                </div>
                <span className="text-[10px] text-orange-400">{ex.cal}</span>
              </div>
            )
          })}
        </div>
      </div>
      <BottomTabBar
        dark={darkMode}
        tabs={(p.tabs as string[]).map((label: string, i: number) => ({ icon: tabIcons[i], label }))}
      />
    </div>
  )
}

/* ============ Recipe Preview ============ */
function RecipePreview() {
  const darkMode = useStore((s) => s.previewDarkMode)
  const tr = useTranslations()
  const p = tr.preview.recipe
  const bg = darkMode ? 'bg-[#0c1222] text-white' : 'bg-gray-50 text-gray-900'
  const cardBg = darkMode ? 'bg-white/5' : 'bg-white shadow-sm'
  const subText = darkMode ? 'text-gray-400' : 'text-gray-500'

  const tabIcons = [Home, Search, ChefHat, Heart, User]
  const recipeEmojis = ['\uD83C\uDF56', '\uD83C\uDF73', '\uD83D\uDC1F', '\uD83C\uDF36\uFE0F']
  const recipeColors = [
    'from-orange-500/20 to-red-500/20',
    'from-yellow-500/20 to-orange-500/20',
    'from-blue-500/20 to-cyan-500/20',
    'from-red-500/20 to-pink-500/20',
  ]
  const recipeRatings = [4.8, 4.9, 4.7, 4.6]

  return (
    <div className={`h-full flex flex-col ${bg}`}>
      <StatusBar dark={darkMode} />
      <div className="px-3 py-2 flex items-center justify-between">
        <span className="text-sm font-semibold">{p.title}</span>
        <Search className={`w-4 h-4 ${subText}`} />
      </div>
      <div className="flex-1 overflow-auto px-3 pb-1">
        {/* Search bar */}
        <div className={`${cardBg} rounded-lg px-2.5 py-1.5 mb-2.5 flex items-center gap-2`}>
          <Search className={`w-3 h-3 ${subText}`} />
          <span className={`text-[10px] ${subText}`}>{p.searchPlaceholder}</span>
        </div>

        {/* Tags */}
        <div className="flex gap-1.5 mb-2.5 overflow-x-auto">
          {(p.tags as string[]).map((tag: string, i: number) => (
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
          {(p.recipes as { name: string; time: string; diff: string; tags: string[] }[]).map((recipe: { name: string; time: string; diff: string; tags: string[] }, i: number) => (
            <div key={recipe.name} className={`${cardBg} rounded-xl overflow-hidden`}>
              <div className={`bg-gradient-to-r ${recipeColors[i]} px-3 py-3 flex items-center gap-2`}>
                <span className="text-2xl">{recipeEmojis[i]}</span>
                <div className="flex-1">
                  <div className="text-[11px] font-semibold">{recipe.name}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-[9px] ${subText} flex items-center gap-0.5`}>
                      <Timer className="w-2.5 h-2.5" /> {recipe.time}
                    </span>
                    <span className={`text-[9px] ${subText}`}>{recipe.diff}</span>
                    <span className="text-[9px] text-yellow-400 flex items-center gap-0.5">
                      <Star className="w-2.5 h-2.5 fill-yellow-400" /> {recipeRatings[i]}
                    </span>
                  </div>
                </div>
                <Heart className={`w-3.5 h-3.5 ${subText}`} />
              </div>
              <div className="px-3 py-1.5 flex gap-1">
                {recipe.tags.map((tag: string) => (
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
        tabs={(p.tabs as string[]).map((label: string, i: number) => ({ icon: tabIcons[i], label }))}
      />
    </div>
  )
}

/* ============ Pet Preview ============ */
function PetPreview() {
  const darkMode = useStore((s) => s.previewDarkMode)
  const tr = useTranslations()
  const p = tr.preview.pet
  const bg = darkMode ? 'bg-[#0c1222] text-white' : 'bg-gray-50 text-gray-900'
  const cardBg = darkMode ? 'bg-white/5' : 'bg-white shadow-sm'
  const subText = darkMode ? 'text-gray-400' : 'text-gray-500'

  const tabIcons = [Home, Calendar, Camera, MapPin, User]
  const reminderIcons = ['\uD83C\uDF7D\uFE0F', '\uD83D\uDC8A', '\uD83C\uDF7D\uFE0F', '\uD83E\uDDF9']

  return (
    <div className={`h-full flex flex-col ${bg}`}>
      <StatusBar dark={darkMode} />
      <div className="px-3 py-2 flex items-center justify-between">
        <span className="text-sm font-semibold">{p.title}</span>
        <Bell className={`w-4 h-4 ${subText}`} />
      </div>
      <div className="flex-1 overflow-auto px-3 pb-1">
        {/* Pet profile card */}
        <div className={`${cardBg} rounded-xl p-3 mb-2.5 flex items-center gap-3`}>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-amber-300 flex items-center justify-center text-2xl">
            {'\uD83D\uDC31'}
          </div>
          <div className="flex-1">
            <div className="text-[12px] font-semibold">{p.petName}</div>
            <div className={`text-[9px] ${subText}`}>{p.petInfo}</div>
            <div className="flex gap-1 mt-1">
              <span className="text-[8px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400">{p.neutered}</span>
              <span className="text-[8px] px-1.5 py-0.5 rounded bg-green-500/20 text-green-400">{p.vaccinated}</span>
            </div>
          </div>
          <Camera className={`w-4 h-4 ${subText}`} />
        </div>

        {/* Today's reminders */}
        <div className={`text-[10px] font-medium mb-1.5`}>{p.todayReminders}</div>
        <div className="space-y-1.5 mb-2.5">
          {(p.reminders as { time: string; task: string; done: boolean }[]).map((item: { time: string; task: string; done: boolean }, i: number) => (
            <div key={item.task} className={`${cardBg} rounded-lg px-2.5 py-2 flex items-center gap-2`}>
              <span className="text-sm">{reminderIcons[i]}</span>
              <div className="flex-1">
                <div className={`text-[11px] font-medium ${item.done ? 'line-through opacity-50' : ''}`}>
                  {item.task}
                </div>
                <div className={`text-[9px] ${subText}`}>{item.time}</div>
              </div>
              <div className={`w-4 h-4 rounded-full border ${
                item.done ? 'bg-green-500 border-green-500' : darkMode ? 'border-gray-600' : 'border-gray-300'
              } flex items-center justify-center`}>
                {item.done && <span className="text-white text-[8px]">{'\u2713'}</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Vaccine timeline */}
        <div className={`text-[10px] font-medium mb-1.5`}>{p.vaccineRecords}</div>
        <div className={`${cardBg} rounded-xl p-2.5 mb-2.5`}>
          {(p.vaccines as { name: string; date: string; status: string }[]).map((v: { name: string; date: string; status: string }, i: number) => {
            const doneStatus = (p.vaccines as { name: string; date: string; status: string }[])[0].status
            const isDone = v.status === doneStatus
            return (
              <div key={v.name} className={`flex items-center gap-2 ${i > 0 ? 'mt-1.5 pt-1.5 border-t border-white/5' : ''}`}>
                <div className={`w-2 h-2 rounded-full ${isDone ? 'bg-green-500' : 'bg-yellow-500'}`} />
                <div className="flex-1">
                  <div className="text-[10px] font-medium">{v.name}</div>
                  <div className={`text-[9px] ${subText}`}>{v.date}</div>
                </div>
                <span className={`text-[9px] ${isDone ? 'text-green-400' : 'text-yellow-400'}`}>
                  {v.status}
                </span>
              </div>
            )
          })}
        </div>

        {/* Photo gallery hint */}
        <div className={`text-[10px] font-medium mb-1.5`}>{p.photoGallery}</div>
        <div className="grid grid-cols-3 gap-1 mb-2">
          {['\uD83D\uDE38', '\uD83D\uDE3A', '\uD83D\uDE3B', '\uD83D\uDC31', '\uD83D\uDE3D', '\uD83D\uDE39'].map((e, i) => (
            <div key={i} className={`aspect-square ${cardBg} rounded-lg flex items-center justify-center text-xl`}>
              {e}
            </div>
          ))}
        </div>
      </div>
      <BottomTabBar
        dark={darkMode}
        tabs={(p.tabs as string[]).map((label: string, i: number) => ({ icon: tabIcons[i], label }))}
      />
    </div>
  )
}

/* ============ Travel Preview ============ */
function TravelPreview() {
  const darkMode = useStore((s) => s.previewDarkMode)
  const tr = useTranslations()
  const p = tr.preview.travel
  const bg = darkMode ? 'bg-[#0c1222] text-white' : 'bg-gray-50 text-gray-900'
  const cardBg = darkMode ? 'bg-white/5' : 'bg-white shadow-sm'
  const subText = darkMode ? 'text-gray-400' : 'text-gray-500'

  const tabIcons = [Home, MapPin, Camera, DollarSign, User]
  const statIcons = [Plane, DollarSign, Image]
  const statColors = ['text-blue-400', 'text-green-400', 'text-pink-400']
  const tripEmojis = ['\uD83C\uDFDE\uFE0F', '\uD83D\uDC3C', '\uD83C\uDFD6\uFE0F']

  return (
    <div className={`h-full flex flex-col ${bg}`}>
      <StatusBar dark={darkMode} />
      <div className="px-3 py-2 flex items-center justify-between">
        <span className="text-sm font-semibold">{p.title}</span>
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
            <div className="absolute top-3 left-6 w-2 h-2 rounded-full bg-red-500 shadow-lg shadow-red-500/50" />
            <div className="absolute top-6 left-14 w-2 h-2 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50" />
            <div className="absolute bottom-4 right-8 w-2 h-2 rounded-full bg-green-500 shadow-lg shadow-green-500/50" />
            <div className="absolute bottom-6 left-10 w-2 h-2 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50" />
            <div className="absolute top-8 right-12 w-2 h-2 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50" />
            <MapPin className="w-5 h-5 text-primary-light z-10" />
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-[10px] font-medium">{p.citiesVisited}</span>
            <span className="text-[9px] text-primary-light">{p.viewMap} &rarr;</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-1.5 mb-2.5">
          {(p.stats as { label: string; value: string }[]).map((stat: { label: string; value: string }, i: number) => {
            const Icon = statIcons[i]
            return (
              <div key={stat.label} className={`${cardBg} rounded-lg p-2 text-center`}>
                <Icon className={`w-3.5 h-3.5 mx-auto mb-0.5 ${statColors[i]}`} />
                <div className="text-sm font-bold">{stat.value}</div>
                <div className={`text-[9px] ${subText}`}>{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Timeline */}
        <div className={`text-[10px] font-medium mb-1.5`}>{p.recentTrips}</div>
        <div className="space-y-2">
          {(p.trips as { dest: string; date: string; cost: string; days: number }[]).map((trip: { dest: string; date: string; cost: string; days: number }, i: number) => (
            <div key={trip.dest} className={`${cardBg} rounded-xl p-2.5`}>
              <div className="flex items-center gap-2">
                <span className="text-lg">{tripEmojis[i]}</span>
                <div className="flex-1">
                  <div className="text-[11px] font-semibold">{trip.dest}</div>
                  <div className={`text-[9px] ${subText} mt-0.5`}>{trip.date}</div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-1.5">
                <span className={`text-[9px] ${subText}`}>{trip.days} {p.daysUnit}</span>
                <span className="text-[10px] text-primary-light">{trip.cost}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomTabBar
        dark={darkMode}
        tabs={(p.tabs as string[]).map((label: string, i: number) => ({ icon: tabIcons[i], label }))}
      />
    </div>
  )
}

/* ============ Reading Preview ============ */
function ReadingPreview() {
  const darkMode = useStore((s) => s.previewDarkMode)
  const tr = useTranslations()
  const p = tr.preview.reading
  const bg = darkMode ? 'bg-[#0c1222] text-white' : 'bg-gray-50 text-gray-900'
  const cardBg = darkMode ? 'bg-white/5' : 'bg-white shadow-sm'
  const subText = darkMode ? 'text-gray-400' : 'text-gray-500'

  const tabIcons = [Home, BookOpen, Quote, Target, User]
  const bookColors = ['from-blue-500 to-indigo-500', 'from-orange-500 to-red-500', 'from-pink-500 to-purple-500']
  const bookEmojis = ['\uD83C\uDF0D', '\uD83D\uDCD0', '\uD83D\uDCAA']
  const readingStats = ['24', '3', '15']

  return (
    <div className={`h-full flex flex-col ${bg}`}>
      <StatusBar dark={darkMode} />
      <div className="px-3 py-2 flex items-center justify-between">
        <span className="text-sm font-semibold">{p.title}</span>
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
            <span className="text-[10px] font-medium">{p.readingGoal}</span>
            <span className="text-[10px] text-primary-light">{p.goalProgress}</span>
          </div>
          <div className={`h-1.5 ${darkMode ? 'bg-white/10' : 'bg-gray-200'} rounded-full overflow-hidden`}>
            <div className="h-full bg-gradient-to-r from-primary to-purple-400 rounded-full" style={{ width: '48%' }} />
          </div>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {(p.statsLabels as string[]).map((label: string, i: number) => (
              <div key={label} className="text-center">
                <div className="text-sm font-bold">{readingStats[i]}</div>
                <div className={`text-[9px] ${subText}`}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Currently reading */}
        <div className={`text-[10px] font-medium mb-1.5`}>{p.currentlyReading}</div>
        <div className="space-y-1.5 mb-2.5">
          {(p.books as { title: string; author: string; progress: number }[]).map((book: { title: string; author: string; progress: number }, i: number) => (
            <div key={book.title} className={`${cardBg} rounded-xl p-2.5 flex gap-2.5`}>
              <div className={`w-10 h-14 rounded-md bg-gradient-to-br ${bookColors[i]} flex items-center justify-center text-lg shrink-0`}>
                {bookEmojis[i]}
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
          <span className="text-[10px] font-medium">{p.quoteCollection}</span>
          <span className="text-[9px] text-primary-light">{p.viewAll}</span>
        </div>
        <div className={`${cardBg} rounded-xl p-2.5`}>
          <Quote className="w-3.5 h-3.5 text-primary-light mb-1" />
          <div className="text-[10px] leading-relaxed italic">
            {p.sampleQuote}
          </div>
          <div className={`text-[9px] ${subText} mt-1 flex items-center justify-between`}>
            <span>{p.quoteSource}</span>
            <Bookmark className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          </div>
        </div>
      </div>
      <BottomTabBar
        dark={darkMode}
        tabs={(p.tabs as string[]).map((label: string, i: number) => ({ icon: tabIcons[i], label }))}
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
