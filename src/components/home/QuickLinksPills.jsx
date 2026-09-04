import React from 'react'
import { Mountain, Landmark, Waves, Users, Trees, Utensils, Calendar, Sparkles } from 'lucide-react'

export default function QuickLinksPills({ onSelectCategory }) {
  const quickLinks = [
    { label: 'Explore hill stations', category: 'Hill Stations', icon: Mountain },
    { label: 'Visit ancient temples', category: 'Temples & Heritage', icon: Landmark },
    { label: 'Find beach getaways', category: 'Beaches', icon: Waves },
    { label: 'Plan a family trip', category: 'Family', icon: Users },
    { label: 'See wildlife sanctuaries', category: 'Wildlife & Nature', icon: Trees },
    { label: 'Discover Chettinad heritage', category: 'Chettinad Trail', icon: Utensils },
    { label: 'Find festival experiences', category: 'Festival', icon: Calendar },
  ]

  return (
    <section className="py-8 bg-brand-parchment border-b border-brand-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-serif text-lg font-bold text-brand-ocean flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-terracotta" /> I want to...
          </span>
          <span className="text-xs text-gray-500 font-medium">Quick task shortcuts</span>
        </div>

        {/* Scrollable Horizontal Pills Container */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
          {quickLinks.map((item, idx) => {
            const Icon = item.icon
            return (
              <button
                key={idx}
                onClick={() => onSelectCategory(item.category)}
                className="flex items-center gap-2.5 px-5 py-2.5 bg-white hover:bg-brand-terracotta text-brand-ocean hover:text-white rounded-full border border-gray-200 hover:border-brand-terracotta shadow-xs hover:shadow-md transition-all duration-200 whitespace-nowrap text-sm font-semibold group cursor-pointer"
              >
                <Icon className="w-4 h-4 text-brand-terracotta group-hover:text-white transition-colors" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
