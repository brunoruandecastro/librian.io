"use client"

import Layout from "@/components/Layout"
import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, BookOpen, Eye, Clock, Heart, Star, Upload, Plus, BookMarked, Library, Search, Image, FileText, Settings } from "lucide-react"

export default function AddBookPage() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    publisher: "",
    year: "",
    pages: "",
    description: "",
    status: "unread",
    rating: 0,
    coverUrl: "",
    notes: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeStep, setActiveStep] = useState(1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simular envio para API
    await new Promise(resolve => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    // Redirecionar para a estante
    window.location.href = "/"
  }

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const steps = [
    { id: 1, title: 'Informações Básicas', icon: BookOpen },
    { id: 2, title: 'Status e Avaliação', icon: Star },
    { id: 3, title: 'Capa e Anotações', icon: Image }
  ]

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-text-secondary hover:text-accent transition-all duration-200 mb-6 group"
          >
            <div className="p-2 bg-surface-secondary rounded-xl group-hover:bg-accent-light/10 transition-all duration-200">
              <ArrowLeft className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
            </div>
            <span className="font-medium">Voltar para Minha Estante</span>
          </Link>

          <div className="text-center mb-8">

            <h1 className="text-4xl font-serif font-bold text-text-primary mb-3">Novo Livro</h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Adicione um novo livro à sua estante pessoal e comece sua próxima aventura literária
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-4">
              {steps.map((step, index) => {
                const Icon = step.icon
                const isActive = activeStep === step.id
                const isCompleted = activeStep > step.id

                return (
                  <div key={step.id} className="flex items-center gap-4">
                    <div className="flex flex-col items-center gap-2">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${isActive
                        ? 'bg-gradient-to-r from-accent to-accent-dark text-white shadow-lg'
                        : isCompleted
                          ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white'
                          : 'bg-surface-secondary text-text-secondary'
                        }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className={`text-sm font-medium ${isActive ? 'text-accent' : isCompleted ? 'text-emerald-600' : 'text-text-secondary'
                        }`}>
                        {step.title}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-16 h-1 rounded-full ${isCompleted ? 'bg-emerald-500' : 'bg-surface-secondary'
                        }`} />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: Basic Information */}
          <div className={`bg-card border-ultra-subtle rounded-3xl p-8 ${activeStep === 1 ? 'block' : 'hidden'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-violet-50 to-violet-100 rounded-xl border border-violet-200">
                <BookOpen className="w-6 h-6 text-violet-600" />
              </div>
              <div>
                <h2 className="text-2xl font-serif font-bold text-text-primary">Informações Básicas</h2>
                <p className="text-text-secondary">Detalhes principais do livro</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-3 text-text-primary">Título *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-4 py-3 bg-surface border border-border-subtle rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-200"
                  placeholder="Digite o título do livro"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3 text-text-primary">Autor *</label>
                <input
                  type="text"
                  required
                  value={formData.author}
                  onChange={(e) => handleInputChange('author', e.target.value)}
                  className="w-full px-4 py-3 bg-surface border border-border-subtle rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-200"
                  placeholder="Digite o nome do autor"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3 text-text-primary">ISBN</label>
                <input
                  type="text"
                  value={formData.isbn}
                  onChange={(e) => handleInputChange('isbn', e.target.value)}
                  className="w-full px-4 py-3 bg-surface border border-border-subtle rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-200"
                  placeholder="978-0-000-00000-0"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3 text-text-primary">Editora</label>
                <input
                  type="text"
                  value={formData.publisher}
                  onChange={(e) => handleInputChange('publisher', e.target.value)}
                  className="w-full px-4 py-3 bg-surface border border-border-subtle rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-200"
                  placeholder="Nome da editora"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3 text-text-primary">Ano de Publicação</label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => handleInputChange('year', e.target.value)}
                  className="w-full px-4 py-3 bg-surface border border-border-subtle rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-200"
                  placeholder="2024"
                  min="1000"
                  max="2030"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3 text-text-primary">Número de Páginas</label>
                <input
                  type="number"
                  value={formData.pages}
                  onChange={(e) => handleInputChange('pages', e.target.value)}
                  className="w-full px-4 py-3 bg-surface border border-border-subtle rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-200"
                  placeholder="300"
                  min="1"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-semibold mb-3 text-text-primary">Sinopse</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-surface border border-border-subtle rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-200 resize-none"
                placeholder="Breve descrição do livro..."
              />
            </div>

            <div className="flex justify-end mt-8">
              <button
                type="button"
                onClick={() => setActiveStep(2)}
                disabled={!formData.title || !formData.author}
                className="px-8 py-3 bg-gradient-to-r from-accent to-accent-dark text-white rounded-2xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                Próximo
              </button>
            </div>
          </div>

          {/* Step 2: Status and Rating */}
          <div className={`bg-card border-ultra-subtle rounded-3xl p-8 ${activeStep === 2 ? 'block' : 'hidden'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border border-amber-200">
                <Star className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h2 className="text-2xl font-serif font-bold text-text-primary">Status e Avaliação</h2>
                <p className="text-text-secondary">Como você se relaciona com este livro</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-semibold mb-4 text-text-primary">Status de Leitura</label>
                <div className="space-y-3">
                  {[
                    { value: 'unread', label: 'Não lido', icon: Clock, color: 'text-slate-600', bgColor: 'bg-slate-50', borderColor: 'border-slate-200' },
                    { value: 'reading', label: 'Lendo agora', icon: BookMarked, color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
                    { value: 'read', label: 'Lido', icon: Eye, color: 'text-emerald-600', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200' },
                    { value: 'wishlist', label: 'Lista de desejos', icon: Heart, color: 'text-rose-600', bgColor: 'bg-rose-50', borderColor: 'border-rose-200' }
                  ].map((status) => {
                    const Icon = status.icon
                    return (
                      <label key={status.value} className={`flex items-center gap-4 p-4 border rounded-2xl cursor-pointer transition-all duration-200 hover:shadow-md ${formData.status === status.value
                        ? `${status.bgColor} ${status.borderColor} border-2`
                        : 'border-border-subtle hover:border-accent/30'
                        }`}>
                        <input
                          type="radio"
                          name="status"
                          value={status.value}
                          checked={formData.status === status.value}
                          onChange={(e) => handleInputChange('status', e.target.value)}
                          className="sr-only"
                        />
                        <div className={`p-2 rounded-xl ${status.bgColor} border ${status.borderColor}`}>
                          <Icon className={`w-5 h-5 ${status.color}`} />
                        </div>
                        <span className="flex-1 font-medium text-text-primary">{status.label}</span>
                        {formData.status === status.value && (
                          <div className="w-4 h-4 bg-accent rounded-full"></div>
                        )}
                      </label>
                    )
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-4 text-text-primary">Avaliação</label>
                <div className="bg-surface-secondary/50 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleInputChange('rating', star)}
                        className="p-2 hover:scale-110 transition-all duration-200"
                      >
                        <Star
                          className={`w-8 h-8 ${star <= formData.rating
                            ? 'text-amber-500 fill-current'
                            : 'text-text-muted'
                            }`}
                        />
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-text-secondary">
                    {formData.rating > 0 ? `Avaliação: ${formData.rating}/5 estrelas` : 'Clique nas estrelas para avaliar'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={() => setActiveStep(1)}
                className="px-8 py-3 border border-border-subtle text-text-secondary rounded-2xl hover:bg-surface-secondary transition-all duration-200 font-semibold"
              >
                Anterior
              </button>
              <button
                type="button"
                onClick={() => setActiveStep(3)}
                className="px-8 py-3 bg-gradient-to-r from-accent to-accent-dark text-white rounded-2xl hover:shadow-lg transition-all duration-200 font-semibold"
              >
                Próximo
              </button>
            </div>
          </div>

          {/* Step 3: Cover and Notes */}
          <div className={`bg-card border-ultra-subtle rounded-3xl p-8 ${activeStep === 3 ? 'block' : 'hidden'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                <Image className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-serif font-bold text-text-primary">Capa e Anotações</h2>
                <p className="text-text-secondary">Personalize sua experiência</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-3 text-text-primary">URL da Capa</label>
                <input
                  type="url"
                  value={formData.coverUrl}
                  onChange={(e) => handleInputChange('coverUrl', e.target.value)}
                  className="w-full px-4 py-3 bg-surface border border-border-subtle rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-200"
                  placeholder="https://exemplo.com/capa.jpg"
                />
                <p className="text-xs text-text-secondary mt-2">Cole o link da imagem da capa do livro</p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3 text-text-primary">Minhas Anotações</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-surface border border-border-subtle rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-200 resize-none"
                  placeholder="Suas anotações pessoais sobre o livro..."
                />
                <p className="text-xs text-text-secondary mt-2">Reflexões, citações favoritas ou observações pessoais</p>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={() => setActiveStep(2)}
                className="px-8 py-3 border border-border-subtle text-text-secondary rounded-2xl hover:bg-surface-secondary transition-all duration-200 font-semibold"
              >
                Anterior
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !formData.title || !formData.author}
                className="px-8 py-3 bg-gradient-to-r from-accent to-accent-dark text-white rounded-2xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                {isSubmitting ? 'Adicionando...' : 'Adicionar Livro'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  )
} 