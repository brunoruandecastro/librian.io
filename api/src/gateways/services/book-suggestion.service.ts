import { Injectable } from '@nestjs/common';
import {
  GoogleBooksGateway,
  GoogleBooksVolume,
} from '../google-books/google-books.gateway';

export interface BookSuggestion {
  id: string;
  title: string;
  subtitle?: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  isbn?: string;
  pageCount?: number;
  categories?: string[];
  averageRating?: number;
  ratingsCount?: number;
  thumbnail?: string;
  language?: string;
  previewLink?: string;
  infoLink?: string;
}

@Injectable()
export class BookSuggestionService {
  constructor(private readonly googleBooksGateway: GoogleBooksGateway) {}

  /**
   * Converte um GoogleBooksVolume para BookSuggestion
   */
  private mapVolumeToSuggestion(volume: GoogleBooksVolume): BookSuggestion {
    const isbn = volume.volumeInfo.industryIdentifiers?.find(
      (identifier) =>
        identifier.type === 'ISBN_13' || identifier.type === 'ISBN_10',
    )?.identifier;

    return {
      id: volume.id,
      title: volume.volumeInfo.title,
      subtitle: volume.volumeInfo.subtitle,
      authors: volume.volumeInfo.authors,
      publisher: volume.volumeInfo.publisher,
      publishedDate: volume.volumeInfo.publishedDate,
      description: volume.volumeInfo.description,
      isbn,
      pageCount: volume.volumeInfo.pageCount,
      categories: volume.volumeInfo.categories,
      averageRating: volume.volumeInfo.averageRating,
      ratingsCount: volume.volumeInfo.ratingsCount,
      thumbnail: volume.volumeInfo.imageLinks?.thumbnail,
      language: volume.volumeInfo.language,
      previewLink: volume.volumeInfo.previewLink,
      infoLink: volume.volumeInfo.infoLink,
    };
  }

  /**
   * Busca sugestões de livros por termo geral
   */
  async searchBooks(
    query: string,
    maxResults: number = 10,
  ): Promise<BookSuggestion[]> {
    try {
      const response = await this.googleBooksGateway.searchVolumes(
        query,
        maxResults,
      );

      if (!response.items) {
        return [];
      }

      return response.items.map((volume) => this.mapVolumeToSuggestion(volume));
    } catch (error) {
      return [];
    }
  }

  /**
   * Busca sugestões de livros por ISBN
   */
  async searchByIsbn(isbn: string): Promise<BookSuggestion[]> {
    try {
      const response = await this.googleBooksGateway.searchByIsbn(isbn);

      if (!response.items) {
        return [];
      }

      return response.items.map((volume) => this.mapVolumeToSuggestion(volume));
    } catch (error) {
      return [];
    }
  }

  /**
   * Busca sugestões de livros por título
   */
  async searchByTitle(
    title: string,
    maxResults: number = 10,
  ): Promise<BookSuggestion[]> {
    try {
      const response = await this.googleBooksGateway.searchByTitle(title);

      if (!response.items) {
        return [];
      }

      return response.items
        .slice(0, maxResults)
        .map((volume) => this.mapVolumeToSuggestion(volume));
    } catch (error) {
      return [];
    }
  }

  /**
   * Busca sugestões de livros por autor
   */
  async searchByAuthor(
    author: string,
    maxResults: number = 10,
  ): Promise<BookSuggestion[]> {
    try {
      const response = await this.googleBooksGateway.searchByAuthor(author);

      if (!response.items) {
        return [];
      }

      return response.items
        .slice(0, maxResults)
        .map((volume) => this.mapVolumeToSuggestion(volume));
    } catch (error) {
      return [];
    }
  }

  /**
   * Obtém detalhes completos de um livro por ID
   */
  async getBookDetails(volumeId: string): Promise<BookSuggestion | null> {
    try {
      const volume = await this.googleBooksGateway.getVolumeById(volumeId);
      return this.mapVolumeToSuggestion(volume);
    } catch (error) {
      return null;
    }
  }

  /**
   * Busca sugestões inteligentes baseadas em múltiplos critérios
   */
  async getSmartSuggestions(
    query: string,
    maxResults: number = 10,
  ): Promise<BookSuggestion[]> {
    try {
      // Primeiro tenta buscar por ISBN se a query parecer um ISBN
      if (this.isIsbn(query)) {
        const isbnResults = await this.searchByIsbn(query);
        if (isbnResults.length > 0) {
          return isbnResults;
        }
      }

      // Se não encontrou por ISBN, faz busca geral
      return await this.searchBooks(query, maxResults);
    } catch (error) {
      return [];
    }
  }

  /**
   * Verifica se uma string parece ser um ISBN
   */
  private isIsbn(query: string): boolean {
    // Remove espaços e hífens
    const cleanQuery = query.replace(/[\s-]/g, '');

    // Verifica se tem 10 ou 13 dígitos (ISBN-10 ou ISBN-13)
    return /^\d{10}$/.test(cleanQuery) || /^\d{13}$/.test(cleanQuery);
  }
}
