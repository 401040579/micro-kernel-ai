import { motion } from 'framer-motion'
import {
  Plus, ArrowUpRight, ArrowDownRight,
  CheckSquare, Clock, AlertCircle, Users, BarChart3,
} from 'lucide-react'

function FinancePreview() {
  return (
    <div className="h-full flex flex-col bg-[#0c1222] text-white p-4 overflow-auto">
      <div className="text-center mb-4">
        <div className="text-xs text-text-secondary mb-1">2026年3月</div>
        <div className="text-2xl font-bold">-3,280.50</div>
        <div className="flex justify-center gap-4 mt-2 text-xs">
          <span className="flex items-center gap-1 text-green-400">
            <ArrowUpRight className="w-3 h-3" /> 收入 8,000
          </span>
          <span className="flex items-center gap-1 text-red-400">
            <ArrowDownRight className="w-3 h-3" /> 支出 11,280
          </span>
        </div>
      </div>

      <div className="flex justify-center gap-1 mb-4">
        {[40, 25, 20, 15].map((v, i) => (
          <div
            key={i}
            className="rounded-sm"
            style={{
              width: `${v}%`,
              height: 8,
              backgroundColor: ['#f97316', '#3b82f6', '#a855f7', '#10b981'][i],
            }}
          />
        ))}
      </div>

      <div className="flex-1 space-y-2">
        {[
          { label: '午餐 - 麦当劳', cat: '餐饮', amount: '-45.00', icon: '🍔', color: 'text-red-400' },
          { label: '地铁充值', cat: '交通', amount: '-200.00', icon: '🚇', color: 'text-red-400' },
          { label: '工资', cat: '收入', amount: '+8,000.00', icon: '💰', color: 'text-green-400' },
          { label: '电费', cat: '生活', amount: '-156.80', icon: '💡', color: 'text-red-400' },
          { label: '超市购物', cat: '购物', amount: '-328.50', icon: '🛒', color: 'text-red-400' },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between bg-bg-secondary/50 rounded-lg px-3 py-2"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">{item.icon}</span>
              <div>
                <div className="text-xs font-medium">{item.label}</div>
                <div className="text-[10px] text-text-secondary">{item.cat}</div>
              </div>
            </div>
            <span className={`text-xs font-medium ${item.color}`}>{item.amount}</span>
          </div>
        ))}
      </div>

      <button className="mt-3 w-full py-2 bg-primary rounded-lg text-sm font-medium flex items-center justify-center gap-1 border-0 text-white cursor-pointer">
        <Plus className="w-4 h-4" /> 记一笔
      </button>
    </div>
  )
}

function TodoPreview() {
  return (
    <div className="h-full flex flex-col bg-[#0c1222] text-white p-4 overflow-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold">团队任务</h3>
        <div className="flex items-center gap-1 text-xs text-text-secondary">
          <Clock className="w-3 h-3" /> 今天
        </div>
      </div>

      <div className="flex gap-2 mb-4 text-xs">
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

      <div className="flex-1 space-y-2">
        {[
          { title: '设计登录页面', priority: '高', assignee: 'Alice', status: 'todo', color: 'border-red-500' },
          { title: '编写API文档', priority: '中', assignee: 'Bob', status: 'doing', color: 'border-yellow-500' },
          { title: '修复支付Bug', priority: '高', assignee: 'Charlie', status: 'doing', color: 'border-red-500' },
          { title: '用户反馈整理', priority: '低', assignee: 'Diana', status: 'todo', color: 'border-green-500' },
          { title: '数据库优化', priority: '中', assignee: 'Eve', status: 'todo', color: 'border-yellow-500' },
        ].map((task) => (
          <div
            key={task.title}
            className={`bg-bg-secondary/50 rounded-lg px-3 py-2 border-l-2 ${task.color}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-2">
                <CheckSquare className="w-3.5 h-3.5 text-text-secondary mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-medium">{task.title}</div>
                  <div className="text-[10px] text-text-secondary mt-0.5">
                    {task.assignee} · 优先级: {task.priority}
                  </div>
                </div>
              </div>
              {task.priority === '高' && <AlertCircle className="w-3 h-3 text-red-400 shrink-0" />}
            </div>
          </div>
        ))}
      </div>

      <button className="mt-3 w-full py-2 bg-primary rounded-lg text-sm font-medium flex items-center justify-center gap-1 border-0 text-white cursor-pointer">
        <Plus className="w-4 h-4" /> 新建任务
      </button>
    </div>
  )
}

function CRMPreview() {
  return (
    <div className="h-full flex flex-col bg-[#0c1222] text-white p-4 overflow-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold">客户管理</h3>
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-primary-light" />
          <Users className="w-4 h-4 text-text-secondary" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        {[
          { label: '总客户', value: '128', trend: '+12%', color: 'text-green-400' },
          { label: '本月新增', value: '23', trend: '+8%', color: 'text-green-400' },
          { label: '成交额', value: '¥48万', trend: '+15%', color: 'text-green-400' },
          { label: '转化率', value: '32%', trend: '-2%', color: 'text-red-400' },
        ].map((stat) => (
          <div key={stat.label} className="bg-bg-secondary/50 rounded-lg p-2">
            <div className="text-[10px] text-text-secondary">{stat.label}</div>
            <div className="text-sm font-bold">{stat.value}</div>
            <div className={`text-[10px] ${stat.color}`}>{stat.trend}</div>
          </div>
        ))}
      </div>

      <div className="text-xs font-medium mb-2 text-text-secondary">最近客户</div>
      <div className="flex-1 space-y-2">
        {[
          { name: '张先生', company: '科技有限公司', status: '意向客户', phone: '138****5678' },
          { name: '李总', company: '餐饮集团', status: '已成交', phone: '139****1234' },
          { name: '王女士', company: '教育机构', status: '跟进中', phone: '137****9012' },
          { name: '赵经理', company: '零售连锁', status: '意向客户', phone: '136****3456' },
        ].map((client) => (
          <div key={client.name} className="bg-bg-secondary/50 rounded-lg px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-medium text-primary-light">
                {client.name[0]}
              </div>
              <div>
                <div className="text-xs font-medium">{client.name}</div>
                <div className="text-[10px] text-text-secondary">{client.company}</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                client.status === '已成交' ? 'bg-green-500/20 text-green-400' :
                client.status === '跟进中' ? 'bg-blue-500/20 text-blue-400' :
                'bg-yellow-500/20 text-yellow-400'
              }`}>
                {client.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-3 w-full py-2 bg-primary rounded-lg text-sm font-medium flex items-center justify-center gap-1 border-0 text-white cursor-pointer">
        <Plus className="w-4 h-4" /> 添加客户
      </button>
    </div>
  )
}

const previews: Record<string, React.ComponentType> = {
  finance: FinancePreview,
  todo: TodoPreview,
  crm: CRMPreview,
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
