import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Cpu, Mic, ArrowRight, Zap, Clock, Globe, Sparkles,
  Check, ChevronRight, MessageSquare, Code2, Layers,
} from 'lucide-react'
import { useTranslations, useI18n } from '../i18n'
import LanguageSwitcher from '../components/LanguageSwitcher'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

const featureIcons = [Mic, Zap, Globe, Layers, Clock, Code2]
const featureColors = [
  'text-blue-400', 'text-yellow-400', 'text-green-400',
  'text-purple-400', 'text-pink-400', 'text-indigo-400',
]

const stepIcons = [MessageSquare, Code2, Layers]
const stepColors = [
  'from-blue-500 to-indigo-500',
  'from-indigo-500 to-purple-500',
  'from-purple-500 to-pink-500',
]

export default function LandingPage() {
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState('')
  const tr = useTranslations()
  const { t } = useI18n()

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
            <a href="#features" className="hover:text-text-primary transition-colors no-underline">{t('landing.nav.features')}</a>
            <a href="#demo" className="hover:text-text-primary transition-colors no-underline">{t('landing.nav.demo')}</a>
            <a href="#pricing" className="hover:text-text-primary transition-colors no-underline">{t('landing.nav.pricing')}</a>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={handleStart}
              className="px-4 py-1.5 bg-primary hover:bg-primary-hover text-white text-sm rounded-lg transition-colors cursor-pointer border-0"
            >
              {t('common.tryFree')}
            </button>
          </div>
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
              {t('landing.badge')}
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t('landing.heroTitle1')}
            <br />
            <span className="bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {t('landing.heroTitle2')}
            </span>
          </motion.h1>

          <motion.p
            className="text-lg text-text-secondary mb-10 max-w-2xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('landing.heroSubtitle')}
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
                placeholder={t('landing.inputPlaceholder')}
                className="flex-1 bg-transparent border-0 outline-none text-text-primary placeholder:text-text-secondary/60 text-base px-2"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl text-sm font-medium transition-colors cursor-pointer border-0 flex items-center gap-1.5"
              >
                {t('landing.startCreating')}
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
            <span>{t('landing.trending')}</span>
            {(tr.landing.trendingItems as string[]).map((item: string) => (
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
            <h2 className="text-3xl font-bold mb-3">{t('landing.demoTitle')}</h2>
            <p className="text-text-secondary">{t('landing.demoSubtitle')}</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          >
            {(tr.landing.steps as { title: string; desc: string }[]).map((item: { title: string; desc: string }, i: number) => {
              const Icon = stepIcons[i]
              const step = String(i + 1).padStart(2, '0')
              return (
                <motion.div
                  key={step}
                  variants={fadeUp}
                  className="relative bg-bg-secondary/50 border border-border/50 rounded-2xl p-6 hover:border-primary/30 transition-all group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stepColors[i]} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-xs text-primary-light font-mono mb-2">STEP {step}</div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-text-secondary text-sm">{item.desc}</p>
                </motion.div>
              )
            })}
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
              <span className="ml-2 text-xs text-text-secondary">{t('landing.demoWindowTitle')}</span>
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
                      {t('landing.demoChat.aiGreeting')}
                    </div>
                  </div>
                  <div className="flex gap-3 justify-end">
                    <div className="bg-primary/20 rounded-xl rounded-tr-sm px-4 py-3 text-sm max-w-[80%]">
                      {t('landing.demoChat.userMsg')}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <Cpu className="w-4 h-4 text-primary-light" />
                    </div>
                    <div className="bg-bg-tertiary/50 rounded-xl rounded-tl-sm px-4 py-3 text-sm">
                      <p className="mb-2">{t('landing.demoChat.aiUnderstand')}</p>
                      <div className="space-y-1.5">
                        {(tr.landing.demoChat.features as string[]).map((f: string) => (
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
                    {t('landing.demoPreview.title')}
                  </div>
                  <div className="p-3 space-y-2">
                    <div className="text-center">
                      <div className="text-xs text-text-secondary">{t('landing.demoPreview.monthlyExpense')}</div>
                      <div className="text-lg font-bold text-text-primary">-3,280</div>
                    </div>
                    <div className="h-px bg-border/50" />
                    {[
                      { label: t('landing.demoPreview.lunch'), amount: '-45', color: 'bg-orange-400' },
                      { label: t('landing.demoPreview.subway'), amount: '-6', color: 'bg-blue-400' },
                      { label: t('landing.demoPreview.salary'), amount: '+8000', color: 'bg-green-400' },
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
            <h2 className="text-3xl font-bold mb-3">{t('landing.featuresTitle')}</h2>
            <p className="text-text-secondary">{t('landing.featuresSubtitle')}</p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {(tr.landing.featuresList as { title: string; desc: string }[]).map((feat: { title: string; desc: string }, i: number) => {
              const Icon = featureIcons[i]
              return (
                <motion.div
                  key={feat.title}
                  variants={fadeUp}
                  className="bg-bg-secondary/50 border border-border/30 rounded-xl p-6 hover:border-primary/30 transition-all"
                >
                  <Icon className={`w-8 h-8 ${featureColors[i]} mb-4`} />
                  <h3 className="font-semibold mb-2">{feat.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{feat.desc}</p>
                </motion.div>
              )
            })}
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
            <h2 className="text-3xl font-bold mb-3">{t('landing.pricingTitle')}</h2>
            <p className="text-text-secondary">{t('landing.pricingSubtitle')}</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          >
            {([
              { price: '0', highlighted: false },
              { price: '19.99', highlighted: true },
              { price: '39.99', highlighted: false },
            ]).map((meta, i) => {
              const plan = (tr.landing.plans as { name: string; desc: string; features: string[]; cta: string }[])[i]
              return (
                <motion.div
                  key={plan.name}
                  variants={fadeUp}
                  className={`rounded-2xl p-6 border ${
                    meta.highlighted
                      ? 'bg-gradient-to-b from-primary/10 to-bg-secondary border-primary/50 relative'
                      : 'bg-bg-secondary/50 border-border/50'
                  }`}
                >
                  {meta.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-primary rounded-full text-xs font-medium text-white">
                      {t('landing.mostPopular')}
                    </div>
                  )}
                  <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
                  <p className="text-text-secondary text-sm mb-4">{plan.desc}</p>
                  <div className="mb-6">
                    <span className="text-3xl font-bold">${meta.price}</span>
                    {meta.price !== '0' && <span className="text-text-secondary text-sm">{t('landing.perMonth')}</span>}
                  </div>
                  <ul className="space-y-2.5 mb-6">
                    {plan.features.map((f: string) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={handleStart}
                    className={`w-full py-2.5 rounded-xl text-sm font-medium cursor-pointer border-0 transition-colors ${
                      meta.highlighted
                        ? 'bg-primary hover:bg-primary-hover text-white'
                        : 'bg-bg-tertiary hover:bg-border text-text-primary'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </motion.div>
              )
            })}
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
          <h2 className="text-3xl font-bold mb-4">{t('landing.ctaTitle')}</h2>
          <p className="text-text-secondary mb-8">{t('landing.ctaSubtitle')}</p>
          <button
            onClick={handleStart}
            className="px-8 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl text-base font-medium cursor-pointer border-0 transition-colors inline-flex items-center gap-2 pulse-glow"
          >
            {t('landing.ctaButton')}
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
          <p>{t('landing.footer')}</p>
        </div>
      </footer>
    </div>
  )
}
