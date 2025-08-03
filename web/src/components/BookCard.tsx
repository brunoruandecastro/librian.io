type Book = {
  id: string
  title: string
  author: string
  coverUrl?: string
  status: 'read' | 'reading' | 'unread'
}

export default function BookCard({ book }: { book: Book }) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 flex gap-4 hover:shadow-sm transition">
      {book.coverUrl ? (
        <img
          src={book.coverUrl}
          alt={book.title}
          className="w-16 h-24 object-cover rounded-md"
        />
      ) : (
        <div className="w-16 h-24 bg-surface text-sm text-text-secondary flex items-center justify-center rounded-md">
          Sem capa
        </div>
      )}
      <div className="flex-1">
        <h3 className="text-lg font-serif">{book.title}</h3>
        <p className="text-sm text-text-secondary">{book.author}</p>
        <p className="text-xs mt-1 text-accent capitalize">{book.status}</p>
      </div>
    </div>
  )
}