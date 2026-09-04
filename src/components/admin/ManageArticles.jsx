import React, { useState } from 'react'
import { Plus, Edit2, Trash2, BookOpen, X } from 'lucide-react'
import { api } from '../../lib/supabase'

export default function ManageArticles({ articles, onRefresh }) {
  const [editingArticle, setEditingArticle] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Festival',
    cover_image: '',
    content: ''
  })

  const handleOpenNew = () => {
    setEditingArticle({ isNew: true })
    setFormData({
      title: '',
      slug: '',
      category: 'Festival',
      cover_image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
      content: 'Write editorial article markdown content here...'
    })
  }

  const handleOpenEdit = (art) => {
    setEditingArticle(art)
    setFormData(art)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    const payload = {
      ...formData,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    }
    if (editingArticle?.id) payload.id = editingArticle.id

    await api.saveArticle(payload)
    setEditingArticle(null)
    onRefresh()
  }

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-serif font-bold text-brand-ocean">Manage Seasonal & Festival Articles</h3>
          <p className="text-xs text-gray-500">Publish guides featured under "What's Happening in Tamil Nadu"</p>
        </div>

        <button
          onClick={handleOpenNew}
          className="px-4 py-2.5 bg-brand-terracotta text-white font-bold text-xs rounded-xl hover:bg-brand-terracottaDark transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Publish New Article
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((art) => (
          <div key={art.id} className="bg-white p-5 rounded-3xl border border-brand-sand shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="h-36 rounded-2xl overflow-hidden">
                <img src={art.cover_image} alt={art.title} className="w-full h-full object-cover" />
              </div>
              <span className="text-[10px] font-bold text-brand-gold uppercase">{art.category}</span>
              <h4 className="font-serif font-bold text-brand-ocean text-base line-clamp-2">{art.title}</h4>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-400">{art.published_at}</span>
              <button
                onClick={() => handleOpenEdit(art)}
                className="p-2 bg-brand-parchment hover:bg-brand-sand text-brand-ocean font-semibold rounded-lg flex items-center gap-1"
              >
                <Edit2 className="w-3.5 h-3.5" /> Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 space-y-4 border border-brand-sand max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-xl font-serif font-bold text-brand-ocean">
                {editingArticle.isNew ? 'Publish Article' : 'Edit Article'}
              </h3>
              <button onClick={() => setEditingArticle(null)} className="p-2 text-gray-400"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-300"
                  >
                    <option value="Festival">Festival</option>
                    <option value="Seasonal Guide">Seasonal Guide</option>
                    <option value="Travel Tips">Travel Tips</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Cover Image URL</label>
                  <input
                    type="text"
                    required
                    value={formData.cover_image}
                    onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Full Content (Markdown)</label>
                <textarea
                  rows={8}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full p-3 rounded-xl border border-gray-300"
                />
              </div>

              <button type="submit" className="w-full py-3 bg-brand-terracotta text-white font-bold rounded-xl">
                Save & Publish
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
