import { Star, Eye, BookOpen, Clock, Heart, Calendar, BookMarked } from "lucide-react"
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
  isbn?: string
}

const statusConfig = {
  read: {
    label: 'Lido',
    icon: Eye,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    gradient: 'from-emerald-500 to-emerald-600'
  },
  reading: {
    label: 'Lendo',
    icon: BookOpen,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    gradient: 'from-blue-500 to-blue-600'
  },
  unread: {
    label: 'Não lido',
    icon: Clock,
    color: 'text-slate-600',
    bgColor: 'bg-slate-50',
    borderColor: 'border-slate-200',
    gradient: 'from-slate-500 to-slate-600'
  },
  wishlist: {
    label: 'Lista de desejos',
    icon: Heart,
    color: 'text-rose-600',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
    gradient: 'from-rose-500 to-rose-600'
  }
}

export default function BookCard({ book }: { book: Book }) {
  const status = statusConfig[book.status]
  const StatusIcon = status.icon

  return (
    <Link href={`/books/${book.id}`}>
      <div className="group bg-card border-ultra-subtle rounded-2xl p-5 hover:shadow-xl hover:border-accent/20 transition-all duration-300 cursor-pointer hover:bg-hover hover:-translate-y-1">
        <div className="flex gap-4">
          {/* Cover */}
          <div className="relative flex-shrink-0">
            {book.coverUrl ? (
              <div className="relative overflow-hidden rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-20 h-28 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ) : (
              <div className="w-20 h-28 bg-gradient-to-br from-surface-secondary to-surface rounded-xl shadow-lg flex items-center justify-center group-hover:shadow-2xl transition-all duration-300">
                <BookMarked className="w-8 h-8 text-text-muted" />
              </div>
            )}

            {/* Status Badge */}
            <div className={`absolute -top-2 -right-2 px-2.5 py-1 rounded-full text-xs font-semibold ${status.bgColor} ${status.color} flex items-center gap-1 border ${status.borderColor} shadow-sm group-hover:shadow-md transition-all duration-300`}>
              <StatusIcon className="w-3 h-3" />
              {status.label}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-serif font-semibold text-text-primary group-hover:text-accent transition-colors line-clamp-2 leading-tight">
              {book.title}
            </h3>
            <p className="text-sm text-text-secondary mt-1 font-medium">
              {book.author}
            </p>

            {/* Rating */}
            {book.rating && (
              <div className="flex items-center gap-1 mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < book.rating!
                      ? 'text-amber-500 fill-current'
                      : 'text-text-muted'
                      }`}
                  />
                ))}
                <span className="text-xs text-text-secondary ml-2 font-medium">
                  {book.rating}/5
                </span>
              </div>
            )}

            {/* Book Details */}
            <div className="flex flex-wrap gap-4 mt-3 text-xs text-text-secondary">
              {book.year && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span className="font-medium">{book.year}</span>
                </div>
              )}
              {book.pages && (
                <div className="flex items-center gap-1">
                  <BookMarked className="w-3 h-3" />
                  <span className="font-medium">{book.pages} p.</span>
                </div>
              )}
            </div>

            {/* Publisher */}
            {book.publisher && (
              <p className="text-xs text-text-muted mt-2 font-medium">
                {book.publisher}
              </p>
            )}
          </div>
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
      </div>
    </Link>
  )
}