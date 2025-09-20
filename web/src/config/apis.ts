export const API_URLS = {
  INTERNAL: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001',
  
  DICEBEAR: 'https://api.dicebear.com/7.x',
  GOOGLE_BOOKS: 'https://www.googleapis.com/books/v1',
  OPEN_LIBRARY: 'https://openlibrary.org/api',

  GOODREADS: 'https://www.goodreads.com/api',
  ISBN_DB: 'https://api.isbndb.com/v2',
} as const;

export const API_CONFIG = {
  DICEBEAR: {
    INITIALS: {
      style: 'initials',
      backgroundColor: '3b82f6',
      textColor: 'ffffff',
      fontSize: 40,
    },
    AVATAAARS: {
      style: 'avataaars',
      mood: 'happy',
    },
  },
  
  GOOGLE_BOOKS: {
    MAX_RESULTS: 40,
    TIMEOUT: 10000,
  },
  
  INTERNAL: {
    TIMEOUT: 5000,
    RETRY_ATTEMPTS: 3,
  },
} as const;

export const buildApiUrl = {
  dicebear: {
    initials: (seed: string) => {
      const config = API_CONFIG.DICEBEAR.INITIALS;
      const params = new URLSearchParams({
        seed: encodeURIComponent(seed),
        backgroundColor: config.backgroundColor,
        textColor: config.textColor,
        fontSize: config.fontSize.toString(),
      });
      return `${API_URLS.DICEBEAR}/${config.style}/svg?${params}`;
    },
    
    avataaars: (seed: string) => {
      const config = API_CONFIG.DICEBEAR.AVATAAARS;
      const params = new URLSearchParams({
        seed: encodeURIComponent(seed),
        mood: config.mood,
      });
      return `${API_URLS.DICEBEAR}/${config.style}/svg?${params}`;
    },
  },
  
  googleBooks: {
    search: (query: string, maxResults = API_CONFIG.GOOGLE_BOOKS.MAX_RESULTS) => {
      const params = new URLSearchParams({
        q: query,
        maxResults: maxResults.toString(),
      });
      return `${API_URLS.GOOGLE_BOOKS}/volumes?${params}`;
    },
    
    byIsbn: (isbn: string) => {
      return `${API_URLS.GOOGLE_BOOKS}/volumes?q=isbn:${isbn}`;
    },
  },
  
  internal: {
    books: () => `${API_URLS.INTERNAL}/books`,
    auth: () => `${API_URLS.INTERNAL}/auth`,
    users: () => `${API_URLS.INTERNAL}/users`,
  },
};

export type ApiProvider = keyof typeof API_URLS;
export type DiceBearStyle = 'initials' | 'avataaars';