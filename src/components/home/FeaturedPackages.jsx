import React from 'react'
import { Star, Clock, MapPin, ArrowRight, Sparkles, Flame } from 'lucide-react'

export default function FeaturedPackages({ packages, onSelectPackage, onViewAll }) {
  const featured = packages.filter(p => p.is_featured).slice(0, 4)

  return (
    <section className="py-16 bg-brand-parchment">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-terracotta/10 text-brand-terracotta text-xs font-bold rounded-full mb-2 uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5" /> Curated Collection
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-brand-ocean">
              Must-See Tamil Nadu Packages
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Top handpicked travel itineraries recommended by local tourism experts
            </p>
          </div>

          <button
            onClick={onViewAll}
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-terracotta hover:text-brand-terracottaDark transition-colors group self-start sm:self-auto"
          >
            <span>View All Packages</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => onSelectPackage(pkg)}
              className="group bg-white rounded-3xl overflow-hidden border border-brand-sand shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
            >
              {/* Image & Tag Badge Container */}
              <div className="relative h-52 overflow-hidden bg-gray-100">
                <img
                  src={pkg.images?.[0] || 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80'}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Optional Tag Badge */}
                {pkg.tag && (
                  <span className="absolute top-3 left-3 px-3 py-1 bg-brand-terracotta text-white text-[11px] font-bold rounded-full shadow-md uppercase tracking-wider">
                    {pkg.tag}
                  </span>
                )}

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 bg-white/95 backdrop-blur-md rounded-full shadow-md text-xs font-bold text-brand-ocean">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{pkg.avg_rating || 4.9}</span>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-1 bg-brand-ocean/80 text-white rounded-lg backdrop-blur-md text-[11px] font-medium">
                  <Clock className="w-3 h-3 text-brand-gold" />
                  <span>{pkg.duration_days} Days / {pkg.duration_days - 1} Nights</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-1 text-xs text-brand-nilgiri font-semibold mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{pkg.location}</span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-brand-ocean group-hover:text-brand-terracotta transition-colors line-clamp-2 leading-snug">
                    {pkg.title}
                  </h3>

                  <p className="text-xs text-gray-600 line-clamp-2 mt-2 leading-relaxed">
                    {pkg.description}
                  </p>
                </div>

                {/* Card Footer Price & CTA */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-gray-400">Starting from</span>
                    <span className="text-lg font-serif font-extrabold text-brand-terracotta">
                      ₹{Number(pkg.price).toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-gray-500"> / guest</span>
                  </div>

                  <span className="px-3 py-2 bg-brand-parchment group-hover:bg-brand-terracotta text-brand-ocean group-hover:text-white rounded-xl text-xs font-bold transition-colors">
                    Explore
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
