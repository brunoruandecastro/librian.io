import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GoogleBooksGateway } from './google-books/google-books.gateway';
import { BookSuggestionService } from './services/book-suggestion.service';
import { BookSuggestionController } from './controllers/book-suggestion.controller';

@Module({
  imports: [HttpModule],
  providers: [GoogleBooksGateway, BookSuggestionService],
  controllers: [BookSuggestionController],
  exports: [GoogleBooksGateway, BookSuggestionService],
})
export class GatewaysModule { } 