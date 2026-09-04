import React, { useState, useEffect } from 'react'
import { Calendar, Download, XCircle, Clock, MapPin, CheckCircle2, AlertTriangle, User, RefreshCw } from 'lucide-react'
import { api } from '../lib/supabase'
import { generateBookingPDF } from '../lib/pdfGenerator'
import { useAuth } from '../context/AuthContext'

export default function UserDashboardPage({ onExplorePackages }) {
  const { user, setIsAuthModalOpen } = useAuth()

  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterTab, setFilterTab] = useState('all') // 'all', 'confirmed', 'completed', 'cancelled'

  useEffect(() => {
    async function loadUserBookings() {
      setLoading(true)
      if (user?.id) {
        const userBookings = await api.getBookings(user.id)
        setBookings(userBookings)
      } else {
        const allBookings = await api.getBookings()
        setBookings(allBookings)
      }
      setLoading(false)
    }
    loadUserBookings()
  }, [user])

  const handleCancel = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking? This will restore slot capacity.')) {
      await api.cancelBooking(bookingId)
      // Refresh list
      const updated = await api.getBookings(user?.id)
      setBookings(updated)
    }
  }

  const filteredBookings = filterTab === 'all'
    ? bookings
    : bookings.filter(b => b.status?.toLowerCase() === filterTab.toLowerCase())

  return (
    <div className="min-h-screen bg-brand-parchment py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* User Profile Card Header */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-sand shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-brand-terracotta to-brand-terracottaDark text-white rounded-2xl flex items-center justify-center font-serif font-bold text-2xl shadow-md">
              {user?.full_name ? user.full_name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-brand-ocean">{user?.full_name || 'Traveler Account'}</h1>
              <p className="text-xs text-gray-500">{user?.email || 'traveler@visittamilnadu.org'}</p>
              <span className="inline-block mt-1 px-2.5 py-0.5 bg-brand-gold/20 text-brand-goldHover text-[10px] font-bold rounded-md uppercase">
                Role: {user?.role || 'User'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onExplorePackages}
              className="px-5 py-2.5 bg-brand-terracotta text-white font-bold text-xs rounded-xl hover:bg-brand-terracottaDark transition-all"
            >
              Book New Tour Package
            </button>
          </div>
        </div>

        {/* Bookings Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-serif font-bold text-brand-ocean">My Tour Bookings</h2>
              <p className="text-xs text-gray-500">Manage upcoming itineraries, download e-tickets, or cancel bookings</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-brand-sand overflow-x-auto no-scrollbar max-w-full">
              {['all', 'confirmed', 'completed', 'cancelled'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilterTab(tab)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg capitalize transition-all ${
                    filterTab === tab
                      ? 'bg-brand-ocean text-white'
                      : 'text-gray-600 hover:bg-brand-parchment'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="p-12 bg-white rounded-3xl text-center border border-brand-sand">
              <RefreshCw className="w-6 h-6 text-brand-terracotta animate-spin mx-auto" />
              <p className="text-xs text-gray-500 mt-2">Loading your bookings...</p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="p-12 bg-white rounded-3xl text-center border border-brand-sand space-y-4">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto" />
              <h3 className="font-serif text-lg font-bold text-brand-ocean">No Bookings Found</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                You don't have any bookings under the "{filterTab}" category yet. Explore our curated packages to get started.
              </p>
              <button
                onClick={onExplorePackages}
                className="px-5 py-2.5 bg-brand-terracotta text-white font-bold text-xs rounded-xl"
              >
                Browse Tour Packages
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((bk) => (
                <div
                  key={bk.id}
                  className="bg-white p-6 rounded-3xl border border-brand-sand shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
                >
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <img
                      src={bk.image || bk.packages?.images?.[0] || 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80'}
                      alt="Booking Cover"
                      className="w-20 h-20 rounded-2xl object-cover"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-extrabold text-brand-terracotta text-sm">{bk.booking_reference}</span>
                        <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full uppercase ${
                          bk.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                          bk.status === 'completed' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {bk.status}
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-brand-ocean text-base line-clamp-1">
                        {bk.package_title || bk.packages?.title || 'Tamil Nadu Tour'}
                      </h4>
                      <p className="text-xs text-gray-500 flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-brand-gold" /> Travel Date: {bk.travel_date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 border-gray-100">
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-gray-400 block">Total Price</span>
                      <span className="font-serif font-extrabold text-brand-ocean text-lg">
                        ₹{Number(bk.total_price || 0).toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => generateBookingPDF(bk)}
                        className="px-3.5 py-2 bg-brand-ocean text-white text-xs font-bold rounded-xl hover:bg-brand-oceanLight transition-all flex items-center gap-1.5 shadow-xs"
                        title="Download E-Ticket PDF"
                      >
                        <Download className="w-3.5 h-3.5 text-brand-gold" /> Ticket
                      </button>

                      {bk.status === 'confirmed' && (
                        <button
                          onClick={() => handleCancel(bk.id)}
                          className="px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold rounded-xl transition-colors flex items-center gap-1"
                        >
                          <XCircle className="w-3.5 h-3.5" /> Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  )
}
