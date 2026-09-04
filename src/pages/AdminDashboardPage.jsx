import React, { useState, useEffect } from 'react'
import { Shield, Package, Calendar, BookOpen, Star, Users, BarChart2, ShieldAlert } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { api } from '../lib/supabase'

import AdminOverview from '../components/admin/AdminOverview'
import ManagePackages from '../components/admin/ManagePackages'
import ManageBookings from '../components/admin/ManageBookings'
import ManageArticles from '../components/admin/ManageArticles'
import ManageReviews from '../components/admin/ManageReviews'
import ManageUsers from '../components/admin/ManageUsers'

export default function AdminDashboardPage() {
  const { isAdmin, user, toggleRole } = useAuth()
  const [activeTab, setActiveTab] = useState('overview') // 'overview', 'packages', 'bookings', 'articles', 'reviews', 'users'

  const [packages, setPackages] = useState([])
  const [bookings, setBookings] = useState([])
  const [articles, setArticles] = useState([])

  const loadData = async () => {
    const pkgs = await api.getPackages()
    const bks = await api.getBookings()
    const arts = await api.getArticles()
    setPackages(pkgs)
    setBookings(bks)
    setArticles(arts)
  }

  useEffect(() => {
    loadData()
  }, [])

  if (!isAdmin) {
    return (
      <div className="min-h-[70vh] bg-brand-parchment py-16 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-brand-sand shadow-xl text-center space-y-4">
          <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-brand-ocean">Admin Access Required</h2>
          <p className="text-xs text-gray-500">
            You are currently logged in as a normal <strong>User</strong>. To test the Admin Panel, click the button below to toggle your role.
          </p>
          <button
            onClick={toggleRole}
            className="w-full py-3 bg-brand-gold text-brand-ocean font-bold text-xs rounded-xl shadow-md hover:bg-brand-goldHover transition-colors"
          >
            Switch to Admin Mode Now
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-parchment py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Header */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-sand shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-gold/20 text-brand-goldHover rounded-2xl flex items-center justify-center font-bold text-xl">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-serif font-bold text-brand-ocean">Admin Management Portal</h1>
                <span className="px-2.5 py-0.5 bg-brand-terracotta text-white font-bold text-[10px] rounded uppercase">Live Mode</span>
              </div>
              <p className="text-xs text-gray-500">Control tour packages, customer bookings, editorial guides & reviews</p>
            </div>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar bg-white p-2 rounded-2xl border border-brand-sand">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart2 },
            { id: 'packages', label: 'Packages', icon: Package },
            { id: 'bookings', label: 'Bookings', icon: Calendar },
            { id: 'articles', label: 'Editorial Articles', icon: BookOpen },
            { id: 'reviews', label: 'Reviews', icon: Star },
            { id: 'users', label: 'Users', icon: Users }
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-brand-ocean text-white shadow-md'
                    : 'text-gray-600 hover:bg-brand-parchment'
                }`}
              >
                <Icon className="w-4 h-4 text-brand-gold" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Active Tab View */}
        <div>
          {activeTab === 'overview' && <AdminOverview packages={packages} bookings={bookings} articles={articles} />}
          {activeTab === 'packages' && <ManagePackages packages={packages} onRefresh={loadData} />}
          {activeTab === 'bookings' && <ManageBookings bookings={bookings} onRefresh={loadData} />}
          {activeTab === 'articles' && <ManageArticles articles={articles} onRefresh={loadData} />}
          {activeTab === 'reviews' && <ManageReviews />}
          {activeTab === 'users' && <ManageUsers />}
        </div>

      </div>
    </div>
  )
}
