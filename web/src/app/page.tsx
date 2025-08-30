"use client"

import Layout from "@/components/Layout"
import ProtectedRoute from "@/components/ProtectedRoute"
import LibraryStats from "@/components/LibraryStats"
import BookFilters, { FilterState } from "@/components/BookFilters"
import ShelfSection from "@/components/ShelfSection"
import BookCard from "@/components/BookCard"
import HighlightsCarousel from "@/components/HighlightsCarousel"
import Link from "next/link"
import { useState } from "react"
import { Plus, BookOpen, Search, Filter } from "lucide-react"

// Mock data - em produção viria da API
const mockBooks = [
  {
    id: "1",
    title: "O Senhor dos Anéis: A Sociedade do Anel",
    author: "J.R.R. Tolkien",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1296125684i/33.jpg",
    status: 'read' as const,
    rating: 5,
    pages: 576,
    year: 1954,
    publisher: "Martins Fontes"
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1657781255i/3744438.jpg",
    status: 'reading' as const,
    rating: 4,
    pages: 328,
    year: 1949,
    publisher: "Companhia das Letras"
  },
  {
    id: "3",
    title: "O Guia do Mochileiro das Galáxias",
    author: "Douglas Adams",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327656754i/11.jpg",
    status: 'unread' as const,
    pages: 208,
    year: 1979,
    publisher: "Arqueiro"
  },
  {
    id: "4",
    title: "Duna",
    author: "Frank Herbert",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1555447414i/44767458.jpg",
    status: 'wishlist' as const,
    pages: 688,
    year: 1965,
    publisher: "Aleph"
  },
  {
    id: "5",
    title: "O Hobbit",
    author: "J.R.R. Tolkien",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1546071216i/5907.jpg",
    status: 'read' as const,
    rating: 4,
    pages: 336,
    year: 1937,
    publisher: "Martins Fontes"
  },
  {
    id: "6",
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1383718290i/13079982.jpg",
    status: 'unread' as const,
    pages: 176,
    year: 1953,
    publisher: "Globo"
  }
]

export default function HomePage() {
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [filters, setFilters] = useState<FilterState>({
    status: 'all',
    rating: 'all',
    sortBy: 'title'
  })

  // Filter books based on current filters
  const filteredBooks = mockBooks.filter(book => {
    if (filters.status !== 'all' && book.status !== filters.status) return false
    if (filters.rating !== 'all' && (!book.rating || book.rating < parseInt(filters.rating))) return false
    return true
  })

  // Group books by status
  const readingBooks = filteredBooks.filter(book => book.status === 'reading')
  const readBooks = filteredBooks.filter(book => book.status === 'read')
  const unreadBooks = filteredBooks.filter(book => book.status === 'unread')
  const wishlistBooks = filteredBooks.filter(book => book.status === 'wishlist')

  return (
    <ProtectedRoute>
      <Layout>
        {/* Hero Section */}
        <section className="relative mb-16 -mx-4 px-4 py-16 bg-gradient-to-br from-accent via-accent-dark to-accent rounded-b-3xl overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
          </div>

          <div className="relative max-w-5xl mx-auto text-center">

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
              Sua Biblioteca
              {/* <span className="block text-white/90"></span> */}
            </h1>

            <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              Organize sua coleção, acompanhe suas leituras e descubra novos livros para seu próximo desfrute literário.
              {/* TODO: adicionar uma caixinha para dizer o que significa bibliófilo */}
              <span className="block text-white/90">Uma experiência moderna para bibliófilos.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="/books/new"
                className="group bg-gradient-to-r from-accent via-accent-dark to-accent text-white px-8 py-4 rounded-2xl hover:shadow-xl hover:shadow-accent/25 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg font-semibold text-lg hover:scale-105 border border-accent/20 hover:border-accent/40"
              >
                <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                Adicionar Livro
              </Link>
              <Link
                href="/explore"
                className="group bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-2xl hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-3 border border-white/20 font-semibold text-lg hover:scale-105"
              >
                <Search className="w-6 h-6" />
                Explorar Catálogo
              </Link>
            </div>

            {/* Stats Preview */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">{mockBooks.length}</div>
                <div className="text-sm text-white/70">Livros na Estante</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">{readBooks.length}</div>
                <div className="text-sm text-white/70">Livros Lidos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">{wishlistBooks.length}</div>
                <div className="text-sm text-white/70">Lista de Desejos</div>
              </div>
            </div>
          </div>
        </section>

        <LibraryStats />

        {/* Highlights Carousel */}
        {readBooks.length > 0 && (
          <HighlightsCarousel books={readBooks.slice(0, 3)} />
        )}

        {/* Reading Now Section */}
        {readingBooks.length > 0 && (
          <ShelfSection
            title="Lendo Agora"
            books={readingBooks}
            type="reading"
            view="grid"
          />
        )}

        {/* Recently Added Section */}
        <ShelfSection
          title="Adicionados Recentemente"
          books={filteredBooks.slice(0, 3)}
          type="all"
          view="grid"
        />

        {/* Wishlist Preview */}
        {wishlistBooks.length > 0 && (
          <ShelfSection
            title="Lista de Desejos"
            books={wishlistBooks.slice(0, 3)}
            type="wishlist"
            view="grid"
          />
        )}

        {/* All Books Section */}
        <section className="mb-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
            <div>
              <h2 className="text-3xl font-serif font-bold text-text-primary mb-2">Todos os Livros</h2>
              <p className="text-text-secondary">Gerencie sua coleção completa de livros</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="group px-4 py-2 text-text-secondary hover:text-accent transition-all duration-200 rounded-xl flex items-center gap-2 bg-card border-ultra-subtle hover:border-accent/20"
                onClick={() => setFilters({ ...filters, status: 'all', rating: 'all' })}
              >
                <Filter className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                <span className="text-sm font-medium">Limpar Filtros</span>
              </button>
            </div>
          </div>

          <BookFilters
            onFilterChange={setFilters}
            onViewChange={setView}
            view={view}
          />

          <div className={`grid ${view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'grid-cols-1 gap-4'} mt-8`}>
            {filteredBooks.map(book => (
              <div key={book.id} className="animate-fade-in">
                <BookCard book={book} />
              </div>
            ))}
          </div>

          {filteredBooks.length === 0 && (
            <div className="text-center py-16 bg-card rounded-3xl border-ultra-subtle">
              <div className="w-24 h-24 bg-gradient-to-br from-accent-light/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-12 h-12 text-accent" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-text-primary mb-3">Nenhum livro encontrado</h3>
              <p className="text-text-secondary mb-8 max-w-md mx-auto leading-relaxed">
                Tente ajustar os filtros ou comece adicionando seu primeiro livro à sua biblioteca digital.
              </p>
              <Link
                href="/books/new"
                className="group bg-gradient-to-r from-accent to-accent-dark text-white px-8 py-4 rounded-2xl hover:shadow-xl transition-all duration-300 inline-flex items-center gap-3 font-semibold hover:scale-105"
              >
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                Adicionar Primeiro Livro
              </Link>
            </div>
          )}
        </section>
      </Layout>
    </ProtectedRoute>
  )
}