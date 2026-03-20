import { useCallback, useRef } from 'react'
import { useStore } from '../store/useStore'
import { demoScenarios } from '../data/demos'

export function useSimulateGeneration() {
  const { addMessage, setGeneration, resetGeneration, setPreviewApp } = useStore()
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
        const steps = scenario.generationSteps.map((name) => ({ name, done: false }))
        setGeneration({ status: 'generating', progress: 0, steps, currentStep: steps[0].name })
      }, 4000)
      timerRef.current.push(t3)

      // Step 5: Progress updates
      scenario.generationSteps.forEach((step, i) => {
        const delay = 4000 + (i + 1) * 1200
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
      const totalDelay = 4000 + scenario.generationSteps.length * 1200 + 500
      const tDone = setTimeout(() => {
        setGeneration({ status: 'done', progress: 100 })
        setPreviewApp(scenario.previewType)
        addMessage({
          role: 'ai',
          content:
            '你的应用已生成！可以在右侧预览效果。\n\n你可以继续说出修改需求，比如：\n- "把颜色改成蓝色"\n- "加一个搜索功能"\n- "数据按日期排序"',
        })
      }, totalDelay)
      timerRef.current.push(tDone)
    },
    [addMessage, setGeneration, resetGeneration, setPreviewApp, clearTimers],
  )

  const simulateCustomInput = useCallback(
    (input: string) => {
      addMessage({ role: 'user', content: input })

      const t1 = setTimeout(() => {
        setGeneration({ status: 'understanding', currentStep: '正在理解你的需求...' })
      }, 500)
      timerRef.current.push(t1)

      const t2 = setTimeout(() => {
        setGeneration({ status: 'generating', progress: 30, currentStep: '正在更新应用...' })
      }, 1500)
      timerRef.current.push(t2)

      const t3 = setTimeout(() => {
        setGeneration({ status: 'generating', progress: 70, currentStep: '应用修改中...' })
      }, 2500)
      timerRef.current.push(t3)

      const t4 = setTimeout(() => {
        setGeneration({ status: 'done', progress: 100 })
        addMessage({
          role: 'ai',
          content: `好的，已根据你的要求进行了修改："${input}"。请在右侧查看更新后的预览效果。\n\n你可以继续提出修改需求。`,
        })
      }, 3500)
      timerRef.current.push(t4)
    },
    [addMessage, setGeneration],
  )

  return { simulateDemo, simulateCustomInput, clearTimers }
}
