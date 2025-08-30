"use client"

import Layout from "@/components/Layout"
import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { User, BookOpen, Eye, Star, Calendar, Settings, Edit, Download, Share, Bell, Trophy, Target, TrendingUp, Award, Clock, Heart } from "lucide-react"

interface UserStats {
  totalBooks: number;
  readBooks: number;
  readingBooks: number;
  ownedBooks: number;
  donatingBooks: number;
  sellingBooks: number;
  joinDate: string;
}

//todo: arrumar
// Função para gerar avatar baseado no nome/email
const generateAvatarUrl = (name: string, email: string) => {
  const seed = name || email || 'user';
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(seed)}&backgroundColor=3b82f6&textColor=ffffff&fontSize=40`;
};

type TabId = 'overview' | 'reading-goals' | 'preferences'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabId>('overview')
  const { user: authUser, loading: authLoading, token } = useAuth()
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [statsLoading, setStatsLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    const fetchUserStats = async () => {
      if (!authUser || !token) return;
      
      try {
        setStatsLoading(true);
        const response = await fetch('http://127.0.0.1:3001/users/stats', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const stats = await response.json();
          setUserStats(stats);
        } else {
          console.error('Erro ao buscar estatísticas do usuário');
        }
      } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
      } finally {
        setStatsLoading(false);
      }
    };

    fetchUserStats();
  }, [authUser, token]);

  // Dados do usuário com dados reais da API
  const user = {
    name: authUser?.name || "",
    email: authUser?.email || "",
    joinDate: userStats?.joinDate || "",
    totalBooks: userStats?.totalBooks || 0,
    readBooks: userStats?.readBooks || 0,
    readingBooks: userStats?.readingBooks || 0,
    ownedBooks: userStats?.ownedBooks || 0,
    donatingBooks: userStats?.donatingBooks || 0,
    sellingBooks: userStats?.sellingBooks || 0,
    // TODO: Dados que ainda não temos na API (podem ser calculados ou adicionados depois)
    averageRating: 4.2,
    pagesRead: 28450,
    favoriteGenre: "Fantasia",
    readingGoal: 50,
    booksReadThisYear: userStats?.readBooks || 0,
    readingStreak: 45,
    level: "Leitor Avançado",
    achievements: 12
  }

  // Estado de carregamento
  if (authLoading || statsLoading) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
              <p className="text-text-secondary">Carregando perfil...</p>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  // Se não há usuário logado
  if (!authUser) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-text-secondary">Você precisa estar logado para ver seu perfil.</p>
          </div>
        </div>
      </Layout>
    )
  }

  const readingGoals = [
    { year: 2024, goal: 50, completed: 23, percentage: 46 },
    { year: 2023, goal: 40, completed: 38, percentage: 95 },
    { year: 2022, goal: 30, completed: 28, percentage: 93 }
  ]

  const recentActivity = [
    { type: 'read', book: '1984', date: '2024-01-15', rating: 4 },
    { type: 'added', book: 'Duna', date: '2024-01-10' },
    { type: 'reading', book: 'O Guia do Mochileiro das Galáxias', date: '2024-01-08' },
    { type: 'rated', book: 'O Senhor dos Anéis', date: '2024-01-05', rating: 5 }
  ]

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4">
        {/* Profile Header */}
        <div className="relative mb-8">
          {/* Background Banner */}
          <div className="h-48 bg-gradient-to-br from-accent via-accent-dark to-accent rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
          </div>

          {/* Profile Info */}
          <div className="relative -mt-20 px-8 pb-8">
            <div className="bg-card border-ultra-subtle rounded-3xl p-8 shadow-xl">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-accent-light/20 via-accent/20 to-accent-dark/20 rounded-3xl flex items-center justify-center border-4 border-surface shadow-lg overflow-hidden">
                    <img 
                      src={generateAvatarUrl(user.name, user.email)}
                      alt={user.name || 'Avatar do usuário'}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.log('Erro ao carregar avatar:', e.currentTarget.src);
                        if (e.currentTarget.src !== generateAvatarUrl(user.name, user.email)) {
                          e.currentTarget.src = generateAvatarUrl(user.name, user.email);
                        } else {
                          setImageError(true);
                        }
                      }}
                    />
                    {imageError && (
                      <User className="w-12 h-12 text-accent absolute inset-0 m-auto" />
                    )}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center border-2 border-surface">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4">
                    <div>
                      <h1 className="text-3xl font-serif font-bold text-text-primary mb-2">{user.name}</h1>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-gradient-to-r from-accent/20 to-accent-dark/20 text-accent rounded-full text-sm font-semibold border border-accent/30">
                          {user.level}
                        </span>
                        <span className="text-text-secondary">•</span>
                        <span className="text-text-secondary">{user.achievements} conquistas</span>
                      </div>
                      <p className="text-text-secondary">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-6 text-sm text-text-secondary">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Membro desde {new Date(user.joinDate).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{user.readingStreak} dias seguidos lendo</span>
                    </div>
                  </div>
                </div>

                {/* Edit Button */}
                <button className="p-3 bg-gradient-to-r from-accent to-accent-dark text-white rounded-2xl hover:shadow-lg transition-all duration-200 hover:scale-105 group">
                  <Edit className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border-subtle mb-8">
          {[
            { id: 'overview' as const, label: 'Visão Geral', icon: User },
            { id: 'reading-goals' as const, label: 'Metas de Leitura', icon: Target },
            { id: 'preferences' as const, label: 'Preferências', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-4 border-b-2 transition-all duration-200 font-semibold ${activeTab === tab.id
                  ? 'border-accent text-accent bg-accent-light/10'
                  : 'border-transparent text-text-secondary hover:text-accent hover:bg-accent-light/5'
                  }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total de Livros', value: user.totalBooks, icon: BookOpen, color: 'text-violet-600', bgColor: 'bg-violet-50', borderColor: 'border-violet-200' },
                { label: 'Livros Lidos', value: user.readBooks, icon: Eye, color: 'text-emerald-600', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200' },
                { label: 'Lendo Agora', value: user.readingBooks, icon: BookOpen, color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
                { label: 'Avaliação Média', value: `${user.averageRating}/5`, icon: Star, color: 'text-amber-600', bgColor: 'bg-amber-50', borderColor: 'border-amber-200' }
              ].map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="group bg-card border-ultra-subtle rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${stat.bgColor} border ${stat.borderColor} group-hover:shadow-md transition-all duration-300`}>
                        <Icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary font-medium">{stat.label}</p>
                        <p className="text-2xl font-serif font-bold text-text-primary">{stat.value}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Reading Progress */}
            <div className="bg-gradient-to-br from-card to-surface-secondary border border-border-subtle rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-violet-50 to-violet-100 rounded-xl border border-violet-200">
                  <TrendingUp className="w-6 h-6 text-violet-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-bold text-text-primary">Progresso de Leitura 2024</h2>
                  <p className="text-text-secondary">Acompanhe suas conquistas</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary font-medium">Meta anual</span>
                  <span className="font-bold text-text-primary">{user.readingGoal} livros</span>
                </div>
                <div className="w-full bg-surface-secondary rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-violet-500 to-violet-600 h-4 rounded-full transition-all duration-500 shadow-lg"
                    style={{ width: `${(user.booksReadThisYear / user.readingGoal) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-emerald-600 font-semibold">{user.booksReadThisYear} lidos</span>
                  <span className="text-text-secondary">{user.readingGoal - user.booksReadThisYear} restantes</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gradient-to-br from-card to-surface-secondary border border-border-subtle rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-bold text-text-primary">Atividade Recente</h2>
                  <p className="text-text-secondary">Suas últimas ações</p>
                </div>
              </div>

              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-surface-secondary/50 rounded-2xl hover:bg-surface-secondary transition-all duration-200">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent-light/20 to-accent/20 rounded-xl flex items-center justify-center border border-accent/20">
                      {activity.type === 'read' && <Eye className="w-5 h-5 text-emerald-600" />}
                      {activity.type === 'added' && <BookOpen className="w-5 h-5 text-accent" />}
                      {activity.type === 'reading' && <BookOpen className="w-5 h-5 text-blue-600" />}
                      {activity.type === 'rated' && <Star className="w-5 h-5 text-amber-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-text-primary">{activity.book}</p>
                      <p className="text-sm text-text-secondary">
                        {activity.type === 'read' && 'Marcou como lido'}
                        {activity.type === 'added' && 'Adicionou à estante'}
                        {activity.type === 'reading' && 'Começou a ler'}
                        {activity.type === 'rated' && `Avaliou com ${activity.rating} estrelas`}
                      </p>
                    </div>
                    <span className="text-sm text-text-secondary font-medium">
                      {new Date(activity.date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reading-goals' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-card to-surface-secondary border border-border-subtle rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border border-amber-200">
                  <Trophy className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-bold text-text-primary">Histórico de Metas</h2>
                  <p className="text-text-secondary">Suas conquistas ao longo dos anos</p>
                </div>
              </div>

              <div className="space-y-6">
                {readingGoals.map((goal) => (
                  <div key={goal.year} className="bg-surface-secondary/50 border border-border-subtle rounded-2xl p-6 hover:bg-surface-secondary transition-all duration-200">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-serif font-bold text-text-primary">{goal.year}</h3>
                      <span className="text-sm text-text-secondary font-medium">
                        {goal.completed}/{goal.goal} livros
                      </span>
                    </div>
                    <div className="w-full bg-surface-secondary rounded-full h-3 mb-3">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-amber-600 h-3 rounded-full transition-all duration-500 shadow-sm"
                        style={{ width: `${goal.percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-text-secondary">
                      {goal.percentage}% da meta atingida
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'preferences' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-card to-surface-secondary border border-border-subtle rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200">
                  <Settings className="w-6 h-6 text-slate-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-bold text-text-primary">Configurações</h2>
                  <p className="text-text-secondary">Personalize sua experiência</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-surface-secondary/50 border border-border-subtle rounded-2xl hover:bg-surface-secondary transition-all duration-200">
                  <div>
                    <p className="font-semibold text-text-primary">Notificações</p>
                    <p className="text-sm text-text-secondary">Receber lembretes de leitura</p>
                  </div>
                  <button className="p-3 text-text-secondary hover:text-accent transition-all duration-200 hover:bg-accent-light/10 rounded-xl hover:scale-105">
                    <Bell className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-surface-secondary/50 border border-border-subtle rounded-2xl hover:bg-surface-secondary transition-all duration-200">
                  <div>
                    <p className="font-semibold text-text-primary">Exportar Dados</p>
                    <p className="text-sm text-text-secondary">Baixar sua biblioteca</p>
                  </div>
                  <button className="p-3 text-text-secondary hover:text-accent transition-all duration-200 hover:bg-accent-light/10 rounded-xl hover:scale-105">
                    <Download className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-surface-secondary/50 border border-border-subtle rounded-2xl hover:bg-surface-secondary transition-all duration-200">
                  <div>
                    <p className="font-semibold text-text-primary">Compartilhar Perfil</p>
                    <p className="text-sm text-text-secondary">Tornar perfil público</p>
                  </div>
                  <button className="p-3 text-text-secondary hover:text-accent transition-all duration-200 hover:bg-accent-light/10 rounded-xl hover:scale-105">
                    <Share className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}