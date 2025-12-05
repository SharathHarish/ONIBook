import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async createBook(createBookDto: CreateBookDto) {
    return this.prisma.book.create({
      data: {
        ...createBookDto,
        isBorrowed: createBookDto.isBorrowed || false,
      },
    });
  }

  async getAllBooks(filters?: { authorId?: number; isBorrowed?: boolean }) {
    return this.prisma.book.findMany({
      where: filters || {},
      include: { author: true }, // include author details
    });
  }

  async getBookById(id: number) {
    const book = await this.prisma.book.findUnique({
      where: { id },
      include: { author: true },
    });
    if (!book) throw new NotFoundException(`Book with ID ${id} not found`);
    return book;
  }

  async updateBook(id: number, updateBookDto: UpdateBookDto) {
    await this.getBookById(id);
    return this.prisma.book.update({
      where: { id },
      data: updateBookDto,
    });
  }

  async deleteBook(id: number) {
    await this.getBookById(id);
    return this.prisma.book.delete({ where: { id } });
  }
}
