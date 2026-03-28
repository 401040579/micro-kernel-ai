import { Link, useLocation } from 'react-router-dom'
import { Cpu, LayoutGrid, FolderOpen, Sparkles } from 'lucide-react'
import { useI18n } from '../i18n'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navbar() {
  const location = useLocation()
  const { t } = useI18n()

  const links = [
    { to: '/workspace', label: t('navbar.workspace'), icon: Sparkles },
    { to: '/templates', label: t('navbar.templates'), icon: LayoutGrid },
    { to: '/projects', label: t('navbar.projects'), icon: FolderOpen },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-text-primary no-underline">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-lg hidden sm:block">MicroKernel AI</span>
        </Link>

        <div className="flex items-center gap-1">
          {links.map((link) => {
            const Icon = link.icon
            const isActive = location.pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm no-underline transition-colors ${
                  isActive
                    ? 'bg-primary/20 text-primary-light'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{link.label}</span>
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-xs font-medium text-white">
            U
          </div>
        </div>
      </div>
    </nav>
  )
}
