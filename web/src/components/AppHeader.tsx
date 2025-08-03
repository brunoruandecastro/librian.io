export default function AppHeader() {
  return (
    <header className="w-full px-6 py-4 border-b border-border bg-surface/70 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-serif">Librian</h1>
        <nav className="text-sm text-text-secondary space-x-4">
          <span className="cursor-default">Minhas Estantes</span>
        </nav>
      </div>
    </header>
  )
}