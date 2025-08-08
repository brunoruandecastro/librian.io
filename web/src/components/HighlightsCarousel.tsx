"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import Link from "next/link"

type Book = {
  id: string
  title: string
  author: string
  coverUrl?: string
  status: 'read' | 'reading' | 'unread' | 'wishlist'
  rating?: number
  pages?: number
  year?: number
  publisher?: string
}

export default function HighlightsCarousel({ books }: { books: Book[] }) {
  const [activeIndex, setActiveIndex] = useState(0)

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % books.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [books.length])

  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % books.length)
  }

  const prevSlide = () => {
    setActiveIndex((current) => (current - 1 + books.length) % books.length)
  }

  if (books.length === 0) return null

  const activeBook = books[activeIndex]

  return (
    <section className="mb-16 relative overflow-hidden rounded-3xl">
      <div className="absolute inset-0 bg-gradient-to-r from-surface-800 to-surface-900 z-0">
        {activeBook.coverUrl && (
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url(${activeBook.coverUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(8px)'
          }}></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-surface-900/90 via-surface-800/70 to-surface-900/90"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Book Cover */}
          <div className="w-48 h-64 md:w-56 md:h-80 flex-shrink-0 relative">
            {activeBook.coverUrl ? (
              <img
                src={activeBook.coverUrl}
                alt={activeBook.title}
                className="w-full h-full object-cover rounded-xl shadow-elevated"
              />
            ) : (
              <div className="w-full h-full bg-surface-700 rounded-xl shadow-elevated flex items-center justify-center">
                <span className="text-white/70">Sem capa</span>
              </div>
            )}
            <div className="absolute -bottom-3 -right-3 bg-primary-600 text-white px-3 py-1 rounded-lg shadow-soft text-sm font-medium">
              Destaque
            </div>
          </div>

          {/* Book Info */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-3">
              {activeBook.title}
            </h2>
            <p className="text-xl text-white/80 mb-4">
              {activeBook.author}
            </p>

            {/* Rating */}
            {activeBook.rating && (
              <div className="flex items-center gap-1 mb-6 justify-center md:justify-start">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < activeBook.rating!
                      ? 'text-warning-500 fill-current'
                      : 'text-white/30'
                      }`}
                  />
                ))}
                <span className="text-white/80 ml-2">
                  {activeBook.rating}/5
                </span>
              </div>
            )}

            {/* Book Details */}
            <div className="flex flex-wrap gap-6 mb-8 text-white/70 justify-center md:justify-start">
              {activeBook.year && (
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-xs uppercase tracking-wider text-white/50 mb-1">Ano</span>
                  <span className="font-medium">{activeBook.year}</span>
                </div>
              )}
              {activeBook.pages && (
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-xs uppercase tracking-wider text-white/50 mb-1">Páginas</span>
                  <span className="font-medium">{activeBook.pages}</span>
                </div>
              )}
              {activeBook.publisher && (
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-xs uppercase tracking-wider text-white/50 mb-1">Editora</span>
                  <span className="font-medium">{activeBook.publisher}</span>
                </div>
              )}
            </div>

            <Link
              href={`/books/${activeBook.id}`}
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-soft"
            >
              Ver detalhes
            </Link>
          </div>
        </div>

        {/* Navigation */}
        {books.length > 1 && (
          <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
            <button
              onClick={prevSlide}
              className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm transition-colors duration-200 pointer-events-auto"
              aria-label="Previous book"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm transition-colors duration-200 pointer-events-auto"
              aria-label="Next book"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* Dots indicator */}
        {books.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {books.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${index === activeIndex ? 'bg-white' : 'bg-white/30'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}