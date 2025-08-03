export default function LibraryStats() {
  const stats = {
    total: 27,
    reading: 3,
    read: 12,
    unread: 12,
  }

  return (
    <section className="mb-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-sm">
      <div className="bg-surface rounded-lg p-4 border border-border">
        <span className="block text-2xl font-serif">{stats.total}</span>
        <span className="text-text-secondary">Total</span>
      </div>
      <div className="bg-surface rounded-lg p-4 border border-border">
        <span className="block text-2xl font-serif">{stats.reading}</span>
        <span className="text-text-secondary">Lendo</span>
      </div>
      <div className="bg-surface rounded-lg p-4 border border-border">
        <span className="block text-2xl font-serif">{stats.read}</span>
        <span className="text-text-secondary">Lidos</span>
      </div>
      <div className="bg-surface rounded-lg p-4 border border-border">
        <span className="block text-2xl font-serif">{stats.unread}</span>
        <span className="text-text-secondary">Não Lidos</span>
      </div>
    </section>
  )
}