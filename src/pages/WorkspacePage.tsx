import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mic, Send, Cpu, Check, Loader2, Smartphone, Monitor, Tablet,
  Wallet, CheckSquare, Users, Sparkles, RotateCcw,
  Dumbbell, ChefHat, Heart, Map, BookOpen,
  Moon, Sun,
} from 'lucide-react'
import { useStore } from '../store/useStore'
import { useSimulateGeneration } from '../hooks/useSimulateGeneration'
import { demoScenarios } from '../data/demos'
import AppPreview from '../components/AppPreview'

const iconMap: Record<string, React.ComponentType<any>> = {
  wallet: Wallet,
  'check-square': CheckSquare,
  users: Users,
  dumbbell: Dumbbell,
  'chef-hat': ChefHat,
  heart: Heart,
  map: Map,
  'book-open': BookOpen,
}

export default function WorkspacePage() {
  const [input, setInput] = useState('')
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'tablet' | 'desktop'>('mobile')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const {
    messages, generation, previewApp,
    clearMessages, resetGeneration, setPreviewApp,
    previewDarkMode, togglePreviewDarkMode,
    setActiveDemo, setDemoFollowUpIndex,
  } = useStore()
  const { simulateDemo, simulateCustomInput } = useSimulateGeneration()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return
    simulateCustomInput(input.trim())
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleReset = () => {
    clearMessages()
    resetGeneration()
    setPreviewApp(null)
    setActiveDemo(null)
    setDemoFollowUpIndex(0)
  }

  const showInitial = messages.length === 0

  return (
    <div className="pt-14 h-dvh flex flex-col">
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left: Chat area */}
        <div className="flex-1 lg:w-1/2 flex flex-col border-r border-border/30 min-h-0">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {showInitial ? (
              <div className="h-full flex flex-col items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center max-w-lg"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-primary-light" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">告诉我你的想法</h2>
                  <p className="text-sm text-text-secondary mb-6">
                    用自然语言描述你想要的应用，或者选择一个Demo场景快速体验
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {demoScenarios.map((demo) => {
                      const Icon = iconMap[demo.icon] || Sparkles
                      return (
                        <button
                          key={demo.id}
                          onClick={() => simulateDemo(demo.id)}
                          className="flex flex-col items-center gap-1.5 p-3 bg-bg-secondary/50 border border-border/50 rounded-xl hover:border-primary/50 hover:bg-bg-secondary transition-all cursor-pointer text-left group"
                        >
                          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <Icon className="w-4.5 h-4.5 text-primary-light" />
                          </div>
                          <span className="text-xs font-medium text-center">{demo.name}</span>
                          <span className="text-[10px] text-text-secondary text-center leading-tight">{demo.description}</span>
                        </button>
                      )
                    })}
                  </div>
                </motion.div>
              </div>
            ) : (
              <>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}
                  >
                    {msg.role === 'ai' && (
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <Cpu className="w-4 h-4 text-primary-light" />
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] rounded-xl px-4 py-3 text-sm whitespace-pre-wrap ${
                        msg.role === 'user'
                          ? 'bg-primary/20 rounded-tr-sm'
                          : 'bg-bg-tertiary/50 rounded-tl-sm'
                      }`}
                    >
                      {msg.content}
                      {msg.features && (
                        <div className="mt-3 space-y-1.5">
                          {msg.features.map((f) => (
                            <div key={f.name} className="flex items-center gap-2">
                              <div className="w-4 h-4 rounded border border-success bg-success/20 flex items-center justify-center">
                                <Check className="w-3 h-3 text-success" />
                              </div>
                              <span>{f.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {generation.status === 'understanding' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <Cpu className="w-4 h-4 text-primary-light" />
                    </div>
                    <div className="bg-bg-tertiary/50 rounded-xl rounded-tl-sm px-4 py-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-primary-light typing-dot" />
                        <div className="w-2 h-2 rounded-full bg-primary-light typing-dot" />
                        <div className="w-2 h-2 rounded-full bg-primary-light typing-dot" />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Generation progress */}
          <AnimatePresence>
            {generation.status === 'generating' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-border/30 px-4 py-3 bg-bg-secondary/30"
              >
                <div className="flex items-center justify-between text-xs text-text-secondary mb-2">
                  <span className="flex items-center gap-1.5">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    {generation.currentStep}
                  </span>
                  <span>{generation.progress}%</span>
                </div>
                <div className="h-1.5 bg-bg-tertiary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-purple-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${generation.progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                {generation.steps && generation.steps.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {generation.steps.map((step) => (
                      <div key={step.name} className="flex items-center gap-2 text-xs">
                        {step.done ? (
                          <span className="text-xs w-4 text-center">{step.icon || '✅'}</span>
                        ) : step.name === generation.currentStep ? (
                          <Loader2 className="w-3.5 h-3.5 text-primary-light animate-spin ml-0.5" />
                        ) : (
                          <div className="w-3.5 h-3.5 rounded-full border border-text-secondary/30 ml-0.5" />
                        )}
                        <span className={
                          step.done
                            ? 'text-text-secondary line-through'
                            : step.name === generation.currentStep
                              ? 'text-primary-light font-medium'
                              : 'text-text-primary'
                        }>
                          {step.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input area */}
          <div className="border-t border-border/30 p-3">
            <div className="flex items-end gap-2">
              {messages.length > 0 && (
                <button
                  onClick={handleReset}
                  className="p-2 text-text-secondary hover:text-text-primary bg-transparent border-0 cursor-pointer transition-colors shrink-0"
                  title="重新开始"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              )}
              <button className="p-2 text-text-secondary hover:text-primary bg-transparent border-0 cursor-pointer transition-colors shrink-0">
                <Mic className="w-5 h-5" />
              </button>
              <div className="flex-1 bg-bg-secondary border border-border/50 rounded-xl flex items-end focus-within:border-primary/50 transition-colors">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={previewApp ? '输入修改需求，如"加个暗色模式"...' : '输入你的想法...'}
                  rows={1}
                  className="flex-1 bg-transparent border-0 outline-none text-sm text-text-primary placeholder:text-text-secondary/50 px-3 py-2.5 resize-none max-h-24"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="p-2 mr-1 text-primary hover:text-primary-light disabled:text-text-secondary/30 bg-transparent border-0 cursor-pointer transition-colors disabled:cursor-not-allowed shrink-0"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Preview area */}
        <div className="flex-1 lg:w-1/2 flex flex-col min-h-0 bg-bg-primary/50">
          {/* Preview toolbar */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-border/30">
            <span className="text-xs text-text-secondary">实时预览</span>
            <div className="flex items-center gap-1">
              {/* Dark mode toggle */}
              {previewApp && (
                <button
                  onClick={togglePreviewDarkMode}
                  className="p-1.5 rounded-md transition-colors cursor-pointer border-0 text-text-secondary hover:text-text-primary bg-transparent mr-1"
                  title={previewDarkMode ? '切换亮色' : '切换暗色'}
                >
                  {previewDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              )}
              {([
                { key: 'mobile', icon: Smartphone },
                { key: 'tablet', icon: Tablet },
                { key: 'desktop', icon: Monitor },
              ] as const).map(({ key, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setPreviewDevice(key)}
                  className={`p-1.5 rounded-md transition-colors cursor-pointer border-0 ${
                    previewDevice === key
                      ? 'bg-primary/20 text-primary-light'
                      : 'text-text-secondary hover:text-text-primary bg-transparent'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Preview content */}
          <div className="flex-1 flex items-center justify-center p-4 overflow-auto">
            {previewApp ? (
              <div
                className={`bg-bg-secondary rounded-2xl border border-border/50 overflow-hidden shadow-2xl shadow-black/30 transition-all duration-300 ${
                  previewDevice === 'mobile'
                    ? 'w-[280px] h-[560px]'
                    : previewDevice === 'tablet'
                    ? 'w-[480px] h-[640px]'
                    : 'w-full max-w-[700px] h-[500px]'
                }`}
              >
                <div className="h-full">
                  <AppPreview type={previewApp} />
                </div>
              </div>
            ) : (
              <div className="text-center text-text-secondary">
                <div className="w-20 h-20 rounded-2xl bg-bg-secondary/50 border border-border/30 flex items-center justify-center mx-auto mb-4">
                  <Monitor className="w-10 h-10 text-text-secondary/30" />
                </div>
                <p className="text-sm">在左侧输入需求或选择Demo场景</p>
                <p className="text-xs mt-1 text-text-secondary/60">预览将在这里展示</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
