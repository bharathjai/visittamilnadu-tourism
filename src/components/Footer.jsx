import React, { useState } from 'react'
import { Mail, Compass, ShieldCheck, Heart, MapPin, Phone, Instagram, Facebook, Youtube, Twitter } from 'lucide-react'

export default function Footer({ onNavigate }) {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 4000)
    }
  }

  return (
    <footer className="bg-brand-ocean text-white pt-16 pb-12 border-t-4 border-brand-terracotta">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Banner */}
        <div className="bg-gradient-to-r from-brand-oceanLight via-[#172D42] to-brand-ocean p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl mb-16 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
            <Compass className="w-72 h-72 text-brand-gold" />
          </div>
          
          <div className="max-w-2xl relative z-10">
            <span className="inline-block px-3 py-1 bg-brand-gold/20 text-brand-gold text-xs font-bold rounded-full uppercase tracking-wider mb-3">
              Stay Inspired
            </span>
            <h3 className="text-3xl font-serif font-bold text-white mb-2">
              Discover Tamil Nadu Secrets & Seasonal Deals
            </h3>
            <p className="text-gray-300 text-sm mb-6">
              Subscribe to receive curated travel itineraries, festival alerts, early-bird package discounts, and local guide recommendations directly in your inbox.
            </p>

            {subscribed ? (
              <div className="p-4 bg-brand-nilgiri/40 border border-brand-nilgiriLight rounded-xl text-green-300 text-sm font-medium animate-fadeIn">
                🎉 Vanakkam! You are now subscribed to VisitTamilNadu travel guides.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="w-5 h-5 absolute left-3.5 top-3.5 text-gray-400" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white/10 text-white placeholder-gray-400 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-brand-terracotta text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-brand-terracotta text-white font-semibold rounded-xl hover:bg-brand-terracottaDark transition-all shadow-md hover:shadow-lg text-sm whitespace-nowrap"
                >
                  Subscribe Free
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4 Column Link Structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-terracotta text-white rounded-xl flex items-center justify-center font-serif font-bold text-xl">
                TN
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight">
                Visit<span className="text-brand-terracotta">TamilNadu</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              The official curated portal for Tamil Nadu tourism. Explore ancient UNESCO temple heritage, mist-laden Nilgiri hill stations, pristine 1,076 km coastline, and authentic culinary trails.
            </p>
            <div className="flex items-center gap-4 text-gray-400 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-terracotta hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-terracotta hover:text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-terracotta hover:text-white transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-terracotta hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Destinations Column */}
          <div>
            <h4 className="font-serif text-lg font-bold text-white mb-4">Top Destinations</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><button onClick={() => onNavigate('packages', { location: 'Ooty' })} className="hover:text-brand-gold transition-colors">Ooty & Coonoor</button></li>
              <li><button onClick={() => onNavigate('packages', { location: 'Madurai' })} className="hover:text-brand-gold transition-colors">Madurai Temple City</button></li>
              <li><button onClick={() => onNavigate('packages', { location: 'Rameswaram' })} className="hover:text-brand-gold transition-colors">Rameswaram & Pamban</button></li>
              <li><button onClick={() => onNavigate('packages', { location: 'Chettinad' })} className="hover:text-brand-gold transition-colors">Chettinad Mansions</button></li>
              <li><button onClick={() => onNavigate('packages', { location: 'Kanyakumari' })} className="hover:text-brand-gold transition-colors">Kanyakumari Oceans</button></li>
              <li><button onClick={() => onNavigate('packages', { location: 'Mahabalipuram' })} className="hover:text-brand-gold transition-colors">Mahabalipuram Shore</button></li>
            </ul>
          </div>

          {/* Experiences Column */}
          <div>
            <h4 className="font-serif text-lg font-bold text-white mb-4">Experiences</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><button onClick={() => onNavigate('packages', { category: 'Hill Stations' })} className="hover:text-brand-gold transition-colors">Hill Station Retreats</button></li>
              <li><button onClick={() => onNavigate('packages', { category: 'Pilgrimage' })} className="hover:text-brand-gold transition-colors">Pilgrimage Circuits</button></li>
              <li><button onClick={() => onNavigate('packages', { category: 'Chettinad Trail' })} className="hover:text-brand-gold transition-colors">Chettinad Heritage Trail</button></li>
              <li><button onClick={() => onNavigate('packages', { category: 'Beaches' })} className="hover:text-brand-gold transition-colors">Coastal Beach Holidays</button></li>
              <li><button onClick={() => onNavigate('packages', { category: 'Wildlife' })} className="hover:text-brand-gold transition-colors">Wildlife Tiger Safaris</button></li>
              <li><button onClick={() => onNavigate('articles')} className="hover:text-brand-gold transition-colors">Festival & Travel Guides</button></li>
            </ul>
          </div>

          {/* Support & Contact Column */}
          <div>
            <h4 className="font-serif text-lg font-bold text-white mb-4">Traveller Info</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><a href="#" className="hover:text-brand-gold transition-colors">About VisitTamilNadu</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">Best Time to Visit</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">Tamil Nadu Travel Maps</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">Booking Guidelines</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">Privacy & Terms</a></li>
            </ul>
            <div className="mt-4 pt-4 border-t border-white/10 text-xs text-gray-400 space-y-1">
              <p className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-brand-gold" /> Helpline: +91 44 2538 0000</p>
              <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-brand-gold" /> Tourism Complex, Chennai 600002</p>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© 2026 VisitTamilNadu. All rights reserved. Partnered with Tamil Nadu Tourism Development Board.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-gray-200 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gray-200 cursor-pointer">Terms of Service</span>
            <span className="hover:text-gray-200 cursor-pointer">Cookie Settings</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
