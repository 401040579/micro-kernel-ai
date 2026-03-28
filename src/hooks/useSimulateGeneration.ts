import { useCallback, useRef } from 'react'
import { useStore } from '../store/useStore'
import { getDemoScenarios } from '../data/demos'
import { getTranslations } from '../i18n'

/** Icons for generation steps - mapped by keyword (works for both EN and ZH) */
const stepIconMap: Record<string, string> = {
  // Chinese keywords
  '分析需求': '\uD83D\uDD0D',
  '设计数据': '\uD83D\uDDC2\uFE0F',
  '生成页面': '\uD83D\uDDBC\uFE0F',
  '添加交互': '\u26A1',
  '生成运动': '\uD83D\uDCCA',
  '生成菜谱': '\uD83C\uDF7D\uFE0F',
  '生成宠物': '\uD83D\uDC3E',
  '生成地图': '\uD83D\uDDFA\uFE0F',
  '生成书架': '\uD83D\uDCDA',
  '优化性能': '\uD83D\uDE80',
  '完成': '\u2705',
  // English keywords
  'Analyzing': '\uD83D\uDD0D',
  'Designing': '\uD83D\uDDC2\uFE0F',
  'Generating page': '\uD83D\uDDBC\uFE0F',
  'Adding': '\u26A1',
  'Generating workout': '\uD83D\uDCCA',
  'Generating recipe': '\uD83C\uDF7D\uFE0F',
  'Generating pet': '\uD83D\uDC3E',
  'Generating map': '\uD83D\uDDFA\uFE0F',
  'Generating bookshelf': '\uD83D\uDCDA',
  'Optimizing': '\uD83D\uDE80',
  'Done': '\u2705',
  // Modify flow
  '分析修改': '\uD83D\uDD0D',
  '更新页面': '\uD83D\uDDBC\uFE0F',
  '重新渲染': '\uD83D\uDD04',
  'Analyzing modification': '\uD83D\uDD0D',
  'Updating': '\uD83D\uDDBC\uFE0F',
  'Re-rendering': '\uD83D\uDD04',
}

function getStepIcon(stepName: string): string {
  for (const [keyword, icon] of Object.entries(stepIconMap)) {
    if (stepName.includes(keyword)) return icon
  }
  return '\u2699\uFE0F'
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
      const scenarios = getDemoScenarios()
      const scenario = scenarios.find((d) => d.id === demoId)
      if (!scenario) return

      const tr = getTranslations()

      setActiveDemo(demoId)
      setDemoFollowUpIndex(0)

      // Step 1: User message
      addMessage({ role: 'user', content: scenario.userMessages[0] })

      // Step 2: AI understanding (after 800ms)
      const t1 = setTimeout(() => {
        setGeneration({ status: 'understanding', currentStep: tr.generation.understanding })
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
          content: tr.generation.appGenerated,
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

      const tr = getTranslations()
      const state = useStore.getState()
      const activeDemo = state.activeDemo
      const followUpIdx = state.demoFollowUpIndex
      const scenarios = getDemoScenarios()
      const scenario = activeDemo ? scenarios.find((d) => d.id === activeDemo) : null
      const followUp = scenario?.followUps?.[followUpIdx]

      // Check for special modification requests
      const isDarkMode = isDarkModeRequest(input)
      const isLightMode = isLightModeRequest(input)
      const isShare = isShareRequest(input)

      // Generate modification steps
      const modSteps = [
        { name: tr.generation.analyzingModify, done: false, icon: '\uD83D\uDD0D' },
        { name: tr.generation.updatingComponents, done: false, icon: '\uD83D\uDDBC\uFE0F' },
        { name: tr.generation.reRendering, done: false, icon: '\uD83D\uDD04' },
        { name: tr.generation.done, done: false, icon: '\u2705' },
      ]

      const t1 = setTimeout(() => {
        setGeneration({
          status: 'understanding',
          currentStep: tr.generation.understandingModify,
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
            content: tr.generation.darkModeResponse,
          })
        } else if (isLightMode) {
          addMessage({
            role: 'ai',
            content: tr.generation.lightModeResponse,
          })
        } else if (isShare) {
          addMessage({
            role: 'ai',
            content: tr.generation.shareResponse,
          })
        } else {
          addMessage({
            role: 'ai',
            content: tr.generation.customModifyResponse(input),
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
