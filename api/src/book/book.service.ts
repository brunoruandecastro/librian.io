import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto, userId: string) {
    return this.prisma.book.create({
      data: {
        ...createBookDto,
        userId,
      },
    });
  }

  async findAll(userId?: string) {
    const where = userId ? { userId } : {};
    return this.prisma.book.findMany({ where });
  }

  async findOne(id: string) {
    return this.prisma.book.findUnique({ where: { id } });
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    return this.prisma.book.update({ where: { id }, data: updateBookDto });
  }

  async remove(id: string) {
    return this.prisma.book.delete({ where: { id } });
  }
}
