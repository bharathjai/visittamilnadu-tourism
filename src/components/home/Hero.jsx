import React, { useState } from 'react'
import { Search, MapPin, Calendar, Users, Sparkles, ArrowRight } from 'lucide-react'

export default function Hero({ onSearchSubmit, onQuickFilter }) {
  const [destination, setDestination] = useState('')
  const [travelDate, setTravelDate] = useState('')
  const [travelers, setTravelers] = useState(2)

  const handleSearch = (e) => {
    e.preventDefault()
    onSearchSubmit({ destination, travelDate, travelers })
  }

  return (
    <div className="relative min-h-[640px] lg:min-h-[700px] flex items-center justify-center overflow-hidden bg-brand-ocean">
      
      {/* Background Image Carousel / Hero Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=2000&q=90"
          alt="Meenakshi Temple & Tamil Nadu Landscape"
          className="w-full h-full object-cover object-center scale-105 transform animate-pulse-slow brightness-90"
        />
        {/* Editorial Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ocean via-brand-ocean/60 to-black/30" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 pb-20">
        
        {/* Floating Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-brand-gold text-xs font-semibold uppercase tracking-wider mb-6 shadow-xl animate-fadeIn">
          <Sparkles className="w-4 h-4 text-brand-gold animate-bounce" />
          <span>The Official Guide & Booking Experience</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-extrabold text-white tracking-tight leading-tight mb-6 drop-shadow-md">
          Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-amber-200 to-brand-terracotta">Tamil Nadu</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-200 font-normal leading-relaxed mb-10 text-shadow">
          From the mist-clad Nilgiri hill tops to ancient thousand-year-old temple towers, explore handcrafted tour packages and authentic South Indian adventures.
        </p>

        {/* VisitLondon-inspired Floating Search Bar */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-3 sm:p-4 shadow-2xl border border-brand-sand/50 backdrop-blur-xl">
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            
            {/* Destination Input */}
            <div className="sm:col-span-4 flex items-center gap-3 px-4 py-3 bg-brand-parchment/60 rounded-2xl border border-gray-200/80 focus-within:border-brand-terracotta transition-colors">
              <MapPin className="w-5 h-5 text-brand-terracotta shrink-0" />
              <div className="text-left w-full">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500">Destination</label>
                <input
                  type="text"
                  placeholder="Where to? (e.g. Ooty, Madurai)"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-brand-ocean focus:outline-none placeholder-gray-400"
                />
              </div>
            </div>

            {/* Travel Date */}
            <div className="sm:col-span-4 flex items-center gap-3 px-4 py-3 bg-brand-parchment/60 rounded-2xl border border-gray-200/80 focus-within:border-brand-terracotta transition-colors">
              <Calendar className="w-5 h-5 text-brand-terracotta shrink-0" />
              <div className="text-left w-full">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500">Travel Date</label>
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-brand-ocean focus:outline-none"
                />
              </div>
            </div>

            {/* Travelers Selector */}
            <div className="sm:col-span-2 flex items-center gap-2 px-3 py-3 bg-brand-parchment/60 rounded-2xl border border-gray-200/80 focus-within:border-brand-terracotta transition-colors">
              <Users className="w-4 h-4 text-brand-terracotta shrink-0" />
              <div className="text-left w-full">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500">Guests</label>
                <select
                  value={travelers}
                  onChange={(e) => setTravelers(Number(e.target.value))}
                  className="w-full bg-transparent text-sm font-semibold text-brand-ocean focus:outline-none cursor-pointer"
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4 Guests</option>
                  <option value={5}>5+ Family</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full py-4 px-6 bg-gradient-to-r from-brand-terracotta to-brand-terracottaDark text-white font-bold text-sm rounded-2xl hover:brightness-110 transition-all shadow-lg flex items-center justify-center gap-2 group"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </form>
        </div>

        {/* Popular Tags Under Search */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-gray-300">
          <span className="font-semibold text-brand-gold">Popular searches:</span>
          {['Ooty Toy Train', 'Meenakshi Temple', 'Chettinad Cuisine', 'Kanyakumari Sunset', 'Pondicherry French Quarter'].map((tag, idx) => (
            <button
              key={idx}
              onClick={() => onQuickFilter(tag.split(' ')[0])}
              className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full border border-white/10 text-gray-200 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

      </div>
    </div>
  )
}
