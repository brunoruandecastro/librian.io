import { BookStatus } from '@prisma/client';

export class CreateBookDto {
  title: string;
  author: string;
  publisher?: string;
  year?: number;
  isbn?: string;
  status?: BookStatus;
  description?: string;
  coverUrl?: string;
}
