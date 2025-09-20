import { API_URLS } from '@/config/apis';

const API_BASE_URL = API_URLS.INTERNAL;

export interface CreateBookData {
  title: string;
  author: string;
  publisher?: string;
  year?: number;
  isbn?: string;
  status?: 'OWNED' | 'READING' | 'READ' | 'DONATING' | 'SELLING';
  description?: string;
  coverUrl?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  publisher?: string;
  year?: number;
  isbn?: string;
  status: 'OWNED' | 'READING' | 'READ' | 'DONATING' | 'SELLING';
  description?: string;
  coverUrl?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

class BookService {
  private async getAuthHeaders() {
    const token = localStorage.getItem('auth_token'); // Mudança aqui: 'token' -> 'auth_token'
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  async createBook(bookData: CreateBookData): Promise<Book> {
    const response = await fetch(`${API_BASE_URL}/books`, {
      method: 'POST',
      headers: await this.getAuthHeaders(),
      body: JSON.stringify(bookData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao criar livro');
    }

    return response.json();
  }

  async getBooks(): Promise<Book[]> {
    const response = await fetch(`${API_BASE_URL}/books`, {
      method: 'GET',
      headers: await this.getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao buscar livros');
    }

    return response.json();
  }
}

export const bookService = new BookService();