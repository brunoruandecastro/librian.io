type Shelf = {
  id: string
  name: string
  description?: string
  bookCount: number
}

const mockShelves: Shelf[] = [
  {
    id: '1',
    name: 'Clássicos',
    description: 'Livros que marcaram época',
    bookCount: 8,
  },
  {
    id: '2',
    name: 'Para Ler',
    description: 'Filas de leitura futuras',
    bookCount: 12,
  },
  {
    id: '3',
    name: 'Favoritos',
    description: 'Minhas leituras preferidas',
    bookCount: 5,
  },
]

export default function ShelfGrid() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
      {mockShelves.map((shelf) => (
        <div
          key={shelf.id}
          className="rounded-xl bg-card border border-border p-6 hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-serif text-text">{shelf.name}</h2>
          <p className="text-sm text-text-secondary mb-2">{shelf.description}</p>
          <span className="text-xs text-accent">{shelf.bookCount} livros</span>
        </div>
      ))}
    </section>
  )
}