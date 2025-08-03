type Book = {
  id: string
  title: string
  author: string
  coverUrl?: string
  status: 'read' | 'reading' | 'unread'
}

const mockBooks: Book[] = [
  {
    id: "1",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    status: "reading",
    coverUrl: "https://covers.openlibrary.org/b/id/8374046-L.jpg",
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    status: "unread",
    coverUrl: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
  },
  {
    id: "3",
    title: "Orgulho e Preconceito",
    author: "Jane Austen",
    status: "read",
    coverUrl: "https://covers.openlibrary.org/b/id/8226191-L.jpg",
  },
]

export default function HighlightsCarousel() {
  return (
    <section className="mb-8">
      <h3 className="text-xl font-serif mb-4">Em destaque</h3>
      <div className="flex overflow-x-auto gap-4 pb-2">
        {mockBooks.map((book) => (
          <div
            key={book.id}
            className="min-w-[140px] bg-surface border border-border rounded-lg p-2 shrink-0 hover:shadow-md transition"
          >
            {book.coverUrl ? (
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-full h-48 object-cover rounded"
              />
            ) : (
              <div className="w-full h-48 bg-background flex items-center justify-center text-sm text-text-secondary rounded">
                Sem capa
              </div>
            )}
            <div className="mt-2">
              <h4 className="text-sm font-serif leading-tight">{book.title}</h4>
              <p className="text-xs text-text-secondary">{book.author}</p>
              <span className="text-[10px] text-accent">{book.status}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}