import { BookStatus } from '@prisma/client';

export class CreateBookDto {
  title: string;
  author: string;
  description?: string;
  isbn?: string;
  status?: BookStatus;
}
