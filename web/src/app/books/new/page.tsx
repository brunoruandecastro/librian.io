"use client"

import Layout from "@/components/Layout"
import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, BookOpen, Eye, Clock, Heart, Star, Upload, BookMarked, Search, Image, FileText, Settings, Hand } from "lucide-react"

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
  const [showBookAnimation, setShowBookAnimation] = useState(false)
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 })

  // const handleAddBookClick = (e: React.MouseEvent) => {
  //   const rect = e.currentTarget.getBoundingClientRect()
  //   setClickPosition({
  //     x: e.clientX - rect.left,
  //     y: e.clientY - rect.top
  //   })
  //   setShowBookAnimation(true)
    
  //   // Reset animation after completion
  //   setTimeout(() => setShowBookAnimation(false), 2000)
  // }

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
    { id: 2, title: 'Avaliação', icon: Star },
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

{/* TODO: trazer a sinopse com o google e deixar o usuario editar  */}
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
              {/* <button
                type="button"
                onClick={() => setActiveStep(2)}
                disabled={!formData.title || !formData.author}
                className="group px-8 py-3 bg-gradient-to-r from-accent to-accent-dark text-white rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold flex items-center gap-2 hover:from-blue-500 hover:to-blue-600 transform active:scale-95"
              > */}
                
 <button
                type="button"
                onClick={() => setActiveStep(2)}
                disabled={!formData.title || !formData.author}
                className="px-8 py-3 bg-gradient-to-r from-accent to-accent-dark text-white rounded-2xl hover:shadow-lg transition-all duration-200 font-semibold"
              >
                Próximo
              </button>

                {/* Próximo */}
                {/* <Hand className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" /> */}
              {/* </button> */}
            </div>
          </div>

          {/* Step 2: Status and Rating */}
          <div className={`bg-card border-ultra-subtle rounded-3xl p-8 ${activeStep === 2 ? 'block' : 'hidden'}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-slate-800/40 to-slate-800/60 rounded-xl border border-slate-700 shadow-sm">
                <Star className="w-6 h-6 text-amber-400 fill-current drop-shadow-sm" />
              </div>
              <div>
                <h2 className="text-2xl font-serif font-bold text-text-primary">Status e Avaliação</h2>
                <p className="text-text-secondary">Como você se relaciona com este livro</p>
              </div>
            </div>

            <div className={`grid gap-8 ${formData.status === 'read' ? 'lg:grid-cols-2' : 'lg:grid-cols-1'}`}>
              <div>
                <label className="block text-sm font-semibold mb-4 text-text-primary">Status de Leitura</label>
                <div className="space-y-2">
                  {[
                    { value: 'unread', label: 'Não lido', icon: Clock, color: 'text-slate-400', bgColor: 'bg-slate-800/50', borderColor: 'border-slate-700', hoverBg: 'hover:bg-slate-800/70' },
                    { value: 'reading', label: 'Lendo agora', icon: BookMarked, color: 'text-blue-400', bgColor: 'bg-blue-900/30', borderColor: 'border-blue-800', hoverBg: 'hover:bg-blue-900/50' },
                    { value: 'read', label: 'Lido', icon: Eye, color: 'text-emerald-400', bgColor: 'bg-emerald-900/30', borderColor: 'border-emerald-800', hoverBg: 'hover:bg-emerald-900/50' },
                    { value: 'wishlist', label: 'Lista de desejos', icon: Heart, color: 'text-purple-400', bgColor: 'bg-purple-900/30', borderColor: 'border-purple-800', hoverBg: 'hover:bg-purple-900/50' }
                  ].map((status) => {
                    const Icon = status.icon
                    const isSelected = formData.status === status.value
                    return (
                      <label key={status.value} className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? `${status.bgColor} ${status.borderColor} shadow-sm`
                          : `bg-slate-800/20 border-slate-700 ${status.hoverBg} hover:border-slate-600`
                        }`}>
                        <input
                          type="radio"
                          name="status"
                          value={status.value}
                          checked={isSelected}
                          onChange={(e) => handleInputChange('status', e.target.value)}
                          className="sr-only"
                        />
                        <div className={`p-1.5 rounded-md transition-all duration-200 ${
                          isSelected 
                            ? `${status.bgColor} ${status.borderColor} border` 
                            : `bg-slate-800/30 border border-slate-700`
                        }`}>
                          <Icon className={`w-4 h-4 transition-colors duration-200 ${
                            isSelected ? status.color : 'text-slate-500'
                          }`} />
                        </div>
                        <span className={`flex-1 font-medium transition-colors duration-200 ${
                          isSelected ? 'text-slate-200' : 'text-slate-400'
                        }`}>{status.label}</span>
                        {isSelected && (
                          <div className={`w-3 h-3 ${status.bgColor} rounded-full flex items-center justify-center border ${status.borderColor}`}>
                            <div className={`w-1 h-1 ${status.color.replace('text-', 'bg-')} rounded-full`}></div>
                          </div>
                        )}
                      </label>
                    )
                  })}
                </div>
              </div>

              {/* Avaliação - só aparece quando status é 'read' */}
              {formData.status === 'read' && (
                <div>
                  <label className="block text-sm font-semibold mb-4 text-text-primary">Avaliação</label>
                  <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleInputChange('rating', star)}
                          className="p-2 hover:scale-110 transition-all duration-200 rounded-lg hover:bg-slate-700/50"
                        >
                          <Star
                            className={`w-6 h-6 transition-all duration-200 ${
                              star <= formData.rating
                                ? 'text-amber-400 fill-current drop-shadow-sm'
                                : 'text-slate-500 hover:text-amber-500'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-slate-300">
                        {formData.rating > 0 ? (
                          <span className="flex items-center justify-center gap-2">
                            <Star className="w-4 h-4 text-amber-400 fill-current" />
                            {formData.rating}/5 estrelas
                          </span>
                        ) : (
                          'Clique nas estrelas para avaliar'
                        )}
                      </p>
                      {formData.rating > 0 && (
                        <p className="text-xs text-slate-400 mt-1">
                          {
                            formData.rating === 1 ? 'Não gostei' :
                            formData.rating === 2 ? 'Não foi para mim' :
                            formData.rating === 3 ? 'Gostei' :
                            formData.rating === 4 ? 'Gostei muito' :
                            'Uma obra-prima!'
                          }
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
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
                <label className="block text-sm font-semibold mb-4 text-text-primary">Capa do Livro</label>
                
                {/* Preview da capa */}
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Área de preview */}
                  <div className="flex-shrink-0">
                    <div className="w-48 h-64 bg-slate-800/20 border-2 border-dashed border-slate-600 rounded-xl flex flex-col items-center justify-center p-4 transition-all duration-200 hover:border-slate-500 hover:bg-slate-800/30">
                      {formData.coverUrl ? (
                        <div className="relative w-full h-full">
                          <img
                            src={formData.coverUrl}
                            alt="Pré-visualização da capa"
                            className="w-full h-full object-cover rounded-lg shadow-md"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none'
                              if (e.currentTarget.nextElementSibling) {
(e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex';
                              }
                            }}
                          />
                          <div className="hidden w-full h-full flex-col items-center justify-center text-slate-400">
                            <Image className="w-12 h-12 mb-2" />
                            <span className="text-sm text-center">Erro ao carregar imagem</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleInputChange('coverUrl', '')}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                            title="Remover capa"
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center text-slate-400 text-center">
                          <Image className="w-12 h-12 mb-3" />
                          <span className="text-sm font-medium mb-1">Nenhuma capa selecionada</span>
                          <span className="text-xs text-slate-500">A capa será obtida automaticamente do Google Books</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Opções de capa */}
                  <div className="flex-1 space-y-4">
                    {/* Capa do Google Books (placeholder para futura implementação) */}
                    <div className="p-4 bg-slate-800/20 border border-slate-700 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-blue-900/30 rounded-lg">
                          <Search className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-slate-200">Capa do Google Books</h4>
                          <p className="text-xs text-slate-400">Será carregada automaticamente baseada no título e autor</p>
                        </div>
                      </div>
                      <div className="text-xs text-slate-500 bg-slate-800/30 rounded-lg p-3 border border-slate-700">
                        💡 <strong>Futuro:</strong> Quando você preencher título e autor, buscaremos automaticamente a capa oficial do livro
                      </div>
                    </div>

                    {/* Upload manual (placeholder para futura implementação) */}
                    <div className="p-4 bg-slate-800/20 border border-slate-700 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-purple-900/30 rounded-lg">
                          <Upload className="w-4 h-4 text-purple-400" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-slate-200">Upload Personalizado</h4>
                          <p className="text-xs text-slate-400">Envie sua própria imagem da capa</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        disabled
                        className="w-full p-3 border-2 border-dashed border-slate-600 rounded-lg text-slate-400 hover:border-slate-500 hover:text-slate-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <Upload className="w-5 h-5" />
                          <span className="text-sm">Clique para fazer upload</span>
                          <span className="text-xs text-slate-500">JPG, PNG até 2MB (Em breve)</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-4 text-text-primary">Minhas Anotações</label>
                <div className="p-4 bg-slate-800/20 border border-slate-700 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-green-900/30 rounded-lg">
                      <FileText className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-200">Anotações Pessoais</h4>
                      <p className="text-xs text-slate-400">Suas reflexões, citações favoritas ou até um resumo...</p>
                    </div>
                  </div>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 bg-slate-800/30 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-200 resize-none text-sm text-slate-200 placeholder:text-slate-500"
                    placeholder="'Mudou minha perspectiva sobre...', 'Personagem principal me lembrou de...', 'Frases marcantes: ...', "
                  />
                </div>
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
                onClick={handleSubmit}
                className="group relative px-8 py-3 bg-gradient-to-r from-accent to-accent-dark text-white rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold flex items-center gap-2 hover:from-orange-500 hover:to-orange-600 transform active:scale-95 overflow-hidden cursor-pointer"
              >
                {/* Animated Books Effect - Versão mais visível */}
                {isSubmitting && (
                  <div 
                    className="absolute pointer-events-none z-20"
                    style={{
                      left: clickPosition.x,
                      top: clickPosition.y,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute animate-bounce"
                        style={{
                          animationDelay: `${i * 80}ms`,
                          animationDuration: '2s',
                          transform: `rotate(${i * 30}deg) translateY(-${30 + i * 12}px)`,
                        }}
                      >
                        <BookOpen 
                          className="w-6 h-6 text-orange-500 drop-shadow-lg"
                          style={{
                            animation: `bookFloat 2s ease-out ${i * 80}ms forwards`,
                            filter: 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.6))'
                          }}
                        />
                      </div>
                    ))}
                    
                    {/* Círculo de expansão para mais impacto visual */}
                    <div 
                      className="absolute w-2 h-2 bg-orange-400 rounded-full animate-ping"
                      style={{
                        animationDuration: '1s',
                        transform: 'translate(-50%, -50%)'
                      }}
                    />
                    <div 
                      className="absolute w-4 h-4 bg-orange-300 rounded-full animate-ping"
                      style={{
                        animationDuration: '1.5s',
                        animationDelay: '0.2s',
                        transform: 'translate(-50%, -50%)'
                      }}
                    />
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">{isSubmitting ? 'Adicionando...' : 'Adicionar Livro'}</span>
                {!isSubmitting && <BookMarked className="w-4 h-4 group-hover:scale-110 transition-transform duration-300 relative z-10" />}
                {isSubmitting && (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin relative z-10"></div>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  )
}