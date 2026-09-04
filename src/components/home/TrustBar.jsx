import React from 'react'
import { ShieldCheck, Award, ThumbsUp, HeartHandshake } from 'lucide-react'

export default function TrustBar() {
  const trustStats = [
    {
      icon: Award,
      title: 'Trusted by 15,000+ Travelers',
      subtitle: 'Over 98% 5-star ratings from satisfied families & solo explorers'
    },
    {
      icon: ShieldCheck,
      title: 'Verified Local Guides',
      subtitle: 'Licensed Tamil Nadu tourism experts & certified drivers'
    },
    {
      icon: HeartHandshake,
      title: 'Best Price Guarantee',
      subtitle: 'Transparent package pricing with zero hidden booking charges'
    }
  ]

  return (
    <section className="py-12 bg-white border-b border-brand-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trustStats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div
                key={idx}
                className="flex items-start gap-4 p-6 rounded-2xl bg-brand-parchment/60 border border-brand-sand hover:border-brand-gold/50 transition-all duration-300 group"
              >
                <div className="p-3 bg-brand-terracotta/10 text-brand-terracotta rounded-xl group-hover:scale-110 group-hover:bg-brand-terracotta group-hover:text-white transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-brand-ocean mb-1">
                    {stat.title}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {stat.subtitle}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
