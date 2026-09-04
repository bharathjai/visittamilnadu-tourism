import React, { useRef } from 'react'
import { Star, ChevronLeft, ChevronRight, MapPin, Clock, ArrowRight } from 'lucide-react'

export default function BestSellersCarousel({ packages, onSelectPackage }) {
  const scrollRef = useRef(null)

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const scrollAmount = clientWidth * 0.8
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  // Sort packages by avg_rating & review_count
  const sorted = [...packages].sort((a, b) => (b.avg_rating || 0) - (a.avg_rating || 0))

  return (
    <section className="py-16 bg-white border-b border-brand-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Navigation Controls */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="inline-block px-3 py-1 bg-brand-nilgiri/10 text-brand-nilgiri text-xs font-bold rounded-full uppercase tracking-wider mb-2">
              Top Customer Ratings
            </span>
            <h2 className="text-3xl font-serif font-extrabold text-brand-ocean">
              Best-Selling Attraction Packages
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Most booked tours backed by hundreds of verified traveler reviews
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-3 bg-brand-parchment hover:bg-brand-sand text-brand-ocean rounded-full border border-gray-200 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 bg-brand-parchment hover:bg-brand-sand text-brand-ocean rounded-full border border-gray-200 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex items-center gap-6 overflow-x-auto no-scrollbar pb-4"
        >
          {sorted.map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => onSelectPackage(pkg)}
              className="min-w-[280px] sm:min-w-[320px] max-w-[320px] bg-brand-parchment/60 rounded-3xl overflow-hidden border border-brand-sand hover:border-brand-terracotta/40 shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer flex-shrink-0 group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={pkg.images?.[0] || 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80'}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/95 backdrop-blur-md rounded-full text-xs font-bold text-brand-ocean flex items-center gap-1 shadow-xs">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{pkg.avg_rating || 4.9}</span>
                  <span className="text-[10px] text-gray-400">({pkg.review_count || 45})</span>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-1 text-xs text-brand-nilgiri font-semibold mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{pkg.location}</span>
                </div>

                <h3 className="font-serif text-base font-bold text-brand-ocean group-hover:text-brand-terracotta transition-colors line-clamp-2">
                  {pkg.title}
                </h3>

                <div className="mt-4 pt-3 border-t border-gray-200/80 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-500 block">From</span>
                    <span className="text-base font-serif font-bold text-brand-terracotta">
                      ₹{Number(pkg.price).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-bold text-brand-ocean group-hover:text-brand-terracotta">
                    <span>Book Now</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
