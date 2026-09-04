import React from 'react'
import { DollarSign, Calendar, Package, Star, TrendingUp, Users } from 'lucide-react'

export default function AdminOverview({ packages, bookings, articles }) {
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.status !== 'cancelled' ? Number(b.total_price || 0) : 0), 0)
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length
  const featuredCount = packages.filter(p => p.is_featured).length

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white p-6 rounded-3xl border border-brand-sand shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Gross Bookings Revenue</span>
            <div className="p-2.5 bg-brand-terracotta/10 text-brand-terracotta rounded-xl">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-serif font-extrabold text-brand-ocean">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </h3>
          <p className="text-[11px] text-brand-nilgiri font-medium flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +18.4% from last month
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-brand-sand shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Active Bookings</span>
            <div className="p-2.5 bg-brand-gold/20 text-brand-goldHover rounded-xl">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-serif font-extrabold text-brand-ocean">
            {confirmedBookings} Confirmed
          </h3>
          <p className="text-[11px] text-gray-500">Total bookings: {bookings.length}</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-brand-sand shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Tour Packages</span>
            <div className="p-2.5 bg-brand-nilgiri/10 text-brand-nilgiri rounded-xl">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-serif font-extrabold text-brand-ocean">
            {packages.length} Active
          </h3>
          <p className="text-[11px] text-gray-500">{featuredCount} Featured on Homepage</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-brand-sand shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Published Guides</span>
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <Star className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-serif font-extrabold text-brand-ocean">
            {articles.length} Articles
          </h3>
          <p className="text-[11px] text-gray-500">Seasonal & Festival Guides</p>
        </div>

      </div>

      {/* Recent Bookings Feed */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-sand shadow-sm space-y-4">
        <h3 className="text-lg font-serif font-bold text-brand-ocean">Recent Booking Stream</h3>
        
        <div className="space-y-3">
          {bookings.slice(0, 5).map((bk) => (
            <div key={bk.id} className="p-4 bg-brand-parchment/60 rounded-2xl border border-brand-sand flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-brand-terracotta">{bk.booking_reference}</span>
                <h4 className="font-bold text-brand-ocean text-sm mt-0.5">{bk.package_title || bk.packages?.title || 'Tour Package'}</h4>
                <p className="text-gray-500">{bk.user_name || 'Guest'} • Travel Date: {bk.travel_date}</p>
              </div>
              <div className="text-right">
                <span className="font-serif font-bold text-brand-ocean text-sm block">₹{Number(bk.total_price || 0).toLocaleString('en-IN')}</span>
                <span className={`inline-block mt-1 px-2 py-0.5 text-[10px] font-bold rounded uppercase ${
                  bk.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {bk.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
