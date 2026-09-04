import React, { useState } from 'react'
import { X, Calendar, Users, CheckCircle2, ShieldCheck, Mail, Phone, User, Download, Sparkles, AlertCircle } from 'lucide-react'
import { api } from '../../lib/supabase'
import { generateBookingPDF } from '../../lib/pdfGenerator'
import { useAuth } from '../../context/AuthContext'

export default function BookingModal({ bookingDetails, onClose, onBookingSuccess }) {
  const { user } = useAuth()

  const [step, setStep] = useState(1) // 1: Guest Info & Date, 2: Review & Summary, 3: Confirmed Success
  const [fullName, setFullName] = useState(user?.full_name || 'Krishna')
  const [email, setEmail] = useState(user?.email || 'krishna@example.com')
  const [phone, setPhone] = useState('+91 98765 43210')
  const [specialRequests, setSpecialRequests] = useState('')
  const [loading, setLoading] = useState(false)
  const [confirmedBooking, setConfirmedBooking] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  if (!bookingDetails) return null

  const { package: pkg, travelDate, guestCount, totalPrice } = bookingDetails

  const handleConfirmBooking = async () => {
    setLoading(true)
    setErrorMsg('')

    try {
      const payload = {
        user_id: user?.id || null,
        user_name: fullName,
        user_email: email,
        user_phone: phone,
        package_id: pkg.id,
        package_title: pkg.title,
        location: pkg.location,
        image: pkg.images?.[0],
        travel_date: travelDate,
        travelers: { adults: guestCount, children: 0 },
        total_price: totalPrice,
        special_requests: specialRequests
      }

      const result = await api.createBooking(payload)

      if (result) {
        setConfirmedBooking(result)
        setStep(3)
      } else {
        setErrorMsg('Could not process booking. Slots might be unavailable.')
      }
    } catch (err) {
      setErrorMsg(err.message || 'Booking process encountered an error.')
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadPDF = () => {
    if (confirmedBooking) {
      generateBookingPDF(confirmedBooking)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col border border-brand-sand overflow-hidden">
        
        {/* Modal Top Banner Accent */}
        <div className="h-2 bg-gradient-to-r from-brand-terracotta via-brand-gold to-brand-nilgiri shrink-0" />

        {/* Modal Header */}
        <div className="p-6 bg-brand-parchment/60 border-b border-brand-sand flex items-center justify-between shrink-0">
          <div>
            <span className="text-[10px] uppercase font-bold text-brand-terracotta tracking-wider">Step {step} of 3</span>
            <h3 className="text-xl font-serif font-bold text-brand-ocean">
              {step === 1 && 'Traveler Contact Details'}
              {step === 2 && 'Review & Confirm Booking'}
              {step === 3 && 'Booking Confirmed!'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-white rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 space-y-6 flex-1 overflow-y-auto">

          {errorMsg && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
              {errorMsg}
            </div>
          )}

          {/* STEP 1: GUEST DETAILS FORM */}
          {step === 1 && (
            <div className="space-y-4">
              
              {/* Package Snapshot */}
              <div className="p-4 bg-white rounded-2xl border border-brand-sand flex items-center gap-4">
                <img
                  src={pkg.images?.[0]}
                  alt={pkg.title}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="text-xs">
                  <h4 className="font-bold text-brand-ocean line-clamp-1">{pkg.title}</h4>
                  <p className="text-gray-500">{pkg.location} • {guestCount} Guest(s)</p>
                  <p className="font-bold text-brand-terracotta mt-0.5">Date: {travelDate}</p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Primary Passenger Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-terracotta/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Email Address (for E-Ticket Confirmation)</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-terracotta/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Mobile Phone Number</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-terracotta/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Special Requests / Dietary Needs (Optional)</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Vegetarian meals, room on ground floor, senior citizen assist..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full p-3 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-terracotta/40"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full py-3.5 bg-brand-terracotta text-white font-bold text-sm rounded-xl hover:bg-brand-terracottaDark transition-all"
              >
                Proceed to Booking Summary
              </button>
            </div>
          )}

          {/* STEP 2: SUMMARY & REVIEW */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="p-4 bg-brand-parchment/60 rounded-2xl border border-brand-sand space-y-3 text-xs">
                <div className="flex justify-between font-bold text-brand-ocean border-b border-gray-200 pb-2">
                  <span>Package</span>
                  <span className="text-right max-w-[200px] truncate">{pkg.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Travel Date</span>
                  <span className="font-semibold text-brand-ocean">{travelDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Travelers</span>
                  <span className="font-semibold text-brand-ocean">{guestCount} Guest(s)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Passenger Name</span>
                  <span className="font-semibold text-brand-ocean">{fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Contact Email</span>
                  <span className="font-semibold text-brand-ocean">{email}</span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="p-4 bg-white rounded-2xl border border-brand-sand space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Base Package Price</span>
                  <span>₹{Number(pkg.price).toLocaleString('en-IN')} × {guestCount}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Taxes & GST</span>
                  <span className="text-brand-nilgiri font-bold">Included</span>
                </div>
                <div className="flex justify-between text-sm font-serif font-bold text-brand-ocean pt-2 border-t border-gray-100">
                  <span>Total Amount Payable:</span>
                  <span className="text-brand-terracotta text-lg">₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold text-xs rounded-xl hover:bg-gray-200"
                >
                  Edit Details
                </button>
                <button
                  type="button"
                  onClick={handleConfirmBooking}
                  disabled={loading}
                  className="flex-1 py-3 bg-brand-terracotta text-white font-bold text-xs rounded-xl hover:bg-brand-terracottaDark transition-all disabled:opacity-50"
                >
                  {loading ? 'Confirming Atomic Slot...' : 'Confirm & Reserve Ticket'}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: CONFIRMED SUCCESS */}
          {step === 3 && confirmedBooking && (
            <div className="text-center space-y-5 animate-fadeIn">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-2xl font-serif font-bold text-brand-ocean">Vanakkam! Your Trip is Confirmed</h4>
                <p className="text-xs text-gray-500 mt-1">
                  We have sent your confirmation e-ticket to <strong className="text-brand-ocean">{email}</strong>
                </p>
              </div>

              {/* Reference Box */}
              <div className="p-4 bg-brand-parchment rounded-2xl border border-brand-gold/40 text-center space-y-1">
                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Booking Reference</span>
                <h5 className="text-2xl font-serif font-extrabold text-brand-terracotta">
                  {confirmedBooking.booking_reference}
                </h5>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleDownloadPDF}
                  className="flex-1 py-3.5 bg-brand-ocean text-white font-bold text-xs rounded-xl hover:bg-brand-oceanLight transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4 text-brand-gold" /> Download Printable PDF E-Ticket
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose()
                    if (onBookingSuccess) onBookingSuccess(confirmedBooking)
                  }}
                  className="px-6 py-3.5 bg-gray-100 text-gray-700 font-bold text-xs rounded-xl hover:bg-gray-200 font-semibold"
                >
                  Close & View Bookings
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  )
}
