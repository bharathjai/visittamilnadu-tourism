import React, { useState, useMemo } from 'react'
import { Search, Filter, Star, Clock, MapPin, SlidersHorizontal, RotateCcw, ArrowRight } from 'lucide-react'

export default function PackagesListingPage({ packages, onSelectPackage, initialCategory = '', initialLocation = '' }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'All')
  const [selectedLocation, setSelectedLocation] = useState(initialLocation || 'All')
  const [maxPrice, setMaxPrice] = useState(25000)
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState('popular') // 'popular', 'price-low', 'price-high', 'rating'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  // Extract unique locations
  const locations = useMemo(() => {
    const locs = new Set(packages.map(p => p.location.split('&')[0].trim()))
    return ['All', ...Array.from(locs)]
  }, [packages])

  const categories = ['All', 'Hill Stations', 'Temples & Heritage', 'Beaches', 'Wildlife & Nature', 'Chettinad Trail', 'Pilgrimage Circuits']

  // Filtering & Sorting Logic
  const filteredPackages = useMemo(() => {
    return packages.filter(pkg => {
      // Search term match
      const matchesSearch = !searchTerm || 
        pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.description.toLowerCase().includes(searchTerm.toLowerCase())

      // Category match
      const matchesCategory = selectedCategory === 'All' || 
        pkg.category?.toLowerCase() === selectedCategory.toLowerCase()

      // Location match
      const matchesLocation = selectedLocation === 'All' || 
        pkg.location.toLowerCase().includes(selectedLocation.toLowerCase())

      // Price match
      const matchesPrice = Number(pkg.price) <= maxPrice

      // Rating match
      const matchesRating = (pkg.avg_rating || 0) >= minRating

      return matchesSearch && matchesCategory && matchesLocation && matchesPrice && matchesRating
    }).sort((a, b) => {
      if (sortBy === 'price-low') return Number(a.price) - Number(b.price)
      if (sortBy === 'price-high') return Number(b.price) - Number(a.price)
      if (sortBy === 'rating') return (b.avg_rating || 0) - (a.avg_rating || 0)
      return (b.review_count || 0) - (a.review_count || 0) // default popularity
    })
  }, [packages, searchTerm, selectedCategory, selectedLocation, maxPrice, minRating, sortBy])

  const resetFilters = () => {
    setSearchTerm('')
    setSelectedCategory('All')
    setSelectedLocation('All')
    setMaxPrice(25000)
    setMinRating(0)
    setSortBy('popular')
  }

  return (
    <div className="min-h-screen bg-brand-parchment py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-brand-ocean tracking-tight">
            Tamil Nadu Tour Packages
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Browse handcrafted itineraries, verify live slot availability, and book directly online
          </p>
        </div>

        {/* Top Control Bar: Search & Mobile Filter Toggle & Sort */}
        <div className="bg-white p-4 rounded-2xl border border-brand-sand shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by package name or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-brand-parchment text-sm text-brand-ocean rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-terracotta/40"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            {/* Mobile Filter Trigger */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="md:hidden px-4 py-2.5 bg-brand-parchment text-brand-ocean font-semibold text-xs rounded-xl border border-gray-200 flex items-center gap-2"
            >
              <Filter className="w-4 h-4 text-brand-terracotta" /> Filters
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-gray-500 whitespace-nowrap hidden sm:inline">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-brand-parchment text-brand-ocean font-semibold text-xs rounded-xl border border-gray-200 focus:outline-none cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

        </div>

        {/* Main Content Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* FILTER SIDEBAR (Desktop Inline + Mobile Drawer Modal) */}
          <aside className={`
            ${mobileFilterOpen ? 'fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm' : 'hidden'} 
            md:block md:static md:z-auto md:bg-transparent md:p-0
          `}>
            <div className="bg-white p-6 rounded-3xl border border-brand-sand shadow-lg md:shadow-sm space-y-6 w-full max-w-lg max-h-[85vh] overflow-y-auto">
              
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <span className="font-serif text-lg font-bold text-brand-ocean flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-brand-terracotta" /> Filter Packages
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={resetFilters}
                    className="text-xs text-brand-terracotta font-semibold hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="md:hidden p-1 text-gray-400 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Category</label>
                <div className="space-y-1.5">
                  {categories.map((cat, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                        selectedCategory === cat
                          ? 'bg-brand-terracotta text-white'
                          : 'text-gray-700 hover:bg-brand-parchment'
                      }`}
                    >
                      <span>{cat}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Region / Location</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full p-2.5 bg-brand-parchment text-xs font-semibold text-brand-ocean rounded-xl border border-gray-200 focus:outline-none"
                >
                  {locations.map((loc, idx) => (
                    <option key={idx} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              {/* Price Filter */}
              <div>
                <div className="flex justify-between items-center mb-2 text-xs">
                  <span className="font-bold uppercase tracking-wider text-gray-500">Max Budget</span>
                  <span className="font-bold text-brand-terracotta">₹{maxPrice.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min={5000}
                  max={25000}
                  step={1000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-brand-terracotta cursor-pointer"
                />
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Minimum Rating</label>
                <div className="flex items-center gap-2">
                  {[0, 4.0, 4.5, 4.8].map((stars) => (
                    <button
                      key={stars}
                      onClick={() => setMinRating(stars)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                        minRating === stars
                          ? 'bg-amber-50 border-amber-400 text-amber-700'
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {stars === 0 ? 'Any' : `${stars}★`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Apply Button */}
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="md:hidden w-full py-3 bg-brand-terracotta text-white font-bold text-xs rounded-xl shadow-md mt-4"
              >
                Apply Filters ({filteredPackages.length} Packages)
              </button>

            </div>
          </aside>

          {/* PACKAGES GRID */}
          <main className="md:col-span-3 space-y-6">
            
            {/* Active Filter Pills Bar */}
            {(selectedCategory !== 'All' || selectedLocation !== 'All' || searchTerm) && (
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-bold text-gray-500">Active Filters:</span>
                {selectedCategory !== 'All' && (
                  <span className="px-3 py-1 bg-brand-terracotta/10 text-brand-terracotta rounded-full font-semibold">
                    Category: {selectedCategory}
                  </span>
                )}
                {selectedLocation !== 'All' && (
                  <span className="px-3 py-1 bg-brand-nilgiri/10 text-brand-nilgiri rounded-full font-semibold">
                    Location: {selectedLocation}
                  </span>
                )}
                {searchTerm && (
                  <span className="px-3 py-1 bg-brand-gold/20 text-brand-goldHover rounded-full font-semibold">
                    Search: "{searchTerm}"
                  </span>
                )}
              </div>
            )}

            {filteredPackages.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl text-center border border-brand-sand shadow-sm space-y-4">
                <div className="w-16 h-16 bg-brand-parchment text-brand-terracotta rounded-full flex items-center justify-center mx-auto text-2xl font-serif">
                  TN
                </div>
                <h3 className="text-xl font-serif font-bold text-brand-ocean">No Packages Found</h3>
                <p className="text-xs text-gray-500 max-w-md mx-auto">
                  We couldn't find any packages matching your exact criteria. Try adjusting your filters or price slider.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 bg-brand-terracotta text-white text-xs font-bold rounded-xl hover:bg-brand-terracottaDark"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => onSelectPackage(pkg)}
                    className="group bg-white rounded-3xl overflow-hidden border border-brand-sand shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
                  >
                    <div className="relative h-48 overflow-hidden bg-gray-100">
                      <img
                        src={pkg.images?.[0] || 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80'}
                        alt={pkg.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {pkg.tag && (
                        <span className="absolute top-3 left-3 px-3 py-1 bg-brand-terracotta text-white text-[10px] font-bold rounded-full uppercase tracking-wider shadow-md">
                          {pkg.tag}
                        </span>
                      )}

                      <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/95 backdrop-blur-md rounded-full text-xs font-bold text-brand-ocean flex items-center gap-1 shadow-xs">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span>{pkg.avg_rating || 4.9}</span>
                      </div>

                      <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-brand-ocean/80 backdrop-blur-md text-white rounded-lg text-[10px] font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3 text-brand-gold" />
                        <span>{pkg.duration_days} Days / {pkg.duration_days - 1} Nights</span>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center gap-1 text-xs text-brand-nilgiri font-semibold mb-1">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{pkg.location}</span>
                        </div>

                        <h3 className="font-serif text-base font-bold text-brand-ocean group-hover:text-brand-terracotta transition-colors line-clamp-2">
                          {pkg.title}
                        </h3>

                        <p className="text-xs text-gray-600 line-clamp-2 mt-2 leading-relaxed">
                          {pkg.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-gray-400 block">Starting from</span>
                          <span className="text-lg font-serif font-extrabold text-brand-terracotta">
                            ₹{Number(pkg.price).toLocaleString('en-IN')}
                          </span>
                        </div>

                        <span className="px-3 py-2 bg-brand-parchment group-hover:bg-brand-terracotta text-brand-ocean group-hover:text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1">
                          <span>Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </main>

        </div>

      </div>
    </div>
  )
}
