import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Cpu, Mic, ArrowRight, Zap, Clock, Globe, Sparkles,
  Check, ChevronRight, MessageSquare, Code2, Layers,
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function LandingPage() {
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState('')

  const handleStart = () => {
    navigate('/workspace')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      navigate('/workspace')
    }
  }

  return (
    <div className="min-h-dvh">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/60 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-lg">MicroKernel AI</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-text-secondary">
            <a href="#features" className="hover:text-text-primary transition-colors no-underline">特色</a>
            <a href="#demo" className="hover:text-text-primary transition-colors no-underline">演示</a>
            <a href="#pricing" className="hover:text-text-primary transition-colors no-underline">定价</a>
          </div>
          <button
            onClick={handleStart}
            className="px-4 py-1.5 bg-primary hover:bg-primary-hover text-white text-sm rounded-lg transition-colors cursor-pointer border-0"
          >
            免费试用
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary-light text-sm mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              AI驱动的下一代软件构建平台
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            用嘴说，用手指，
            <br />
            <span className="bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent">
              软件自动成型。
            </span>
          </motion.h1>

          <motion.p
            className="text-lg text-text-secondary mb-10 max-w-2xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            让每个有想法的人都能在5分钟内将想法变成可运行的软件，无需任何技术背景。
            只需描述你的需求，AI自动生成完整应用。
          </motion.p>

          <motion.form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto mb-8"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative flex items-center bg-bg-secondary border border-border rounded-2xl p-2 focus-within:border-primary/50 transition-colors shadow-lg shadow-black/20">
              <button type="button" className="p-2.5 text-text-secondary hover:text-primary transition-colors bg-transparent border-0 cursor-pointer">
                <Mic className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="说出你的想法，比如：我想做一个记账App..."
                className="flex-1 bg-transparent border-0 outline-none text-text-primary placeholder:text-text-secondary/60 text-base px-2"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl text-sm font-medium transition-colors cursor-pointer border-0 flex items-center gap-1.5"
              >
                开始创造
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.form>

          <motion.div
            className="flex flex-wrap justify-center gap-3 text-sm text-text-secondary"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span>热门：</span>
            {['记账App', '待办清单', '客户管理', '点餐系统'].map((item) => (
              <button
                key={item}
                onClick={() => { setInputValue(item); navigate('/workspace') }}
                className="px-3 py-1 rounded-full bg-bg-tertiary/50 hover:bg-bg-tertiary text-text-secondary hover:text-text-primary transition-colors cursor-pointer border border-border/50 text-sm"
              >
                {item}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-3xl font-bold mb-3">看看有多简单</h2>
            <p className="text-text-secondary">三步完成，从想法到应用</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          >
            {[
              { step: '01', title: '描述需求', desc: '用自然语言说出你想要什么应用', icon: MessageSquare, color: 'from-blue-500 to-indigo-500' },
              { step: '02', title: 'AI生成', desc: '系统自动理解需求并生成完整代码', icon: Code2, color: 'from-indigo-500 to-purple-500' },
              { step: '03', title: '预览发布', desc: '实时预览、迭代修改、一键部署上线', icon: Layers, color: 'from-purple-500 to-pink-500' },
            ].map((item) => (
              <motion.div
                key={item.step}
                variants={fadeUp}
                className="relative bg-bg-secondary/50 border border-border/50 rounded-2xl p-6 hover:border-primary/30 transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-xs text-primary-light font-mono mb-2">STEP {item.step}</div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-text-secondary text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Animated Demo Preview */}
          <motion.div
            className="mt-16 bg-bg-secondary/50 border border-border/50 rounded-2xl overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="ml-2 text-xs text-text-secondary">MicroKernel AI - 工作台</span>
            </div>
            <div className="grid md:grid-cols-2 min-h-[300px]">
              {/* Chat side */}
              <div className="p-6 border-r border-border/50">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <Cpu className="w-4 h-4 text-primary-light" />
                    </div>
                    <div className="bg-bg-tertiary/50 rounded-xl rounded-tl-sm px-4 py-3 text-sm">
                      你好！告诉我你想做什么样的应用？
                    </div>
                  </div>
                  <div className="flex gap-3 justify-end">
                    <div className="bg-primary/20 rounded-xl rounded-tr-sm px-4 py-3 text-sm max-w-[80%]">
                      我想做一个记账App，记录收入支出，月底出报表
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <Cpu className="w-4 h-4 text-primary-light" />
                    </div>
                    <div className="bg-bg-tertiary/50 rounded-xl rounded-tl-sm px-4 py-3 text-sm">
                      <p className="mb-2">我理解你需要：</p>
                      <div className="space-y-1.5">
                        {['收支记录', '分类管理', '月度报表', '数据图表'].map((f) => (
                          <div key={f} className="flex items-center gap-2 text-success">
                            <Check className="w-3.5 h-3.5" />
                            <span className="text-text-primary">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Preview side */}
              <div className="p-6 flex items-center justify-center bg-bg-primary/50">
                <div className="w-48 bg-bg-secondary rounded-2xl border border-border/50 overflow-hidden shadow-2xl">
                  <div className="px-3 py-2 bg-primary/10 text-center text-xs font-medium text-primary-light">
                    记账助手
                  </div>
                  <div className="p-3 space-y-2">
                    <div className="text-center">
                      <div className="text-xs text-text-secondary">本月支出</div>
                      <div className="text-lg font-bold text-text-primary">-3,280</div>
                    </div>
                    <div className="h-px bg-border/50" />
                    {[
                      { label: '午餐', amount: '-45', color: 'bg-orange-400' },
                      { label: '地铁', amount: '-6', color: 'bg-blue-400' },
                      { label: '工资', amount: '+8000', color: 'bg-green-400' },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5">
                          <div className={`w-2 h-2 rounded-full ${item.color}`} />
                          <span>{item.label}</span>
                        </div>
                        <span className={item.amount.startsWith('+') ? 'text-success' : 'text-text-secondary'}>
                          {item.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 bg-bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-3xl font-bold mb-3">为什么选择 MicroKernel AI</h2>
            <p className="text-text-secondary">基于微内核架构，让AI生成更可靠的软件</p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {[
              { icon: Mic, title: '语音驱动', desc: '说话即开发。语音描述比打字快3-4倍，通勤路上也能构建应用', color: 'text-blue-400' },
              { icon: Zap, title: '5分钟成型', desc: '从想法到可运行的MVP，只需5分钟。告别漫长的开发周期', color: 'text-yellow-400' },
              { icon: Globe, title: '全平台发布', desc: '一次生成，部署到Web、iOS、Android。一键发布，即时上线', color: 'text-green-400' },
              { icon: Layers, title: '微内核架构', desc: '插件化设计，功能可热插拔。AI生成独立模块，更可靠更灵活', color: 'text-purple-400' },
              { icon: Clock, title: '实时预览', desc: '边说边看效果。增量修改实时反映，保持完整的掌控感', color: 'text-pink-400' },
              { icon: Code2, title: '代码可导出', desc: '不锁定用户。随时导出标准React/Vue代码，完全可控', color: 'text-indigo-400' },
            ].map((feat) => (
              <motion.div
                key={feat.title}
                variants={fadeUp}
                className="bg-bg-secondary/50 border border-border/30 rounded-xl p-6 hover:border-primary/30 transition-all"
              >
                <feat.icon className={`w-8 h-8 ${feat.color} mb-4`} />
                <h3 className="font-semibold mb-2">{feat.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-3xl font-bold mb-3">简单透明的定价</h2>
            <p className="text-text-secondary">比外包便宜100倍，比SaaS更贴合你的业务</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          >
            {[
              {
                name: 'Free',
                price: '0',
                desc: '免费体验核心功能',
                features: ['每月3个项目', '基础UI组件', 'Web预览', '社区模板', '每项目5轮对话'],
                cta: '免费开始',
                highlighted: false,
              },
              {
                name: 'Pro',
                price: '19.99',
                desc: '专业创作者的首选',
                features: ['无限项目', '全部组件与模板', '全平台导出', '自定义域名', '无限对话迭代', '优先AI处理', '导出源代码'],
                cta: '升级 Pro',
                highlighted: true,
              },
              {
                name: 'Team',
                price: '39.99',
                desc: '团队协作无限可能',
                features: ['Pro全部功能', '最多10人协作', '版本管理', '私有模板', '团队管理后台'],
                cta: '联系我们',
                highlighted: false,
              },
            ].map((plan) => (
              <motion.div
                key={plan.name}
                variants={fadeUp}
                className={`rounded-2xl p-6 border ${
                  plan.highlighted
                    ? 'bg-gradient-to-b from-primary/10 to-bg-secondary border-primary/50 relative'
                    : 'bg-bg-secondary/50 border-border/50'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-primary rounded-full text-xs font-medium text-white">
                    最受欢迎
                  </div>
                )}
                <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
                <p className="text-text-secondary text-sm mb-4">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-3xl font-bold">${plan.price}</span>
                  {plan.price !== '0' && <span className="text-text-secondary text-sm">/月</span>}
                </div>
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={handleStart}
                  className={`w-full py-2.5 rounded-xl text-sm font-medium cursor-pointer border-0 transition-colors ${
                    plan.highlighted
                      ? 'bg-primary hover:bg-primary-hover text-white'
                      : 'bg-bg-tertiary hover:bg-border text-text-primary'
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <motion.div
          className="max-w-3xl mx-auto text-center bg-gradient-to-br from-primary/20 to-purple-500/10 rounded-3xl p-12 border border-primary/20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-3xl font-bold mb-4">准备好把想法变成现实了吗？</h2>
          <p className="text-text-secondary mb-8">无需注册，立即免费体验AI生成应用的魔力</p>
          <button
            onClick={handleStart}
            className="px-8 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl text-base font-medium cursor-pointer border-0 transition-colors inline-flex items-center gap-2 pulse-glow"
          >
            免费试试
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text-secondary">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <Cpu className="w-3.5 h-3.5 text-white" />
            </div>
            <span>MicroKernel AI</span>
          </div>
          <p>2026 MicroKernel AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
