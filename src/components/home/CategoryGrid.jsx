import React from 'react'
import { Mountain, Landmark, Waves, Trees, Utensils, Compass, ArrowRight } from 'lucide-react'

export default function CategoryGrid({ onSelectCategory }) {
  const categories = [
    {
      name: 'Hill Stations',
      subtitle: 'Ooty, Kodaikanal, Yercaud & Valparai',
      image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80',
      count: '8 Tours',
      icon: Mountain
    },
    {
      name: 'Temples & Heritage',
      subtitle: 'Madurai, Tanjore, Chidambaram & Kanchi',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
      count: '14 Tours',
      icon: Landmark
    },
    {
      name: 'Beaches',
      subtitle: 'Kanyakumari, Marina, ECR & Rameshwaram Coast',
      image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80',
      count: '6 Tours',
      icon: Waves
    },
    {
      name: 'Wildlife & Nature',
      subtitle: 'Mudumalai, Anamalai & Kalakkad Tiger Reserves',
      image: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=800&q=80',
      count: '5 Tours',
      icon: Trees
    },
    {
      name: 'Chettinad Trail',
      subtitle: 'Heritage Mansions, Tiles & Culinary Spice Tours',
      image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80',
      count: '4 Tours',
      icon: Utensils
    },
    {
      name: 'Pilgrimage Circuits',
      subtitle: 'Arupadai Veedu, Navagraha & Sacred Shrines',
      image: 'https://images.unsplash.com/photo-1600100397608-f090742f4cc0?auto=format&fit=crop&w=800&q=80',
      count: '10 Tours',
      icon: Compass
    }
  ]

  return (
    <section className="py-16 bg-white border-b border-brand-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 bg-brand-gold/15 text-brand-goldHover text-xs font-bold rounded-full uppercase tracking-wider mb-2">
            Tailored Experiences
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-brand-ocean">
            Explore Tamil Nadu by Category
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Choose your preferred travel style to discover curated itineraries
          </p>
        </div>

        {/* 6 Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon
            return (
              <div
                key={idx}
                onClick={() => onSelectCategory(cat.name)}
                className="group relative h-64 rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
              >
                {/* Image Background */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ocean via-brand-ocean/40 to-transparent" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                  
                  {/* Top Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-brand-gold">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold">
                      {cat.count}
                    </span>
                  </div>

                  {/* Bottom Info */}
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-white group-hover:text-brand-gold transition-colors flex items-center gap-2">
                      <span>{cat.name}</span>
                      <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </h3>
                    <p className="text-xs text-gray-300 mt-1 line-clamp-1">
                      {cat.subtitle}
                    </p>
                  </div>

                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
