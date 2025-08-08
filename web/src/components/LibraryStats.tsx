import { BookOpen, Eye, Clock, Heart, Star, TrendingUp, Calendar, Target } from "lucide-react"

export default function LibraryStats() {
  // Mock stats - em produção viria da API
  const stats = {
    total: 156,
    read: 89,
    reading: 3,
    unread: 42,
    wishlist: 22,
    averageRating: 4.2,
    pagesRead: 28450,
    favoriteGenre: "Fantasia",
    thisYear: 23,
    goal: 30
  }

  const statCards = [
    {
      label: "Total de Livros",
      value: stats.total,
      icon: BookOpen,
      color: "text-violet-600",
      bgColor: "bg-violet-50",
      borderColor: "border-violet-200",
      gradient: "from-violet-500 to-violet-600"
    },
    {
      label: "Livros Lidos",
      value: stats.read,
      icon: Eye,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      gradient: "from-emerald-500 to-emerald-600"
    },
    {
      label: "Lendo Agora",
      value: stats.reading,
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      label: "Para Ler",
      value: stats.unread,
      icon: Clock,
      color: "text-slate-600",
      bgColor: "bg-slate-50",
      borderColor: "border-slate-200",
      gradient: "from-slate-500 to-slate-600"
    },
    {
      label: "Lista de Desejos",
      value: stats.wishlist,
      icon: Heart,
      color: "text-rose-600",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-200",
      gradient: "from-rose-500 to-rose-600"
    },
    {
      label: "Avaliação Média",
      value: `${stats.averageRating}/5`,
      icon: Star,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      gradient: "from-amber-500 to-amber-600"
    }
  ]

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-serif font-bold text-text-primary mb-2">Estatísticas da Biblioteca</h2>
        <p className="text-text-secondary">Visão geral do seu progresso de leitura</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={index}
              className="group bg-card border-ultra-subtle rounded-2xl p-5 hover:shadow-lg hover:border-accent/20 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${stat.bgColor} border ${stat.borderColor} group-hover:shadow-md transition-all duration-300`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text-secondary font-medium truncate">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-serif font-bold text-text-primary">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Additional Stats */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Progresso de Leitura */}
        <div className="lg:col-span-2 bg-card border-ultra-subtle rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-br from-violet-50 to-violet-100 border border-violet-200">
              <TrendingUp className="w-6 h-6 text-violet-600" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-text-primary">Progresso de Leitura</h3>
              <p className="text-sm text-text-secondary">Seu desempenho este ano</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary font-medium">Páginas lidas</span>
                <span className="font-bold text-text-primary">{stats.pagesRead.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary font-medium">Gênero favorito</span>
                <span className="font-bold text-text-primary">{stats.favoriteGenre}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary font-medium">Taxa de conclusão</span>
                <span className="font-bold text-emerald-600">{Math.round((stats.read / stats.total) * 100)}%</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary font-medium">Livros este ano</span>
                <span className="font-bold text-text-primary">{stats.thisYear}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary font-medium">Meta anual</span>
                <span className="font-bold text-text-primary">{stats.goal}</span>
              </div>
              <div className="w-full bg-surface-secondary rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-violet-500 to-violet-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(stats.thisYear / stats.goal) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Melhores Avaliações */}
        <div className="bg-card border-ultra-subtle rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200">
              <Star className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-text-primary">Melhores Avaliações</h3>
              <p className="text-sm text-text-secondary">Seus livros favoritos</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-surface-secondary/50 rounded-xl hover:bg-surface-secondary transition-colors duration-200">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < 5 ? 'text-amber-500 fill-current' : 'text-text-muted'}`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-text-primary">O Senhor dos Anéis</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-surface-secondary/50 rounded-xl hover:bg-surface-secondary transition-colors duration-200">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < 4 ? 'text-amber-500 fill-current' : 'text-text-muted'}`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-text-primary">1984</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-surface-secondary/50 rounded-xl hover:bg-surface-secondary transition-colors duration-200">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < 4 ? 'text-amber-500 fill-current' : 'text-text-muted'}`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-text-primary">O Hobbit</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}