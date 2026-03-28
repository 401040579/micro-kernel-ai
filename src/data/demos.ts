import { getTranslations } from '../i18n'

export interface DemoScenario {
  id: string
  name: string
  icon: string
  description: string
  userMessages: string[]
  aiResponses: string[]
  features: { name: string; checked: boolean }[]
  previewType: string
  generationSteps: string[]
  /** Multi-round follow-up conversations */
  followUps?: {
    userMessage: string
    aiResponse: string
    features?: { name: string; checked: boolean }[]
  }[]
}

const demoIds = ['finance', 'todo', 'crm', 'fitness', 'recipe', 'pet', 'travel', 'reading'] as const
const demoIcons: Record<string, string> = {
  finance: 'wallet',
  todo: 'check-square',
  crm: 'users',
  fitness: 'dumbbell',
  recipe: 'chef-hat',
  pet: 'heart',
  travel: 'map',
  reading: 'book-open',
}

/** Build demo scenarios from the current locale translations */
export function getDemoScenarios(): DemoScenario[] {
  const tr = getTranslations()
  const demos = tr.demos as Record<string, {
    name: string
    description: string
    userMessages: string[]
    aiResponses: string[]
    features: string[]
    generationSteps: string[]
    followUps?: {
      userMessage: string
      aiResponse: string
      features?: string[]
    }[]
  }>

  return demoIds.map((id) => {
    const d = demos[id]
    return {
      id,
      name: d.name,
      icon: demoIcons[id],
      description: d.description,
      userMessages: d.userMessages,
      aiResponses: d.aiResponses,
      features: d.features.map((f) => ({ name: f, checked: true })),
      previewType: id,
      generationSteps: d.generationSteps,
      followUps: d.followUps?.map((fu) => ({
        userMessage: fu.userMessage,
        aiResponse: fu.aiResponse,
        features: fu.features?.map((f) => ({ name: f, checked: true })),
      })),
    }
  })
}

/** Keep a static export for backward-compatibility with hooks that import demoScenarios directly.
 *  NOTE: this will always reflect the *current* locale at the time of call. */
export const demoScenarios = getDemoScenarios()
