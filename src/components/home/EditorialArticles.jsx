import React, { useState } from 'react'
import { Calendar, Tag, ArrowRight, BookOpen } from 'lucide-react'

export default function EditorialArticles({ articles, onSelectArticle }) {
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', 'Festival', 'Seasonal Guide', 'Travel Tips']

  const filtered = activeCategory === 'All'
    ? articles
    : articles.filter(a => a.category?.toLowerCase() === activeCategory.toLowerCase())

  return (
    <section className="py-16 bg-brand-parchment border-b border-brand-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="inline-block px-3 py-1 bg-brand-terracotta/10 text-brand-terracotta text-xs font-bold rounded-full uppercase tracking-wider mb-2">
              Editorial & Guides
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-brand-ocean">
              What's Happening in Tamil Nadu
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Curated festival stories, seasonal weather updates, and insider cultural travel tips
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-brand-ocean text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filtered.map((art) => (
            <article
              key={art.id}
              onClick={() => onSelectArticle(art)}
              className="group bg-white rounded-3xl overflow-hidden border border-brand-sand shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={art.cover_image}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 px-3 py-1 bg-brand-gold text-brand-ocean font-bold text-[11px] rounded-full shadow-md uppercase tracking-wider">
                  {art.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                    <Calendar className="w-3.5 h-3.5 text-brand-terracotta" />
                    <span>{art.published_at || 'Recently Published'}</span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-brand-ocean group-hover:text-brand-terracotta transition-colors line-clamp-2 leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-gray-600 line-clamp-3 mt-3 leading-relaxed">
                    {art.summary || art.content.slice(0, 140) + '...'}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-brand-terracotta group-hover:text-brand-terracottaDark">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" /> Read Full Guide
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
