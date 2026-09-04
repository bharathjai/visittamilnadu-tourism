import React, { useState, useEffect } from 'react'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AuthModal from './components/auth/AuthModal'
import BookingModal from './components/booking/BookingModal'

// Homepage Sections
import Hero from './components/home/Hero'
import QuickLinksPills from './components/home/QuickLinksPills'
import TrustBar from './components/home/TrustBar'
import FeaturedPackages from './components/home/FeaturedPackages'
import CategoryGrid from './components/home/CategoryGrid'
import BestSellersCarousel from './components/home/BestSellersCarousel'
import EditorialArticles from './components/home/EditorialArticles'
import RegionalHighlights from './components/home/RegionalHighlights'
import VideoReelsModal from './components/home/VideoReelsModal'
import OffersSection from './components/home/OffersSection'

// Pages
import PackagesListingPage from './pages/PackagesListingPage'
import PackageDetailPage from './pages/PackageDetailPage'
import ArticleDetailPage from './pages/ArticleDetailPage'
import UserDashboardPage from './pages/UserDashboardPage'
import AdminDashboardPage from './pages/AdminDashboardPage'

import { api } from './lib/supabase'

export default function App() {
  const [activeTab, setActiveTab] = useState('home') // 'home', 'packages', 'package-detail', 'articles', 'article-detail', 'my-bookings', 'admin'
  const [packages, setPackages] = useState([])
  const [articles, setArticles] = useState([])
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [selectedArticle, setSelectedArticle] = useState(null)

  const [initialCategory, setInitialCategory] = useState('')
  const [initialLocation, setInitialLocation] = useState('')
  const [bookingModalDetails, setBookingModalDetails] = useState(null)

  useEffect(() => {
    async function loadInitialData() {
      const pkgs = await api.getPackages()
      const arts = await api.getArticles()
      setPackages(pkgs)
      setArticles(arts)
    }
    loadInitialData()
  }, [])

  const handleSelectPackage = (pkg) => {
    setSelectedPackage(pkg)
    setActiveTab('package-detail')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSelectArticle = (art) => {
    setSelectedArticle(art)
    setActiveTab('article-detail')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSelectCategory = (cat) => {
    setInitialCategory(cat)
    setInitialLocation('')
    setActiveTab('packages')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSelectRegion = (loc) => {
    setInitialLocation(loc)
    setInitialCategory('')
    setActiveTab('packages')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col justify-between font-sans">
        
        {/* Navigation Bar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab)
            if (tab === 'packages') {
              setInitialCategory('')
              setInitialLocation('')
            }
          }}
          onOpenSearch={() => {
            setActiveTab('packages')
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        />

        {/* Main View Router */}
        <main className="flex-grow">
          
          {/* 1. HOMEPAGE */}
          {activeTab === 'home' && (
            <div className="space-y-0 animate-fadeIn">
              <Hero
                onSearchSubmit={({ destination }) => {
                  if (destination) setInitialLocation(destination)
                  setActiveTab('packages')
                }}
                onQuickFilter={(tag) => handleSelectRegion(tag)}
              />
              
              <QuickLinksPills onSelectCategory={handleSelectCategory} />
              <TrustBar />
              
              <FeaturedPackages
                packages={packages}
                onSelectPackage={handleSelectPackage}
                onViewAll={() => setActiveTab('packages')}
              />
              
              <CategoryGrid onSelectCategory={handleSelectCategory} />
              
              <BestSellersCarousel
                packages={packages}
                onSelectPackage={handleSelectPackage}
              />
              
              <EditorialArticles
                articles={articles}
                onSelectArticle={handleSelectArticle}
              />
              
              <RegionalHighlights onSelectRegion={handleSelectRegion} />
              
              <VideoReelsModal />
              
              <OffersSection onExploreOffers={() => setActiveTab('packages')} />
            </div>
          )}

          {/* 2. PACKAGES LISTING PAGE */}
          {activeTab === 'packages' && (
            <PackagesListingPage
              packages={packages}
              onSelectPackage={handleSelectPackage}
              initialCategory={initialCategory}
              initialLocation={initialLocation}
            />
          )}

          {/* 3. PACKAGE DETAIL PAGE */}
          {activeTab === 'package-detail' && selectedPackage && (
            <PackageDetailPage
              pkg={selectedPackage}
              onBack={() => setActiveTab('packages')}
              onOpenBookingModal={(details) => setBookingModalDetails(details)}
            />
          )}

          {/* 4. ARTICLES & EDITORIAL GUIDES */}
          {activeTab === 'articles' && (
            <div className="animate-fadeIn">
              <EditorialArticles
                articles={articles}
                onSelectArticle={handleSelectArticle}
              />
            </div>
          )}

          {/* 5. ARTICLE DETAIL READER PAGE */}
          {activeTab === 'article-detail' && selectedArticle && (
            <ArticleDetailPage
              article={selectedArticle}
              onBack={() => setActiveTab('articles')}
              onExplorePackages={() => setActiveTab('packages')}
            />
          )}

          {/* 6. USER MY BOOKINGS DASHBOARD */}
          {activeTab === 'my-bookings' && (
            <UserDashboardPage
              onExplorePackages={() => setActiveTab('packages')}
            />
          )}

          {/* 7. ADMIN PANEL */}
          {activeTab === 'admin' && (
            <AdminDashboardPage />
          )}

        </main>

        {/* Global Footer */}
        <Footer
          onNavigate={(tab, options = {}) => {
            if (options.category) setInitialCategory(options.category)
            if (options.location) setInitialLocation(options.location)
            setActiveTab(tab)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        />

        {/* Global Auth Modal */}
        <AuthModal />

        {/* Interactive Booking Checkout Modal */}
        {bookingModalDetails && (
          <BookingModal
            bookingDetails={bookingModalDetails}
            onClose={() => setBookingModalDetails(null)}
            onBookingSuccess={() => {
              setActiveTab('my-bookings')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          />
        )}

      </div>
    </AuthProvider>
  )
}
