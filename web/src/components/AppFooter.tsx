export default function AppFooter() {
  return (
    <footer className="w-full text-center text-xs text-text-secondary py-6 border-t border-border bg-surface">
      © {new Date().getFullYear()} Librian.io — sua biblioteca pessoal digital
    </footer>
  )
}