import React, { useState } from 'react'
import { X, Mail, Lock, User, ShieldCheck, Sparkles } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, authMode, setAuthMode, login, signup, loading, toggleRole, isAdmin, user } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  if (!isAuthModalOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    try {
      if (authMode === 'login') {
        await login(email || 'traveler@visittamilnadu.org', password || 'password123')
      } else {
        await signup(email || 'newtraveler@visittamilnadu.org', password || 'password123', fullName || 'Tamil Nadu Traveler')
      }
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-brand-sand">
        {/* Top Accent Line */}
        <div className="h-2 bg-gradient-to-r from-brand-terracotta via-brand-gold to-brand-nilgiri" />

        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 mb-3 bg-brand-terracotta/10 text-brand-terracotta rounded-full">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-brand-ocean">
              {authMode === 'login' ? 'Welcome Back' : 'Start Your TN Journey'}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {authMode === 'login' ? 'Sign in to access your bookings & trip itinerary' : 'Create an account to book curated tour packages'}
            </p>
          </div>

          {/* Role Switcher Pill for Testing */}
          <div className="mb-6 p-3 bg-brand-parchment rounded-xl border border-brand-gold/30 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <ShieldCheck className={`w-4 h-4 ${isAdmin ? 'text-brand-terracotta' : 'text-gray-500'}`} />
              <span className="font-medium text-brand-ocean">
                Current Role: <strong className="uppercase font-bold text-brand-terracotta">{user?.role || 'user'}</strong>
              </span>
            </div>
            <button
              type="button"
              onClick={toggleRole}
              className="text-xs px-3 py-1.5 bg-brand-terracotta text-white rounded-lg hover:bg-brand-terracottaDark transition-colors font-medium"
            >
              Switch to {isAdmin ? 'User' : 'Admin'} Mode
            </button>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {authMode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sundar Raman"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-terracotta/50 focus:border-brand-terracotta"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-terracotta/50 focus:border-brand-terracotta"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-terracotta/50 focus:border-brand-terracotta"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-brand-terracotta text-white font-semibold rounded-xl hover:bg-brand-terracottaDark transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 mt-2"
            >
              {loading ? 'Processing...' : (authMode === 'login' ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          {/* Quick Demo Credentials */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Testing locally? Click button above to auto-fill or switch role.
            </p>
          </div>

          {/* Toggle Login / Signup */}
          <div className="mt-6 text-center text-xs text-gray-600 border-t border-gray-100 pt-4">
            {authMode === 'login' ? (
              <p>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  className="font-bold text-brand-terracotta hover:underline"
                >
                  Sign Up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="font-bold text-brand-terracotta hover:underline"
                >
                  Sign In
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
