import { createClient } from '@supabase/supabase-js'
import { INITIAL_PACKAGES, INITIAL_ARTICLES, INITIAL_REVIEWS } from './mockData'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-supabase-project.supabase.co'
)

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// LocalStorage Persistence Keys for Demo Fallback Engine
const STORAGE_KEYS = {
  PACKAGES: 'visittn_packages',
  ARTICLES: 'visittn_articles',
  REVIEWS: 'visittn_reviews',
  BOOKINGS: 'visittn_bookings',
  AVAILABILITY: 'visittn_availability',
  USER: 'visittn_user'
}

// Helper to initialize LocalStorage if empty
const initLocalStorage = () => {
  if (typeof window === 'undefined') return

  if (!localStorage.getItem(STORAGE_KEYS.PACKAGES)) {
    localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(INITIAL_PACKAGES))
  }
  if (!localStorage.getItem(STORAGE_KEYS.ARTICLES)) {
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(INITIAL_ARTICLES))
  }
  if (!localStorage.getItem(STORAGE_KEYS.REVIEWS)) {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(INITIAL_REVIEWS))
  }
  if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify([
      {
        id: 'bk-demo-01',
        booking_reference: 'TN-984210',
        user_id: 'usr-demo-01',
        user_name: 'Bharath',
        user_email: 'bharath@example.com',
        package_id: 'pkg-ooty-01',
        package_title: 'Queen of Hill Stations: Ooty & Coonoor Deluxe Trail',
        location: 'Ooty & Nilgiris',
        image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=600&q=80',
        travel_date: '2026-04-15',
        travelers: { adults: 2, children: 1 },
        total_price: 37497,
        status: 'confirmed',
        created_at: '2026-03-01'
      }
    ]))
  }
}

// Initialize on load
initLocalStorage()

// DATA SERVICE LAYER (Handles live Supabase OR Mock Fallback seamlessly)
export const api = {
  // PACKAGES
  async getPackages() {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('packages').select('*').order('created_at', { ascending: false })
      if (!error && data?.length) return data
    }
    const raw = localStorage.getItem(STORAGE_KEYS.PACKAGES)
    return raw ? JSON.parse(raw) : INITIAL_PACKAGES
  },

  async getPackageById(id) {
    const packages = await this.getPackages()
    return packages.find(p => p.id === id) || null
  },

  async savePackage(pkg) {
    if (isSupabaseConfigured) {
      if (pkg.id && !pkg.id.startsWith('pkg-')) {
        const { data, error } = await supabase.from('packages').update(pkg).eq('id', pkg.id).select()
        if (!error && data) return data[0]
      } else {
        const { data, error } = await supabase.from('packages').insert(pkg).select()
        if (!error && data) return data[0]
      }
    }
    // Mock save
    const packages = await this.getPackages()
    if (pkg.id) {
      const idx = packages.findIndex(p => p.id === pkg.id)
      if (idx !== -1) {
        packages[idx] = { ...packages[idx], ...pkg }
      } else {
        packages.unshift(pkg)
      }
    } else {
      pkg.id = 'pkg-' + Date.now()
      pkg.avg_rating = 5.0
      pkg.review_count = 0
      packages.unshift(pkg)
    }
    localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(packages))
    return pkg
  },

  async deletePackage(id) {
    if (isSupabaseConfigured) {
      await supabase.from('packages').delete().eq('id', id)
    }
    const packages = await this.getPackages()
    const filtered = packages.filter(p => p.id !== id)
    localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(filtered))
    return true
  },

  // ARTICLES
  async getArticles() {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('articles').select('*').order('published_at', { ascending: false })
      if (!error && data?.length) return data
    }
    const raw = localStorage.getItem(STORAGE_KEYS.ARTICLES)
    return raw ? JSON.parse(raw) : INITIAL_ARTICLES
  },

  async getArticleBySlug(slug) {
    const articles = await this.getArticles()
    return articles.find(a => a.slug === slug) || null
  },

  async saveArticle(art) {
    if (isSupabaseConfigured) {
      if (art.id && !art.id.startsWith('art-')) {
        const { data, error } = await supabase.from('articles').update(art).eq('id', art.id).select()
        if (!error && data) return data[0]
      } else {
        const { data, error } = await supabase.from('articles').insert(art).select()
        if (!error && data) return data[0]
      }
    }
    const articles = await this.getArticles()
    if (art.id) {
      const idx = articles.findIndex(a => a.id === art.id)
      if (idx !== -1) articles[idx] = { ...articles[idx], ...art }
      else articles.unshift(art)
    } else {
      art.id = 'art-' + Date.now()
      art.published_at = new Date().toISOString().split('T')[0]
      articles.unshift(art)
    }
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles))
    return art
  },

  // BOOKINGS & ATOMIC SLOT CHECK
  async getBookings(userId = null) {
    if (isSupabaseConfigured) {
      let query = supabase.from('bookings').select('*, packages(title, location, images)').order('created_at', { ascending: false })
      if (userId) query = query.eq('user_id', userId)
      const { data, error } = await query
      if (!error && data) return data
    }
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKINGS)
    const bookings = raw ? JSON.parse(raw) : []
    if (userId) return bookings.filter(b => b.user_id === userId)
    return bookings
  },

  async createBooking(bookingData) {
    // Generate Booking Reference (e.g. TN-742910)
    const refCode = 'TN-' + Math.floor(100000 + Math.random() * 900000)

    if (isSupabaseConfigured) {
      const { data, error } = await supabase.rpc('create_booking_atomic', {
        p_user_id: bookingData.user_id || null,
        p_package_id: bookingData.package_id,
        p_travel_date: bookingData.travel_date,
        p_travelers: bookingData.travelers,
        p_total_price: bookingData.total_price,
        p_requested_slots: (bookingData.travelers?.adults || 1) + (bookingData.travelers?.children || 0),
        p_booking_ref: refCode
      })

      if (!error && data?.success) {
        return {
          id: data.booking_id,
          booking_reference: refCode,
          ...bookingData
        }
      }
    }

    // Mock Booking Flow
    const newBooking = {
      id: 'bk-' + Date.now(),
      booking_reference: refCode,
      ...bookingData,
      status: 'confirmed',
      created_at: new Date().toISOString().split('T')[0]
    }

    const bookings = await this.getBookings()
    bookings.unshift(newBooking)
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings))

    // Decrement slots in local availability state
    this.decrementMockSlots(bookingData.package_id, bookingData.travel_date, (bookingData.travelers?.adults || 1) + (bookingData.travelers?.children || 0))

    return newBooking
  },

  async cancelBooking(bookingId) {
    const bookings = await this.getBookings()
    const booking = bookings.find(b => b.id === bookingId)
    if (booking) {
      booking.status = 'cancelled'
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings))
      // Restore slots
      const slotsCount = (booking.travelers?.adults || 1) + (booking.travelers?.children || 0)
      this.restoreMockSlots(booking.package_id, booking.travel_date, slotsCount)
    }

    if (isSupabaseConfigured) {
      await supabase.from('bookings').update({ status: 'cancelled' }).eq('id', bookingId)
    }
    return true
  },

  async updateBookingStatus(bookingId, status) {
    const bookings = await this.getBookings()
    const booking = bookings.find(b => b.id === bookingId)
    if (booking) {
      booking.status = status
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings))
    }
    if (isSupabaseConfigured) {
      await supabase.from('bookings').update({ status }).eq('id', bookingId)
    }
    return true
  },

  // AVAILABILITY SLOTS
  getAvailabilityKey(packageId, dateStr) {
    return `avail_${packageId}_${dateStr}`
  },

  async getPackageSlots(packageId, dateStr) {
    if (isSupabaseConfigured) {
      const { data } = await supabase.from('package_availability').select('*').eq('package_id', packageId).eq('date', dateStr).single()
      if (data) {
        return { total: data.total_slots, remaining: data.total_slots - data.booked_slots }
      }
    }
    // Mock Availability calculation
    const key = this.getAvailabilityKey(packageId, dateStr)
    const raw = localStorage.getItem(key)
    if (raw) {
      const parsed = JSON.parse(raw)
      return { total: parsed.total_slots, remaining: parsed.total_slots - parsed.booked_slots }
    }
    // Default 10 slots with randomized 2-6 booked slots
    const total = 10
    const booked = Math.floor(Math.random() * 5) + 1
    localStorage.setItem(key, JSON.stringify({ total_slots: total, booked_slots: booked }))
    return { total, remaining: total - booked }
  },

  decrementMockSlots(packageId, dateStr, requestedCount) {
    const key = this.getAvailabilityKey(packageId, dateStr)
    const raw = localStorage.getItem(key)
    let current = raw ? JSON.parse(raw) : { total_slots: 10, booked_slots: 3 }
    current.booked_slots = Math.min(current.total_slots, current.booked_slots + requestedCount)
    localStorage.setItem(key, JSON.stringify(current))
  },

  restoreMockSlots(packageId, dateStr, count) {
    const key = this.getAvailabilityKey(packageId, dateStr)
    const raw = localStorage.getItem(key)
    if (raw) {
      let current = JSON.parse(raw)
      current.booked_slots = Math.max(0, current.booked_slots - count)
      localStorage.setItem(key, JSON.stringify(current))
    }
  },

  // REVIEWS
  async getReviews(packageId = null) {
    if (isSupabaseConfigured) {
      let query = supabase.from('reviews').select('*, profiles(full_name)').order('created_at', { ascending: false })
      if (packageId) query = query.eq('package_id', packageId)
      const { data, error } = await query
      if (!error && data) return data
    }
    const raw = localStorage.getItem(STORAGE_KEYS.REVIEWS)
    const reviews = raw ? JSON.parse(raw) : INITIAL_REVIEWS
    if (packageId) return reviews.filter(r => r.package_id === packageId)
    return reviews
  },

  async addReview(review) {
    const newRev = {
      id: 'rev-' + Date.now(),
      ...review,
      created_at: new Date().toISOString().split('T')[0]
    }
    const reviews = await this.getReviews()
    reviews.unshift(newRev)
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews))

    if (isSupabaseConfigured) {
      await supabase.from('reviews').insert(review)
    }
    return newRev
  },

  async deleteReview(reviewId) {
    const reviews = await this.getReviews()
    const filtered = reviews.filter(r => r.id !== reviewId)
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(filtered))
    if (isSupabaseConfigured) {
      await supabase.from('reviews').delete().eq('id', reviewId)
    }
    return true
  }
}
