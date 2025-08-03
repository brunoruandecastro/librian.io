"use client"

import { useState } from "react"

type BookFormData = {
  title: string
  author: string
  status: "read" | "reading" | "unread"
  coverUrl?: string
  isForSale?: boolean
  isForDonation?: boolean
  notes?: string
}

export default function BookForm() {
  const [form, setForm] = useState<BookFormData>({
    title: "",
    author: "",
    status: "unread",
    coverUrl: "",
    isForSale: false,
    isForDonation: false,
    notes: "",
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const target = e.target

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        [target.name]: target.checked,
      }))
    } else {
      setForm((prev) => ({
        ...prev,
        [target.name]: target.value,
      }))
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    console.log("📚 Livro cadastrado:", form)
    // TODO: integração com backend
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 max-w-2xl mx-auto bg-surface p-8 rounded-xl border border-border shadow-md"
    >
      <h2 className="text-2xl font-serif text-text font-semibold mb-4 border-b border-muted pb-2">
        Cadastrar novo livro
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text">Título</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full mt-1 rounded-md border border-border bg-background text-text px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text">Autor</label>
          <input
            type="text"
            name="author"
            value={form.author}
            onChange={handleChange}
            className="w-full mt-1 rounded-md border border-border bg-background text-text px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text">Status de leitura</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full mt-1 rounded-md border border-border bg-background text-text px-3 py-2"
          >
            <option value="unread">Não lido</option>
            <option value="reading">Lendo</option>
            <option value="read">Lido</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-sm text-text">
            <input
              type="checkbox"
              name="isForSale"
              checked={form.isForSale}
              onChange={handleChange}
              className="accent-accent"
            />
            Disponível para venda
          </label>
          <label className="flex items-center gap-2 text-sm text-text">
            <input
              type="checkbox"
              name="isForDonation"
              checked={form.isForDonation}
              onChange={handleChange}
              className="accent-accent"
            />
            Disponível para doação
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-text">URL da capa (opcional)</label>
          <input
            type="url"
            name="coverUrl"
            value={form.coverUrl}
            onChange={handleChange}
            className="w-full mt-1 rounded-md border border-border bg-background text-text px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text">Notas pessoais</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={4}
            className="w-full mt-1 rounded-md border border-border bg-background text-text px-3 py-2"
            placeholder="Ex: impressões, citações, observações..."
          />
        </div>
      </div>

      <div className="pt-4 border-t border-muted text-right">
        <button
          type="submit"
          className="bg-accent text-white font-medium px-6 py-2 rounded hover:opacity-90 transition"
        >
          Salvar livro
        </button>
      </div>
    </form>
  )
}