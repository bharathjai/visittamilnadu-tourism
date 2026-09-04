import React, { useState, useEffect } from 'react'
import { Star, Trash2, CheckCircle2 } from 'lucide-react'
import { api } from '../../lib/supabase'

export default function ManageReviews() {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    loadReviews()
  }, [])

  const loadReviews = async () => {
    const revs = await api.getReviews()
    setReviews(revs)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Delete this user review?')) {
      await api.deleteReview(id)
      loadReviews()
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-serif font-bold text-brand-ocean">Review Moderation Queue</h3>
        <p className="text-xs text-gray-500">Moderate customer reviews before package rating calculation</p>
      </div>

      <div className="bg-white rounded-3xl border border-brand-sand shadow-sm p-6 space-y-4">
        {reviews.map((rev) => (
          <div key={rev.id} className="p-4 bg-brand-parchment/60 rounded-2xl border border-brand-sand flex items-start justify-between gap-4 text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-brand-ocean">{rev.user_name || rev.profiles?.full_name || 'Traveler'}</span>
                <div className="flex text-amber-500">
                  {[...Array(rev.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-500" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700">{rev.comment}</p>
              <span className="text-[10px] text-gray-400 block">{rev.created_at}</span>
            </div>

            <button
              onClick={() => handleDelete(rev.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
