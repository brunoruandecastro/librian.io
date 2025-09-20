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
    timeout: 10000,
    maxRetries: 3,
  },
};

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
