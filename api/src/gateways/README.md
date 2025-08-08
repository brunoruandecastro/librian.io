# Gateways - Integração com APIs Externas

Esta pasta contém a estrutura para integração com APIs externas, começando com a API do Google Books.

## Estrutura de Pastas

```
gateways/
├── config/                    # Configurações das APIs externas
│   └── external-apis.config.ts
├── controllers/               # Controllers que expõem endpoints
│   └── book-suggestion.controller.ts
├── services/                  # Serviços que utilizam os gateways
│   └── book-suggestion.service.ts
├── google-books/             # Gateway específico do Google Books
│   ├── google-books.gateway.ts
│   └── google-books.gateway.spec.ts
└── gateways.module.ts        # Módulo principal dos gateways
```

## Google Books Gateway

### Funcionalidades Implementadas

- **Busca por termo geral**: `searchVolumes(query, maxResults, startIndex)`
- **Busca por ISBN**: `searchByIsbn(isbn)`
- **Busca por título**: `searchByTitle(title)`
- **Busca por autor**: `searchByAuthor(author)`
- **Obter volume por ID**: `getVolumeById(volumeId)`

### Endpoints Disponíveis

#### Busca Geral
```
GET /book-suggestions/search?q=harry+potter&maxResults=10
```

#### Busca por ISBN
```
GET /book-suggestions/isbn/9781234567890
```

#### Busca por Título
```
GET /book-suggestions/title/harry+potter?maxResults=10
```

#### Busca por Autor
```
GET /book-suggestions/author/j.k.+rowling?maxResults=10
```

#### Detalhes de um Livro
```
GET /book-suggestions/details/volumeId
```

#### Busca Inteligente
```
GET /book-suggestions/smart?q=9781234567890&maxResults=10
```

### Exemplo de Resposta

```json
[
  {
    "id": "volumeId",
    "title": "Harry Potter and the Philosopher's Stone",
    "subtitle": "The Illustrated Edition",
    "authors": ["J.K. Rowling"],
    "publisher": "Bloomsbury Publishing",
    "publishedDate": "2015",
    "description": "The first book in the Harry Potter series...",
    "isbn": "9781408855652",
    "pageCount": 256,
    "categories": ["Juvenile Fiction", "Fantasy"],
    "averageRating": 4.5,
    "ratingsCount": 12345,
    "thumbnail": "https://books.google.com/books?id=...",
    "language": "en",
    "previewLink": "https://books.google.com/books?id=...",
    "infoLink": "https://books.google.com/books?id=..."
  }
]
```

## Como Adicionar Novas APIs Externas

1. **Criar pasta para o gateway**: `gateways/[api-name]/`
2. **Implementar o gateway**: `[api-name].gateway.ts`
3. **Adicionar testes**: `[api-name].gateway.spec.ts`
4. **Criar serviço se necessário**: `services/[api-name]-service.ts`
5. **Adicionar controller se necessário**: `controllers/[api-name]-controller.ts`
6. **Atualizar configurações**: `config/external-apis.config.ts`
7. **Registrar no módulo**: `gateways.module.ts`

### Exemplo para Open Library API

```typescript
// gateways/open-library/open-library.gateway.ts
@Injectable()
export class OpenLibraryGateway {
  constructor(private readonly httpService: HttpService) {}

  async searchBooks(query: string) {
    // Implementação
  }
}

// gateways/gateways.module.ts
@Module({
  imports: [HttpModule],
  providers: [
    GoogleBooksGateway,
    OpenLibraryGateway, // Nova API
    BookSuggestionService,
  ],
  // ...
})
export class GatewaysModule {}
```

## Configuração de Ambiente

Para APIs que requerem chaves de API, adicione as variáveis de ambiente:

```bash
# .env
GOOGLE_BOOKS_API_KEY=your_api_key_here
OPEN_LIBRARY_API_KEY=your_api_key_here
```

## Testes

Execute os testes dos gateways:

```bash
npm run test gateways
```

## Rate Limiting

A API do Google Books tem limites de uso:
- 1,000 requests per day (gratuito)
- 100,000 requests per day (com API key)

Considere implementar cache e rate limiting para produção. 