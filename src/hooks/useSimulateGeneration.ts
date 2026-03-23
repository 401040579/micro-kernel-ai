import { useCallback, useRef } from 'react'
import { useStore } from '../store/useStore'
import { demoScenarios } from '../data/demos'

/** Icons for generation steps - mapped by keyword */
const stepIconMap: Record<string, string> = {
  '分析需求': '🔍',
  '设计数据': '🗂️',
  '生成页面': '🖼️',
  '添加交互': '⚡',
  '生成运动': '📊',
  '生成菜谱': '🍽️',
  '生成宠物': '🐾',
  '生成地图': '🗺️',
  '生成书架': '📚',
  '优化性能': '🚀',
  '完成': '✅',
}

function getStepIcon(stepName: string): string {
  for (const [keyword, icon] of Object.entries(stepIconMap)) {
    if (stepName.includes(keyword)) return icon
  }
  return '⚙️'
}

/** Detect dark-mode related requests */
function isDarkModeRequest(input: string): boolean {
  const keywords = ['暗色', '暗黑', '深色', 'dark', '夜间', '护眼']
  return keywords.some((k) => input.toLowerCase().includes(k))
}

/** Detect light-mode related requests */
function isLightModeRequest(input: string): boolean {
  const keywords = ['亮色', '浅色', 'light', '白天', '明亮']
  return keywords.some((k) => input.toLowerCase().includes(k))
}

/** Detect share-related requests */
function isShareRequest(input: string): boolean {
  const keywords = ['分享', '转发', 'share']
  return keywords.some((k) => input.toLowerCase().includes(k))
}

export function useSimulateGeneration() {
  const {
    addMessage, setGeneration, resetGeneration, setPreviewApp,
    setActiveDemo, setDemoFollowUpIndex,
    setPreviewDarkMode,
  } = useStore()
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const clearTimers = useCallback(() => {
    timerRef.current.forEach(clearTimeout)
    timerRef.current = []
  }, [])

  const simulateDemo = useCallback(
    (demoId: string) => {
      clearTimers()
      resetGeneration()
      const scenario = demoScenarios.find((d) => d.id === demoId)
      if (!scenario) return

      setActiveDemo(demoId)
      setDemoFollowUpIndex(0)

      // Step 1: User message
      addMessage({ role: 'user', content: scenario.userMessages[0] })

      // Step 2: AI understanding (after 800ms)
      const t1 = setTimeout(() => {
        setGeneration({ status: 'understanding', currentStep: '正在理解你的需求...' })
      }, 800)
      timerRef.current.push(t1)

      // Step 3: AI response with features (after 2s)
      const t2 = setTimeout(() => {
        setGeneration({ status: 'confirming' })
        addMessage({
          role: 'ai',
          content: scenario.aiResponses[0],
          features: scenario.features,
        })
      }, 2000)
      timerRef.current.push(t2)

      // Step 4: Auto-confirm and start generating (after 4s)
      const t3 = setTimeout(() => {
        const steps = scenario.generationSteps.map((name) => ({
          name,
          done: false,
          icon: getStepIcon(name),
        }))
        setGeneration({ status: 'generating', progress: 0, steps, currentStep: steps[0].name })
      }, 4000)
      timerRef.current.push(t3)

      // Step 5: Progress updates
      scenario.generationSteps.forEach((step, i) => {
        const delay = 4000 + (i + 1) * 1000
        const t = setTimeout(() => {
          const progress = Math.round(((i + 1) / scenario.generationSteps.length) * 100)
          const currentSteps = useStore.getState().generation.steps
          const updatedSteps = currentSteps.map((s, idx) => ({
            ...s,
            done: idx <= i,
          }))
          setGeneration({
            status: 'generating',
            progress,
            steps: updatedSteps,
            currentStep: i < scenario.generationSteps.length - 1 ? scenario.generationSteps[i + 1] : step,
          })
        }, delay)
        timerRef.current.push(t)
      })

      // Step 6: Done
      const totalDelay = 4000 + scenario.generationSteps.length * 1000 + 500
      const tDone = setTimeout(() => {
        setGeneration({ status: 'done', progress: 100 })
        setPreviewApp(scenario.previewType)
        addMessage({
          role: 'ai',
          content:
            '你的应用已生成！可以在右侧预览效果。\n\n你可以继续说出修改需求，比如：\n- "加个暗色模式"\n- "加一个搜索功能"\n- "加个分享功能"',
        })
      }, totalDelay)
      timerRef.current.push(tDone)
    },
    [addMessage, setGeneration, resetGeneration, setPreviewApp, setActiveDemo, setDemoFollowUpIndex, clearTimers],
  )

  const simulateCustomInput = useCallback(
    (input: string) => {
      addMessage({ role: 'user', content: input })
      clearTimers()

      const state = useStore.getState()
      const activeDemo = state.activeDemo
      const followUpIdx = state.demoFollowUpIndex
      const scenario = activeDemo ? demoScenarios.find((d) => d.id === activeDemo) : null
      const followUp = scenario?.followUps?.[followUpIdx]

      // Check for special modification requests
      const isDarkMode = isDarkModeRequest(input)
      const isLightMode = isLightModeRequest(input)
      const isShare = isShareRequest(input)

      // Generate modification steps
      const modSteps = [
        { name: '分析修改需求...', done: false, icon: '🔍' },
        { name: '更新页面组件...', done: false, icon: '🖼️' },
        { name: '重新渲染预览...', done: false, icon: '🔄' },
        { name: '完成！', done: false, icon: '✅' },
      ]

      const t1 = setTimeout(() => {
        setGeneration({
          status: 'understanding',
          currentStep: '正在理解你的修改需求...',
        })
      }, 500)
      timerRef.current.push(t1)

      const t2 = setTimeout(() => {
        setGeneration({
          status: 'generating',
          progress: 0,
          steps: modSteps,
          currentStep: modSteps[0].name,
        })
      }, 1200)
      timerRef.current.push(t2)

      // Animate through steps
      modSteps.forEach((step, i) => {
        const delay = 1200 + (i + 1) * 700
        const t = setTimeout(() => {
          const progress = Math.round(((i + 1) / modSteps.length) * 100)
          setGeneration({
            status: 'generating',
            progress,
            steps: modSteps.map((s, idx) => ({ ...s, done: idx <= i })),
            currentStep: i < modSteps.length - 1 ? modSteps[i + 1].name : step.name,
          })
        }, delay)
        timerRef.current.push(t)
      })

      const totalDelay = 1200 + modSteps.length * 700 + 400

      const tDone = setTimeout(() => {
        // Apply dark mode toggle if requested
        if (isDarkMode) {
          setPreviewDarkMode(true)
        } else if (isLightMode) {
          setPreviewDarkMode(false)
        }

        setGeneration({ status: 'done', progress: 100 })

        // Use demo follow-up response if available
        if (followUp && !isDarkMode && !isLightMode && !isShare) {
          addMessage({
            role: 'ai',
            content: followUp.aiResponse,
            features: followUp.features,
          })
          setDemoFollowUpIndex(followUpIdx + 1)
        } else if (isDarkMode) {
          addMessage({
            role: 'ai',
            content: '已切换到暗色模式！界面更柔和，适合在昏暗环境下使用。你可以在右侧预览中看到效果。\n\n继续提出修改需求吧！',
          })
        } else if (isLightMode) {
          addMessage({
            role: 'ai',
            content: '已切换到亮色模式！界面更清爽明亮。你可以在右侧预览中看到效果。\n\n继续提出修改需求吧！',
          })
        } else if (isShare) {
          addMessage({
            role: 'ai',
            content: '已添加分享功能！现在可以将内容一键分享到微信、朋友圈等社交平台，还支持生成精美卡片图片。\n\n还有什么需要修改的吗？',
          })
        } else {
          addMessage({
            role: 'ai',
            content: `好的，已根据你的要求进行了修改："${input}"。\n\n请在右侧查看更新后的预览效果。你可以继续提出修改需求。`,
          })
          // Advance follow-up index even for custom input so next follow-up is fresh
          if (scenario?.followUps && followUpIdx < scenario.followUps.length) {
            setDemoFollowUpIndex(followUpIdx + 1)
          }
        }
      }, totalDelay)
      timerRef.current.push(tDone)
    },
    [addMessage, setGeneration, clearTimers, setDemoFollowUpIndex, setPreviewDarkMode],
  )

  return { simulateDemo, simulateCustomInput, clearTimers }
}
