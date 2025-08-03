"use client"
import BookForm from "@/components/BookForm"

export default function NewBookPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-serif mb-4">Librian</h1>
      <BookForm />
    </div>
  )
} 