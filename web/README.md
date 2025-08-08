# Librian - Sua Estante Digital Pessoal

Uma plataforma moderna e autêntica para gerenciar sua biblioteca pessoal, inspirada no Skoob mas com uma identidade própria e foco na experiência do usuário.

## 🚀 Características

### 📚 Gestão Completa de Livros
- **Adicionar livros** com informações detalhadas (título, autor, ISBN, editora, ano, páginas)
- **Status de leitura** (Lendo, Lido, Não lido, Lista de desejos)
- **Sistema de avaliação** com estrelas (1-5)
- **Anotações pessoais** para cada livro
- **URL da capa** para visualização

### 🎯 Organização Inteligente
- **Filtros avançados** por status, avaliação e ordenação
- **Visualização em grid ou lista**
- **Seções organizadas** por status de leitura
- **Busca por título e autor**

### 📊 Estatísticas Detalhadas
- **Dashboard completo** com métricas de leitura
- **Progresso anual** com metas personalizáveis
- **Histórico de atividades** recentes
- **Gêneros favoritos** e páginas lidas

### 👤 Perfil do Usuário
- **Estatísticas pessoais** detalhadas
- **Metas de leitura** anuais
- **Atividade recente** cronológica
- **Configurações** personalizáveis

## 🛠️ Tecnologias

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4** - Estilização moderna
- **Lucide React** - Ícones consistentes
- **React 19** - Biblioteca de interface

## 🎨 Design System

### Cores
- **Background**: `#1c1b1a` (Escuro elegante)
- **Surface**: `#2a2928` (Superfícies)
- **Accent**: `#bfa37c` (Dourado autêntico)
- **Text**: `#f1f0ee` (Texto principal)
- **Text Secondary**: `#a3a29e` (Texto secundário)

### Tipografia
- **Sans**: Inter (Interface)
- **Serif**: Lora (Títulos e conteúdo)

## 📱 Responsividade

- **Mobile-first** design
- **Breakpoints**: sm, md, lg, xl
- **Grid adaptativo** para diferentes telas
- **Navegação otimizada** para mobile

## 🚀 Como Executar

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Executar em desenvolvimento**:
   ```bash
   npm run dev
   ```

3. **Acessar**: `http://localhost:3000`

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 15)
│   ├── books/             # Páginas de livros
│   │   ├── [id]/         # Detalhes do livro
│   │   └── new/          # Adicionar livro
│   ├── profile/           # Perfil do usuário
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página inicial
├── components/            # Componentes reutilizáveis
│   ├── AppHeader.tsx      # Header com navegação
│   ├── AppFooter.tsx      # Footer
│   ├── BookCard.tsx       # Card de livro
│   ├── BookFilters.tsx    # Filtros e ordenação
│   ├── Layout.tsx         # Layout wrapper
│   ├── LibraryStats.tsx   # Estatísticas
│   └── ShelfSection.tsx   # Seções da estante
```

## 🎯 Funcionalidades Implementadas

### ✅ Concluído
- [x] Header com navegação completa
- [x] Dashboard com estatísticas
- [x] Sistema de filtros e ordenação
- [x] Cards de livros detalhados
- [x] Página de detalhes do livro
- [x] Formulário de adição de livros
- [x] Perfil do usuário com abas
- [x] Design responsivo
- [x] Sistema de avaliação
- [x] Organização por status

### 🔄 Próximos Passos
- [ ] Integração com API backend
- [ ] Sistema de autenticação
- [ ] Busca avançada
- [ ] Recomendações
- [ ] Compartilhamento social
- [ ] Exportação de dados
- [ ] Notificações
- [ ] Modo offline

## 🎨 Inspiração

Este projeto foi inspirado no **Skoob**, a maior rede social de leitores do Brasil, mas com foco em:

- **Autenticidade**: Design mais pessoal e íntimo
- **Simplicidade**: Interface limpa e focada
- **Performance**: Tecnologias modernas e otimizadas
- **Customização**: Controle total sobre sua biblioteca

## 📄 Licença

MIT License - veja o arquivo [LICENSE](../LICENSE) para detalhes.

---

**Librian** - Transforme sua paixão pela leitura em uma experiência digital autêntica.
