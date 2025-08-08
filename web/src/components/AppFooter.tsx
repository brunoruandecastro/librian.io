import Link from "next/link"
import { BookOpen, Heart, Github, Twitter, Mail } from "lucide-react"

export default function AppFooter() {
  return (
    <footer className="w-full border-t border-border-subtle bg-gradient-to-br from-surface to-surface-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent-dark rounded-xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold bg-gradient-to-r from-accent to-accent-dark bg-clip-text text-transparent">
                  Librian
                </h3>
                <p className="text-sm text-text-secondary">Sua Biblioteca Digital</p>
              </div>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed mb-6 max-w-md">
              Organize sua biblioteca pessoal, acompanhe seu progresso de leitura e descubra novos livros.
              Uma plataforma moderna para amantes da literatura.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-text-secondary hover:text-accent transition-all duration-200 hover:bg-accent-light/10 rounded-xl hover:scale-105"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-text-secondary hover:text-accent transition-all duration-200 hover:bg-accent-light/10 rounded-xl hover:scale-105"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:contato@librian.io"
                className="p-2 text-text-secondary hover:text-accent transition-all duration-200 hover:bg-accent-light/10 rounded-xl hover:scale-105"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-semibold text-text-primary mb-4">Navegação</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-text-secondary hover:text-accent transition-colors duration-200"
                >
                  Minha Estante
                </Link>
              </li>
              <li>
                <Link
                  href="/wishlist"
                  className="text-sm text-text-secondary hover:text-accent transition-colors duration-200"
                >
                  Lista de Desejos
                </Link>
              </li>
              <li>
                <Link
                  href="/reading"
                  className="text-sm text-text-secondary hover:text-accent transition-colors duration-200"
                >
                  Lendo Agora
                </Link>
              </li>
              <li>
                <Link
                  href="/books/new"
                  className="text-sm text-text-secondary hover:text-accent transition-colors duration-200"
                >
                  Adicionar Livro
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-serif font-semibold text-text-primary mb-4">Recursos</h4>
            <ul className="space-y-3">
              <li>
                <span className="text-sm text-text-secondary">Organização Inteligente</span>
              </li>
              <li>
                <span className="text-sm text-text-secondary">Acompanhamento de Progresso</span>
              </li>
              <li>
                <span className="text-sm text-text-secondary">Sistema de Avaliações</span>
              </li>
              <li>
                <span className="text-sm text-text-secondary">Busca Avançada</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border-subtle mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Heart className="w-4 h-4 text-rose-500" />
            <span>Feito com carinho, de amantes de livros para amantes</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-text-secondary">
            <span>© 2025 Librian.io</span>
            <Link href="/privacy" className="hover:text-accent transition-colors duration-200">
              Privacidade
            </Link>
            <Link href="/terms" className="hover:text-accent transition-colors duration-200">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}