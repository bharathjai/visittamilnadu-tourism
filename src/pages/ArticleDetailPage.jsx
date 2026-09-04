import React from 'react'
import { Calendar, Tag, ArrowLeft, Share2, BookOpen, MapPin, ArrowRight } from 'lucide-react'

export default function ArticleDetailPage({ article, onBack, onExplorePackages }) {
  if (!article) return null

  return (
    <article className="min-h-screen bg-brand-parchment py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-brand-ocean hover:text-brand-terracotta transition-colors bg-white px-4 py-2 rounded-full border border-gray-200 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Articles & Guides
        </button>

        {/* Article Meta Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-brand-gold text-brand-ocean font-bold text-xs rounded-full uppercase tracking-wider">
              {article.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
              <Calendar className="w-3.5 h-3.5 text-brand-terracotta" /> Published {article.published_at}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-brand-ocean leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center justify-between pt-2 border-t border-gray-200/80 text-xs text-gray-500">
            <span>Written by VisitTamilNadu Editorial Team</span>
            <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> 4 min read</span>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative h-[320px] sm:h-[420px] rounded-3xl overflow-hidden shadow-card border border-brand-sand">
          <img
            src={article.cover_image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body Content */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-brand-sand shadow-sm space-y-6 text-gray-800 leading-relaxed text-base">
          {article.content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('# ')) {
              return <h1 key={idx} className="text-3xl font-serif font-bold text-brand-ocean mt-6 mb-3">{paragraph.replace('# ', '')}</h1>
            }
            if (paragraph.startsWith('### ')) {
              return <h3 key={idx} className="text-xl font-serif font-bold text-brand-ocean mt-6 mb-2">{paragraph.replace('### ', '')}</h3>
            }
            if (paragraph.startsWith('- ')) {
              return (
                <ul key={idx} className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                  {paragraph.split('\n').map((item, i) => (
                    <li key={i}>{item.replace('- ', '')}</li>
                  ))}
                </ul>
              )
            }
            return <p key={idx} className="text-sm sm:text-base text-gray-700 leading-relaxed">{paragraph}</p>
          })}
        </div>

        {/* Related Call to Action Box */}
        <div className="bg-gradient-to-r from-brand-ocean to-brand-oceanLight p-8 rounded-3xl text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl font-bold text-white">Inspired by this guide?</h3>
            <p className="text-xs text-gray-300 mt-1">Explore our verified Tamil Nadu tour packages tailored to your schedule.</p>
          </div>
          <button
            onClick={onExplorePackages}
            className="px-6 py-3 bg-brand-terracotta text-white font-bold text-xs rounded-xl hover:bg-brand-terracottaDark transition-all shadow-md flex items-center gap-2 whitespace-nowrap"
          >
            <span>Explore Tour Packages</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </article>
  )
}
