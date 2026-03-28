import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus, MoreHorizontal, Globe, FileEdit, Trash2, ExternalLink,
  Clock, Sparkles, FolderOpen, X,
} from 'lucide-react'
import { useStore } from '../store/useStore'
import { useTranslations, useI18n } from '../i18n'

export default function ProjectsPage() {
  const navigate = useNavigate()
  const { projects, addProject } = useStore()
  const [showNewModal, setShowNewModal] = useState(false)
  const [newName, setNewName] = useState('')
  const [menuOpen, setMenuOpen] = useState<string | null>(null)
  const tr = useTranslations()
  const { t } = useI18n()

  const projMap = tr.projects.defaultProjects as Record<string, { name: string; desc: string }>
  const timeMap = tr.projects.timeAgo as Record<string, string>

  const handleCreate = () => {
    if (!newName.trim()) return
    addProject({
      id: crypto.randomUUID(),
      name: newName.trim(),
      description: t('projects.newProjectDesc'),
      updatedAt: t('projects.justNow'),
      status: 'draft',
      previewType: 'todo',
    })
    setNewName('')
    setShowNewModal(false)
  }

  return (
    <div className="pt-14 min-h-dvh">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-1">{t('projects.title')}</h1>
            <p className="text-sm text-text-secondary">{t('projects.subtitle')}</p>
          </div>
          <button
            onClick={() => setShowNewModal(true)}
            className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-xl text-sm font-medium cursor-pointer border-0 transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            {t('projects.newProject')}
          </button>
        </div>

        {/* Create new project CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 rounded-2xl p-6 cursor-pointer hover:border-primary/40 transition-colors"
          onClick={() => navigate('/workspace')}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary-light" />
            </div>
            <div>
              <h3 className="font-semibold mb-0.5">{t('projects.createFromChat')}</h3>
              <p className="text-sm text-text-secondary">{t('projects.createFromChatDesc')}</p>
            </div>
          </div>
        </motion.div>

        {/* Project list */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-text-secondary mb-2">
            <span>{t('projects.recentProjects')} ({projects.length})</span>
            <div className="flex items-center gap-2">
              <button className="text-xs text-text-secondary hover:text-text-primary transition-colors bg-transparent border-0 cursor-pointer">
                {t('projects.sortByTime')}
              </button>
            </div>
          </div>

          {projects.map((project, i) => {
            const translated = projMap[project.name]
            const displayName = translated?.name ?? project.name
            const displayDesc = translated?.desc ?? project.description
            const displayTime = timeMap[project.updatedAt] ?? project.updatedAt
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-bg-secondary/50 border border-border/30 rounded-xl p-4 hover:border-border transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <FolderOpen className="w-6 h-6 text-primary-light" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-sm truncate">{displayName}</h3>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded ${
                            project.status === 'published'
                              ? 'bg-success/20 text-success'
                              : 'bg-bg-tertiary text-text-secondary'
                          }`}
                        >
                          {project.status === 'published' ? t('projects.published') : t('projects.draft')}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary mt-0.5 truncate">{displayDesc}</p>
                      <div className="flex items-center gap-1 text-[10px] text-text-secondary/60 mt-1">
                        <Clock className="w-3 h-3" />
                        <span>{t('projects.editedAt')} {displayTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => navigate('/workspace')}
                      className="p-2 text-text-secondary hover:text-text-primary bg-transparent border-0 cursor-pointer transition-colors rounded-lg hover:bg-bg-tertiary/50"
                      title={t('projects.draft')}
                    >
                      <FileEdit className="w-4 h-4" />
                    </button>
                    {project.status === 'published' && (
                      <button
                        className="p-2 text-text-secondary hover:text-text-primary bg-transparent border-0 cursor-pointer transition-colors rounded-lg hover:bg-bg-tertiary/50"
                        title={t('projects.published')}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    )}
                    <div className="relative">
                      <button
                        onClick={() => setMenuOpen(menuOpen === project.id ? null : project.id)}
                        className="p-2 text-text-secondary hover:text-text-primary bg-transparent border-0 cursor-pointer transition-colors rounded-lg hover:bg-bg-tertiary/50"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                      {menuOpen === project.id && (
                        <div className="absolute right-0 top-full mt-1 bg-bg-secondary border border-border rounded-lg shadow-xl shadow-black/30 py-1 z-10 min-w-[120px]">
                          <button className="w-full px-3 py-1.5 text-xs text-left text-text-secondary hover:text-text-primary hover:bg-bg-tertiary/50 bg-transparent border-0 cursor-pointer flex items-center gap-2">
                            <Globe className="w-3 h-3" /> {t('projects.publish')}
                          </button>
                          <button className="w-full px-3 py-1.5 text-xs text-left text-danger hover:bg-bg-tertiary/50 bg-transparent border-0 cursor-pointer flex items-center gap-2">
                            <Trash2 className="w-3 h-3" /> {t('projects.delete')}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* New Project Modal */}
      <AnimatePresence>
        {showNewModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            onClick={() => setShowNewModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-bg-secondary border border-border rounded-2xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">{t('projects.createTitle')}</h2>
                <button
                  onClick={() => setShowNewModal(false)}
                  className="p-1 text-text-secondary hover:text-text-primary bg-transparent border-0 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                placeholder={t('projects.projectNamePlaceholder')}
                className="w-full bg-bg-primary border border-border/50 rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/50 outline-none focus:border-primary/50 transition-colors mb-4 box-border"
                autoFocus
              />
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 bg-bg-tertiary text-text-primary rounded-xl text-sm cursor-pointer border-0 hover:bg-border transition-colors"
                >
                  {t('projects.cancel')}
                </button>
                <button
                  onClick={handleCreate}
                  disabled={!newName.trim()}
                  className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-xl text-sm cursor-pointer border-0 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('projects.create')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
