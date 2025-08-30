import { Controller, Get, Query, Param } from '@nestjs/common';
import {
  BookSuggestionService,
  BookSuggestion,
} from '../services/book-suggestion.service';

@Controller('book-suggestions')
export class BookSuggestionController {
  constructor(private readonly bookSuggestionService: BookSuggestionService) {}

  /**
   * Busca sugestões de livros por termo geral
   * GET /book-suggestions/search?q=harry+potter&maxResults=10
   */
  @Get('search')
  async searchBooks(
    @Query('q') query: string,
    @Query('maxResults') maxResults: string = '10',
  ): Promise<BookSuggestion[]> {
    if (!query) {
      return [];
    }

    const maxResultsNumber = parseInt(maxResults, 10) || 10;
    return this.bookSuggestionService.searchBooks(query, maxResultsNumber);
  }

  /**
   * Busca sugestões de livros por ISBN
   * GET /book-suggestions/isbn/9781234567890
   */
  @Get('isbn/:isbn')
  async searchByIsbn(@Param('isbn') isbn: string): Promise<BookSuggestion[]> {
    if (!isbn) {
      return [];
    }

    return this.bookSuggestionService.searchByIsbn(isbn);
  }

  /**
   * Busca sugestões de livros por título
   * GET /book-suggestions/title/harry+potter?maxResults=10
   */
  @Get('title/:title')
  async searchByTitle(
    @Param('title') title: string,
    @Query('maxResults') maxResults: string = '10',
  ): Promise<BookSuggestion[]> {
    if (!title) {
      return [];
    }

    const maxResultsNumber = parseInt(maxResults, 10) || 10;
    return this.bookSuggestionService.searchByTitle(title, maxResultsNumber);
  }

  /**
   * Busca sugestões de livros por autor
   * GET /book-suggestions/author/j.k.+rowling?maxResults=10
   */
  @Get('author/:author')
  async searchByAuthor(
    @Param('author') author: string,
    @Query('maxResults') maxResults: string = '10',
  ): Promise<BookSuggestion[]> {
    if (!author) {
      return [];
    }

    const maxResultsNumber = parseInt(maxResults, 10) || 10;
    return this.bookSuggestionService.searchByAuthor(author, maxResultsNumber);
  }

  /**
   * Obtém detalhes completos de um livro por ID
   * GET /book-suggestions/details/volumeId
   */
  @Get('details/:volumeId')
  async getBookDetails(
    @Param('volumeId') volumeId: string,
  ): Promise<BookSuggestion | null> {
    if (!volumeId) {
      return null;
    }

    return this.bookSuggestionService.getBookDetails(volumeId);
  }

  /**
   * Busca sugestões inteligentes (tenta ISBN primeiro, depois busca geral)
   * GET /book-suggestions/smart?q=9781234567890&maxResults=10
   */
  @Get('smart')
  async getSmartSuggestions(
    @Query('q') query: string,
    @Query('maxResults') maxResults: string = '10',
  ): Promise<BookSuggestion[]> {
    if (!query) {
      return [];
    }

    const maxResultsNumber = parseInt(maxResults, 10) || 10;
    return this.bookSuggestionService.getSmartSuggestions(
      query,
      maxResultsNumber,
    );
  }
}
