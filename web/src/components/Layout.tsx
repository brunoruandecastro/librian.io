import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";
import LibraryStats from "./LibraryStats";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-text">
      <AppHeader />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">{children}</main>
      <AppFooter />
    </div>
  )
}