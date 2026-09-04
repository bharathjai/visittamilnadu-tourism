import React, { useState } from 'react'
import { Search, User, Shield, Compass, Calendar, Menu, X, LogOut, ChevronDown, MapPin } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Navbar({ activeTab, setActiveTab, onOpenSearch }) {
  const { user, isAdmin, setIsAuthModalOpen, logout, toggleRole } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)

  const handleNavClick = (tab) => {
    setActiveTab(tab)
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-brand-sand shadow-sm transition-all">
      {/* Top Utility Bar */}
      <div className="hidden md:block bg-brand-ocean text-white text-xs py-2 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6 text-gray-300">
            <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
              <MapPin className="w-3.5 h-3.5 text-brand-gold" /> Official Tourism Board Partner
            </span>
            <span className="text-gray-400">|</span>
            <span className="text-brand-gold font-medium">✨ Pongal & Summer Packages 2026 Now Open</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleRole}
              className="px-2.5 py-0.5 rounded bg-brand-gold/20 text-brand-gold border border-brand-gold/30 hover:bg-brand-gold hover:text-brand-ocean transition-all font-semibold"
            >
              Mode: {isAdmin ? 'ADMIN' : 'USER'} (Click to Toggle)
            </button>
            <span className="text-gray-400">|</span>
            <button
              onClick={() => {
                if (user?.email?.includes('guest')) setIsAuthModalOpen(true)
                else setUserDropdownOpen(!userDropdownOpen)
              }}
              className="flex items-center gap-1.5 text-gray-200 hover:text-white font-medium"
            >
              <User className="w-3.5 h-3.5 text-brand-terracotta" />
              <span>{user?.full_name || 'Sign In'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Name */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 bg-gradient-to-br from-brand-terracotta to-brand-terracottaDark rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <span className="font-serif text-2xl font-bold tracking-tighter">TN</span>
            </div>
            <div>
              <span className="font-serif text-2xl font-extrabold text-brand-ocean tracking-tight block leading-none">
                Visit<span className="text-brand-terracotta">TamilNadu</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase text-brand-nilgiri font-semibold block mt-1">
                South India Travel & Tours
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-sm font-semibold transition-colors relative py-1 ${
                activeTab === 'home' ? 'text-brand-terracotta' : 'text-brand-ocean hover:text-brand-terracotta'
              }`}
            >
              Home
              {activeTab === 'home' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-terracotta rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('packages')}
              className={`text-sm font-semibold transition-colors relative py-1 ${
                activeTab === 'packages' ? 'text-brand-terracotta' : 'text-brand-ocean hover:text-brand-terracotta'
              }`}
            >
              Explore Packages
              {activeTab === 'packages' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-terracotta rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('articles')}
              className={`text-sm font-semibold transition-colors relative py-1 ${
                activeTab === 'articles' ? 'text-brand-terracotta' : 'text-brand-ocean hover:text-brand-terracotta'
              }`}
            >
              What's Happening
              {activeTab === 'articles' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-terracotta rounded-full" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('my-bookings')}
              className={`text-sm font-semibold transition-colors relative py-1 ${
                activeTab === 'my-bookings' ? 'text-brand-terracotta' : 'text-brand-ocean hover:text-brand-terracotta'
              }`}
            >
              My Bookings
              {activeTab === 'my-bookings' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-terracotta rounded-full" />
              )}
            </button>

            {isAdmin && (
              <button
                onClick={() => handleNavClick('admin')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-gold/15 text-brand-goldHover font-bold rounded-lg border border-brand-gold/40 text-xs hover:bg-brand-gold hover:text-white transition-all shadow-xs"
              >
                <Shield className="w-3.5 h-3.5" /> Admin Panel
              </button>
            )}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenSearch}
              className="p-2.5 text-brand-ocean hover:text-brand-terracotta hover:bg-brand-parchment rounded-full transition-colors"
              title="Search packages & articles"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account dropdown button for desktop */}
            <div className="relative hidden md:block">
              <button
                onClick={() => {
                  if (!user || user?.email?.includes('guest')) {
                    setIsAuthModalOpen(true)
                  } else {
                    setUserDropdownOpen(!userDropdownOpen)
                  }
                }}
                className="flex items-center gap-2 pl-3 pr-4 py-2 bg-brand-parchment hover:bg-brand-sand rounded-xl border border-brand-sand transition-all text-sm font-medium text-brand-ocean"
              >
                <div className="w-7 h-7 bg-brand-terracotta text-white rounded-full flex items-center justify-center font-bold text-xs">
                  {user?.full_name ? user.full_name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="max-w-[100px] truncate">{user?.full_name?.split(' ')[0] || 'Sign In'}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {userDropdownOpen && user && !user.email?.includes('guest') && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-brand-sand py-2 z-50 animate-fadeIn">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs font-bold text-brand-ocean truncate">{user.full_name}</p>
                    <p className="text-[11px] text-gray-500 truncate">{user.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-brand-terracotta/10 text-brand-terracotta text-[10px] font-bold rounded">
                      Role: {user.role?.toUpperCase()}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      handleNavClick('my-bookings')
                      setUserDropdownOpen(false)
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-brand-parchment flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-brand-terracotta" /> My Bookings & Tickets
                  </button>

                  {isAdmin && (
                    <button
                      onClick={() => {
                        handleNavClick('admin')
                        setUserDropdownOpen(false)
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-brand-parchment flex items-center gap-2"
                    >
                      <Shield className="w-4 h-4 text-brand-gold" /> Admin Dashboard
                    </button>
                  )}

                  <div className="border-t border-gray-100 my-1" />

                  <button
                    onClick={() => {
                      logout()
                      setUserDropdownOpen(false)
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-brand-ocean hover:text-brand-terracotta rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-brand-sand px-4 pt-3 pb-6 space-y-3 animate-slideDown">
          <button
            onClick={() => handleNavClick('home')}
            className="block w-full text-left py-2 font-medium text-brand-ocean hover:text-brand-terracotta"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('packages')}
            className="block w-full text-left py-2 font-medium text-brand-ocean hover:text-brand-terracotta"
          >
            Explore Packages
          </button>
          <button
            onClick={() => handleNavClick('articles')}
            className="block w-full text-left py-2 font-medium text-brand-ocean hover:text-brand-terracotta"
          >
            What's Happening (Articles)
          </button>
          <button
            onClick={() => handleNavClick('my-bookings')}
            className="block w-full text-left py-2 font-medium text-brand-ocean hover:text-brand-terracotta"
          >
            My Bookings
          </button>

          {isAdmin && (
            <button
              onClick={() => handleNavClick('admin')}
              className="block w-full text-left py-2 font-bold text-brand-goldHover flex items-center gap-2"
            >
              <Shield className="w-4 h-4" /> Admin Panel
            </button>
          )}

          <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
            <button
              onClick={toggleRole}
              className="text-xs px-3 py-1.5 bg-brand-gold/20 text-brand-goldHover font-bold rounded-lg"
            >
              Role: {isAdmin ? 'ADMIN' : 'USER'} (Toggle)
            </button>

            <button
              onClick={() => {
                setIsAuthModalOpen(true)
                setMobileMenuOpen(false)
              }}
              className="text-xs px-4 py-2 bg-brand-terracotta text-white rounded-lg font-semibold"
            >
              {user?.email?.includes('guest') ? 'Sign In' : 'Account'}
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
