// BookForm Component
"use client"

import { useState } from "react"

type BookFormData = {
  title: string
  author: string
  status: "read" | "reading" | "unread"
  genre?: string
  isbn?: string
  year?: number
  publisher?: string
  pages?: number
  coverUrl?: string
  isForSale?: boolean
  isForDonation?: boolean
  notes?: string
}

type BookFormProps = {
  onSubmit?: (data: BookFormData) => void
  initialData?: Partial<BookFormData>
  mode?: "create" | "edit"
}

export default function BookForm({ onSubmit, initialData, mode = "create" }: BookFormProps) {
  const [form, setForm] = useState<BookFormData>({
    title: initialData?.title || "",
    author: initialData?.author || "",
    status: initialData?.status || "unread",
    genre: initialData?.genre || "",
    isbn: initialData?.isbn || "",
    year: initialData?.year || undefined,
    publisher: initialData?.publisher || "",
    pages: initialData?.pages || undefined,
    coverUrl: initialData?.coverUrl || "",
    isForSale: initialData?.isForSale || false,
    isForDonation: initialData?.isForDonation || false,
    notes: initialData?.notes || "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const target = e.target

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        [target.name]: target.checked,
      }))
    } else if (target instanceof HTMLInputElement && (target.type === "number")) {
      const value = target.value === "" ? undefined : parseInt(target.value)
      setForm((prev) => ({
        ...prev,
        [target.name]: value,
      }))
    } else {
      setForm((prev) => ({
        ...prev,
        [target.name]: target.value,
      }))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 800))
      
      console.log("📚 Livro cadastrado:", form)
      onSubmit?.(form)
      
      // Reset form if creating new book
      if (mode === "create") {
        setForm({
          title: "",
          author: "",
          status: "unread",
          genre: "",
          isbn: "",
          year: undefined,
          publisher: "",
          pages: undefined,
          coverUrl: "",
          isForSale: false,
          isForDonation: false,
          notes: "",
        })
      }
    } catch (error) {
      console.error("Erro ao salvar livro:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const statusOptions = [
    { value: "unread", label: "Não lido" },
    { value: "reading", label: "Lendo" },
    { value: "read", label: "Lido" },
  ]

  const genreOptions = [
    "Literatura Clássica",
    "Ficção Científica", 
    "Fantasia",
    "Romance",
    "Mistério",
    "História",
    "Biografia",
    "Filosofia",
    "Ciências",
    "Autoajuda",
    "Negócios",
    "Arte",
    "Poesia",
    "Drama",
    "Ensaios",
    "Outros"
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        
        {/* Header elegante */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent to-accent-dark rounded-full mb-6 shadow-sm border border-accent/30">
            <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-4xl font-serif text-heading mb-4 tracking-tight">
            {mode === "edit" ? "Editar Livro" : "Registrar Novo Livro"}
          </h1>
          <p className="text-muted max-w-2xl mx-auto text-lg leading-relaxed">
            {mode === "edit" 
              ? "Atualize as informações do livro em sua biblioteca pessoal"
              : "Adicione um novo título à sua coleção com todos os detalhes importantes"
            }
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-accent to-transparent mt-6 mx-auto"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Informações Principais */}
          <section className="bg-surface backdrop-blur-sm rounded-3xl border border-border p-8 shadow-md shadow-muted/10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-8 bg-gradient-to-b from-accent to-accent-dark rounded-full"></div>
              <h2 className="text-2xl font-serif text-heading">Informações Principais</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-muted mb-3 tracking-wide uppercase">
                  Título da Obra <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-border bg-surface text-heading px-6 py-4 text-lg
                            focus:border-accent focus:ring-4 focus:ring-accent/30 transition-all duration-300
                            placeholder:text-muted shadow-sm"
                  placeholder="Digite o título completo do livro..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-muted mb-3 tracking-wide uppercase">
                  Autor <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="author"
                  value={form.author}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-border bg-surface text-heading px-6 py-4
                            focus:border-accent focus:ring-4 focus:ring-accent/30 transition-all duration-300
                            placeholder:text-muted shadow-sm"
                  placeholder="Nome do autor..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-muted mb-3 tracking-wide uppercase">
                  Gênero Literário
                </label>
                <select
                  name="genre"
                  value={form.genre}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-border bg-surface text-heading px-6 py-4
                            focus:border-accent focus:ring-4 focus:ring-accent/30 transition-all duration-300 shadow-sm"
                >
                  <option value="">Selecione um gênero...</option>
                  {genreOptions.map((genre) => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-muted mb-3 tracking-wide uppercase">
                  Status de Leitura
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-border bg-surface text-heading px-6 py-4
                            focus:border-accent focus:ring-4 focus:ring-accent/30 transition-all duration-300 shadow-sm"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-muted mb-3 tracking-wide uppercase">
                  URL da Capa
                </label>
                <input
                  type="url"
                  name="coverUrl"
                  value={form.coverUrl}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-border bg-surface text-heading px-6 py-4
                            focus:border-accent focus:ring-4 focus:ring-accent/30 transition-all duration-300
                            placeholder:text-muted shadow-sm"
                  placeholder="https://exemplo.com/capa.jpg"
                />
              </div>
            </div>
          </section>

          {/* Detalhes Técnicos */}
          <section className="bg-surface backdrop-blur-sm rounded-3xl border border-border p-8 shadow-md shadow-muted/10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-8 bg-gradient-to-b from-accent to-accent-dark rounded-full"></div>
              <h2 className="text-2xl font-serif text-heading">Detalhes Técnicos</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-muted mb-3 tracking-wide uppercase">
                  ISBN
                </label>
                <input
                  type="text"
                  name="isbn"
                  value={form.isbn}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-border bg-surface text-heading px-6 py-4
                            focus:border-accent focus:ring-4 focus:ring-accent/30 transition-all duration-300
                            placeholder:text-muted shadow-sm"
                  placeholder="978-85-xxxx-xxx-x"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-muted mb-3 tracking-wide uppercase">
                  Ano de Publicação
                </label>
                <input
                  type="number"
                  name="year"
                  value={form.year || ""}
                  onChange={handleChange}
                  min="1000"
                  max={new Date().getFullYear()}
                  className="w-full rounded-2xl border border-border bg-surface text-heading px-6 py-4
                            focus:border-accent focus:ring-4 focus:ring-accent/30 transition-all duration-300
                            placeholder:text-muted shadow-sm"
                  placeholder="2024"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-muted mb-3 tracking-wide uppercase">
                  Páginas
                </label>
                <input
                  type="number"
                  name="pages"
                  value={form.pages || ""}
                  onChange={handleChange}
                  min="1"
                  className="w-full rounded-2xl border border-border bg-surface text-heading px-6 py-4
                            focus:border-accent focus:ring-4 focus:ring-accent/30 transition-all duration-300
                            placeholder:text-muted shadow-sm"
                  placeholder="320"
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-sm font-semibold text-muted mb-3 tracking-wide uppercase">
                  Editora
                </label>
                <input
                  type="text"
                  name="publisher"
                  value={form.publisher}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-border bg-surface text-heading px-6 py-4
                            focus:border-accent focus:ring-4 focus:ring-accent/30 transition-all duration-300
                            placeholder:text-muted shadow-sm"
                  placeholder="Nome da editora..."
                />
              </div>
            </div>
          </section>

          {/* Disponibilidade */}
          <section className="bg-surface backdrop-blur-sm rounded-3xl border border-border p-8 shadow-md shadow-muted/10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-8 bg-gradient-to-b from-accent to-accent-dark rounded-full"></div>
              <h2 className="text-2xl font-serif text-heading">Disponibilidade</h2>
            </div>
            
            <div className="flex flex-wrap gap-8">
              <label className="flex items-center gap-4 text-text cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="isForSale"
                    checked={form.isForSale}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`w-6 h-6 rounded-lg border-2 transition-all duration-200 flex items-center justify-center
                    ${form.isForSale 
                      ? 'bg-accent border-accent text-white' 
                      : 'border-border group-hover:border-accent'
                    }`}>
                    {form.isForSale && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="select-none font-medium">Disponível para venda</span>
              </label>

              <label className="flex items-center gap-4 text-text cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="isForDonation"
                    checked={form.isForDonation}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`w-6 h-6 rounded-lg border-2 transition-all duration-200 flex items-center justify-center
                    ${form.isForDonation 
                      ? 'bg-accent border-accent text-white' 
                      : 'border-border group-hover:border-accent'
                    }`}>
                    {form.isForDonation && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="select-none font-medium">Disponível para doação</span>
              </label>
            </div>
          </section>

          {/* Notas Pessoais */}
          <section className="bg-surface backdrop-blur-sm rounded-3xl border border-border p-8 shadow-md shadow-muted/10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-8 bg-gradient-to-b from-accent to-accent-dark rounded-full"></div>
              <h2 className="text-2xl font-serif text-heading">Notas Pessoais</h2>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-muted mb-3 tracking-wide uppercase">
                Observações e Impressões
              </label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={6}
                className="w-full rounded-2xl border border-border bg-surface text-heading px-6 py-4
                          focus:border-accent focus:ring-4 focus:ring-accent/30 transition-all duration-300
                          placeholder:text-muted resize-y shadow-sm"
                placeholder="Suas impressões sobre o livro, citações favoritas, recomendações, ou qualquer observação pessoal..."
              />
            </div>
          </section>

          {/* Botões de Ação */}
          <div className="flex justify-end gap-6 pt-8">
            <button
              type="button"
              className="px-8 py-4 border-2 border-border text-muted rounded-2xl 
                       hover:bg-muted/10 hover:border-border transition-all duration-200 font-semibold"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-4 bg-accent text-white rounded-2xl font-semibold
                       hover:bg-accent-dark transition-all duration-200 shadow-md hover:shadow-lg
                       disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center gap-3 min-w-[160px] justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Salvando...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  {mode === "edit" ? "Atualizar Livro" : "Salvar Livro"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}