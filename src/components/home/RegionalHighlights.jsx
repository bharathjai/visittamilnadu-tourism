import React from 'react'
import { MapPin, ArrowRight } from 'lucide-react'

export default function RegionalHighlights({ onSelectRegion }) {
  const regions = [
    {
      name: 'The Nilgiris & Western Ghats',
      tagline: 'Mist, Tea & Wildlife',
      description: 'Ride the steam toy train through pine valleys of Ooty, Coonoor tea plantations, and Mudumalai tiger reserves.',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      locationFilter: 'Ooty'
    },
    {
      name: 'Madurai & Temple Heartlands',
      tagline: 'Thousand Towers & Tradition',
      description: 'Step into 2,500 years of living history, soaring Gopurams of Meenakshi temple, and midnight street markets.',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
      locationFilter: 'Madurai'
    },
    {
      name: 'Coastal Tamil Nadu & Pamban',
      tagline: '3 Oceans & Sacred Waters',
      description: 'Cross the sea bridge to Rameswaram, witness Triveni Sangam ocean sunsets at Kanyakumari, and walk Mahabalipuram shore.',
      image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80',
      locationFilter: 'Rameswaram'
    },
    {
      name: 'Chettinad Heritage Belt',
      tagline: 'Palaces & Culinary Legends',
      description: 'Explore 100-year-old merchant teak palaces, handmade Athangudi tiles, and world-famous pepper chicken feasts.',
      image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80',
      locationFilter: 'Chettinad'
    }
  ]

  return (
    <section className="py-16 bg-white border-b border-brand-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 bg-brand-gold/20 text-brand-goldHover text-xs font-bold rounded-full uppercase tracking-wider mb-2">
            Regional Spotlight
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-brand-ocean">
            Explore Tamil Nadu Regions
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Distinct cultural landscapes, from mountain ridges to oceanic sanctuaries
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {regions.map((reg, idx) => (
            <div
              key={idx}
              onClick={() => onSelectRegion(reg.locationFilter)}
              className="group relative h-80 rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer flex flex-col justify-end"
            >
              <img
                src={reg.image}
                alt={reg.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-brand-ocean via-brand-ocean/50 to-transparent" />

              <div className="relative z-10 p-8 text-white space-y-2">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-brand-gold">
                  {reg.tagline}
                </span>

                <h3 className="font-serif text-2xl font-bold text-white group-hover:text-brand-gold transition-colors flex items-center gap-2">
                  <span>{reg.name}</span>
                </h3>

                <p className="text-xs text-gray-200 leading-relaxed max-w-md">
                  {reg.description}
                </p>

                <div className="pt-2 flex items-center gap-2 text-xs font-bold text-brand-gold group-hover:translate-x-1 transition-transform">
                  <span>Browse Region Packages</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
