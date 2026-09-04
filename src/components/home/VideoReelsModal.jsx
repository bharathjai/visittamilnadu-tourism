import React, { useState } from 'react'
import { Play, X, Film, Sparkles } from 'lucide-react'

export default function VideoReelsModal() {
  const [activeVideo, setActiveVideo] = useState(null)

  const reels = [
    {
      title: 'Nilgiri Steam Toy Train Journey',
      location: 'Ooty & Coonoor',
      thumbnail: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80',
      embedUrl: 'https://www.youtube.com/embed/5D34nZcQ5J8?autoplay=1'
    },
    {
      title: 'Madurai Meenakshi Temple Aerial View',
      location: 'Madurai',
      thumbnail: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80',
      embedUrl: 'https://www.youtube.com/embed/0Bf2Wn82FqY?autoplay=1'
    },
    {
      title: 'Pamban Sea Bridge & Dhanushkodi Jeep Safari',
      location: 'Rameswaram',
      thumbnail: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=600&q=80',
      embedUrl: 'https://www.youtube.com/embed/9bZkp7q19f0?autoplay=1'
    },
    {
      title: 'Chettinad Palace & Handcrafted Tiles',
      location: 'Karaikudi',
      thumbnail: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=600&q=80',
      embedUrl: 'https://www.youtube.com/embed/2g811Eo7K8U?autoplay=1'
    }
  ]

  return (
    <section className="py-16 bg-brand-ocean text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-terracotta/20 text-brand-terracotta text-xs font-bold rounded-full uppercase tracking-wider mb-2">
              <Film className="w-3.5 h-3.5" /> Destination Reels
            </span>
            <h2 className="text-3xl font-serif font-extrabold text-white">
              Experience Tamil Nadu in Motion
            </h2>
            <p className="text-sm text-gray-300 mt-1">
              Short visual reels capturing the magic of our top tour destinations
            </p>
          </div>
        </div>

        {/* 4 Thumbnails Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reels.map((reel, idx) => (
            <div
              key={idx}
              onClick={() => setActiveVideo(reel)}
              className="group relative h-64 rounded-3xl overflow-hidden border border-white/10 shadow-xl cursor-pointer"
            >
              <img
                src={reel.thumbnail}
                alt={reel.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="w-14 h-14 bg-brand-terracotta/90 text-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-white ml-1" />
                </div>
              </div>

              <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/90 to-transparent text-white">
                <span className="text-[10px] uppercase font-bold text-brand-gold">{reel.location}</span>
                <h4 className="font-serif text-sm font-bold text-white line-clamp-1">{reel.title}</h4>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/20">
            
            <div className="p-4 bg-brand-ocean flex items-center justify-between border-b border-white/10">
              <div>
                <h4 className="text-base font-serif font-bold text-white">{activeVideo.title}</h4>
                <p className="text-xs text-brand-gold">{activeVideo.location}</p>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="relative aspect-video w-full">
              <iframe
                src={activeVideo.embedUrl}
                title={activeVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
