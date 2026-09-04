import React, { useState, useEffect } from 'react'
import { Star, Clock, MapPin, CheckCircle2, XCircle, Calendar, Users, ShieldCheck, MessageSquare, ChevronDown, ChevronUp, Share2, Heart, ArrowLeft, AlertCircle } from 'lucide-react'
import { api } from '../lib/supabase'

export default function PackageDetailPage({ pkg, onBack, onOpenBookingModal }) {
  const [activeImage, setActiveImage] = useState(pkg.images?.[0] || 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80')
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  })
  const [guestCount, setGuestCount] = useState(2)
  const [slotData, setSlotData] = useState({ total: 10, remaining: 6 })
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [activeTab, setActiveTab] = useState('itinerary') // 'itinerary', 'inclusions', 'reviews'
  const [reviews, setReviews] = useState([])
  const [expandedDay, setExpandedDay] = useState(1)

  // Fetch reviews and live slot availability
  useEffect(() => {
    async function loadData() {
      if (!pkg?.id) return
      setLoadingSlots(true)
      const slots = await api.getPackageSlots(pkg.id, selectedDate)
      setSlotData(slots)
      setLoadingSlots(false)

      const revs = await api.getReviews(pkg.id)
      setReviews(revs)
    }
    loadData()
  }, [pkg.id, selectedDate])

  const totalPrice = Number(pkg.price) * guestCount

  const handleBookNow = () => {
    onOpenBookingModal({
      package: pkg,
      travelDate: selectedDate,
      guestCount,
      totalPrice,
      remainingSlots: slotData.remaining
    })
  }

  return (
    <div className="min-h-screen bg-brand-parchment py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Navigation Bar */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-brand-ocean hover:text-brand-terracotta transition-colors bg-white px-4 py-2 rounded-full border border-gray-200 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Packages
        </button>

        {/* Title Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 text-xs text-brand-nilgiri font-semibold mb-2">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-brand-terracotta" /> {pkg.location}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-brand-gold" /> {pkg.duration_days} Days / {pkg.duration_days - 1} Nights</span>
              <span>•</span>
              <span className="px-2.5 py-0.5 bg-brand-gold/20 text-brand-goldHover font-bold rounded-md uppercase text-[10px]">{pkg.category}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-brand-ocean tracking-tight leading-tight">
              {pkg.title}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="flex items-center gap-1 text-sm font-bold text-brand-ocean">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>{pkg.avg_rating || 4.9}</span>
                <span className="text-gray-400 font-normal">({reviews.length || pkg.review_count || 40} reviews)</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Verified Local Tour</p>
            </div>
          </div>
        </div>

        {/* Image Gallery Mosaic */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Large Image */}
          <div className="lg:col-span-2 relative h-[380px] sm:h-[460px] rounded-3xl overflow-hidden shadow-card border border-brand-sand">
            <img
              src={activeImage}
              alt={pkg.title}
              className="w-full h-full object-cover transition-all duration-500"
            />
            {pkg.tag && (
              <span className="absolute top-4 left-4 px-4 py-1.5 bg-brand-terracotta text-white font-bold text-xs rounded-full shadow-lg uppercase tracking-wider">
                {pkg.tag}
              </span>
            )}
          </div>

          {/* Side Thumbnail List */}
          <div className="flex flex-row lg:flex-col gap-4 overflow-x-auto">
            {(pkg.images || [activeImage]).map((img, idx) => (
              <div
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`relative h-28 sm:h-32 lg:h-36 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all flex-1 min-w-[120px] ${
                  activeImage === img ? 'border-brand-terracotta scale-98 shadow-md' : 'border-transparent opacity-80 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Main Details Grid: Left Description/Itinerary + Right Sticky Booking Box */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* LEFT CONTENT AREA */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Package Overview Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-sand shadow-sm space-y-4">
              <h2 className="text-2xl font-serif font-bold text-brand-ocean">Package Overview</h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                {pkg.description}
              </p>

              {/* Highlights pills */}
              <div className="pt-4 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-semibold text-brand-ocean">
                <div className="p-3 bg-brand-parchment rounded-xl flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-terracotta" /> Free Cancellation
                </div>
                <div className="p-3 bg-brand-parchment rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-nilgiri" /> Verified Guides
                </div>
                <div className="p-3 bg-brand-parchment rounded-xl flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-gold" /> Instant Booking Ref
                </div>
              </div>
            </div>

            {/* Navigation Tabs (Itinerary / Inclusions / Reviews) */}
            <div className="bg-white rounded-3xl border border-brand-sand shadow-sm overflow-hidden">
              <div className="flex border-b border-gray-100 overflow-x-auto no-scrollbar">
                <button
                  onClick={() => setActiveTab('itinerary')}
                  className={`flex-1 py-3.5 px-3 text-[11px] sm:text-sm font-bold transition-colors border-b-2 whitespace-nowrap ${
                    activeTab === 'itinerary'
                      ? 'border-brand-terracotta text-brand-terracotta bg-brand-parchment/40'
                      : 'border-transparent text-gray-600 hover:text-brand-ocean'
                  }`}
                >
                  Itinerary
                </button>
                <button
                  onClick={() => setActiveTab('inclusions')}
                  className={`flex-1 py-3.5 px-3 text-[11px] sm:text-sm font-bold transition-colors border-b-2 whitespace-nowrap ${
                    activeTab === 'inclusions'
                      ? 'border-brand-terracotta text-brand-terracotta bg-brand-parchment/40'
                      : 'border-transparent text-gray-600 hover:text-brand-ocean'
                  }`}
                >
                  Inclusions & Exclusions
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`flex-1 py-3.5 px-3 text-[11px] sm:text-sm font-bold transition-colors border-b-2 whitespace-nowrap ${
                    activeTab === 'reviews'
                      ? 'border-brand-terracotta text-brand-terracotta bg-brand-parchment/40'
                      : 'border-transparent text-gray-600 hover:text-brand-ocean'
                  }`}
                >
                  Reviews ({reviews.length})
                </button>
              </div>

              <div className="p-6 sm:p-8">
                
                {/* TAB 1: ITINERARY TIMELINE */}
                {activeTab === 'itinerary' && (
                  <div className="space-y-4">
                    {pkg.itinerary && pkg.itinerary.map((dayItem) => (
                      <div
                        key={dayItem.day}
                        className="border border-brand-sand rounded-2xl overflow-hidden transition-all"
                      >
                        <button
                          onClick={() => setExpandedDay(expandedDay === dayItem.day ? null : dayItem.day)}
                          className="w-full p-4 bg-brand-parchment/60 hover:bg-brand-parchment flex items-center justify-between text-left font-semibold text-brand-ocean"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-brand-terracotta text-white font-serif font-bold text-xs flex items-center justify-center">
                              D{dayItem.day}
                            </span>
                            <span className="text-sm font-bold">{dayItem.title}</span>
                          </div>
                          {expandedDay === dayItem.day ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                        </button>

                        {expandedDay === dayItem.day && (
                          <div className="p-5 bg-white text-xs sm:text-sm text-gray-700 leading-relaxed border-t border-brand-sand">
                            {dayItem.details}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB 2: INCLUSIONS / EXCLUSIONS */}
                {activeTab === 'inclusions' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <h4 className="font-serif font-bold text-brand-nilgiri text-base flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-brand-nilgiri" /> What's Included
                      </h4>
                      <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                        {pkg.inclusions?.map((inc, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-brand-nilgiri font-bold">•</span>
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-serif font-bold text-red-700 text-base flex items-center gap-2">
                        <XCircle className="w-5 h-5 text-red-600" /> What's Excluded
                      </h4>
                      <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                        {pkg.exclusions?.map((exc, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-red-500 font-bold">•</span>
                            <span>{exc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* TAB 3: REVIEWS & RATINGS */}
                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                      <div>
                        <h4 className="font-serif text-xl font-bold text-brand-ocean">Traveler Reviews</h4>
                        <p className="text-xs text-gray-500">Real experiences from confirmed tour bookings</p>
                      </div>
                      <div className="flex items-center gap-2 text-2xl font-serif font-bold text-brand-ocean">
                        <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
                        <span>{pkg.avg_rating || 4.9}</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {reviews.map((rev) => (
                        <div key={rev.id} className="p-4 bg-brand-parchment/60 rounded-2xl border border-brand-sand space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-brand-terracotta text-white font-bold text-xs rounded-full flex items-center justify-center">
                                {(rev.user_name || 'T').charAt(0)}
                              </div>
                              <span className="text-xs font-bold text-brand-ocean">{rev.user_name || rev.profiles?.full_name || 'Traveler'}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              {[...Array(rev.rating || 5)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 text-amber-500 fill-amber-500" />
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-gray-700 leading-relaxed">{rev.comment}</p>
                          <span className="text-[10px] text-gray-400 block">{rev.created_at}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>

          {/* RIGHT STICKY BOOKING CARD */}
          <div className="sticky top-28 bg-white p-6 sm:p-8 rounded-3xl border border-brand-sand shadow-xl space-y-6">
            
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">Package Price</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-serif font-extrabold text-brand-terracotta">
                  ₹{Number(pkg.price).toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-gray-500">/ per guest</span>
              </div>
            </div>

            {/* Travel Date Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-brand-terracotta" /> Select Travel Date
              </label>
              <input
                type="date"
                value={selectedDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-3 bg-brand-parchment text-sm font-semibold text-brand-ocean rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-terracotta/40"
              />
            </div>

            {/* Guest Count Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-brand-terracotta" /> Number of Guests
              </label>
              <div className="flex items-center justify-between p-2 bg-brand-parchment rounded-xl border border-gray-200">
                <button
                  type="button"
                  onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                  className="w-9 h-9 bg-white text-brand-ocean font-bold rounded-lg shadow-xs hover:bg-gray-100"
                >
                  -
                </button>
                <span className="text-sm font-bold text-brand-ocean">{guestCount} Guest(s)</span>
                <button
                  type="button"
                  onClick={() => setGuestCount(guestCount + 1)}
                  className="w-9 h-9 bg-white text-brand-ocean font-bold rounded-lg shadow-xs hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Remaining Slots Counter */}
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center gap-2 text-xs">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <div>
                <span className="font-bold text-amber-800">
                  {loadingSlots ? 'Checking slots...' : `Only ${slotData.remaining} slots left for this date!`}
                </span>
                <p className="text-[10px] text-amber-700">Atomic availability reservation applied</p>
              </div>
            </div>

            {/* Dynamic Total Price Breakdown */}
            <div className="pt-4 border-t border-gray-100 space-y-2">
              <div className="flex justify-between text-xs text-gray-600">
                <span>₹{Number(pkg.price).toLocaleString('en-IN')} × {guestCount} Guests</span>
                <span>₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-600">
                <span>Taxes & Partner Fees</span>
                <span className="text-brand-nilgiri font-bold">Included Free</span>
              </div>
              <div className="flex justify-between text-base font-serif font-bold text-brand-ocean pt-2 border-t border-gray-100">
                <span>Total Amount:</span>
                <span className="text-brand-terracotta">₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Book Now Action CTA */}
            <button
              onClick={handleBookNow}
              disabled={slotData.remaining <= 0}
              className="w-full py-4 bg-gradient-to-r from-brand-terracotta to-brand-terracottaDark text-white font-bold text-sm rounded-2xl hover:brightness-110 transition-all shadow-lg disabled:opacity-50"
            >
              {slotData.remaining <= 0 ? 'Sold Out for Selected Date' : 'Book Tour Package Now'}
            </button>

            <p className="text-[11px] text-center text-gray-400">
              No payment required upfront. Instant email & PDF confirmation e-ticket.
            </p>

          </div>

        </div>

      </div>
    </div>
  )
}
