import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import en from './en'
import zh from './zh'

const translations = { en, zh } as const
export type Locale = keyof typeof translations

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Translations = typeof en & { generation: { customModifyResponse: (input: string) => string } } & Record<string, any>

interface I18nState {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

function resolve(obj: unknown, keys: string[]): unknown {
  let cur = obj
  for (const k of keys) {
    if (cur == null || typeof cur !== 'object') return undefined
    cur = (cur as Record<string, unknown>)[k]
  }
  return cur
}

export const useI18n = create<I18nState>()(
  persist(
    (set, get) => ({
      locale: 'en',
      setLocale: (locale) => set({ locale }),
      t: (key: string) => {
        const locale = get().locale
        const dict = translations[locale] as Translations
        const value = resolve(dict, key.split('.'))
        if (typeof value === 'string') return value
        // fallback to English
        const fallback = resolve(translations.en, key.split('.'))
        if (typeof fallback === 'string') return fallback
        return key
      },
    }),
    { name: 'app-locale', partialize: (s) => ({ locale: s.locale }) },
  ),
)

/** Direct access to the full translation object for the current locale */
export function useTranslations() {
  const locale = useI18n((s) => s.locale)
  return translations[locale] as Translations
}

/** Non-hook access for use outside React components */
export function getTranslations(locale?: Locale) {
  const l = locale ?? useI18n.getState().locale
  return translations[l] as Translations
}

export function getLocale(): Locale {
  return useI18n.getState().locale
}
