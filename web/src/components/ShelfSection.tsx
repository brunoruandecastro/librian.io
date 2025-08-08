import { BookOpen, Eye, Clock, Heart } from "lucide-react"
import BookCard from "./BookCard"

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
  isbn?: string
}

type ShelfSectionProps = {
  title: string
  books: Book[]
  type: 'reading' | 'read' | 'unread' | 'wishlist' | 'all'
  view: 'grid' | 'list'
}

const sectionConfig = {
  reading: {
    icon: BookOpen,
    color: 'text-info',
    bgColor: 'bg-info-light',
    borderColor: 'border-info/20',
    description: 'Livros que você está lendo atualmente'
  },
  read: {
    icon: Eye,
    color: 'text-success',
    bgColor: 'bg-success-light',
    borderColor: 'border-success/20',
    description: 'Livros que você já leu'
  },
  unread: {
    icon: Clock,
    color: 'text-text-secondary',
    bgColor: 'bg-surface-secondary',
    borderColor: 'border-border-subtle',
    description: 'Livros na sua estante para ler'
  },
  wishlist: {
    icon: Heart,
    color: 'text-pink-500',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200',
    description: 'Livros que você deseja ler'
  },
  all: {
    icon: BookOpen,
    color: 'text-primary-600',
    bgColor: 'bg-primary-50',
    borderColor: 'border-primary-200',
    description: 'Todos os livros da sua biblioteca'
  }
}

export default function ShelfSection({ title, books, type, view }: ShelfSectionProps) {
  const config = sectionConfig[type]
  const Icon = config.icon

  if (books.length === 0) {
    return null
  }

  return (
    <section className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-xl ${config.bgColor} border ${config.borderColor}`}>
          <Icon className={`w-5 h-5 ${config.color}`} />
        </div>
        <div>
          <h2 className="text-xl font-serif font-medium text-text-primary">{title}</h2>
          <p className="text-sm text-text-secondary">{config.description}</p>
        </div>
        <span className="ml-auto text-sm text-text-secondary bg-card border-ultra-subtle px-3 py-1 rounded-xl">
          {books.length} {books.length === 1 ? 'livro' : 'livros'}
        </span>
      </div>

      <div className={`grid gap-4 ${view === 'grid'
        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        : 'grid-cols-1'
        }`}>
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  )
} 