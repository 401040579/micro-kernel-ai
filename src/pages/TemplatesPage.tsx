import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Search, Star, Crown, Wallet, Users, ShoppingCart,
  CheckSquare, Palette, Calendar, Truck, Clipboard,
  Clock, MessageCircle, Wrench, Award, Heart, Map,
  GraduationCap, Dumbbell, Package, Car, School,
} from 'lucide-react'
import { templates, categories } from '../data/templates'

const iconComponents: Record<string, React.ComponentType<any>> = {
  wallet: Wallet,
  users: Users,
  utensils: ShoppingCart,
  crown: Crown,
  'graduation-cap': GraduationCap,
  dumbbell: Dumbbell,
  package: Package,
  'check-square': CheckSquare,
  palette: Palette,
  calendar: Calendar,
  truck: Truck,
  'shopping-cart': ShoppingCart,
  clipboard: Clipboard,
  clock: Clock,
  'message-circle': MessageCircle,
  'chef-hat': ShoppingCart,
  wrench: Wrench,
  award: Award,
  car: Car,
  school: School,
  heart: Heart,
  map: Map,
}

export default function TemplatesPage() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('全部')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = templates.filter((t) => {
    const matchCategory = activeCategory === '全部' || t.category === activeCategory
    const matchSearch = !searchQuery || t.name.includes(searchQuery) || t.description.includes(searchQuery)
    return matchCategory && matchSearch
  })

  return (
    <div className="pt-14 min-h-dvh">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-1">模板市场</h1>
            <p className="text-sm text-text-secondary">从模板开始，快速定制你的专属应用</p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索模板..."
              className="w-full bg-bg-secondary border border-border/50 rounded-xl pl-9 pr-3 py-2 text-sm text-text-primary placeholder:text-text-secondary/50 outline-none focus:border-primary/50 transition-colors"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-lg text-sm cursor-pointer border transition-colors ${
                activeCategory === cat
                  ? 'bg-primary/20 border-primary/50 text-primary-light'
                  : 'bg-bg-secondary/50 border-border/50 text-text-secondary hover:text-text-primary hover:border-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          layout
        >
          {filtered.map((template, i) => {
            const Icon = iconComponents[template.icon] || Palette
            return (
              <motion.div
                key={template.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="bg-bg-secondary/50 border border-border/30 rounded-xl overflow-hidden hover:border-primary/30 transition-all group cursor-pointer"
                onClick={() => navigate('/workspace')}
              >
                {/* Preview */}
                <div
                  className="h-32 flex items-center justify-center relative"
                  style={{ backgroundColor: template.color + '15' }}
                >
                  <Icon className="w-12 h-12" style={{ color: template.color }} />
                  {template.isPro && (
                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-amber-500/20 border border-amber-500/30 rounded text-[10px] text-amber-400 font-medium flex items-center gap-1">
                      <Crown className="w-3 h-3" /> Pro
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="text-sm font-semibold mb-1">{template.name}</h3>
                  <p className="text-xs text-text-secondary leading-relaxed mb-3 line-clamp-2">
                    {template.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-text-secondary">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span>{template.rating}</span>
                      <span className="text-text-secondary/50">({template.usageCount})</span>
                    </div>
                    <span className="text-xs text-primary-light opacity-0 group-hover:opacity-100 transition-opacity">
                      使用模板 →
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
