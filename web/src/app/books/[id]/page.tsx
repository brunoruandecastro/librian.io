import { Star, Eye, BookOpen, Clock, Heart, Edit, Share, Calendar, User, Building } from "lucide-react"
import Link from "next/link"

// Mock data - em produção viria da API
const book = {
  id: "1",
  title: "O Senhor dos Anéis: A Sociedade do Anel",
  author: "J.R.R. Tolkien",
  coverUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1296125684i/33.jpg",
  status: 'read' as const,
  rating: 5,
  pages: 576,
  year: 1954,
  publisher: "Martins Fontes",
  isbn: "9788533613379",
  description: "O Senhor dos Anéis é um romance de fantasia épica escrita pelo filólogo e professor universitário britânico J.R.R. Tolkien. A história começa como uma sequência para O Hobbit, mas se desenvolveu em uma história muito maior. Foi escrita em etapas entre 1937 e 1949, com grande parte sendo escrita durante a Segunda Guerra Mundial.",
  genre: "Fantasia",
  language: "Português",
  addedDate: "2024-01-15",
  readDate: "2024-03-20",
  notes: "Uma obra-prima da literatura fantástica. A construção do mundo de Middle-earth é incrível, com suas línguas, culturas e história detalhadas. A jornada de Frodo e da Sociedade do Anel é emocionante e cheia de momentos memoráveis."
}

interface PageProps {
  params: { id: string }
}

export default function BookDetailPage({ params }: PageProps) {
  const statusConfig = {
    read: { label: 'Lido', icon: Eye, color: 'text-success', bgColor: 'bg-success-light', borderColor: 'border-success/20' },
    reading: { label: 'Lendo', icon: BookOpen, color: 'text-info', bgColor: 'bg-info-light', borderColor: 'border-info/20' },
    unread: { label: 'Não lido', icon: Clock, color: 'text-text-secondary', bgColor: 'bg-surface-secondary', borderColor: 'border-border' },
    wishlist: { label: 'Lista de desejos', icon: Heart, color: 'text-pink-500', bgColor: 'bg-pink-50', borderColor: 'border-pink-200' }
  }

  const status = statusConfig[book.status]
  const StatusIcon = status.icon

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <Link href="/" className="text-text-secondary hover:text-accent transition">
          ← Voltar para Minha Estante
        </Link>
      </nav>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cover and Basic Info */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="bg-card border-ultra-subtle rounded-2xl p-6 shadow-sm">
              {/* Cover */}
              <div className="mb-6">
                {book.coverUrl ? (
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full max-w-xs mx-auto rounded-xl shadow-lg"
                  />
                ) : (
                  <div className="w-full max-w-xs mx-auto h-96 bg-surface-secondary text-text-secondary flex items-center justify-center rounded-xl">
                    Sem capa
                  </div>
                )}
              </div>

              {/* Status Badge */}
              <div className="flex items-center justify-center mb-4">
                <div className={`px-4 py-2 rounded-xl text-sm font-medium ${status.bgColor} ${status.color} flex items-center gap-2 border ${status.borderColor}`}>
                  <StatusIcon className="w-4 h-4" />
                  {status.label}
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < book.rating!
                      ? 'text-warning fill-current'
                      : 'text-text-muted'
                      }`}
                  />
                ))}
                <span className="text-sm text-text-secondary ml-2">
                  {book.rating}/5
                </span>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button className="w-full bg-accent text-white py-2 px-4 rounded-xl hover:bg-accent-dark transition flex items-center justify-center gap-2 shadow-sm">
                  <Edit className="w-4 h-4" />
                  Editar
                </button>
                <button className="w-full bg-surface border border-border text-text-primary py-2 px-4 rounded-xl hover:bg-hover transition flex items-center justify-center gap-2">
                  <Share className="w-4 h-4" />
                  Compartilhar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Book Details */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-card-border rounded-2xl p-6 shadow-sm">
            <h1 className="text-3xl font-serif font-bold mb-2 text-text-primary">{book.title}</h1>
            <p className="text-xl text-text-secondary mb-6 flex items-center gap-2">
              <User className="w-5 h-5" />
              {book.author}
            </p>

            {/* Book Info Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <Building className="w-4 h-4 text-text-secondary" />
                <span className="text-text-secondary">Editora:</span>
                <span className="text-text-primary">{book.publisher}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-text-secondary" />
                <span className="text-text-secondary">Ano:</span>
                <span className="text-text-primary">{book.year}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-text-secondary">Páginas:</span>
                <span className="text-text-primary">{book.pages}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-text-secondary">ISBN:</span>
                <span className="font-mono text-text-primary">{book.isbn}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-text-secondary">Gênero:</span>
                <span className="text-text-primary">{book.genre}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-text-secondary">Idioma:</span>
                <span className="text-text-primary">{book.language}</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-serif font-medium mb-3 text-text-primary">Sinopse</h3>
              <p className="text-text-secondary leading-relaxed">{book.description}</p>
            </div>

            {/* Notes */}
            {book.notes && (
              <div className="mb-6">
                <h3 className="text-lg font-serif font-medium mb-3 text-text-primary">Minhas Anotações</h3>
                <div className="bg-surface-secondary border border-border rounded-xl p-4">
                  <p className="text-text-secondary leading-relaxed">{book.notes}</p>
                </div>
              </div>
            )}

            {/* Reading Dates */}
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-text-secondary">Adicionado em:</span>
                <p className="text-text-primary">{new Date(book.addedDate).toLocaleDateString('pt-BR')}</p>
              </div>
              {book.readDate && (
                <div>
                  <span className="text-text-secondary">Lido em:</span>
                  <p className="text-text-primary">{new Date(book.readDate).toLocaleDateString('pt-BR')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}