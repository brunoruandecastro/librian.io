import Layout from "@/components/Layout"
import ShelfGrid from "@/components/ShelfGrid"
import LibraryStats from "@/components/LibraryStats"
import HighlightsCarousel from "@/components/HighlightsCarousel"
import Link from "next/link"

export default function HomePage() {
  return (
    <Layout>
      <LibraryStats />

      <div className="flex justify-end mb-4">
        <Link
          href="/books/new"
          className="bg-accent text-white px-4 py-2 rounded hover:opacity-90 transition"
        >
          + Adicionar Livro
        </Link>
      </div>

      <HighlightsCarousel />
      <h2 className="text-3xl font-serif mb-6">Minhas Estantes</h2>
      <ShelfGrid />
    </Layout>
  )
}