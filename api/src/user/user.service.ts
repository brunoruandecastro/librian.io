import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BookStatus } from '@prisma/client';

export interface UserStats {
  totalBooks: number;
  readBooks: number;
  readingBooks: number;
  ownedBooks: number;
  donatingBooks: number;
  sellingBooks: number;
  joinDate: string;
}

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: createUserDto });
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  async getUserStats(userId: string): Promise<UserStats> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        books: true
      }
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const totalBooks = user.books.length;
    const readBooks = user.books.filter(book => book.status === BookStatus.READ).length;
    const readingBooks = user.books.filter(book => book.status === BookStatus.READING).length;
    const ownedBooks = user.books.filter(book => book.status === BookStatus.OWNED).length;
    const donatingBooks = user.books.filter(book => book.status === BookStatus.DONATING).length;
    const sellingBooks = user.books.filter(book => book.status === BookStatus.SELLING).length;

    return {
      totalBooks,
      readBooks,
      readingBooks,
      ownedBooks,
      donatingBooks,
      sellingBooks,
      joinDate: user.createdAt.toISOString()
    };
  }
}
