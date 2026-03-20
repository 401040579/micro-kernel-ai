import type { Template } from '../store/useStore'

export const templates: Template[] = [
  { id: '1', name: '智能记账助手', description: '个人/家庭收支记录，自动分类，月度/年度报表，预算管理', category: '个人工具', rating: 4.8, usageCount: 2340, isPro: false, color: '#10b981', icon: 'wallet' },
  { id: '2', name: '客户CRM系统', description: '客户信息管理，跟进记录，销售漏斗，数据分析', category: '商业管理', rating: 4.6, usageCount: 1890, isPro: false, color: '#6366f1', icon: 'users' },
  { id: '3', name: '在线点餐系统', description: '菜单管理，在线下单，订单追踪，会员优惠', category: '餐饮', rating: 4.7, usageCount: 1560, isPro: false, color: '#f59e0b', icon: 'utensils' },
  { id: '4', name: '会员管理系统', description: '会员注册，积分管理，等级制度，到期提醒', category: '商业管理', rating: 4.5, usageCount: 1230, isPro: false, color: '#8b5cf6', icon: 'crown' },
  { id: '5', name: '课程管理平台', description: '课程排期，学员管理，签到考勤，学习进度', category: '教育', rating: 4.6, usageCount: 980, isPro: false, color: '#3b82f6', icon: 'graduation-cap' },
  { id: '6', name: '健身预约系统', description: '课程预约，教练排班，会员签到，运动记录', category: '健身', rating: 4.4, usageCount: 870, isPro: false, color: '#ef4444', icon: 'dumbbell' },
  { id: '7', name: '库存管理系统', description: '商品入库出库，库存预警，供应商管理，报表统计', category: '零售', rating: 4.5, usageCount: 1100, isPro: false, color: '#14b8a6', icon: 'package' },
  { id: '8', name: '待办清单Pro', description: '任务管理，优先级排序，标签分类，团队协作', category: '个人工具', rating: 4.9, usageCount: 3200, isPro: false, color: '#f97316', icon: 'check-square' },
  { id: '9', name: '个人作品集', description: '作品展示，分类管理，联系表单，响应式布局', category: '个人工具', rating: 4.3, usageCount: 760, isPro: false, color: '#ec4899', icon: 'palette' },
  { id: '10', name: '预约排号系统', description: '在线预约，排队叫号，短信通知，数据统计', category: '商业管理', rating: 4.4, usageCount: 650, isPro: true, color: '#6366f1', icon: 'calendar' },
  { id: '11', name: '外卖配送管理', description: '订单管理，配送调度，骑手管理，实时追踪', category: '餐饮', rating: 4.5, usageCount: 890, isPro: true, color: '#f59e0b', icon: 'truck' },
  { id: '12', name: '电商小程序', description: '商品展示，购物车，订单管理，支付集成', category: '零售', rating: 4.7, usageCount: 2100, isPro: true, color: '#ef4444', icon: 'shopping-cart' },
  { id: '13', name: '在线问卷调查', description: '问卷设计，数据收集，统计分析，导出报告', category: '个人工具', rating: 4.2, usageCount: 540, isPro: false, color: '#8b5cf6', icon: 'clipboard' },
  { id: '14', name: '员工考勤系统', description: '打卡签到，请假审批，加班管理，月度汇总', category: '商业管理', rating: 4.3, usageCount: 780, isPro: true, color: '#3b82f6', icon: 'clock' },
  { id: '15', name: '社区论坛', description: '帖子发布，评论互动，话题分类，用户管理', category: '个人工具', rating: 4.1, usageCount: 430, isPro: false, color: '#14b8a6', icon: 'message-circle' },
  { id: '16', name: '食谱管理', description: '食谱录入，营养计算，购物清单，分享收藏', category: '个人工具', rating: 4.4, usageCount: 620, isPro: false, color: '#f97316', icon: 'chef-hat' },
  { id: '17', name: '物业报修系统', description: '报修提交，工单分配，进度追踪，满意度评价', category: '商业管理', rating: 4.3, usageCount: 510, isPro: true, color: '#10b981', icon: 'wrench' },
  { id: '18', name: '培训签到系统', description: '活动创建，签到管理，证书生成，数据统计', category: '教育', rating: 4.5, usageCount: 670, isPro: false, color: '#ec4899', icon: 'award' },
  { id: '19', name: '停车场管理', description: '车位管理，计费规则，月卡管理，收入统计', category: '商业管理', rating: 4.2, usageCount: 390, isPro: true, color: '#6366f1', icon: 'car' },
  { id: '20', name: '班级管理助手', description: '学生档案，成绩管理，通知公告，家校沟通', category: '教育', rating: 4.6, usageCount: 850, isPro: false, color: '#3b82f6', icon: 'school' },
  { id: '21', name: '宠物店管理', description: '宠物档案，预约服务，寄养管理，消费记录', category: '零售', rating: 4.3, usageCount: 420, isPro: false, color: '#f59e0b', icon: 'heart' },
  { id: '22', name: '旅行规划助手', description: '行程规划，预算管理，景点收藏，游记记录', category: '个人工具', rating: 4.5, usageCount: 930, isPro: false, color: '#ef4444', icon: 'map' },
]

export const categories = ['全部', '个人工具', '商业管理', '餐饮', '零售', '教育', '健身']
