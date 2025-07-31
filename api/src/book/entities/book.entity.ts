import { BookStatus } from '@prisma/client';

export class Book {
  id: string;
  title: string;
  author: string;
  description?: string;
  isbn?: string;
  status?: BookStatus;
  createdAt: Date;
  updatedAt: Date;
}
