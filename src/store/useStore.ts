import { create } from 'zustand'

export interface Message {
  id: string
  role: 'user' | 'ai'
  content: string
  timestamp: number
  features?: { name: string; checked: boolean }[]
  isGenerating?: boolean
}

export interface Project {
  id: string
  name: string
  description: string
  updatedAt: string
  status: 'draft' | 'published'
  previewType: string
}

export interface Template {
  id: string
  name: string
  description: string
  category: string
  rating: number
  usageCount: number
  isPro: boolean
  color: string
  icon: string
}

export interface GenerationStep {
  name: string
  done: boolean
  icon?: string
}

interface GenerationState {
  status: 'idle' | 'understanding' | 'confirming' | 'generating' | 'done'
  progress: number
  currentStep: string
  steps: GenerationStep[]
}

interface AppState {
  currentPage: string
  setCurrentPage: (page: string) => void

  messages: Message[]
  addMessage: (msg: Omit<Message, 'id' | 'timestamp'>) => void
  clearMessages: () => void

  generation: GenerationState
  setGeneration: (gen: Partial<GenerationState>) => void
  resetGeneration: () => void

  projects: Project[]
  addProject: (project: Project) => void

  activeDemo: string | null
  setActiveDemo: (demo: string | null) => void

  previewApp: string | null
  setPreviewApp: (app: string | null) => void

  previewDarkMode: boolean
  setPreviewDarkMode: (dark: boolean) => void
  togglePreviewDarkMode: () => void

  /** Tracks which follow-up index we're at for the current demo */
  demoFollowUpIndex: number
  setDemoFollowUpIndex: (idx: number) => void
}

const initialGeneration: GenerationState = {
  status: 'idle',
  progress: 0,
  currentStep: '',
  steps: [],
}

export const useStore = create<AppState>((set) => ({
  currentPage: 'landing',
  setCurrentPage: (page) => set({ currentPage: page }),

  messages: [],
  addMessage: (msg) =>
    set((state) => ({
      messages: [
        ...state.messages,
        { ...msg, id: crypto.randomUUID(), timestamp: Date.now() },
      ],
    })),
  clearMessages: () => set({ messages: [] }),

  generation: initialGeneration,
  setGeneration: (gen) =>
    set((state) => ({
      generation: { ...state.generation, ...gen },
    })),
  resetGeneration: () => set({ generation: initialGeneration }),

  projects: [
    {
      id: '1',
      name: '智能记账助手',
      description: '个人收支管理，自动分类，月度报表',
      updatedAt: '2小时前',
      status: 'published',
      previewType: 'finance',
    },
    {
      id: '2',
      name: '团队待办清单',
      description: '任务管理，优先级排序，进度追踪',
      updatedAt: '昨天',
      status: 'draft',
      previewType: 'todo',
    },
    {
      id: '3',
      name: '客户管理系统',
      description: '客户信息，跟进记录，销售漏斗',
      updatedAt: '3天前',
      status: 'published',
      previewType: 'crm',
    },
  ],
  addProject: (project) =>
    set((state) => ({ projects: [project, ...state.projects] })),

  activeDemo: null,
  setActiveDemo: (demo) => set({ activeDemo: demo }),

  previewApp: null,
  setPreviewApp: (app) => set({ previewApp: app }),

  previewDarkMode: true,
  setPreviewDarkMode: (dark) => set({ previewDarkMode: dark }),
  togglePreviewDarkMode: () => set((state) => ({ previewDarkMode: !state.previewDarkMode })),

  demoFollowUpIndex: 0,
  setDemoFollowUpIndex: (idx) => set({ demoFollowUpIndex: idx }),
}))
