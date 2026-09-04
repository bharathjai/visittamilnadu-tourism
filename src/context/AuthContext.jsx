import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  // Demo user initial state
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('visittn_current_user')
    return stored ? JSON.parse(stored) : {
      id: 'usr-demo-01',
      email: 'krishna@visittamilnadu.org',
      full_name: 'Krishna',
      role: 'user' // 'user' or 'admin'
    }
  })

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login') // 'login' or 'signup'
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      // Listen to Supabase Auth State
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          fetchProfile(session.user)
        }
      })

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          fetchProfile(session.user)
        } else {
          // Fallback to local storage user
        }
      })

      return () => subscription.unsubscribe()
    }
  }, [])

  const fetchProfile = async (authUser) => {
    try {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', authUser.id).single()
      if (data) {
        const fullUser = {
          id: authUser.id,
          email: authUser.email,
          full_name: data.full_name || authUser.user_metadata?.full_name || 'Traveler',
          role: data.role || 'user'
        }
        setUser(fullUser)
        localStorage.setItem('visittn_current_user', JSON.stringify(fullUser))
      }
    } catch (err) {
      console.error('Error fetching profile:', err)
    }
  }

  const login = async (email, password) => {
    setLoading(true)
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      setLoading(false)
      if (error) throw error
      setIsAuthModalOpen(false)
      return data
    } else {
      // Mock Login
      const isAdmin = email.toLowerCase().includes('admin')
      const loggedUser = {
        id: 'usr-' + Date.now(),
        email,
        full_name: email.split('@')[0].replace('.', ' ').toUpperCase(),
        role: isAdmin ? 'admin' : 'user'
      }
      setUser(loggedUser)
      localStorage.setItem('visittn_current_user', JSON.stringify(loggedUser))
      setLoading(false)
      setIsAuthModalOpen(false)
      return loggedUser
    }
  }

  const signup = async (email, password, fullName) => {
    setLoading(true)
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } }
      })
      setLoading(false)
      if (error) throw error
      setIsAuthModalOpen(false)
      return data
    } else {
      // Mock Signup
      const newUser = {
        id: 'usr-' + Date.now(),
        email,
        full_name: fullName || email.split('@')[0],
        role: 'user'
      }
      setUser(newUser)
      localStorage.setItem('visittn_current_user', JSON.stringify(newUser))
      setLoading(false)
      setIsAuthModalOpen(false)
      return newUser
    }
  }

  const logout = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut()
    }
    const guestUser = {
      id: 'usr-guest-' + Date.now(),
      email: 'guest@visittamilnadu.org',
      full_name: 'Guest Traveler',
      role: 'user'
    }
    setUser(guestUser)
    localStorage.setItem('visittn_current_user', JSON.stringify(guestUser))
  }

  // Helper function to toggle between User and Admin roles for instant testing
  const toggleRole = () => {
    const newRole = user?.role === 'admin' ? 'user' : 'admin'
    const updated = {
      ...user,
      role: newRole,
      full_name: newRole === 'admin' ? 'Admin Coordinator' : 'Krishna'
    }
    setUser(updated)
    localStorage.setItem('visittn_current_user', JSON.stringify(updated))
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAdmin: user?.role === 'admin',
      isAuthModalOpen,
      setIsAuthModalOpen,
      authMode,
      setAuthMode,
      login,
      signup,
      logout,
      toggleRole,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
