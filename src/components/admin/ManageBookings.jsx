import React, { useState } from 'react'
import { Search, CheckCircle2, XCircle, Clock, Calendar, Download } from 'lucide-react'
import { api } from '../../lib/supabase'
import { generateBookingPDF } from '../../lib/pdfGenerator'

export default function ManageBookings({ bookings, onRefresh }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const handleStatusChange = async (bookingId, newStatus) => {
    await api.updateBookingStatus(bookingId, newStatus)
    onRefresh()
  }

  const filtered = bookings.filter(b => {
    const matchesSearch = !searchQuery ||
      b.booking_reference?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.package_title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.user_name?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === 'all' || b.status?.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      
      {/* Control Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-serif font-bold text-brand-ocean">Manage Customer Bookings</h3>
          <p className="text-xs text-gray-500">Filter bookings, manage reservation statuses, and dispatch e-tickets</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search reference or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white text-xs rounded-xl border border-gray-300 focus:outline-none"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 bg-white text-xs font-semibold text-brand-ocean rounded-xl border border-gray-300 focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-3xl border border-brand-sand shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-brand-parchment/80 text-brand-ocean font-serif font-bold border-b border-brand-sand">
                <th className="p-4">Reference</th>
                <th className="p-4">Package</th>
                <th className="p-4">Passenger Name</th>
                <th className="p-4">Travel Date</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((bk) => (
                <tr key={bk.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-bold text-brand-terracotta">{bk.booking_reference}</td>
                  <td className="p-4 max-w-[200px] truncate font-medium text-brand-ocean">{bk.package_title || bk.packages?.title || 'Tour'}</td>
                  <td className="p-4 text-gray-700">{bk.user_name || 'Guest'}</td>
                  <td className="p-4 text-gray-600">{bk.travel_date}</td>
                  <td className="p-4 font-bold text-brand-ocean">₹{Number(bk.total_price || 0).toLocaleString('en-IN')}</td>
                  <td className="p-4">
                    <select
                      value={bk.status || 'confirmed'}
                      onChange={(e) => handleStatusChange(bk.id, e.target.value)}
                      className={`p-1.5 rounded-lg text-[11px] font-bold border ${
                        bk.status === 'confirmed' ? 'bg-green-50 border-green-300 text-green-700' :
                        bk.status === 'completed' ? 'bg-blue-50 border-blue-300 text-blue-700' : 'bg-red-50 border-red-300 text-red-700'
                      }`}
                    >
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => generateBookingPDF(bk)}
                      className="p-2 bg-brand-parchment hover:bg-brand-sand text-brand-ocean rounded-lg transition-colors inline-flex items-center gap-1 font-semibold"
                      title="Download PDF"
                    >
                      <Download className="w-3.5 h-3.5 text-brand-gold" /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
