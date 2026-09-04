import React, { useState } from 'react'
import { Plus, Edit2, Trash2, Star, Check, X, Image as ImageIcon } from 'lucide-react'
import { api } from '../../lib/supabase'

export default function ManagePackages({ packages, onRefresh }) {
  const [editingPkg, setEditingPkg] = useState(null) // null = closed, {} = new or edit
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    images: '',
    location: '',
    category: 'Hill Stations',
    duration_days: 3,
    price: 9999,
    tag: 'Best Seller',
    is_featured: false,
    inclusions: 'Hotel Stay, Breakfast, Sightseeing Cabs',
    exclusions: 'Airfare, Personal Expenses'
  })

  const handleOpenNew = () => {
    setEditingPkg({ isNew: true })
    setFormData({
      title: '',
      description: '',
      images: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80',
      location: 'Ooty & Nilgiris',
      category: 'Hill Stations',
      duration_days: 3,
      price: 11999,
      tag: 'New',
      is_featured: true,
      inclusions: '3 Star Stay, Breakfast, Private AC Cab',
      exclusions: 'Flight/Train, GST 5%'
    })
  }

  const handleOpenEdit = (pkg) => {
    setEditingPkg(pkg)
    setFormData({
      ...pkg,
      images: pkg.images ? pkg.images.join(', ') : '',
      inclusions: pkg.inclusions ? pkg.inclusions.join(', ') : '',
      exclusions: pkg.exclusions ? pkg.exclusions.join(', ') : ''
    })
  }

  const handleSave = async (e) => {
    e.preventDefault()
    const payload = {
      ...formData,
      images: formData.images.split(',').map(s => s.trim()).filter(Boolean),
      inclusions: formData.inclusions.split(',').map(s => s.trim()).filter(Boolean),
      exclusions: formData.exclusions.split(',').map(s => s.trim()).filter(Boolean),
      price: Number(formData.price),
      duration_days: Number(formData.duration_days)
    }

    if (editingPkg?.id) payload.id = editingPkg.id

    await api.savePackage(payload)
    setEditingPkg(null)
    onRefresh()
  }

  const handleDelete = async (id) => {
    if (window.confirm('Delete this package permanently?')) {
      await api.deletePackage(id)
      onRefresh()
    }
  }

  return (
    <div className="space-y-6">
      
      {/* Header & Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-serif font-bold text-brand-ocean">Manage Tour Packages</h3>
          <p className="text-xs text-gray-500">Create, edit, or set homepage featured status</p>
        </div>

        <button
          onClick={handleOpenNew}
          className="px-4 py-2.5 bg-brand-terracotta text-white font-bold text-xs rounded-xl hover:bg-brand-terracottaDark transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add New Package
        </button>
      </div>

      {/* Packages Table / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-white p-5 rounded-3xl border border-brand-sand shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="relative h-40 rounded-2xl overflow-hidden">
                <img src={pkg.images?.[0]} alt={pkg.title} className="w-full h-full object-cover" />
                {pkg.is_featured && (
                  <span className="absolute top-2 left-2 px-2.5 py-0.5 bg-brand-gold text-brand-ocean font-bold text-[10px] rounded-md shadow-xs uppercase">
                    Featured
                  </span>
                )}
              </div>

              <span className="text-[10px] font-bold text-brand-nilgiri uppercase">{pkg.category} • {pkg.location}</span>
              <h4 className="font-serif font-bold text-brand-ocean text-base line-clamp-1">{pkg.title}</h4>
              <p className="text-xs text-gray-500 line-clamp-2">{pkg.description}</p>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="font-serif font-extrabold text-brand-terracotta text-base">₹{Number(pkg.price).toLocaleString('en-IN')}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(pkg)}
                  className="p-2 bg-brand-parchment hover:bg-brand-sand text-brand-ocean rounded-lg transition-colors text-xs font-semibold flex items-center gap-1"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(pkg.id)}
                  className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal Form */}
      {editingPkg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto border border-brand-sand">
            
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-xl font-serif font-bold text-brand-ocean">
                {editingPkg.isNew ? 'Create New Package' : 'Edit Package Details'}
              </h3>
              <button onClick={() => setEditingPkg(null)} className="p-2 text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Package Title</label>
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
                    <option value="Hill Stations">Hill Stations</option>
                    <option value="Temples & Heritage">Temples & Heritage</option>
                    <option value="Beaches">Beaches</option>
                    <option value="Wildlife & Nature">Wildlife & Nature</option>
                    <option value="Chettinad Trail">Chettinad Trail</option>
                    <option value="Pilgrimage Circuits">Pilgrimage Circuits</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Location / City</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Duration (Days)</label>
                  <input
                    type="number"
                    required
                    value={formData.duration_days}
                    onChange={(e) => setFormData({ ...formData, duration_days: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Badge Tag</label>
                  <input
                    type="text"
                    placeholder="e.g. Best Seller"
                    value={formData.tag || ''}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Image URLs (comma separated)</label>
                <input
                  type="text"
                  required
                  value={formData.images}
                  onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-300"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-300"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="is_featured"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  className="w-4 h-4 accent-brand-terracotta"
                />
                <label htmlFor="is_featured" className="font-bold text-brand-ocean">Feature this package on Homepage Must-See row</label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-brand-terracotta text-white font-bold rounded-xl hover:bg-brand-terracottaDark"
              >
                Save Package
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  )
}
