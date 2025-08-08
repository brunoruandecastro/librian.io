import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

export interface GoogleBooksVolume {
  id: string;
  volumeInfo: {
    title: string;
    subtitle?: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    industryIdentifiers?: Array<{
      type: string;
      identifier: string;
    }>;
    pageCount?: number;
    categories?: string[];
    averageRating?: number;
    ratingsCount?: number;
    imageLinks?: {
      smallThumbnail?: string;
      thumbnail?: string;
    };
    language?: string;
    previewLink?: string;
    infoLink?: string;
  };
}

export interface GoogleBooksSearchResponse {
  kind: string;
  totalItems: number;
  items?: GoogleBooksVolume[];
}

@Injectable()
export class GoogleBooksGateway {
  private readonly baseUrl = 'https://www.googleapis.com/books/v1';

  constructor(private readonly httpService: HttpService) { }

  /**
   * Busca volumes por termo (título, autor, ISBN, etc.)
   * @param query - Termo de busca
   * @param maxResults - Número máximo de resultados (padrão: 20)
   * @param startIndex - Índice inicial para paginação (padrão: 0)
   * @returns Promise com os resultados da busca
   */
  async searchVolumes(
    query: string,
    maxResults: number = 20,
    startIndex: number = 0,
  ): Promise<GoogleBooksSearchResponse> {
    const params = new URLSearchParams({
      q: query,
      maxResults: maxResults.toString(),
      startIndex: startIndex.toString(),
    });

    const url = `${this.baseUrl}/volumes?${params.toString()}`;

    try {
      const response = await firstValueFrom(
        this.httpService.get<GoogleBooksSearchResponse>(url)
      );

      return response.data;
    } catch (error) {
      throw new Error(`Erro ao buscar volumes: ${error.message}`);
    }
  }

  /**
   * Busca um volume específico por ID
   * @param volumeId - ID do volume
   * @returns Promise com os dados do volume
   */
  async getVolumeById(volumeId: string): Promise<GoogleBooksVolume> {
    const url = `${this.baseUrl}/volumes/${volumeId}`;

    try {
      const response = await firstValueFrom(
        this.httpService.get<GoogleBooksVolume>(url)
      );

      return response.data;
    } catch (error) {
      throw new Error(`Erro ao buscar volume por ID: ${error.message}`);
    }
  }

  /**
   * Busca volumes por ISBN
   * @param isbn - ISBN do livro
   * @returns Promise com os resultados da busca
   */
  async searchByIsbn(isbn: string): Promise<GoogleBooksSearchResponse> {
    return this.searchVolumes(`isbn:${isbn}`);
  }

  /**
   * Busca volumes por título
   * @param title - Título do livro
   * @returns Promise com os resultados da busca
   */
  async searchByTitle(title: string): Promise<GoogleBooksSearchResponse> {
    return this.searchVolumes(`intitle:${title}`);
  }

  /**
   * Busca volumes por autor
   * @param author - Nome do autor
   * @returns Promise com os resultados da busca
   */
  async searchByAuthor(author: string): Promise<GoogleBooksSearchResponse> {
    return this.searchVolumes(`inauthor:${author}`);
  }
} 