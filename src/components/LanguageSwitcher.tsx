import { useI18n } from '../i18n'

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()

  const toggle = () => {
    setLocale(locale === 'en' ? 'zh' : 'en')
  }

  return (
    <button
      onClick={toggle}
      className="px-2 py-1 rounded-md text-xs font-medium text-text-secondary hover:text-text-primary bg-bg-tertiary/50 hover:bg-bg-tertiary border border-border/50 cursor-pointer transition-colors"
      title={locale === 'en' ? 'Switch to Chinese' : '切换到英文'}
    >
      {locale === 'en' ? '中文' : 'EN'}
    </button>
  )
}
