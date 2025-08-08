"use client"

import Link from "next/link"
import { Search, User, BookOpen, Heart, Settings, Menu, X, Bell, Plus, Library, BookMarked, Star } from "lucide-react"
import { useState } from "react"

export default function AppHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="w-full px-4 sm:px-6 py-4 bg-surface/95 backdrop-blur-xl sticky top-0 z-50 shadow-sm relative">
      {/* Elegant separator line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
        {/* Logo and Brand */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-accent via-accent-dark to-accent rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
              <BookOpen className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300" />
            </div>

            {/* Logo Librian */}
            <Link href="/" className="group flex items-center">
              <span className="text-xs text-text-secondary font-semibold tracking-widest">Librian</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            <Link
              href="/"
              className="flex items-center gap-3 px-5 py-3 text-text-secondary hover:text-accent transition-all duration-200 rounded-2xl hover:bg-accent-light/10 hover:border-accent/20 border border-transparent font-semibold text-sm group whitespace-nowrap"
            >
              <Library className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              Estante
            </Link>
            <Link
              href="/wishlist"
              className="flex items-center gap-3 px-5 py-3 text-text-secondary hover:text-accent transition-all duration-200 rounded-2xl hover:bg-accent-light/10 hover:border-accent/20 border border-transparent font-semibold text-sm group whitespace-nowrap"
            >
              <Heart className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              Desejos
            </Link>
            <Link
              href="/reading"
              className="flex items-center gap-3 px-5 py-3 text-text-secondary hover:text-accent transition-all duration-200 rounded-2xl hover:bg-accent-light/10 hover:border-accent/20 border border-transparent font-semibold text-sm group whitespace-nowrap"
            >
              <BookMarked className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              Lendo
            </Link>
          </nav>
        </div>

        {/* Search and User Menu */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden md:block">
            <div className="relative w-80">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <input
                type="text"
                placeholder="Buscar livros, autores, editoras..."
                className="w-full pl-12 pr-4 h-12 bg-surface-secondary border border-border-subtle rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-text-primary placeholder-text-secondary transition-all duration-200 hover:border-accent/30"
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="hidden sm:flex items-center gap-2">
            <Link
              href="/books/new"
              className="w-12 h-12 bg-gradient-to-r from-accent to-accent-dark text-white rounded-2xl hover:shadow-lg transition-all duration-200 hover:scale-105 group flex items-center justify-center"
              title="Adicionar novo livro"
            >
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            </Link>
            <button
              className="w-12 h-12 text-text-secondary hover:text-accent transition-all duration-200 hover:bg-accent-light/10 rounded-2xl hover:scale-105 relative flex items-center justify-center"
              title="Notificações"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-surface"></span>
            </button>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            <button
              className="w-12 h-12 text-text-secondary hover:text-accent transition-all duration-200 hover:bg-accent-light/10 rounded-2xl hover:scale-105 flex items-center justify-center"
              title="Configurações"
            >
              <Settings className="w-5 h-5" />
            </button>
            <Link
              href="/profile"
              className="flex items-center gap-3 h-12 px-3 text-text-secondary hover:text-accent transition-all duration-200 hover:bg-accent-light/10 rounded-2xl hover:scale-105 group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-accent-light/20 via-accent/20 to-accent-dark/20 rounded-2xl flex items-center justify-center border border-accent/20 group-hover:border-accent/40 transition-all duration-200 group-hover:shadow-md">
                <User className="w-5 h-5" />
              </div>
              <div className="hidden sm:block text-left">
                <span className="text-sm font-semibold text-text-primary">Bruno</span>
                <p className="text-xs text-text-secondary">Administrador</p>
              </div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-12 h-12 text-text-secondary hover:text-accent transition-all duration-200 hover:bg-accent-light/10 rounded-2xl flex items-center justify-center"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 pb-6 border-t border-border-subtle bg-gradient-to-br from-surface to-surface-secondary rounded-2xl mx-2">
          <div className="pt-6 px-4 space-y-3">
            <Link
              href="/"
              className="flex items-center gap-4 px-4 py-4 text-text-secondary hover:text-accent transition-all duration-200 rounded-2xl hover:bg-accent-light/10 font-semibold group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="p-2 bg-accent-light/20 rounded-xl">
                <BookOpen className="w-5 h-5" />
              </div>
              <span>Minha Estante</span>
            </Link>
            <Link
              href="/wishlist"
              className="flex items-center gap-4 px-4 py-4 text-text-secondary hover:text-accent transition-all duration-200 rounded-2xl hover:bg-accent-light/10 font-semibold group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="p-2 bg-accent-light/20 rounded-xl">
                <Heart className="w-5 h-5" />
              </div>
              <span>Lista de Desejos</span>
            </Link>
            <Link
              href="/reading"
              className="flex items-center gap-4 px-4 py-4 text-text-secondary hover:text-accent transition-all duration-200 rounded-2xl hover:bg-accent-light/10 font-semibold group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="p-2 bg-accent-light/20 rounded-xl">
                <BookMarked className="w-5 h-5" />
              </div>
              <span>Lendo Agora</span>
            </Link>
            <Link
              href="/books/new"
              className="flex items-center gap-4 px-4 py-4 text-text-secondary hover:text-accent transition-all duration-200 rounded-2xl hover:bg-accent-light/10 font-semibold group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="p-2 bg-accent-light/20 rounded-xl">
                <Plus className="w-5 h-5" />
              </div>
              <span>Adicionar Livro</span>
            </Link>

            {/* Mobile Search */}
            <div className="px-4 pt-4 border-t border-border-subtle">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Buscar livros, autores..."
                  className="w-full pl-12 pr-4 py-3 bg-surface-secondary border border-border-subtle rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-text-primary placeholder-text-secondary"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}