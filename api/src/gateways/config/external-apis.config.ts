export interface ExternalApiConfig {
  googleBooks: {
    baseUrl: string;
    timeout: number;
    maxRetries: number;
  };
}

export const externalApiConfig: ExternalApiConfig = {
  googleBooks: {
    baseUrl: 'https://www.googleapis.com/books/v1',
    timeout: 10000, // 10 segundos
    maxRetries: 3,
  },
};

// Configurações para futuras APIs externas
export interface FutureApiConfig {
  openLibrary?: {
    baseUrl: string;
    timeout: number;
  };
  goodreads?: {
    baseUrl: string;
    apiKey?: string;
    timeout: number;
  };
  isbnDb?: {
    baseUrl: string;
    apiKey?: string;
    timeout: number;
  };
}
