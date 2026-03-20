import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus, MoreHorizontal, Globe, FileEdit, Trash2, ExternalLink,
  Clock, Sparkles, FolderOpen, X,
} from 'lucide-react'
import { useStore } from '../store/useStore'

export default function ProjectsPage() {
  const navigate = useNavigate()
  const { projects, addProject } = useStore()
  const [showNewModal, setShowNewModal] = useState(false)
  const [newName, setNewName] = useState('')
  const [menuOpen, setMenuOpen] = useState<string | null>(null)

  const handleCreate = () => {
    if (!newName.trim()) return
    addProject({
      id: crypto.randomUUID(),
      name: newName.trim(),
      description: '新创建的项目',
      updatedAt: '刚刚',
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
            <h1 className="text-2xl font-bold mb-1">我的项目</h1>
            <p className="text-sm text-text-secondary">管理和编辑你创建的所有应用</p>
          </div>
          <button
            onClick={() => setShowNewModal(true)}
            className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-xl text-sm font-medium cursor-pointer border-0 transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            创建新项目
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
              <h3 className="font-semibold mb-0.5">从对话开始创建</h3>
              <p className="text-sm text-text-secondary">说出你的想法，AI帮你生成完整应用</p>
            </div>
          </div>
        </motion.div>

        {/* Project list */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-text-secondary mb-2">
            <span>最近项目 ({projects.length})</span>
            <div className="flex items-center gap-2">
              <button className="text-xs text-text-secondary hover:text-text-primary transition-colors bg-transparent border-0 cursor-pointer">
                按修改时间
              </button>
            </div>
          </div>

          {projects.map((project, i) => (
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
                      <h3 className="font-medium text-sm truncate">{project.name}</h3>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded ${
                          project.status === 'published'
                            ? 'bg-success/20 text-success'
                            : 'bg-bg-tertiary text-text-secondary'
                        }`}
                      >
                        {project.status === 'published' ? '已发布' : '草稿'}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary mt-0.5 truncate">{project.description}</p>
                    <div className="flex items-center gap-1 text-[10px] text-text-secondary/60 mt-1">
                      <Clock className="w-3 h-3" />
                      <span>修改于 {project.updatedAt}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => navigate('/workspace')}
                    className="p-2 text-text-secondary hover:text-text-primary bg-transparent border-0 cursor-pointer transition-colors rounded-lg hover:bg-bg-tertiary/50"
                    title="编辑"
                  >
                    <FileEdit className="w-4 h-4" />
                  </button>
                  {project.status === 'published' && (
                    <button
                      className="p-2 text-text-secondary hover:text-text-primary bg-transparent border-0 cursor-pointer transition-colors rounded-lg hover:bg-bg-tertiary/50"
                      title="查看"
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
                          <Globe className="w-3 h-3" /> 发布
                        </button>
                        <button className="w-full px-3 py-1.5 text-xs text-left text-danger hover:bg-bg-tertiary/50 bg-transparent border-0 cursor-pointer flex items-center gap-2">
                          <Trash2 className="w-3 h-3" /> 删除
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
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
                <h2 className="text-lg font-semibold">创建新项目</h2>
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
                placeholder="输入项目名称..."
                className="w-full bg-bg-primary border border-border/50 rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/50 outline-none focus:border-primary/50 transition-colors mb-4 box-border"
                autoFocus
              />
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 bg-bg-tertiary text-text-primary rounded-xl text-sm cursor-pointer border-0 hover:bg-border transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleCreate}
                  disabled={!newName.trim()}
                  className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-xl text-sm cursor-pointer border-0 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  创建
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
