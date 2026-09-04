import React from 'react'
import { Tag, Sparkles, Clock, ArrowRight, ShieldAlert } from 'lucide-react'

export default function OffersSection({ onExploreOffers }) {
  return (
    <section className="py-14 bg-gradient-to-r from-brand-parchment via-amber-50/50 to-brand-parchment border-b border-brand-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-r from-brand-terracotta to-brand-terracottaDark rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="max-w-xl space-y-3 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-brand-gold uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5" /> Early Bird Offer 2026
            </div>

            <h3 className="text-3xl sm:text-4xl font-serif font-extrabold text-white leading-tight">
              Save up to ₹3,000 on Summer Nilgiri & Temple Combos
            </h3>

            <p className="text-sm text-gray-100 leading-relaxed">
              Book any 4-day Ooty, Kodaikanal, or Madurai tour package 30 days in advance and receive complimentary VIP darshan passes & heritage breakfast upgrades.
            </p>

            <div className="flex items-center gap-4 pt-2 text-xs font-semibold text-brand-gold">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> Offer valid till April 30, 2026
              </span>
              <span>• Code: <strong>VISITTN2026</strong></span>
            </div>
          </div>

          <div className="shrink-0 relative z-10">
            <button
              onClick={onExploreOffers}
              className="px-8 py-4 bg-white text-brand-terracotta font-bold text-sm rounded-2xl hover:bg-brand-parchment transition-all shadow-xl hover:scale-105 flex items-center gap-2 group cursor-pointer"
            >
              <span>Claim Discount & Book</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Background Decorative Pattern */}
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        </div>

      </div>
    </section>
  )
}
